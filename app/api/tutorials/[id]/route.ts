import { NextRequest, NextResponse } from 'next/server';
import connection from '@/lib/mysql';

async function updateTutorial(id: string, data: any) {
  return new Promise((resolve, reject) => {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.bookmark !== undefined) {
      fields.push('bookmark = ?');
      values.push(data.bookmark);
    }
    if (data.label !== undefined) {
      fields.push('label = ?');
      values.push(data.label);
    }
    if (data.url !== undefined) {
      fields.push('url = ?');
      values.push(data.url);
    }

    if (fields.length === 0) {
      return reject(new Error('No fields provided for update'));
    }

    values.push(id);

    const query = `
      UPDATE courses 
      SET ${fields.join(', ')} 
      WHERE id = ?
    `;

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

    console.log('Received Data for Update:', body);

    // Pass the body directly, including optional `url`
    const updatedTutorial = await updateTutorial(id, body);

    return NextResponse.json(updatedTutorial, { status: 200 });
  } catch (error) {
    console.error('Error updating tutorial:', error);
    return NextResponse.json({ message: 'Error updating tutorial' }, { status: 500 });
  }
}

