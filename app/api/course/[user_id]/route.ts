import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = '4e8f517f-d76b-4d75-bae4-9977f67c3075bbdb3f62b8b7c1e8d91b97a497b3e4b9bce8b072b6f9a8f90c58c0';

export async function GET(req: NextRequest, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const userIdFromToken = decodedToken.userId;

    if (userIdFromToken !== parseInt(user_id)) {
      return NextResponse.json({ message: 'User ID does not match the token' }, { status: 403 });
    }

    const query = `
      SELECT np_courses.id, np_courses.user_id, np_courses.label, np_courses.url, np_courses.template, 
             np_courses.editor_string, np_courses.bookmark, np_courses.updated_at
      FROM np_course_list
      JOIN np_courses ON np_course_list.user_id = np_courses.user_id
      WHERE np_course_list.user_id = ?
    `;

    const [rows] = await connection.execute(query, [user_id]);

    // Check if no courses are found
    if ((rows as any[]).length === 0) {
      return NextResponse.json({ message: 'No courses found for this user' }, { status: 404 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error fetching courses:', err.message);
      return NextResponse.json({ message: 'Error fetching courses', error: err.message }, { status: 500 });
    }

    // Handle unknown errors
    console.error('Unknown error fetching courses:', err);
    return NextResponse.json({ message: 'Unknown error fetching courses' }, { status: 500 });
  }
}
