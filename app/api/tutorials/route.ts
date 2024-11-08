import { NextResponse } from 'next/server';
import connection from '@/lib/mysql';

export async function GET() {
  return new Promise((resolve, reject) => {
    // Query to get all tutorial steps
    const querySteps = 'SELECT * FROM tutorial_steps';

    connection.query(querySteps, (err, steps: any[]) => {  // Explicitly define the result type as any[]
      if (err) {
        console.error('Error fetching tutorial steps:', err);
        return reject(new NextResponse('Error fetching tutorial steps', { status: 500 }));
      }

      // Query to get all submenu items
      const querySubmenu = 'SELECT * FROM submenu_items';

      connection.query(querySubmenu, (err, submenu: any[]) => {  // Explicitly define the result type as any[]
        if (err) {
          console.error('Error fetching submenu items:', err);
          return reject(new NextResponse('Error fetching submenu items', { status: 500 }));
        }

        // Now steps and submenu are properly typed as arrays
        const result = steps.map((step) => {
          const submenusForStep = submenu.filter((item) => item.step_id === step.id);
          return {
            ...step,
            submenu: submenusForStep
          };
        });

        // Send back the merged result
        resolve(NextResponse.json(result));
      });
    });
  });
}
