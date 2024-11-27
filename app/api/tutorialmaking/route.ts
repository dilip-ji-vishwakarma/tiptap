import { NextResponse } from 'next/server';
import connection from '@/lib/mysql';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, label, url, template, editor_string, bookmark } = body;

    // Ensure that editor_string is parsed to JSON if needed
    let editorJson;
    try {
      editorJson = JSON.parse(editor_string);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid JSON in editor_string' }, { status: 400 });
    }

    // Insert data into MySQL database
    const query = `
      INSERT INTO np_courses (user_id, label, url, template, editor_string, bookmark)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.execute(query, [
      user_id,
      label,
      url,
      template,
      JSON.stringify(editorJson), // Store JSON stringified
      bookmark ? 1 : 0, // Convert boolean to integer for MySQL (1 for true, 0 for false)
    ]);

    return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
