const db = require('./connections.js')
const init = require('../app.js')
const inquirer = require('inquirer');

// getters

const getConnection = require('./connections.js');

const getManagers = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT id, CONCAT(first_name, ' ', last_name) AS name 
            FROM employee 
            WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL)
        `;

        db.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};


const getRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM role', (err, res) => {
            if (err) reject(err);
            resolve(res.map(role => role.title));
        });
    });
};

const getDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, res) => {
            if (err) reject(err);
            resolve(res.map(department => department.name));
        });
    });
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

const addRole = () => {
    // First fetch departments from the database
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, res) => {
            if (err) reject(err);

            // Convert the response to an array of department names
            const departments = res.map(department => department.name);

            // Then prompt the user
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role_title',
                    message: 'What is the title of the role you would like to add?',
                },
                {
                    type: 'input',
                    name: 'role_salary',
                    message: 'What is the salary of the role you would like to add?',
                },
                {
                    type: 'list',
                    choices: departments,  // uses the array of department names here
                    name: 'role_department_name',
                    message: 'What is the department of the role you would like to add?',
                }
            ])
                .then((answer) => {
                    const { role_title, role_salary, role_department_name } = answer;

                    // Find the corresponding department id
                    const department = res.find(department => department.name === role_department_name);
                    const role_department_id = department ? department.id : null;

                    // Insert the role into the database
                    db.query('INSERT INTO role SET ?', { title: role_title, salary: role_salary, department_id: role_department_id }, (err, res) => {
                        if (err) reject(err);
                        console.log('Role added!');
                        resolve(true);
                    });
                });
        });
    });
}


const addEmployee = () => {
    // Fetch managers, roles, and departments from the database
    return Promise.all([getManagers(), getRoles(), getDepartments()])
        .then(([managersResponse, rolesResponse, departmentsResponse]) => {
            // Convert the responses to arrays of names
            const managers = managersResponse.map(manager => manager.name);
            const roles = rolesResponse;
            const departments = departmentsResponse;

            // Then prompt the user
            return inquirer.prompt([
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
            ])
            .then((answer) => {
                const { employee_first_name, employee_last_name, employee_role, is_manager } = answer;

                const role = rolesResponse.find(role => role.title === employee_role);
                const role_id = role ? role.id : null;

                if(is_manager) {
                    // If the employee is a manager, their manager id is null
                    return db.query('INSERT INTO employee SET ?', { first_name: employee_first_name, last_name: employee_last_name, role_id: role_id, manager_id: null })
                        .then(() => {
                            console.log('Employee added!');
                            return true;
                        });
                } else {
                    // If the employee is not a manager, ask for their manager
                    return inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employee_manager_name',
                            message: 'Who is the manager of this employee?',
                            choices: managers,
                        }
                    ])
                    .then((answer) => {
                        const { employee_manager_name } = answer;

                        // Find the corresponding manager id
                        const manager = managersResponse.find(manager => manager.name === employee_manager_name);
                        const employee_manager_id = manager ? manager.id : null;

                        return db.query('INSERT INTO employee SET ?', { first_name: employee_first_name, last_name: employee_last_name, role_id: role_id, manager_id: employee_manager_id })
                            .then(() => {
                                console.log('Employee added!');
                                return true;
                            });
                    });
                }
            })
        });
};



// const updateEmployeeRole = () => {
//     // First fetch roles from the database
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM role', (err, res) => {
//             if (err) reject(err);
//             // Convert the response to an array of role titles
//             const roles = res.map(role => role.title);
//             // Then prompt the user
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'employee_id',
//             message: 'What is the ID of the employee you would like to update?',
//         },
//         {
//             type: 'list',
//             name: 'employee_role_id',
//             message: 'What is the new role of the employee you would like to update?',
//             choices: roles,
//         }
//     ])
//         .then((answer) => {
//             const { employee_id, employee_role_id } = answer

//             db.query('UPDATE employee SET ? WHERE ?', [{ role_id: employee_role_id }, { id: employee_id }], (err, res) => {
//                 if (err) throw err;
//                 console.log('Employee updated!');

//             })
//         })
// }

const updateEmployeeManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the ID of the employee you would like to update?',
        },
        {
            type: 'input',
            name: 'employee_manager_id',
            message: 'What is the new manager ID of the employee you would like to update?',
        }
    ])
        .then((answer) => {
            const { employee_id, employee_manager_id } = answer

            db.query('UPDATE employee SET ? WHERE ?', [{ manager_id: employee_manager_id }, { id: employee_id }], (err, res) => {
                if (err) throw err;
                console.log('Employee updated!');

            })
        })
}

const deleteDepartment = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the ID of the department you would like to delete?',
        }
    )
        .then((answer) => {
            const { department_id } = answer

            db.query('DELETE FROM department WHERE ?', { id: department_id }, (err, res) => {
                if (err) throw err;
                console.log('Department deleted!');

            })
        })
}

const deleteRole = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the ID of the role you would like to delete?',
        }
    )
        .then((answer) => {
            const { role_id } = answer

            db.query('DELETE FROM role WHERE ?', { id: role_id }, (err, res) => {
                if (err) throw err;
                console.log('Role deleted!');

            })
        })
}

const deleteEmployee = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the ID of the employee you would like to delete?',
        }
    )
        .then((answer) => {
            const { employee_id } = answer

            db.query('DELETE FROM employee WHERE ?', { id: employee_id }, (err, res) => {
                if (err) throw err;
                console.log('Employee deleted!');

            })
        })
}

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
    //updateEmployeeRole,
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