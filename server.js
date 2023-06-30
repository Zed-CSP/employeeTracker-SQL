const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const db = require('./config/connections.js');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username


    // Your password
    password: 'root',
    database: 'employee_trackerDB',
});

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log('connected as id ' + connection.threadId);
    start();
}
);

// function which prompts the user for what action they should take
const start = () => {
