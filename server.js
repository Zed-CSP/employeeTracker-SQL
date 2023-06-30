const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const db = require('./config/connections.js');
const titleArt = require('./assets/ascii.js');

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
db.connect((err) => {
    if (err) throw err;

    titleArt();
    // run the start function after the connection is made to prompt the user
    console.log('connected as id ' + connection.threadId);

    init();
});

// function which prompts the user for what action they should take
const init = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'admin_action',
            message: '?',
            choices: [
                'List all Departments',
                'View Department Budgets',
                'List all Roles',
                'List all Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update an Employee Manager',
                'Delete a Department',
                'Delete a Role',
                'Delete an Employee',
                'Exit',
            ]
        }
    )
    .then ((answer) => {
        const { action } = answer

        if (action === 'List all Departments') {
            listAllDepartments();
        }

        if (action === 'View Department Budgets') {
            viewDepartmentBudgets();
        }

        if (action === 'List all Roles') {
            listAllRoles();
        }

        if (action === 'List all Employees') {
            listAllEmployees();
        }

        if (action === 'Add a Department') {
            addDepartment();
        }

        if (action === 'Add a Role') {
            addRole();
        }

        if (action === 'Add an Employee') {
            addEmployee();
        }

        if (action === 'Update an Employee Role') {
            updateEmployeeRole();
        }

        if (action === 'Update an Employee Manager') {
            updateEmployeeManager();
        }

        if (action === 'Delete a Department') {
            deleteDepartment();
        }

        if (action === 'Delete a Role') {
            deleteRole();
        }

        if (action === 'Delete an Employee') {
            deleteEmployee();
        }

        if (action === 'Exit') {
            exit();
        }
    })
};