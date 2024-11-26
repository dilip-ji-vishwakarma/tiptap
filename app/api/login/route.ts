import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';


const JWT_SECRET = '4e8f517f-d76b-4d75-bae4-9977f67c3075bbdb3f62b8b7c1e8d91b97a497b3e4b9bce8b072b6f9a8f90c58c0'; // Use an environment variable in production

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const [rows]: any = await connection.query('SELECT * FROM np_users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}
