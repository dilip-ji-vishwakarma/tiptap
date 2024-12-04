import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = process.env.JWT_SECRET || "";

// Helper: Update tutorials based on `category_id` and `id`
async function updateTutorials(categoryId: string, id: string, data: any) {
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
  if (data.editor_string !== undefined) {
    fields.push('editor_string = ?');
    values.push(JSON.stringify(data.editor_string));
  }

  if (fields.length === 0) {
    throw new Error('No fields provided for update');
  }

  values.push(id, categoryId);

  const query = `
    UPDATE np_courses 
    SET ${fields.join(', ')} 
    WHERE id = ? AND category_id = ?
  `;

  try {
    const [results] = await connection.execute(query, values);
    return results;
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Error executing query');
  }
}

// Helper: Delete tutorials based on `category_id` and `id`
async function deleteTutorials(categoryId: string, id: string) {
  const query = 'DELETE FROM np_courses WHERE id = ? AND category_id = ?';

  try {
    const [results] = await connection.execute(query, [id, categoryId]);
    return results;
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Error executing delete query');
  }
}

// PATCH Handler
export async function PATCH(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category_id');
    const id = searchParams.get('id');

    if (!categoryId || !id) {
      return NextResponse.json({ message: 'Category ID and ID are required' }, { status: 400 });
    }

    const body = await req.json();
    const updatedTutorials = await updateTutorials(categoryId, id, body);

    return NextResponse.json(updatedTutorials, { status: 200 });
  } catch (error) {
    console.error('Error during PATCH request:', error);
    return NextResponse.json({ message: 'Error updating tutorials', error }, { status: 500 });
  }
}

// DELETE Handler
export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category_id');
    const id = searchParams.get('id');

    if (!categoryId || !id) {
      return NextResponse.json({ message: 'Category ID and ID are required' }, { status: 400 });
    }

    const deletedTutorials = await deleteTutorials(categoryId, id);

    return NextResponse.json(deletedTutorials, { status: 200 });
  } catch (error) {
    console.error('Error during DELETE request:', error);
    return NextResponse.json({ message: 'Error deleting tutorials', error }, { status: 500 });
  }
}
