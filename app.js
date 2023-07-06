const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const connection = require('./config/connections.js');
const actions = require('./config/actions.js');
const titleArt = require('./assets/ascii.js');

 


const refresh = (res) => {
    console.clear();
    titleArt();
    console.log('connected as id ' + connection.threadId);
    if(res) display(res);
    else console.log('\n');
    init();
}

// function which prompts the user for what action they should take
const init = async() => {
    setTimeout(async() => {
        const { action } = await inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'Main Menu:',
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
        }]);
        
        switch (action) {
            case 'List all Departments':
                await actions.viewAllDepartments().then(refresh);
                break;
            case 'List all Roles':
                await actions.viewAllRoles().then(refresh);
                break;
            case 'List all Employees':
                await actions.viewAllEmployees().then(refresh);
                break;
            case 'View Department Budgets':
                await actions.viewDepartmentBudget().then(refresh);
                break;
            case 'Add a Department':
                await actions.addDepartment().then(refresh);
                break;
            case 'Add a Role':
                await actions.addRole().then(refresh);
                break;
            case 'Add an Employee':
                await actions.addEmployee().then(refresh);
                break;
            case 'Update an Employee Role':
                await actions.updateEmployeeRole().then(refresh);
                break;
            case 'Update an Employee Manager':
                await actions.updateEmployeeManager().then(refresh);
                break;
            case 'Delete a Department':
                await actions.deleteDepartment().then(refresh);
                break;
            case 'Delete a Role':
                await actions.deleteRole().then(refresh);
                break;
            case 'Delete an Employee':
                await actions.deleteEmployee().then(refresh);
                break;
            case 'Exit':
                process.exit(0);
                break;
        };
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

titleArt();
init();

module.exports = init;