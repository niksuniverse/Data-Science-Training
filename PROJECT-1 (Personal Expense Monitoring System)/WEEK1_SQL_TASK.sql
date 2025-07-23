create database expense_tracker;
use expense_tracker;

-- users table
create table users (
    user_id int auto_increment primary key,
    name varchar(100),
    email varchar(100) unique
);

-- categories table
create table categories (
    category_id int auto_increment primary key,
    category_name varchar(100) unique
);

-- expenses table
create table expenses (
    expense_id int auto_increment primary key,
    user_id int,
    category_id int,
    amount decimal(10,2),
    expense_date date,
    description text,
    foreign key (user_id) references users(user_id),
    foreign key (category_id) references categories(category_id)
);

insert into users (name, email) values 
('Ajay', 'ajay678@gmail.com'),
('Divya', 'divya.malli@gmail.com'),
('Rahul', 'rahul_devi@gmail.com'),
('Shifana', 'shifana.banu56@example.com'),
('Nikitha', 'nikithays06@gmail.com');


insert into categories (category_name) values 
('Groceries'),
('Transport'),
('Bills'),
('Dining'),
('Shopping');

insert into expenses (user_id, category_id, amount, expense_date, description)values
(1, 1, 800.00, '2025-07-01', 'Monthly groceries'),
(1, 2, 120.00, '2025-07-03', 'Bus pass'),
(2, 3, 1500.00, '2025-07-05', 'Electricity bill'),
(3, 4, 600.00, '2025-07-08', 'Dinner at BBQ'),
(4, 5, 2000.00, '2025-07-10', 'New clothes'),
(5, 1, 300.00, '2025-07-11', 'Mini grocery purchase'),
(2, 2, 250.00, '2025-07-12', 'Uber ride'),
(3, 5, 1200.00, '2025-07-15', 'Online shopping'),
(4, 3, 1800.00, '2025-07-18', 'Water bill'),
(5, 4, 450.00, '2025-07-20', 'Lunch at Cafe');

select * from users;
select * from categories;
select * from expenses;

-- add data
insert into expenses (user_id, category_id, amount, expense_date, description)
values (1, 3, 500.00, '2025-07-25', 'Gas bill');

-- edit data
update expenses
set amount = 550.00, description = 'Updated Gas bill'
where expense_id = 11;

-- delete data
delete from  expenses
WHERE expense_id = 11;

-- stored procedure
DELIMITER $$

CREATE PROCEDURE getmonthlytotal(IN uid INT, IN monthYear VARCHAR(7))
BEGIN
    SELECT 
        c.category_name,
        SUM(e.amount) AS total_amount
    FROM 
        expenses e
    JOIN 
        categories c ON e.category_id = c.category_id
    WHERE 
        e.user_id = uid
        AND DATE_FORMAT(e.expense_date, '%Y-%m') = monthYear
    GROUP BY 
        c.category_name;
END$$

DELIMITER ;

call getmonthlytotal(1,'2025-07');

