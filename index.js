const inquirer = require('inquirer');
const mysql = require('mysql');
//const consoleTable = require('console-table');
const express = require('express');

const PORT = process.env.PORT || 3000
const app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeeTracker_DB'
})

connection.connect(err => {
    if (err) {
        throw err
    }
    console.log(`Connected as id: ${connection.threadId}`)
})

function addToTracker() {
inquirer.prompt ([
    {
        type: "list",
        name: "addToTracker",
        message: "What would you like to add to the Emplyee-Tracker?",
        choices: [
            "Add a department",
            "Add a role",
            "Add an employee",
            "View a department",
            "View a role",
            "View an employee",
            "Delete a department",
            "Delete a role",
            "Delete an employee"
        ]
    },
]).then(userChoice => {
    switch(userChoice.addToTracker) {
        case "Add a department":
            addDepartment();
            break;
        case "Bid on an item":
            addRole();
            break;
        case "Exit":
            addEmployee ();
    }
});
function addDepartment(){
    inquirer.prompt ([
        {
            type: "list",
            name: "addDepartment",
            message: "What department would you like to add?",
            choices: [
                "engineer",
                "developer",
                "tester"
            ]
        },
    ])
}

}

addToTracker()




















app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:${PORT}')
})