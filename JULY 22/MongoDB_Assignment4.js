// MongoDB Assignment: Fitness Center Database

// Step 1: Create Collections and Insert Data

// 1. Members Collection
db.members.insertMany([ 
  { member_id: 1, name: "Anjali Rao", age: 28, gender: "Female", city: "Mumbai", membership_type: "Gold" }, 
  { member_id: 2, name: "Rohan Mehta", age: 35, gender: "Male", city: "Delhi", membership_type: "Silver" }, 
  { member_id: 3, name: "Fatima Shaikh", age: 22, gender: "Female", city: "Hyderabad", membership_type: "Platinum" }, 
  { member_id: 4, name: "Vikram Das", age: 41, gender: "Male", city: "Bangalore", membership_type: "Gold" }, 
  { member_id: 5, name: "Neha Kapoor", age: 31, gender: "Female", city: "Pune", membership_type: "Silver" } 
]);

// 2. Trainers Collection
db.trainers.insertMany([ 
  { trainer_id: 101, name: "Ajay Kumar", specialty: "Weight Training", experience: 7 }, 
  { trainer_id: 102, name: "Swati Nair", specialty: "Cardio", experience: 5 }, 
  { trainer_id: 103, name: "Imran Qureshi", specialty: "Yoga", experience: 8 } 
]);

// 3. Sessions Collection
db.sessions.insertMany([ 
  { session_id: 201, member_id: 1, trainer_id: 101, session_type: "Strength", duration: 60, date: new Date("2024-08-01") }, 
  { session_id: 202, member_id: 2, trainer_id: 102, session_type: "Cardio", duration: 45, date: new Date("2024-08-02") }, 
  { session_id: 203, member_id: 3, trainer_id: 103, session_type: "Yoga", duration: 90, date: new Date("2024-08-03") }, 
  { session_id: 204, member_id: 1, trainer_id: 102, session_type: "Cardio", duration: 30, date: new Date("2024-08-04") }, 
  { session_id: 205, member_id: 4, trainer_id: 101, session_type: "Strength", duration: 75, date: new Date("2024-08-05") }, 
  { session_id: 206, member_id: 5, trainer_id: 103, session_type: "Yoga", duration: 60, date: new Date("2024-08-05") } 
]);

// Step 2: Basic Query Challenges

// 1. Find all members from Mumbai
db.members.find({ city: "Mumbai" });

// 2. List all trainers with experience greater than 6 years
db.trainers.find({ experience: { $gt: 6 } });

// 3. Get all Yoga sessions
db.sessions.find({ session_type: "Yoga" });

// 4. Show all sessions conducted by trainer Swati Nair
db.trainers.aggregate([
  { $match: { name: "Swati Nair" } },
  { $lookup: {
      from: "sessions",
      localField: "trainer_id",
      foreignField: "trainer_id",
      as: "swati_sessions"
  }},
  { $unwind: "$swati_sessions" },
  { $replaceRoot: { newRoot: "$swati_sessions" } }
]);

// 5. Find all members who attended a session on 2024-08-05
db.sessions.aggregate([
  { $match: { date: new Date("2024-08-05") } },
  { $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member_info"
  }},
  { $unwind: "$member_info" },
  { $project: {
      _id: 0,
      member_name: "$member_info.name",
      city: "$member_info.city",
      session_type: 1,
      date: 1
  }}
]);
