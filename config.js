const mysql = require('mysql2/promise');
const {SQLPASSWORD, SQLDB} = process.env
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: SQLPASSWORD,
  database: SQLDB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;