import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connection from '@/lib/mysql';

export async function POST(request: Request) {
  const { email, password, fullname } = await request.json();

  try {
    // Check if user already exists
    const [existingUser]: any = await connection.query('SELECT id FROM np_users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return NextResponse.json({ message: 'Email is already registered' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await connection.query('INSERT INTO np_users (email, password, fullname) VALUES (?, ?, ?)', [email, hashedPassword, fullname]);

    return NextResponse.json({ message: 'Signup successful! Redirecting to login...' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}
