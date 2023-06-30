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
    
    console.log('******************************************************************************************************************************************');
    console.log(' ____             ____    __      _____    __    __  ____    ____        ______  ____    ______  ____    __  __   ____    ____       ');
    console.log('/\\  _`\\   /\'\\_/`\\/\\  _`\\ /\\ \\    /\\  __`\\ /\\ \\  /\\ \\/\\  _`\\ /\\  _`\\     /\\__  _\\/\\  _`\\ /\\  _  \\/\\  _`\\ /\\ \\/\\ \\/\\  _`\\ /\\  _`\\     ');
    console.log('\\ \\ \\L\\_\\/\\      \\ \\ \\L\\ \\ \\ \\   \\ \\ \\/\\ \\\\ `\\`\\\\/\'/\\ \\ \\L\\_\\ \\ \\L\\_\\   \\/_/\\ \\/\\ \\ \\L\\ \\ \\ \\L\\ \\ \\ \\/\\_\\ \\ \\\'/\'/\\ \\ \\L\\_\\ \\ \\L\\ \\   ');
    console.log(' \\ \\  _\\L\\ \\ \\__\\ \\ \\ ,__/\\ \\ \\  _\\ \\ \\ \\ \`\ `\\/ > <  \\ \\  _\\L\\ \\  _\\L      \\ \\ \\ \\ \\ ,  /\\ \\  __ \\ \\ \\/\\ \\ , <  \\ \\  _\\L\\ \\ ,  /   ');
    console.log('  \\ \\ \\L\\ \\ \\ \\_/\\ \\ \\ \\/  \\ \\ \\L\\ \\ \\ \\_\\ \\ \\ \\`\\ \\ \\ \\L\\ \\ \\ \\L\\ \\     \\ \\ \\ \\ \\ \\\\ \\\\ \\ \\ \\/\\ \\ \\ \\L\\ \\ \\ \\\\`\\ \\ \\ \\L\\ \\ \\ \\\\ \\  ');
    console.log('   \\ \\____/\\ \\_\\\\ \\_\\ \\_\\   \\ \\____/\\ \\____/\\ \\_\\ \\_\\ \\____/\\ \\____/      \\ \\_\\ \\ \\_\\ \\_\\ \\_\\ \\_\\ \\____/\\ \\_\\ \\_\\ \\____/\\ \\_\\ \\_\\ ');
    console.log('    \\/___/  \\/_/ \\/_/\\/_/    \\/___/  \\/____/  \\/_/\\/_/\\/___/  \\/___/        \\/_/  \\/_/\\/_/\\/_/\\/_/\\/___/  \\/_/\\/_/\\/___/  \\/_/\\/_/ ');
    console.log('                                                                                                                                          ');
    console.log('******************************************************************************************************************************************');

    start();
}
);



// function which prompts the user for what action they should take
const start = () => {};