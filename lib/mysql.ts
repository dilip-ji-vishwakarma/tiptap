import mysql from 'mysql2/promise';  // Use the promise wrapper

// Create a connection to the database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'doc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
