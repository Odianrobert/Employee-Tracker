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
            "Remove an employee",
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
        case "Remove an employee":
            removeEmployee();//DONE
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

function addDepartment() {
    inquirer.prompt (
        {
            type: "input",
            name: "department_name",
            message: "What department would you like to add?"            
        }
    ).then(function (answer) {
        console.log(answer);
        var query = 'INSERT INTO department SET ?' 
        connection.query(query,
            {
            department_name: answer.department_name
      },
        function (err, res) {
              if (err) throw err;
              console.table(res);
              console.log("Inserted successfully!\n");
              addToTracker();
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
    console.log("Deleting an employee");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name
        FROM employee e`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
  
      console.table(res);
      console.log("ArrayToDelete!\n");
  
      promptDelete(deleteEmployeeChoices);
    });
  }

function promptDelete(deleteEmployeeChoices) {
    inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM employee WHERE ?`;
      // when finished prompting, insert a new item into the db with that info
      connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        addToTracker();
      });
    });
}
}

addToTracker()

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:${PORT}')
})

