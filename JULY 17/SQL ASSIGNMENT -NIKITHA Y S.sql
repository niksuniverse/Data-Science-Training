use practice;
-- task 1
create table products(
product_id int primary key,
product_name varchar(30),
category varchar(30),
price decimal(10,2),
stock_quantity int,
added_date date
);

select * from products;

-- task 2
insert into products
values
(1,'sony headphones','electronics',100.00, 2, '2025-01-01'),
(2,'logitech mouse','gaming',250.00, 100, '2025-02-01'),
(3,'dell laptop','computers',60000.00, 20, '2025-03-01'),
(4,'samsung tv','electronics',10000.00, 15, '2025-04-01'),
(5,'canon camera','photography',1600.50, 30, '2025-05-01');

-- task 3 
-- 1) List all products
Select * from products;

-- 2) display only name and price
select product_name,price from products;

-- 3) find products with stock quantity less than 10
select product_name,stock_quantity from products where stock_quantity <10;

-- 4) find products with price between 500 and 2000
 select * from products where price between 500 and 2000;

-- 5) show products added after 2023-01-01
 select * from products where added_date >'2023-01-01';
 
 -- 6) list all products whose names start with 's'
 select * from products where product_name like 'S%';
 
 -- 7) SHOW all products that belongs to electronics or furniture
select * from products where category IN ('electronics','furnitures');

-- task 4
-- 1) update price of one product

update products
set price =23000.00
where product_id=4;

select * from products ;

-- 2) increase stock of all products in a spcific category by 5

update products 
set stock_quantity = stock_quantity + 5 
where category = "electronics";
 select * from products;

-- 3) delete one product based on id
delete from products
where product_id=2;

-- 4) delete all products with stock_quantity =0;
 delete from products 
 where stock_quantity =0;