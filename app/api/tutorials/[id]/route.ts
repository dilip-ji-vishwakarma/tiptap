import { NextRequest, NextResponse } from 'next/server';
import connection from '@/lib/mysql';

async function updateTutorial(id: string, data: any) {
  return new Promise((resolve, reject) => {
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
      return reject(new Error('No fields provided for update'));
    }

    // Push the ID at the end of values to update the correct row
    values.push(id);

    // Construct the SQL query dynamically based on the fields provided
    const query = `
      UPDATE courses 
      SET ${fields.join(', ')} 
      WHERE id = ?
    `;

    // Log the query and parameters for debugging
    console.log('SQL Query:', query);
    console.log('Values:', values);

    // Execute the query
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);  // Log the error details from MySQL
        return reject(new Error('Error executing query'));
      }
      console.log('Query Results:', results);  // Log the results if query is successful
      resolve(results);
    });
  });
}

async function deleteTutorial(id: string) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM courses WHERE id = ?';

    // Execute the query
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);  // Log the error details from MySQL
        return reject(new Error('Error executing delete query'));
      }
      console.log('Query Results:', results);  // Log the results if query is successful
      resolve(results);
    });
  });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();

    console.log('Received Data for Update:', body);

    // Call the update function with the provided data
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
  try {
    const id = params.id;
    console.log('Received Data for Delete:', id);

    // Call the delete function
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
