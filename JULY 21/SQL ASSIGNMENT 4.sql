-- SQL Case Study Assessment: Movie Rentals System
CREATE DATABASE sql4;
use sql4;

--  SECTION 1: Database Design
--  movies table
create table movies (
  movie_id int primary key,
  title varchar(100),
  genre varchar(50),
  release_year int,
  rental_rate decimal(6,2)
);

--  customers table
create table customers (
  customer_id int primary key,
  name varchar(100),
  email varchar(100),
  city varchar(50)
);

--  rentals table
create table rentals (
  rental_id int primary key,
  customer_id int,
  movie_id int,
  rental_date date,
  return_date date,
  foreign key (customer_id) references customers(customer_id),
  foreign key (movie_id) references movies(movie_id)
);

--  SECTION 2: Data Insertion

INSERT INTO movies VALUES
(1, 'Premam', 'Romance', 2015, 150.00),
(2, 'Mersal', 'Action', 2017, 180.00),
(3, '96', 'Romantic Drama', 2018, 120.00),
(4, 'leo', 'Action', 2017, 100.00),
(5, 'Eleven', 'Thriller', 2021, 200.00);

INSERT INTO customers VALUES
(1, 'Amit Sharma', 'amit.sharma@gmail.com', 'Chennai'),
(2, 'Ahana', 'ahana.goutham@gmail.com', 'Bangalore'),
(3, 'Nikitha', 'nikitha.1303@gmail.com', 'Hyderabad'),
(4, 'Regan', 'live.tillrega@gmail.com', 'Madurai'),
(5, 'Harshi', 'harshika21@gmail.com', 'Coimbatore');

INSERT INTO rentals VALUES
(1, 1, 1, '2024-07-01', '2024-07-03'),  
(2, 2, 2, '2024-07-02', '2024-07-05'), 
(3, 3, 3, '2024-07-03', '2024-07-06'),  
(4, 4, 4, '2024-07-04', '2024-07-07'),  
(5, 1, 2, '2024-07-05', NULL),          
(6, 2, 5, '2024-07-06', '2024-07-09'),
(7, 3, 2, '2024-07-06', NULL),  
(8, 1, 5, '2024-07-07', '2024-07-10'); 

-- SECTION 3: Query Execution
--  Basic Queries
-- 1. Retrieve all movies rented by a customer named 'Amit Sharma'.
select m.title from movies m
join rentals r on m.movie_id=r.movie_id 
join customers c on c.customer_id = r.customer_id
where name ='Amit Sharma';

--  2. Show the details of customers from 'Bangalore'.
select * from customers 
where city='Bangalore';

--  3. List all movies released after the year 2020
select * from movies 
where release_year >2020;

-- Aggregate Queries
--  4. Count how many movies each customer has rented.
select c.name ,count(r.rental_id) as no_of_movies 
from customers c
join rentals r using(customer_id)
group by name;

--  5. Find the most rented movie title.
select m.title, COUNT(r.rental_id) AS rent_count
from movies m
join rentals r on m.movie_id = r.movie_id
group by  m.title
order by rent_count desc
limit 1;

--  6. Calculate total revenue earned from all rentals.
select sum(m.rental_rate) as total_revenue
from movies m
join rentals r on m.movie_id = r.movie_id;

-- Advanced Queries
--  7. List all customers who have never rented a movie.
select name 
from customers c 
left join rentals r on c.customer_id = r.customer_id 
where r.rental_id is null;

--  8. Show each genre and the total revenue from that genre.
select genre, sum(rental_rate) as total_revenue 
from movies m 
join rentals r on m.movie_id = r.movie_id 
where r.return_date is not null 
group by genre;

--  9. Find the customer who spent the most money on rentals.
select c.name 
from customers c 
join rentals r on c.customer_id = r.customer_id 
join movies m on r.movie_id = m.movie_id 
where r.return_date is not null 
group by c.name 
order by sum(rental_rate) desc 
limit 1;

--  10. Display movie titles that were rented and not yet returned  ( NULL )
select distinct title 
from movies m 
join rentals r on m.movie_id = r.movie_id 
where r.return_date is null;

