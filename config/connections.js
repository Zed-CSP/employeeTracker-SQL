
require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_db',
        port: 3306
    },
    console.log('Connected to the employee_db database.')
);

module.exports = db;