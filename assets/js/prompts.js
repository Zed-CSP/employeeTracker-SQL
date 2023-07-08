const mainPrompt = {
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
};

module.exports = mainPrompt;
