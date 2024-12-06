import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function PATCH(req: NextRequest) {
  try {
    // Extract token from the Authorization header
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 401 });
    }

    // Verify and decode the JWT
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token, userId missing' }, { status: 400 });
    }

    // Parse the request body
    const body = await req.json();
    const { action, category_id, category_name } = body;

    // Ensure action and category_id are provided
    if (!action || !category_id) {
      return NextResponse.json({ message: 'Action and category_id are required' }, { status: 400 });
    }

    // Handle renaming a category
    if (action === 'rename') {
      if (!category_name) {
        return NextResponse.json({ message: 'New category_name is required for renaming' }, { status: 400 });
      }

      const [result]: any = await connection.query(
        'UPDATE np_category SET category_name = ? WHERE id = ? AND user_id = ?',
        [category_name, category_id, userId]
      );

      if (result.affectedRows === 0) {
        return NextResponse.json({ message: 'Failed to rename category or category not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Category renamed successfully' }, { status: 200 });
    }

    // Handle deleting a category
    if (action === 'delete') {
      const [result]: any = await connection.query(
        'DELETE FROM np_category WHERE id = ? AND user_id = ?',
        [category_id, userId]
      );

      if (result.affectedRows === 0) {
        return NextResponse.json({ message: 'Failed to delete category or category not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
    }

    // Invalid action
    return NextResponse.json({ message: 'Invalid action. Use "rename" or "delete"' }, { status: 400 });

  } catch (error) {
    console.error('Error during PATCH request:', error);
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}
