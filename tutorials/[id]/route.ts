import { NextRequest, NextResponse } from 'next/server';
import connection from '@/lib/mysql';

interface TutorialData {
  bookmark?: string;
  label?: string;
  url?: string;
  editor_string?: any;
}

async function updateTutorial(id: string, data: TutorialData) {
  const fields: string[] = [];
  const values: any[] = [];

  // Check for optional fields and add them to the update query
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
  if (data.editor_string !== undefined) {
    // Serialize the editor_string object to a JSON string
    fields.push('editor_string = ?');
    values.push(JSON.stringify(data.editor_string));  // Convert the object to a string
  }

  // If no fields are provided, reject the update
  if (fields.length === 0) {
    throw new Error('No fields provided for update');
  }

  // Push the ID at the end of values to update the correct row
  values.push(id);

  // Construct the SQL query dynamically based on the fields provided
  const query = `
    UPDATE np_courses 
    SET ${fields.join(', ')} 
    WHERE id = ?
  `;

  try {
    // Execute the query using async/await
    const [results] = await connection.execute(query, values);
    return results;
  } catch (err) {
    console.error('Error executing query:', err);  // Log the error details from MySQL
    throw new Error('Error executing query');
  }
}

async function deleteTutorial(id: string) {
  const query = 'DELETE FROM np_courses WHERE id = ?';

  try {
    // Execute the query using async/await
    const [results] = await connection.execute(query, [id]);
    return results;
  } catch (err) {
    console.error('Error executing query:', err);  // Log the error details from MySQL
    throw new Error('Error executing delete query');
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Explicit destructuring of params

  try {
    const body = await req.json();
    const updatedTutorial = await updateTutorial(id, body);

    // Return the result of the update
    return NextResponse.json(updatedTutorial, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating content:', error.message); // Now `error` is treated as an instance of `Error`
    } else {
      console.error('Unexpected error:', error); // Handle case where error is not an instance of Error
    }

    return NextResponse.json({ message: 'Error updating tutorial', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Explicit destructuring of params

  try {
    const deletedTutorial = await deleteTutorial(id);

    // Return the result of the delete
    return NextResponse.json(deletedTutorial, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting content:', error.message); // Now `error` is treated as an instance of `Error`
    } else {
      console.error('Unexpected error:', error); // Handle case where error is not an instance of Error
    }

    return NextResponse.json({ message: 'Error deleting tutorial', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
