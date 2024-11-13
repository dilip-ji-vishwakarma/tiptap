import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a pool connection to the database
const connection = await mysql.createPool({
  host: 'localhost',       // Update with your MySQL host
  user: 'root',            // Update with your MySQL username
  password: '',            // Update with your MySQL password
  database: 'doc',         // Update with your database name
});

export async function GET(req: NextRequest) {
  try {
    // Query the database to get all comments
    const [rows]: [any[], any] = await connection.execute(
      'SELECT * FROM comments ORDER BY position'
    );

    // Return the list of comments
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error retrieving comments:', error);
    return NextResponse.json({ error: 'Failed to retrieve comments' }, { status: 500 });
  }
}
