import { NextRequest, NextResponse } from 'next/server';
import connection from '@/lib/mysql'; // Adjust this based on your actual MySQL connection import

// Define the updateTutorial function
async function updateTutorial(id: string, data: any) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE courses 
        SET bookmark = ? 
        WHERE id = ?
      `;
      const values = [data.bookmark, id]; // Ensure this is passing correctly
  
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error updating tutorial:', err);
          return reject(new Error('Error updating tutorial'));
        }
        resolve(results);
      });
    });
  }

  export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = params.id;
      const body = await req.json();
      console.log('Received Data for Update:', body);  // Log data to check bookmark value
  
      const updatedTutorial = await updateTutorial(id, body);
      return NextResponse.json(updatedTutorial, { status: 200 });
    } catch (error) {
      console.error('Error updating tutorial:', error);
      return NextResponse.json({ message: 'Error updating tutorial' }, { status: 500 });
    }
  }
  
