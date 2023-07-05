const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connections.js');
const actions = require('./config/actions.js');
const titleArt = require('./assets/ascii.js');
 


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
            actions.listAllDepartments();
        }

        if (action === 'View Department Budgets') {
            actions.viewDepartmentBudgets();
        }

        if (action === 'List all Roles') {
            actions.listAllRoles();
        }

        if (action === 'List all Employees') {
            actions.listAllEmployees();
        }

        if (action === 'Add a Department') {
            actions.addDepartment();
        }

        if (action === 'Add a Role') {
            actions.addRole();
        }

        if (action === 'Add an Employee') {
            actions.addEmployee();
        }

        if (action === 'Update an Employee Role') {
            actions.updateEmployeeRole();
        }

        if (action === 'Update an Employee Manager') {
            actions.updateEmployeeManager();
        }

        if (action === 'Delete a Department') {
            actions.deleteDepartment();
        }

        if (action === 'Delete a Role') {
            actions.deleteRole();
        }

        if (action === 'Delete an Employee') {
            actions.deleteEmployee();
        }

        if (action === 'Exit') {
            actions.exit();
        }
    })
};
