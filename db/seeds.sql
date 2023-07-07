INSERT INTO `department` (`name`) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO `role` (`title`, `salary`, `department_id`) VALUES
    ('Sales Lead', 100000.00, 1),
    ('Salesperson', 80000.00, 1),
    ('Lead Engineer', 150000.00, 2),
    ('Software Engineer', 120000.00, 2),
    ('Accountant', 80000.00, 3),
    ('Legal Team Lead', 250000.00, 4),
    ('Lawyer', 190000.00, 4);

INSERT INTO `employee` (`first_name`, `last_name`, `role_id`, `manager_id`, `is_manager`) VALUES
    ('John', 'Doe', 1, NULL, 1),
    ('Mike', 'Chan', 2, 1, 0),
    ('Ashley', 'Rodriguez', 3, NULL, 1),
    ('Kevin', 'Tupik', 4, 3, 0),
    ('Malia', 'Brown', 5, NULL, 1),
    ('Sarah', 'Lourd', 6, 5, 0),
    ('Tom', 'Allen', 7, 5, 0);