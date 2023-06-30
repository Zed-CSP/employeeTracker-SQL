
require('dotenv').config();

const mysql = require('mysql2');

placeholder = process.env.db_password;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.db_password,
        database: 'employee_db',
        port: 3306
    },
    console.log(process.env.db_password)
);

module.exports = db;