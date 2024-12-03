import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = '4e8f517f-d76b-4d75-bae4-9977f67c3075bbdb3f62b8b7c1e8d91b97a497b3e4b9bce8b072b6f9a8f90c58c0';

export async function GET(request: Request) {
  try {
    // Get the JWT token from the authorization header
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: 'Unauthorized access' }, { status: 403 });
    }

    const userId = decoded.userId;

    // Query the database to get the courses for the logged-in user
    const [rows]: any = await connection.execute(
      'SELECT * FROM np_courses WHERE user_id = ?',
      [userId]
    );

    return NextResponse.json({ courses: rows }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching courses:', error.message);
    return NextResponse.json(
      { message: 'An error occurred while fetching the courses', error: error.message },
      { status: 500 }
    );
  }
}