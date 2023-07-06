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

const refresh = () => {
    console.clear();
    titleArt();
    console.log('connected as id ' + connection.threadId);
    init();
}

// function which prompts the user for what action they should take
const init = () => {
    setTimeout(() => {
        inquirer.prompt({
            type: 'list',
            name: 'action',
            message: '?',
            choices: [
                'List all Departments',
                'List all Roles',
                'List all Employees',
                'View Department Budgets',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update an Employee Manager',
                'Delete a Department',
                'Delete a Role',
                'Delete an Employee',
                'Exit',
            ],
        })
        .then(async(answer) => {
            const { action } = answer;
  
            if (action === 'List all Departments') {
                await actions.viewAllDepartments();
                refresh();
            }
  
            if (action === 'View Department Budgets') {
                await actions.viewDepartmentBudget();
                refresh();
            }
  
            if (action === 'List all Roles') {
                await actions.viewAllRoles();
                refresh();
            }
  
            if (action === 'List all Employees') {
                await actions.viewAllEmployees();
                refresh();
            }
  
            if (action === 'Add a Department') {
                await actions.addDepartment();
                refresh();
            }
  
            if (action === 'Add a Role') {
                await actions.addRole();
                refresh();
            }
  
            if (action === 'Add an Employee') {
                await actions.addEmployee();
                refresh();
            }
  
            if (action === 'Update an Employee Role') {
                await actions.updateEmployeeRole();
                refresh();
            }
  
            if (action === 'Update an Employee Manager') {
                await actions.updateEmployeeManager();
                refresh();
            }
  
            if (action === 'Delete a Department') {
                await actions.deleteDepartment();
                refresh();
            }
  
            if (action === 'Delete a Role') {
                await actions.deleteRole();
                refresh();
            }
  
            if (action === 'Delete an Employee') {
                await actions.deleteEmployee();
                refresh();
            }
  
            if (action === 'Exit') {
                exit();
            }
        });
    }, 250); // Delay of aggressive inquirer prompt
};


function display(results) {
    console.table(results);
};

const exit = () => {
    console.log('Goodbye!');
    connection.end();
    process.exit();
};


module.exports = init;