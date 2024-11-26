import mysql from 'mysql2/promise'; // Use promise-based MySQL API
import jwt from 'jsonwebtoken';
import md5 from 'md5';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'doc',
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Store securely in .env

// POST handler
export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Email and password are required',
      }),
      { status: 400 }
    );
  }

  try {
    // Encrypt the password using md5
    const hashedPassword = md5(password);

    // Query the database using promises
    const [rows] = await connection.execute(
      'SELECT * FROM np_users WHERE email = ? AND password = ?',
      [email, hashedPassword]
    );

    const users = rows as any[];

    if (users.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email or password',
        }),
        { status: 401 }
      );
    }

    const user = users[0];

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } 
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Login successful',
        token,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred. Please try again later.',
      }),
      { status: 500 }
    );
  }
}
