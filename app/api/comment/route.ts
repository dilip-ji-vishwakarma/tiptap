import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const connection = await mysql.createPool({
  host: 'localhost',
  user: 'root',   
  password: '',   
  database: 'doc',  
});

export async function POST(req: NextRequest) {
  try {
    const { id, text, position } = await req.json(); 

    if (!id || !text || typeof position !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await connection.execute(
      'INSERT INTO comments (id, text, position) VALUES (?, ?, ?)',
      [id, text, position]
    );

    const resultSetHeader = result as mysql.ResultSetHeader; 

    return NextResponse.json({ message: 'Comment saved successfully', result: resultSetHeader }, { status: 200 });

  } catch (error) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing required id' }, { status: 400 });
    }

    const [result] = await connection.execute(
      'DELETE FROM comments WHERE id = ?',
      [id]
    );

    const resultSetHeader = result as mysql.ResultSetHeader;

    if (resultSetHeader.affectedRows === 0) {
      return NextResponse.json({ error: 'No comment found with that id' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
