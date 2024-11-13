import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a pool connection to the database
const connection = await mysql.createPool({
  host: 'localhost',       // Update with your MySQL host
  user: 'root',            // Update with your MySQL username
  password: '',            // Update with your MySQL password
  database: 'doc',         // Update with your database name
});

export async function POST(req: NextRequest) {
  try {
    const { id, text, position } = await req.json(); // Extract data from request body

    // Validate the input
    if (!id || !text || typeof position !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert the comment into the database
    const [result] = await connection.execute(
      'INSERT INTO comments (id, text, position) VALUES (?, ?, ?)',
      [id, text, position]
    );

    // Check the result
    const resultSetHeader = result as mysql.ResultSetHeader; // Cast to ResultSetHeader

    // Return a success response
    return NextResponse.json({ message: 'Comment saved successfully', result: resultSetHeader }, { status: 200 });

  } catch (error) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 });
  }
}
