import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',    
  user: 'root', 
  password: '', 
  database: 'doc', 
  waitForConnections: true,
  connectionLimit: 10,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export default connection;
