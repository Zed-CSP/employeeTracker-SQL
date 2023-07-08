const db = require('./connections.js')
const init = require('../app.js')
const inquirer = require('inquirer');
const addRolePrompt = require('../assets/js/prompts.js');

// getters

const getConnection = require('./connections.js');
const { get } = require('express/lib/response.js');


const getManagers = async () => {
    try {
        const db = await getConnection();
        const [managers] = await db.query('SELECT * FROM employee WHERE is_manager = 1');
        return managers;
    } catch (error) {
        console.error(`Failed to fetch managers: ${error}`);
    }
};

const getRoles = async () => {
    try {
        const db = await getConnection();
        const [roles] = await db.query('SELECT * FROM role');
        return roles;
    } catch (error) {
        console.error(`Failed to fetch roles: ${error}`);
    }
};

const getDepartments = async () => {
    try {
        const db = await getConnection();
        const [departments] = await db.query('SELECT * FROM department');
        return departments;
    } catch (error) {
        console.error(`Failed to fetch departments: ${error}`);
    }
};


// User actions

const viewAllDepartments = async () => {
    console.log('Viewing all departments...\n');
    const db = await getConnection(); // ensure the connection promise is resolved
    try {
        const [res] = await db.query('SELECT * FROM department'); // db.query returns a promise, so we use await
        return res;
    } catch(err) {
        console.error(`Error querying the database: ${err}`);
    }
};

const viewAllRoles = async () => {
    console.log('Viewing all roles...\n');
    try {
        const db = await getConnection(); // ensure the connection promise is resolved
        const [res] = await db.query('SELECT * FROM role'); // db.query returns a promise, so we use await
        return res;
    } catch (err) {
        console.error(`Error while viewing all roles: ${err.message}`);
    }
};

const viewAllEmployees = async () => {
    console.log('Viewing all employees...\n');
    const db = await getConnection();
    try {
        const [res] = await db.query('SELECT * FROM employee');
        return res;
    } catch(err) {
        console.error(`Error querying the database: ${err}`);
    }
};

const addDepartment = async () => {
    console.log('Adding a department...\n');
    const answer = await inquirer.prompt({
        type: 'input',
        name: 'department_name',
        message: 'What is the name of the department you would like to add?',
    });
    
    const { department_name } = answer;
    const db = await getConnection();
    try {
        await db.query('INSERT INTO department SET ?', { name: department_name });
        console.log('Department added!');
        return true;
    } catch(err) {
        console.error(`Error querying the database: ${err}`);
    }
}

const addRole = async () => {
    const db = await getConnection();

    // Fetch departments from the database
    const [departments] = await db.query('SELECT * FROM department');
    const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id,
    }));

    // Prompt the user
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'role_title',
            message: 'What is the title of the role you would like to add?',
        },
        {
            type: 'input',
            name: 'role_salary',
            message: 'What is the salary of the role you would like to add?',
            validate: function(value) {
                // The value is only valid if it's not NaN
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        },
        {
            type: 'list',
            choices: departmentChoices,
            name: 'role_department_id',
            message: 'What is the department of the role you would like to add?',
        }
    ]);

    const { role_title, role_salary, role_department_id } = answers;

    // Insert the role into the database
    try {
        await db.query('INSERT INTO role SET ?', { title: role_title, salary: role_salary, department_id: role_department_id });
        console.log('Role added!');
    } catch (err) {
        console.error(`Error adding the role: ${err}`);
    }
};

const addEmployee = async () => {
    try {
        console.log('Adding an employee...\n');
        
        const getManagersSafe = async () => {
            try {
                console.log('Getting managers...');
                return await getManagers(), console.log('Managers: ', managers);
            } catch (err) {
                console.log('Error getting managers: ', err);
                return Promise.reject(err);
            }
        };

        const getRolesSafe = async () => {
            try {
                console.log('Getting roles...');
                return await getRoles(), console.log('Roles: ', roles);
            } catch (err) {
                console.log('Error getting roles: ', err);
                return Promise.reject(err);
            }
        };

        const getDepartmentsSafe = async () => {
            try {
                console.log('Getting departments...');
                return await getDepartments(), console.log('Departments: ', departments);
            } catch (err) {
                console.log('Error getting departments: ', err);
                return Promise.reject(err);
            }
        };

        // Fetch managers, roles, and departments from the database
        const [managersResponse, rolesResponse, departmentsResponse] = await Promise.all([getManagers(), getRoles(), getDepartments()]);
        //console.log(`Managers: ${JSON.stringify(managersResponse)}`);
        //console.log(`Roles: ${JSON.stringify(rolesResponse)}`);
        //console.log(`Departments: ${JSON.stringify(departmentsResponse)}`);


        // Convert the responses to arrays of names
        const managers = managersResponse.map(manager => manager.name);
        const roles = rolesResponse.map(role => role.title);
        const departments = departmentsResponse.map(department => department.name);
    
        // Then prompt the user
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'employee_first_name',
                message: 'What is the first name of the employee you would like to add?',
            },
            {
                type: 'input',
                name: 'employee_last_name',
                message: 'What is the last name of the employee you would like to add?',
            },
            {
                type: 'list',
                name: 'department_name',
                message: 'What department will this employee be working in?',
                choices: departments,
            },
            {
                type: 'list',
                name: 'employee_role',
                message: 'What is the role of the employee you would like to add?',
                choices: roles,
            },
            {
                type: 'confirm',
                name: 'is_manager',
                message: 'Is this employee a manager?',
                default: false,
            }
        ]);
    
        const { employee_first_name, employee_last_name, employee_role, is_manager } = answer;
    
        const role = rolesResponse.find(role => role.title === employee_role);
        const role_id = role ? role.id : null;
    
        const db = await getConnection();
    
        if(is_manager) {
            // If the employee is a manager, their manager id is null
            await db.query('INSERT INTO employee SET ?', { first_name: employee_first_name, last_name: employee_last_name, role_id: role_id, manager_id: null, is_manager: 1 });
            console.log('Employee added!');
            return true;
        } else {
            // If the employee is not a manager, ask for their manager
            const managerAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_manager_name',
                    message: 'Who is the manager of this employee?',
                    choices: getManagersSafe(),
                }
            ]);
    
            const { employee_manager_name } = managerAnswer;
    
            // Find the corresponding manager id
            const manager = managersResponse.find(manager => manager.name === employee_manager_name);
            const employee_manager_id = manager ? manager.id : null;
    
            await db.query('INSERT INTO employee SET ?', { first_name: employee_first_name, last_name: employee_last_name, role_id: role_id, manager_id: employee_manager_id });
            console.log('Employee added!');
            return true;
        }
    } catch (error) {
        console.error(`Failed to add employee: ${error}`);
        return false;
    }
};

const updateEmployeeRole = async () => {
    try {
        console.log('Updating an employee role...\n');
        const db = await getConnection();

        // Fetch roles and employees from the database
        const [rolesResponse] = await db.query('SELECT id, title FROM role');
        const [employeesResponse] = await db.query('SELECT id, first_name, last_name FROM employee');

        // Convert the responses to arrays of choices
        const roleChoices = rolesResponse.map(role => ({ name: role.title, value: role.id }));
        const employeeChoices = employeesResponse.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

        // Then prompt the user
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which employee\'s role would you like to update?',
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'employee_role_id',
                message: 'What is the new role of the employee?',
                choices: roleChoices,
            }
        ]);

        const { employee_id, employee_role_id } = answer;

        // Update the selected employee's role
        await db.query('UPDATE employee SET ? WHERE ?', [{ role_id: employee_role_id }, { id: employee_id }]);

        console.log('Employee updated!');
        return true;
    } catch (error) {
        console.error(`Failed to update employee: ${error}`);
        return false;
    }
};


const updateEmployeeManager = async () => {
    try {
        const db = await getConnection();

        const [employeesResponse, managersResponse] = await Promise.all([
            db.query(`
                SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS full_name, department.name AS department_name, role.title AS role_name
                FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id
            `),
            db.query('SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL')
        ]);

        const employees = employeesResponse[0];
        const managers = employees.filter(employee => managersResponse[0].some(manager => manager.manager_id === employee.id));

        const employeeChoices = employees.map(employee => `${employee.full_name} (${employee.department_name}: ${employee.role_name})`);
        const managerChoices = managers.map(manager => `${manager.full_name} (${manager.department_name}: ${manager.role_name})`);

        console.log("Employee Names:", employeeChoices);
        console.log("Manager Names:", managerChoices);

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_name',
                message: 'Which employee would you like to update?',
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'new_manager_name',
                message: 'Who is the new manager for this employee?',
                choices: managerChoices,
            },
        ]);

        const { employee_name, new_manager_name } = answers;

        const selectedEmployee = employees.find(employee => {
            const [name] = employee_name.split(" (");
            return employee.full_name === name;
        });

        const selectedManager = managers.find(manager => {
            const [name] = new_manager_name.split(" (");
            return manager.full_name === name;
        });

        console.log("Selected Employee:", selectedEmployee);
        console.log("Selected Manager:", selectedManager);

        await db.query('UPDATE employee SET ? WHERE ?', [{ manager_id: selectedManager.id }, { id: selectedEmployee.id }]);
        console.log('Employee updated!');
    } catch (error) {
        console.error(`Failed to update employee: ${error}`);
    }
};




const deleteDepartment = async () => {
    const db = await getConnection();

    // Query to get all departments
    const [departments] = await db.query('SELECT * FROM department');

    // Format departments as choices for inquirer
    const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id,
    }));

    const answer = await inquirer.prompt({
        type: 'list',
        name: 'department_id',
        message: 'Which department would you like to delete?',
        choices: departmentChoices,
    });

    const { department_id } = answer;

    try {
        await db.query('DELETE FROM department WHERE id = ?', [department_id]);
        console.log('Department deleted!');
    } catch (err) {
        console.error(`Error deleting the department: ${err}`);
    }
}


const deleteRole = async () => {
    try {
        // Get a connection to the database
        const db = await getConnection();

        // Query the database for all roles
        const roles = await db.query('SELECT id, title FROM role');

        // Convert the roles into a format that can be used with Inquirer
        const roleChoices = roles[0].map(role => ({name: role.title, value: role.id}));

        // Prompt the user to choose a role to delete
        const answer = await inquirer.prompt({
            type: 'list',
            name: 'role_id',
            message: 'Which role would you like to delete?',
            choices: roleChoices,
        });

        // Destructure the role_id from the answer
        const { role_id } = answer;

        // Execute the delete query
        await db.query('DELETE FROM role WHERE ?', { id: role_id });

        console.log('Role deleted!');
    } catch (error) {
        console.error(`Failed to delete role: ${error}`);
    }
};

const deleteEmployee = async () => {
    try {
        console.log('Deleting an employee...\n');
        const db = await getConnection();

        // Fetch employees from the database
        const [employeesResponse] = await db.query('SELECT id, first_name, last_name FROM employee');

        // Convert the responses to an array of choices
        const employeeChoices = employeesResponse.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

        // Then prompt the user
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which employee would you like to delete?',
                choices: employeeChoices,
            },
        ]);

        const { employee_id } = answer;

        // Delete the selected employee
        await db.query('DELETE FROM employee WHERE ?', { id: employee_id });

        console.log('Employee deleted!');
        return true;
    } catch (error) {
        console.error(`Failed to delete employee: ${error}`);
        return false;
    }
};

const viewDepartmentBudget = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the ID of the department you would like to view the budget for?',
        }
    )
        .then((answer) => {
            const { department_id } = answer

            db.query('SELECT SUM(salary) AS budget FROM role WHERE department_id = ?', [department_id], (err, res) => {
                if (err) throw err;
                console.table(res);

            })
        })
}

// const viewEmployeesByManager = () => {
//     inquirer.prompt(
//         {
//             type: 'input',
//             name: 'manager_id',
//             message: 'What is the ID of the manager you would like to view employees for?',
//         }
//     )
//     .then ((answer) => {
//         const { manager_id } = answer

//         db.query('SELECT * FROM employee WHERE manager_id = ?', [manager_id], (err, res) => {
//             if (err) throw err;
//             console.table(res);
//    
//         })
//     })
// }

// const viewEmployeesByDepartment = () => {
//     inquirer.prompt(
//         {
//             type: 'input',
//             name: 'department_id',
//             message: 'What is the ID of the department you would like to view employees for?',
//         }
//     )
//     .then ((answer) => {
//         const { department_id } = answer

//         db.query('SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.department_id = ?', [department_id], (err, res) => {
//             if (err) throw err;
//             console.table(res);
//    
//         })
//     })
// }

// const viewDepartmentUtilization = () => {
//     db.query('SELECT department.name AS department, SUM(role.salary) AS budget, COUNT(employee.id) AS headcount FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id GROUP BY department.name', (err, res) => {
//         if (err) throw err;
//         console.table(res);
//
//     })
// }

// const viewDepartmentUtilizationByDepartment = () => {
//     inquirer.prompt(
//         {
//             type: 'input',
//             name: 'department_id',
//             message: 'What is the ID of the department you would like to view utilization for?',
//         }
//     )
//     .then ((answer) => {
//         const { department_id } = answer

//         db.query('SELECT department.name AS department, SUM(role.salary) AS budget, COUNT(employee.id) AS headcount FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.id = ? GROUP BY department.name', [department_id], (err, res) => {
//             if (err) throw err;
//             console.table(res);
//             init();
//         })
//     })
// }

module.exports = {

    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewDepartmentBudget,
    // viewEmployeesByManager,
    // viewEmployeesByDepartment,
    // viewDepartmentUtilization,
    // viewDepartmentUtilizationByDepartment
}