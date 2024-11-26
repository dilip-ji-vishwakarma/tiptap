import mysql from 'mysql2/promise';  // Use the promise wrapper

// Create a connection to the database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'doc',
});

export default connection;
