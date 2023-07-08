INSERT INTO `department` (`name`) VALUES
    ('Comedy'),
    ('Writing'),
    ('Production'),
    ('Acting');

INSERT INTO `role` (`title`, `salary`, `department_id`) VALUES
    ('Comedian', 250000.00, 1),
    ('Writer', 190000.00, 2),
    ('Producer', 200000.00, 3),
    ('Actor', 180000.00, 4),
    ('Director', 220000.00, 3),
    ('Editor', 150000.00, 3),
    ('Cinematographer', 180000.00, 3);

-- Insert employees without managers
INSERT INTO `employee` (`first_name`, `last_name`, `role_id`, `manager_id`, `is_manager`) VALUES
    ('Jerry', 'Seinfeld', 1, NULL, 1),
    ('George', 'Costanza', 2, NULL, 0),
    ('Elaine', 'Benes', 2, NULL, 0),
    ('Cosmo', 'Kramer', 1, NULL, 0),
    ('Larry', 'David', 2, NULL, 1),
    ('Julia', 'Louis-Dreyfus', 3, NULL, 1),
    ('Jason', 'Alexander', 4, NULL, 1),
    ('Michael', 'Richards', 4, NULL, 1),
    ('Andy', 'Ackerman', 5, NULL, 1),
    ('Larry', 'Charles', 5, NULL, 1),
    ('John', 'Hayman', 6, NULL, 1),
    ('Brian', 'Henson', 6, NULL, 1),
    ('Hector', 'Lombard', 7, NULL, 1);

-- Update manager_id for managers
UPDATE `employee` SET `manager_id` = 5 WHERE `id` IN (2, 3, 4); -- George Costanza, Elaine Benes, and Cosmo Kramer are managed by Larry David
UPDATE `employee` SET `manager_id` = 1 WHERE `id` IN (6, 7, 8); -- Julia Louis-Dreyfus, Jason Alexander, and Michael Richards are managed by Jerry Seinfeld
UPDATE `employee` SET `manager_id` = 9 WHERE `id` IN (10, 11, 12, 13); -- Andy Ackerman manages Larry Charles, John Hayman, and Brian Henson