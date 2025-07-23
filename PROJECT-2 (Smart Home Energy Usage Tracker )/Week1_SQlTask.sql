create database smarthome;
use smarthome;

create table rooms (
  room_id int primary key auto_increment,
  name varchar(50)
);

-- devices table
create table devices (
  device_id int primary key auto_increment,
  name varchar(100),
  room_id int,
  status varchar(20),
  foreign key (room_id) references rooms(room_id)
);

-- energy logs table
create table energy_logs (
  log_id int primary key auto_increment,
  device_id int,
  timestamp datetime,
  energy_kwh decimal(6,3),
  foreign key (device_id) references devices(device_id)
);

-- insert data 
insert into rooms(name) values 
('living room'), 
('bedroom'), 
('kitchen');

-- insert devices
insert into devices (name, room_id, status) values
('smart tv', 1, 'active'),
('heater', 2, 'inactive'),
('microwave', 3, 'active');

-- insert  energy logs
insert into energy_logs (device_id, timestamp, energy_kwh) values
(1, '2025-07-22 08:00:00', 1.200),
(2, '2025-07-22 09:00:00', 2.500),
(3, '2025-07-22 10:00:00', 0.800);

select * from rooms;
select * from devices;
select * from energy_logs;

-- update device status
update devices set status = 'active' where device_id = 2;

-- delete a log
delete from energy_logs where log_id = 3;

-- select energy logs for a specific room
select r.name as room, d.name as device, e.timestamp, e.energy_kwh
from energy_logs e
join devices d on e.device_id = d.device_id
join rooms r on d.room_id = r.room_id;

delimiter $$

create procedure getroomenergyperday()
begin
  select r.name as room_name, date(e.timestamp) as day,
         sum(e.energy_kwh) as total_energy_kwh
  from energy_logs e
  join devices d on e.device_id = d.device_id
  join rooms r on d.room_id = r.room_id
  group by r.name, date(e.timestamp);
end$$

delimiter ;

-- to execute:
call getroomenergyperday();

-- List all devices with their room names and status
select d.device_id, d.name as device_name, r.name as room_name, d.status
from devices d
join rooms r on d.room_id = r.room_id;

-- Count of devices per room
select r.name as room_name, count(d.device_id) as num_devices
from rooms r
left join devices d on r.room_id = d.room_id
group by r.name;