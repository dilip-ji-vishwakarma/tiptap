import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = process.env.JWT_SECRET || '';

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
      // Prepare dummy course data
      const dummyCourse = {
        label: 'Tab',
        template: 'tiptap-editor',
        editor_string: JSON.stringify({}),
        category_id: categoryId,
        bookmark: false,
        url: `/course?category_id=${categoryId}&id=tab`,
      };

      // Insert dummy course into the database
      const result: any = await connection.query(
        'INSERT INTO np_courses (label, template, url, editor_string, category_id, bookmark) VALUES (?, ?, ?, ?, ?, ?)',
        [
          dummyCourse.label,
          dummyCourse.template,
          dummyCourse.url,
          dummyCourse.editor_string,
          dummyCourse.category_id,
          dummyCourse.bookmark,
        ]
      );

      const insertedCourse = {
        id: result.insertId,
        ...dummyCourse,
        submenus: [], // Dummy course won't have submenus initially
      };

      return NextResponse.json({
        courses: [insertedCourse],
      });
    }

    // Fetch submenus for each course
    const courseIds = courses.map((course: any) => course.id);
    const [submenus]: any = await connection.query(
      'SELECT * FROM np_submenu WHERE course_id IN (?)',
      [courseIds]
    );

    // Map submenus to their respective courses
    const coursesWithSubmenus = courses.map((course: any) => ({
      ...course,
      url: `/course?category_id=${categoryId}&id=${course.id}`, // Add URL for client matching
      submenus: submenus.filter((submenu: any) => submenu.course_id === course.id),
    }));

    return NextResponse.json({
      courses: coursesWithSubmenus,
    });
  } catch (error) {
    console.error('Error during GET request:', error);
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}
