require('dotenv').config();

const mysql = require('mysql2/promise');

const db = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.DB_PASSWORD,
            database: 'employee_db',
            port: 3306
        });

        console.log('Connected to the employee_db database.');
        return connection;
    } catch (err) {
        console.error(`Unable to connect to the database: ${err}`);
    }
};

module.exports = db;


