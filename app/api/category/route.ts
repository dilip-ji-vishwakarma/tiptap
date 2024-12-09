import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connection from '@/lib/mysql';

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]; 

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token, userId missing' }, { status: 400 });
    }

    const [categories]: any = await connection.query(
      'SELECT * FROM np_category WHERE user_id = ?',
      [userId]
    );
    
    if (categories.length === 0) {
      return NextResponse.json({ message: 'No categories found for this user' }, { status: 404 });
    }

    return NextResponse.json({
      userId,
      categories,
    });

  } catch (error) {
    console.error('Error during GET request:', error);
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token, userId missing' }, { status: 400 });
    }

    const body = await req.json();
    const { category_name } = body;

    if (!category_name) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }

    const [result]: any = await connection.query(
      'INSERT INTO np_category (user_id, category_name) VALUES (?, ?)',
      [userId, category_name]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Failed to add category' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Category added successfully', 
      category_id: result.insertId 
    }, { status: 201 });

  } catch (error) {
    console.error('Error during POST request:', error);
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}