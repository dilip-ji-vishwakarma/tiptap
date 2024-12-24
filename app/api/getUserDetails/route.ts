import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = process.env.JWT_SECRET || "";

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
      'SELECT id, fullname, email, role FROM np_users WHERE id = ?',
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
