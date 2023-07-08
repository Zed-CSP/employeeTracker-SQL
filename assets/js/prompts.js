const mainPrompt = {
    type: 'list',
    name: 'action',
    message: 'Main Menu:',
    choices: [
        'View all Departments',
        'View all Roles',
        'View all Employees',
        'View Department Budgets',
        //'View Employees by Manager',
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
