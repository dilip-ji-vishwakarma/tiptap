import { NextResponse } from 'next/server';
import connection from '@/lib/mysql';

export async function GET() {
  return new Promise((resolve, reject) => {
    const queryCourses = 'SELECT * FROM np_courses';

    connection.query(queryCourses, (err, courses: any[]) => {  
      if (err) {
        console.error('Error fetching courses:', err);
        return reject(new NextResponse('Error fetching courses', { status: 500 }));
      }

      const queryCourseSteps = 'SELECT * FROM np_submenus';

      connection.query(queryCourseSteps, (err, courseSteps: any[]) => {  
        if (err) {
          console.error('Error fetching course steps:', err);
          return reject(new NextResponse('Error fetching course steps', { status: 500 }));
        }

        const result = courses.map((course) => {
          const stepsForCourse = courseSteps.filter((step) => step.course_id === course.id);
          return {
            ...course,
            submenu: stepsForCourse
          };
        });

        resolve(NextResponse.json(result));
      });
    });
  });
}
