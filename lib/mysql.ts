import mysql from 'mysql2';

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',       // Change to your MySQL host
  user: 'root',            // Change to your MySQL username
  password: '',            // Change to your MySQL password
  database: 'doc'  // Change to your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export default connection;
