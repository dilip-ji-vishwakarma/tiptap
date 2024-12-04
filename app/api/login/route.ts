import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Query the database for the user
    const [rows]: any = await connection.query('SELECT * FROM np_users WHERE email = ?', [email]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = rows[0];

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate a JWT token (No Expiry)
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    // Respond with the token and user details
    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email },
    });

  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Error in login API:', error);

    return NextResponse.json(
      { message: 'Something went wrong', error: error.message },
      { status: 500 }
    );
  }
}
