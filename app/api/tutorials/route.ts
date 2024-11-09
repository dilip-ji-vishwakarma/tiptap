import { NextResponse } from 'next/server';
import connection from '@/lib/mysql';

export async function GET() {
  return new Promise((resolve, reject) => {
    // Query to get all courses
    const queryCourses = 'SELECT * FROM courses';

    connection.query(queryCourses, (err, courses: any[]) => {  // Explicitly define the result type as any[]
      if (err) {
        console.error('Error fetching courses:', err);
        return reject(new NextResponse('Error fetching courses', { status: 500 }));
      }

      // Query to get all course steps (submenus)
      const queryCourseSteps = 'SELECT * FROM course_steps';

      connection.query(queryCourseSteps, (err, courseSteps: any[]) => {  // Explicitly define the result type as any[]
        if (err) {
          console.error('Error fetching course steps:', err);
          return reject(new NextResponse('Error fetching course steps', { status: 500 }));
        }

        // Now courses and courseSteps are properly typed as arrays
        const result = courses.map((course) => {
          const stepsForCourse = courseSteps.filter((step) => step.course_id === course.id);
          return {
            ...course,
            submenu: stepsForCourse
          };
        });

        // Send back the merged result
        resolve(NextResponse.json(result));
      });
    });
  });
}
