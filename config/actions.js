const db = require('./connections.js')
const init = require('../app.js')

var results = [];

const viewAllDepartments = () => {
    console.log('Viewing all departments...\n');
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
        console.log('\n')
        return true;
    })
}

const viewAllRoles = () => {
    console.log('Viewing all roles...\n');
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
        console.log('\n')
    })
}

const viewAllEmployees = () => {
    console.log('Viewing all employees...\n');
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        var results = res;
        console.table(res);
    })
}

const addDepartment = () => {
    console.log('Adding a department...\n');
    inquirer.prompt(
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department you would like to add?',
        }
    )
        .then((answer) => {
            const { department_name } = answer

            db.query('INSERT INTO department SET ?', { name: department_name }, (err, res) => {
                if (err) throw err;
                console.log('Department added!');

            })
        })
}

const addRole = () => {
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
            type: 'input',
            name: 'role_department_id',
            message: 'What is the department ID of the role you would like to add?',
        }
    ])
        .then((answer) => {
            const { role_title, role_salary, role_department_id } = answer

            db.query('INSERT INTO role SET ?', { title: role_title, salary: role_salary, department_id: role_department_id }, (err, res) => {
                if (err) throw err;
                console.log('Role added!');

            })
        })
}

const addEmployee = () => {
    inquirer.prompt([
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
            type: 'input',
            name: 'employee_role_id',
            message: 'What is the role ID of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'employee_manager_id',
            message: 'What is the manager ID of the employee you would like to add?',
        }
    ])
        .then((answer) => {
            const { employee_first_name, employee_last_name, employee_role_id, employee_manager_id } = answer

            db.query('INSERT INTO employee SET ?', { first_name: employee_first_name, last_name: employee_last_name, role_id: employee_role_id, manager_id: employee_manager_id }, (err, res) => {
                if (err) throw err;
                console.log('Employee added!');

            })
        })
}

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the ID of the employee you would like to update?',
        },
        {
            type: 'input',
            name: 'employee_role_id',
            message: 'What is the new role ID of the employee you would like to update?',
        }
    ])
        .then((answer) => {
            const { employee_id, employee_role_id } = answer

            db.query('UPDATE employee SET ? WHERE ?', [{ role_id: employee_role_id }, { id: employee_id }], (err, res) => {
                if (err) throw err;
                console.log('Employee updated!');

            })
        })
}

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
    results,
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