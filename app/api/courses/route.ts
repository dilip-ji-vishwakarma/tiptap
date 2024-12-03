import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = '4e8f517f-d76b-4d75-bae4-9977f67c3075bbdb3f62b8b7c1e8d91b97a497b3e4b9bce8b072b6f9a8f90c58c0';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category_id');

    if (!categoryId) {
      return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
    }

    // Query courses based on category_id
    const [courses]: any = await connection.query(
      'SELECT * FROM np_courses WHERE category_id = ?',
      [categoryId]
    );

    if (!courses || courses.length === 0) {
      return NextResponse.json({ message: 'No courses found for this category' }, { status: 404 });
    }

    return NextResponse.json({
      courses: courses.map((course: any) => ({
        ...course,
        url: `/course?category_id=${categoryId}&id=${course.id}`, // Add URL for client matching
      })),
    });
  } catch (error) {
    console.error('Error during GET request:', error);
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}
