const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./config/connections.js');
const actions = require('./config/actions.js');
const titleArt = require('./assets/ascii.js');
 


// connect to the mysql server and sql database
connection.connect((err) => {
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
            name: 'action',
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
                console.log('\n');
                async() => {
                    await actions.viewAllDepartments();
                    goBack();
                }
        }
        
        if (action === 'View Department Budgets') {
            actions.viewDepartmentBudgets();
        }

        if (action === 'List all Roles') {
            actions.viewAllRoles();
        }

        if (action === 'List all Employees') {
            actions.viewAllEmployees();
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
            exit();
        }
    })
};

const goBack = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'action',
            message: 'Would you like to go back to the main menu?',
            choices: [
                'Yes',
                'No',
            ]
        }
    )
    .then ((answer) => {
        const { action } = answer

        if (action === 'Yes') {
            init();
        } else {
            exit();
        }
    })
};

const exit = () => {
    console.log('Goodbye!');
    connection.end();
    process.exit();
};


module.exports = init;