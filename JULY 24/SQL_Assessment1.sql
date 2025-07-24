create database personal_fitness_tracker;
use personal_fitness_tracker;

-- create table
create table exercises(
exercise_id int primary key,
exercise_name varchar(40),
category varchar(40),
calories_burn_per_min int
);

create table workoutlogs(
log_id int primary key,
exercise_id int,
date date,
duration_min int,
mood varchar(50),
foreign key (exercise_id) references exercises(exercise_id)
);

-- insert data
insert into exercises (exercise_id, exercise_name, category, calories_burn_per_min) values
(1, 'Running', 'Cardio', 10),
(2, 'Swimming', 'Cardio', 12),
(3, 'Weight Lifting', 'Strength', 8),
(4, 'Yoga', 'Flexibility', 4),
(5, 'Cycling', 'Cardio', 9);

insert into workoutlogs (log_id, exercise_id, date, duration_min, mood) values
(1, 2, '2024-02-18', 35, 'Normal'),     
(2, 1, '2024-02-25', 40, 'Tired'),          
(3, 4, '2025-03-10', 30, 'Energized'),     
(4, 1, '2025-03-15', 50, 'Normal'),   
(5, 5, '2025-03-20', 45, 'Tired'),    
(6, 2, '2025-04-05', 60, 'Energized'),      
(7, 3, '2025-04-10', 55, 'Tired'),         
(8, 5, '2025-07-02', 30, 'Normal'),       
(9, 3, '2025-07-12', 40, 'Energized'),    
(10, 4, '2025-07-20', 35, 'Normal');     

select * from exercises;
select * from workoutlogs;

-- Queries to practice
-- Basic queries
--  1. Show all exercises under the “Cardio” category.
select * from exercises where category ="Cardio";

--  2. Show workouts done in the month of March 2025.
select * from workoutlogs where date like "2025-03";

--  Calculations
--  3. Calculate total calories burned per workout (duration × calories_burn_per_min).
select log_id ,e.exercise_name,w.duration_min*e.calories_burn_per_min as tot_cal_burned 
from exercises e 
join workoutlogs w on e.exercise_id=w.exercise_id;

--  4. Calculate average workout duration per category.
select e.category ,avg(w.duration_min) as avg_workout_duration 
from exercises e 
join workoutlogs w on e.exercise_id=w.exercise_id
group by e.category;

--  JOIN + Aggregation
--  5. List exercise name, date, duration, and calories burned using a join.
select e.exercise_name,w.date,w.duration_min,e.calories_burn_per_min
from exercises e 
join workoutlogs w on e.exercise_id=w.exercise_id;

--  6. Show total calories burned per day.
select w.date , (duration_min*calories_burn_per_min) as tot_cal_per_day
from exercises e 
left join workoutlogs w on e.exercise_id=w.exercise_id;

--  Subqueries
--  7. Find the exercise that burned the most calories in total.
select exercise_name, tot_cal_burned from 
(select e.exercise_name, sum(w.duration_min * e.calories_burn_per_min) as tot_cal_burned
from exercises e
left join workoutlogs w on e.exercise_id = w.exercise_id
group by e.exercise_name) as calorie_summary
order by tot_cal_burned desc
limit 1;

--  8. List exercises never logged in the workout log.
select * from exercises 
where exercise_id not in (
select distinct exercise_id 
from  workoutlogs
);

--  Conditional + Text Filters
--  9. Show workouts where mood was “Tired” and duration > 30 mins.
select w.log_id,e.exercise_name ,w.mood 
from exercises e 
join workoutlogs w using(exercise_id)
where mood ="Tired" and duration_min >30;

--  10. Update a workout log to correct a wrongly entered mood.
update workoutlogs 
set mood ='Tired' 
where log_id =4;

--  Update & Delete
--  11. Update the calories per minute for “Running”.

update exercises
set calories_burn_per_min = calories_burn_per_min +1
where exercise_name ="Running";

--  12. Delete all logs from February 2024
delete from workoutlogs 
where date like "2024-02%";
