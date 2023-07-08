[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Employee Database
  
## Description
This Is a Simple CLI propgram that allows the user to CRUD a SQL Employee Database.  The user will see a splash screen and be prompted through database view options and user actions. The actions should account for nuances of user inputs needed for the task at hand. Enjoy the 90's television easteregg in the seeded data!
  
## Table of Contents
  
  * [Installation](#installation)
  * [Usage](#usage)
  * [Demo](#demo)
  * [License](#license)
  * [Questions](#questions)
  
## Installation
1. [Clone](https://github.com/Zed-CSP/.git) the repository to your computer
2. Navigate to your cloned directory and Install node packages: [node.js v18.12.1](https://nodejs.org/en) 
3. Open the root directory in your terminal
4. Type `npm i` in the command line to install `node_modules` and required dependencies
5. Create a .env file in the root directory with these parameters: 
`
    DB_HOST = localhost
    DB_USER = root
    DB_PASSWORD = <your mysql password>
    PORT = 3006
    SECRET = <Your SECRET>
    DB_NAME='employee_db'`
6. Open MySQL Shell in your CLI using the command: 'mysql -u `root` -p' 
7. Enter your MYSQL2 `<password>`
8. Create and select the database by entering the command: `source db/schemas.sql;` and then seed your database using the command:`source db/seeds.sql`
9. Close MySQL Shell using the command: 'exit'
10. Run the application by typing `npm start` in the command line.
  
## Usage
This Is a Simple CLI propgram that allows the user to CRUD an SQL Employee Database.  The user will see a splash screen and be prompted through database view options and user actions. The actions should account for nuances of user data needed for the task at hand. Enjoy the 90's television easteregg in the seeded data! Inorder to get the 'aggressive' nature of the nested inquirer prompts to await the user play well I had to employ alot of 'promises' and upgrade to the MYSQL2/promises package

## Demo


https://github.com/Zed-CSP/employeeTracker-SQL/assets/123341169/5d47fa1e-b42a-4e1c-940b-f06d8b282214


View a video walkthrough of the app [here](https://github.com/Zed-CSP/employeeTracker-SQL/assets/123341169/5d47fa1e-b42a-4e1c-940b-f06d8b282214
).

## License
This project is licensed under the MIT License - see Badge link for details.
  
## Questions
If you have any questions or issues with the repo, please reach out to "[Zed-CSP]("https://github.com/Zed-CSP")" or create an issue in the "[repo](https://github.com/Zed-CSP/employeeTracker-SQL)".
