import {NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a pool connection to the database
const connection = await mysql.createPool({
  host: 'localhost',       // Update with your MySQL host
  user: 'root',            // Update with your MySQL username
  password: '',            // Update with your MySQL password
  database: 'doc',         // Update with your database name
});

export async function GET() {
  try {
    // Fetch all comments from the database
    const [comments] = await connection.execute('SELECT id, text, username, useremail, user_id FROM np_comments');
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}
