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
            "View all departments",
            "View all roles",
            "Add an employee",
            "Add a department",
            "Add a role",
            "Update employee role",
            "Update employee manager",
            "Remove an employee",
            "Remove a role",
            "View all employees by manager"
        ]
    }
]).then(userChoice => {
    switch(userChoice.addToTracker) {
        case "View all employees":
            viewAllEmployees(); //DONE
            break;
        case "View all departments":
            viewAllDepartments(); //DONE
            break;
        case "View all roles":
            viewAllRoles();//DONE
            break;
        case "Add an employee":
            addEmployee();//DONE
            break;
        case "Add a department":
            addDepartment(); //DONE
            break;
        case "Add a role":
            addRole();//DONE
            break;
        case "Update employee role":
            updateEmployee();
            break;
        case "Update employee manager":
            updateManager();
            break;
        case "Remove an employee":
            removeEmployee();
            break;
        case "Remove a role":
            removeRole();
            break;
        case "View all employees by manager":
            viewByManager(); 
            break;
    }
});

function viewAllEmployees(){
    const sql = `SELECT  employee.id,first_name,last_name, role.title, department.department_name, role.salary, manager_id
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    left JOIN department
	ON department.id = role.department_id`
    connection.query(sql, function(err, result){
        if (err) { console.log(err) 
        } else {
            console.table(result)
    }
    addToTracker();
});
}; 

function viewAllDepartments() {
    const sql = `SELECT  * FROM department`
    connection.query(sql, function(err, result){
        if (err) { console.log(err) 
        } else {
            console.table(result)
    }
    addToTracker()
});
}

function viewAllRoles(){
    connection.query('SELECT role.title,department_id FROM role', function(err, result){
      if(err) throw err;
      console.table(result);
      addToTracker();
    })
  };
function addEmployee(result) {
    
        inquirer.prompt ([
            {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
            
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
            
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
        // {
            //     type: "list",
        //     name: "addEmployeeRole",
        //     message: "What is the employee's role?",
        //     choices: [
            //         "Sales Lead",
        //         "Salesperson",
        //         "Lead Engineer",
        //         "Software Engineer",
        //         "Account Manager",
        //         "Accountant",
        //         "Legal Team Lead",
        //         "Copy Machine Guy"
        //     ]
        // },
        // {
        //     type: "list",
        //     name: "addEmployeeManager",
        //     message: "Who is the employee's manager?",
        //     choices: [
        //         "1",
        //         "2",
        //         "3",
        //         "null"
        //     ],
        
        // {
        //     type: "list",
        //     name: "addRoleId",
        //     choices: role.id.map(role => {
        //         role.title
        //         console.log(role.title);
        //     })
        // },
    ]).then(function (answer) {
        console.log(answer);
  
        var query = `INSERT INTO employee SET ?`
        connection.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("Inserted successfully!\n");
  
            addToTracker();
          });
      });
  }
//     ]).then(({ addFirstName, addLastName, roleID,addEmployeeManager }) => {
//     roleID = process.argv[2]; 
//     // let empId;
//     // result.map(finds => {
//         // if(finds.title === addRoleId) {
//         //   empId = finds.id;
//     connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)',

//         { 
//             first_name: addFirstName, 
//             last_name: addLastName,
//             role_id: roleID,
//             manager_id: addEmployeeManager
//         }),
//         console.log(addEmployeeManager);
//         console.log(`\n Success! You added a new employee: with first name of ${addFirstName}, \n With a last name of ${addLastName}`)
//         addToTracker()
//     }
//     //  }
//     )
// //  })    
// };

function addDepartment() {
    inquirer.prompt (
        {
            type: "input",
            name: "addDepartment",
            message: "What department would you like to add?",
            answer: ""
        }
    ).then(({ addDepartment}) => {
        connection.query('INSERT INTO department SET ?', {
            name: addDepartment
      },

      console.log(`\n Success! You added a new department: ${addDepartment}`)
      );

      connection.query('SELECT * FROM department', function(err, result) {
        if(err) throw err;
        console.table(result);
        addToTracker()
    });
})      
};

function addRole() {  //adds a new column to the table
    connection.query('SELECT * FROM department', function(err, result){
        if(err) throw err;
    inquirer.prompt ([
        {
            type: "input",
            name: "addTitle",
            message: "What would you like to call the new title?",
            answer: ""
        },
        {
            type: "input",
            name: "addSalary",
            message: "What is the salary(in numerical value) for the new title?",
            answer: "",
        validate: function (addSalary) {
            if (isNaN(addSalary) === false){
              return true;
            }
            return 'Please enter a numerical salary';
          }
        },
        {
            type: "list",
            name: "addId",
            choices: result.map(department => department.department_name)
        },
    ]).then(({ addTitle, addSalary, addId }) => {
        let deptId;
        result.map(finds => {
            if(finds.department_name === addId) {
              deptId = finds.id;
        connection.query('INSERT INTO role SET ?', 
            { 
            title: addTitle, 
            salary: addSalary,
            department_id: deptId
            },
            console.log(`\n Success! You added a new job title: ${addTitle}, \n With a salary of ${addSalary}`)
            );
            addToTracker()
          }
        })
    });
})
}

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

function updateEmployee() {
    inquirer.prompt ([
        {
            type: "list",
            name: "updateEmployee",
            message: "Which employee would you like to update?",
            // choices: filter.map(role => role.title)
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

function viewByManager() {
    // Display employees by manager;
    addToTracker()
};

}

addToTracker()

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:${PORT}')
})

