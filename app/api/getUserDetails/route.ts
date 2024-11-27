import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = '4e8f517f-d76b-4d75-bae4-9977f67c3075bbdb3f62b8b7c1e8d91b97a497b3e4b9bce8b072b6f9a8f90c58c0'; // Use an environment variable in production

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify JWT
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    // Fetch user details from the database
    const [rows]: any = await connection.query(
      'SELECT id, fullname, email FROM np_users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = rows[0];
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: 'Token verification failed', error }, { status: 401 });
  }
}
