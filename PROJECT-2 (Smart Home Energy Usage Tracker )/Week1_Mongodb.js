// Smart Home Energy Tracker
use SmartHomeDB;

db.rooms.insertMany([
  { room_id: 1, name: "Living Room" },
  { room_id: 2, name: "Bedroom" },
  { room_id: 3, name: "Kitchen" }
]);

db.devices.insertMany([
  { device_id: 101, name: "Smart TV", room_id: 1, status: "active" },
  { device_id: 102, name: "Heater", room_id: 2, status: "inactive" },
  { device_id: 103, name: "Microwave", room_id: 3, status: "active" }
]);

db.sensor_logs.insertMany([
  {
    log_id: 1,
    device_id: 101,
    timestamp: ISODate("2025-07-22T08:00:00Z"),
    energy_kwh: 1.2,
    voltage: 220,
    current: 5.4,
    room: "Living Room"
  },
  {
    log_id: 2,
    device_id: 102,
    timestamp: ISODate("2025-07-22T09:00:00Z"),
    energy_kwh: 2.5,
    voltage: 220,
    current: 11.3,
    room: "Bedroom"
  },
  {
    log_id: 3,
    device_id: 103,
    timestamp: ISODate("2025-07-22T10:00:00Z"),
    energy_kwh: 0.8,
    voltage: 220,
    current: 3.6,
    room: "Kitchen"
  }
]);


//List all devices with room name
db.devices.aggregate([
  {
    $lookup: {
      from: "rooms",
      localField: "room_id",
      foreignField: "room_id",
      as: "room_info"
    }
  },
  {
    $unwind: "$room_info"
  },
  {
    $project: {
      _id: 0,
      device_id: 1,
      name: 1,
      status: 1,
      room_name: "$room_info.name"
    }
  }
]);

//Total energy consumed per device
db.sensor_logs.aggregate([
  {
    $group: {
      _id: "$device_id",
      total_energy: { $sum: "$energy_kwh" }
    }
  }
]);

// Energy usage per day per room
db.sensor_logs.aggregate([
  {
    $project: {
      room: 1,
      energy_kwh: 1,
      day: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }
    }
  },
  {
    $group: {
      _id: { room: "$room", day: "$day" },
      total_energy: { $sum: "$energy_kwh" }
    }
  },
  {
    $sort: { "_id.day": 1 }
  }
]);

