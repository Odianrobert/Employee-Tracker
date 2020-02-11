USE employeeTracker_DB;

CREATE TABLE department (
    id INT(10) AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT(10) AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT(10) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT(10) AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10),
    PRIMARY KEY(id)
);


INSERT INTO department (name) 
VALUES ("Sales"),
	   ("Sales"),
	   ("Engineering"),
	   ("Engineering"),
	   ("Accounting"),
	   ("Accounting"),
	   ("Legal"),
	   ("Office");
       
Select * FROM department;	   


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 150000, 2000),
	   ("Salesperson", 90000, 2000),
	   ("Lead Engineer", 175000, 1000),
	   ("Software Engineer", 125000, 1000),
	   ("Account Manager", 150000, 3000),
	   ("Accountant", 100000, 3000),
	   ("Legal Team Lead", 200000, 4000),
	   ("Copy Machine Guy", 12000, 9000);

Select * FROM role;



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Torrance", 221, 1001),
	   ("Leia", "Organa", 222, 2001),
	   ("Tony", "Montana", 111, null),
	   ("Bonnie", "Parker", 112, 1001),
	   ("John", "Blutarsky", 333, null),
	   ("Peggy", "Olson", 334, 3001),
	   ("Rocky", "Balboa", 444, null),
	   ("Rachel", "Green", 999, 1001);

Select * FROM employee;       

                
                
         
                
                
                
                