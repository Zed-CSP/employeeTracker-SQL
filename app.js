const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const connection = require('./config/connections.js');
const actions = require('./config/actions.js');
const titleArt = require('./assets/js/ascii.js');
const prompts = require('./assets/js/prompts.js');
const mainPrompt = require('./assets/js/prompts.js');

const refresh = async (res) => {
    console.clear();
    titleArt();
    if (res && res.formattedData) {
      display(res.formattedData);
      const departmentBudget = parseFloat(res.departmentBudget);
      console.log(`\nDepartment Budget Total: $${departmentBudget.toFixed(2)}\n`);
    } else if (res) {
        display(res);
    } else {
      console.log('\n');
    }
    main();
};

// function which prompts the user for what action they should take
const main = async() => {
    setTimeout(async() => {
        const { action } = await inquirer.prompt([mainPrompt]);
        
        switch (action) {
            case 'View all Departments':
                await actions.viewAllDepartments().then(refresh);
                break;
            case 'View all Roles':
                await actions.viewAllRoles().then(refresh);
                break;
            case 'View all Employees':
                await actions.viewAllEmployees().then(refresh);
                break;
            case 'View Department Budgets':
                await actions.viewDepartmentBudget().then(refresh);
                break;
            case 'View Employees by Manager':
                await actions.viewEmployeesByManager()//.then(refresh)
                ;
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

function clear() {
    console.log('\n');
};

function display(results) {
    console.table(results);
};

const exit = () => {
    console.log('Goodbye!');
    connection.end();
    process.exit();
};

clear();
titleArt();
main();

module.exports = main;