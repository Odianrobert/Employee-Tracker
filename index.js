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
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employees by manager",
            "Add an employee",
            "Remove an employee",
            "Update employee role",
            "Update employee manager",
            "View all roles",
            "Add a role",
            "Remove a role"
        ]
    },
]).then(userChoice => {
    switch(userChoice.addToTracker) {
        case "View all employees":
            viewAllEmployees();
            break;
        case "View all employees by department":
            viewByDepartment();
            break;
        case "View all employees by manager":
            viewByManager();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Add a Department":
            addDepartment();
            break;
        case "Remove an employee":
            removeEmployee();
            break;
        case "Update employee role":
            updateEmployee();
            break;
        case "Update employee manager":
            updateManager();
            break;
        case "View all roles":
            viewAllRoles();
            break;
        case "Add a role":
            addRole();
            break;
        case "Remove a role":
            removeRole();
            break;
    }
});

function viewAllEmployees(){
    // Display all employees;
    addToTracker()
};

function viewByDepartment() {
    // Display employees by department;
    addToTracker()
};

function viewByManager() {
    // Display employees by manager;
    addToTracker()
};

function addEmployee() {
    inquirer.prompt ([
        {
            type: "input",
            name: "addEmployee",
            message: "What is the employee's first name?",
            answer: ""
        },
        {
            type: "input",
            name: "addEmployee",
            message: "What is the employee's last name?",
            answer: ""  
        },
        {
            type: "list",
            name: "addEmployee",
            message: "What is the employee's role?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Copy Machine Guy"
            ]
        },
        {
            type: "input",
            name: "addEmployee",
            message: "Who is the employee's manager?",
            answer: ""  
        }
])
};

function addDepartment() {  //adds a new column to the table
    inquirer.prompt (
        {
            type: "input",
            name: "addDepartment",
            message: "What would you like to call the new Department?",
            answer: ""
        },
    )
};

function removeEmployee() {
    inquirer.prompt ([
        {
            type: "list",
            name: "removeEmployee",
            message: "Which employee would you like to remove?",
            choices: [
                "Employee A",
                "Employee B",
                "Employee C",
                "Employee D",
                "Employee E",
                "Employee F"
            ]
        },
    ])
};

function updateEmployee() {
    inquirer.prompt ([
        {
            type: "list",
            name: "updateEmployee",
            message: "Which employee would you like to update?",
            choices: [
                "Employee A",
                "Employee B",
                "Employee C",
                "Employee D",
                "Employee E",
                "Employee F"
            ]
        },
    ])
};

function updateManager() {
    inquirer.prompt ([
        {
            type: "list",
            name: "updateManager",
            message: "Which manager would you like to update?",
            choices: [
                "Employee A",
                "Employee B",
                "Employee C",
                "Employee D",
                "Employee E",
                "Employee F"
            ]
        },
    ])
};

function viewAllRoles(){
    // Display all roles;
    addToTracker()
};

function addRole() {  //adds a new column to the table
    inquirer.prompt (
        {
            type: "input",
            name: "addRole",
            message: "What would you like to call the new role?",
            answer: ""
        },
    )
};

function removeRole() {
    inquirer.prompt ([
        {
            type: "list",
            name: "removeRole",
            message: "Which role would you like to remove?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Janitor",
                "Copy Machine Guy"
            ]
        },
    ])
};

}
addToTracker()

















app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:${PORT}')
})