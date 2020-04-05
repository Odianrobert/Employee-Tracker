USE employeeTracker_DB;

-- CREATE TABLE department (
--     id INT(10) AUTO_INCREMENT,
--     name VARCHAR(30),
--     PRIMARY KEY(id)
-- );

-- CREATE TABLE role (
--     id INT(10) AUTO_INCREMENT,
--     title VARCHAR(30) NOT NULL,
--     salary DECIMAL(10,2) NOT NULL,
--     department_id INT(10) NOT NULL,
--        CONSTRAINT fk_department
-- 	   FOREIGN KEY(department_id)
-- 	   	REFERENCES department(id),
--     PRIMARY KEY(id)
-- );

-- CREATE TABLE employee (
--     id INT(10) AUTO_INCREMENT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT(10) NOT NULL,
--        CONSTRAINT fk_role
-- 	   FOREIGN KEY(role_id)
-- 	   	REFERENCES role(id),
--     manager_id INT(10),
--        CONSTRAINT fk_roles
-- 	   FOREIGN KEY(manager_id)
-- 	   	REFERENCES employee(id),
--     PRIMARY KEY(id)
-- );


-- INSERT INTO department (name) 
-- VALUES ("Sales"),
-- 	   ("Engineering"),
-- 	   ("Accounting"),
-- 	   ("Legal"),
-- 	   ("Office");
--        
-- Select * FROM department;	   


-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Sales Lead", 150000, 1),
-- 	   ("Salesperson", 90000, 1),
-- 	   ("Lead Engineer", 175000, 2),
-- 	   ("Software Engineer", 125000, 2),
-- 	   ("Account Manager", 150000, 3),
-- 	   ("Accountant", 100000, 3),
-- 	   ("Legal Team Lead", 200000, 4),
-- 	   ("Copy Machine Guy", 12000, 5);

-- Select * FROM role;



-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Jack", "Torrance", 1, 1),
-- 	   ("Leia", "Organa", 2, 2),
-- 	   ("Tony", "Montana", 3, null),
-- 	   ("Bonnie", "Parker", 4, 1),
-- 	   ("John", "Blutarsky", 5, null),
-- 	   ("Peggy", "Olson", 6, 3),
-- 	   ("Rocky", "Balboa", 7, null),
-- 	   ("Rachel", "Green", 8, 1);

-- Select * FROM employee;       

-- SELECT  employee.id,first_name,last_name, role.title, department.department_name, role.salary, manager_id
--     FROM employee
--     LEFT JOIN role
--     ON employee.role_id = role.id
--     left JOIN department
-- 	ON department.id = role.department_id

SELECT employee.first_name,last_name,  

-- ALTER TABLE department RENAME COLUMN name TO department_name;


    

    
    
-- Persons (PersonID, Name, SS)*E
-- Fears (FearID, Fear)*D
-- Person_Fear (ID, PersonID, FearID)*R

-- Select Persons.Name, Persons.SS, Fears.Fear
-- From Persons
-- LEFT JOIN Persons_Fear
-- ON Persons.PersonID = Person_Fear.PersonID
-- LEFT JOIN Fears
-- ON Person_Fear.FearID = Fears.FearID;
-- emp dep dep rol



                
                
                
                