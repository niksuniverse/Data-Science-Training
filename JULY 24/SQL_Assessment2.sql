create database travel_planner;
use travel_planner;

-- table destinations
create table destinations (
    destination_id int primary key,
    city varchar(50),
    country varchar(50),
    category varchar(20), -- (beach, historical, adventure, nature)
    avg_cost_per_day decimal(10,2)
);

-- table  trips
create table trips (
    trip_id int primary key,
    destination_id int,
    traveler_name varchar(50),
    start_date date,
    end_date date,
    budget decimal(10,2),
    foreign key (destination_id) references destinations(destination_id)
);

-- data inserted
insert into destinations values 
(1, 'Goa', 'India', 'Beach', 2500),
(2, 'Jaipur', 'India', 'Historical', 2000),
(3, 'Paris', 'France', 'Historical', 5000),
(4, 'Reykjavik', 'Iceland', 'Nature', 6000),
(5, 'Queenstown', 'New Zealand', 'Adventure', 5500),
(6, 'Nice', 'France', 'Beach', 4800);

insert into trips values
(1, 1, 'Ahana', '2023-06-01', '2023-06-05', 13000),
(2, 2, 'Billy', '2023-07-10', '2023-07-20', 18000),
(3, 3, 'Charlie', '2022-12-15', '2022-12-25', 60000),
(4, 4, 'David', '2023-09-01', '2023-09-10', 65000),
(5, 5, 'Ella', '2023-08-05', '2023-08-15', 62000),
(6, 1, 'Ferose', '2024-01-10', '2024-01-15', 12000),
(7, 6, 'Gourw', '2024-02-01', '2024-02-10', 50000),
(8, 2, 'Henry', '2023-11-01', '2023-11-03', 6000),
(9, 5, 'Isela', '2023-12-01', '2023-12-20', 100000),
(10, 3, 'Jim', '2024-04-01', '2024-04-06', 27000),
(11, 4, 'Alice', '2024-05-10', '2024-05-18', 48000),
(12, 1, 'Karan', '2024-11-10', '2024-11-15', 15000),
(13, 3, 'Karan', '2025-03-05', '2025-03-10', 35000);


select * from destinations;
select * from trips;

--  Query Tasks
--  Basic Queries
--  1. Show all trips to destinations in “India”.
select * from trips t
left join destinations d using (destination_id)
where country="India";

--  2. List all destinations with an average cost below 3000.
select city,country,avg_cost_per_day
from destinations
where avg_cost_per_day <3000;

--  Date & Duration
--  3. Calculate the number of days for each trip.
select trip_id, traveler_name, 
datediff(end_date, start_date) + 1 as trip_duration
from trips;

--  4. List all trips that last more than 7 days.
select * from trips
where datediff(end_date, start_date) + 1 >7;

--  JOIN + Aggregation
--  5. List traveler name, destination city, and total trip cost (duration × avg_cost_per_day).
select t.traveler_name,d.city,
(datediff(t.end_date, t.start_date) + 1) * d.avg_cost_per_day as total_cost
from trips t
join destinations d on t.destination_id = d.destination_id;

--  6. Find the total number of trips per country.
select d.country,count(t.trip_id) as no_of_trips 
from destinations d 
join trips t using(destination_id)
group by d.country;

--  Grouping & Filtering
--  7. Show average budget per country.
select d.country , avg(t.budget) as avg_budget 
from destinations d 
join trips t using(destination_id)
group  by d.country;

--  8. Find which traveler has taken the most trips.
select traveler_name ,count(t.trip_id) as trips_count
from trips t 
join destinations d using(destination_id)
group by traveler_name
order by trips_count desc 
limit 1;

--  Subqueries
--  9. Show destinations that haven’t been visited yet.
select * from destinations
where destination_id not in (
  select destination_id from trips);

--  10. Find the trip with the highest cost per day.
select trip_id,traveler_name,
budget / (datediff(end_date, start_date) + 1) as cost_per_day
from trips
order by cost_per_day desc
limit 1;

--  Update & Delete
--  11. Update the budget for a trip that was extended by 3 days.
update trips 
set budget = budget +(3*2000)
where trip_id =2;

--  12. Delete all trips that were completed before Jan 1, 2023
delete from trips
where end_date < '2023-01-01';

