-- SQL Assessment: Design, Populate & Query

CREATE DATABASE sql3;
use sql3;

-- TASK 1 AND TASK 2

 -- books table 
 create table books(
 book_id int primary key,
 title varchar(50),
 author varchar(50),
 genre varchar(50),
 price decimal(10,2)
 );
 
 insert into books values
(1, 'Wings of Fire', 'A.P.J.Abdul Kalam', 'Autobiography', 450.00),
(2, 'The White Tiger', 'Aravind Adiga', 'Fiction', 620.00),
(3, 'The Guide', 'R.K.Narayan', 'Fiction', 540.00),
(4, 'Why I am an Atheist', 'Bhagat Singh', 'Philosophy', 310.00),
(5, 'My Journey', 'A.P.J.Abdul Kalam', 'Autobiography', 890.00),
(6, "Wise and Otherwise", "Sudha Murty", "Inspirational", 230.00);



 
 -- customers table
 create table customers(
 customer_id int primary key,
 name varchar(50),
 email varchar(50),
 city varchar(30)
 );

insert into customers (customer_id, name, email, city) values
(1, 'Ahana', 'ahana.goutham@gmail.com', 'Hyderabad'),
(2, 'Aakash', 'athelete.aakash45@yahoo.com', 'Bangalore'),
(3, 'Nikitha', 'nikitha.1303@gmail.com', 'Kochi'),
(4, 'Sathya', 'sathyann345@hotmail.com', 'Chennai'),
(5, 'Regan', 'live.tillrega@gmail.com', 'Ahmedabad');

-- Orders table
create table orders (
order_id int primary key,
customer_id int ,
book_id int ,
order_date date,
quantity int,
foreign key (customer_id) references customers(customer_id),
foreign key (book_id) references books(book_id));

INSERT INTO orders VALUES
(1, 1, 1, '2024-02-10', 5), 
(2, 3, 3, '2024-03-05', 6),  
(3, 2, 2, '2024-04-18', 2),  
(4, 4, 4, '2024-05-01', 1), 
(5, 5, 1, '2024-06-10', 3),  
(6, 2, 5, '2024-06-15', 1),  
(7, 2, 1, '2022-07-01', 3);  

--  PART 3: Write and Execute Queries
--  Basic Queries
--  1. List all books with price above 500.
select * from books 
where price >500;

--  2. Show all customers from the city of ‘Hyderabad’.
select * from customers 
where city ="Hyderabad";

--  3. Find all orders placed after ‘2023-01-01’.
select * from orders 
where order_date >'2023-01-01';

 -- Joins & Aggregations
--  4. Show customer names along with book titles they purchased.
select c.name ,b.title 
from customers c 
join orders o using(customer_id)
join books b using(book_id);

-- 5. List each genre and total number of books sold in that genre.
select genre ,count(o.order_id) as tot_books_sold
from books b
join orders o using(book_id)
group by genre;

--  6. Find the total sales amount (price × quantity) for each book.
select b.title, sum(b.price*o.quantity) as tot_sales 
from books b 
join orders o using(book_id)
group by b.title;

--  7. Show the customer who placed the highest number of orders.
select c.name,count(o.order_id) as no_of_orders 
from customers c
join orders o using(customer_id)
group by name
order by no_of_orders desc
limit 1;

--  8. Display average price of books by genre.
select genre ,avg(price) as avg_by_genre
from books 
group by genre;

--  9. List all books that have not been ordered.

select b.title 
from books b
left join orders o using(book_id)
where o.book_id is null;

--  10. Show the name of the customer who has spent the most in total

select c.name,sum(b.price * o.quantity) as total_spending
from customers c
join orders o using (customer_id)
join books b using(book_id)
group by c.name
order by sum(b.price * o.quantity) desc 
limit 1;