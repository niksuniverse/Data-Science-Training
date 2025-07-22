// MongoDB Assignment: Fitness Center Database

// Step 1: Create Collections and Insert Data


// 1. Members Collection
db.members.insertMany([
  {
    member_id: 1,
    name: "Anjali Rao",
    age: 28,
    gender: "Female",
    city: "Mumbai",
    membership_type: "Gold"
  },
  {
    member_id: 2,
    name: "Rohan Mehta",
    age: 35,
    gender: "Male",
    city: "Delhi",
    membership_type: "Silver"
  },
  {
    member_id: 3,
    name: "Fatima Shaikh",
    age: 22,
    gender: "Female",
    city: "Hyderabad",
    membership_type: "Platinum"
  },
  {
    member_id: 4,
    name: "Vikram Das",
    age: 41,
    gender: "Male",
    city: "Bangalore",
    membership_type: "Gold"
  },
  {
    member_id: 5,
    name: "Neha Kapoor",
    age: 31,
    gender: "Female",
    city: "Pune",
    membership_type: "Silver"
  }
]);

// 2. Trainers Collection
db.trainers.insertMany([
  {
    trainer_id: 101,
    name: "Ajay Kumar",
    specialty: "Weight Training",
    experience: 7
  },
  {
    trainer_id: 102,
    name: "Swati Nair",
    specialty: "Cardio",
    experience: 5
  },
  {
    trainer_id: 103,
    name: "Imran Qureshi",
    specialty: "Yoga",
    experience: 8
  }
]);

// 3. Sessions Collection
db.sessions.insertMany([
  {
    session_id: 201,
    member_id: 1,
    trainer_id: 101,
    session_type: "Strength",
    duration: 60,
    date: new Date("2024-08-01")
  },
  {
    session_id: 202,
    member_id: 2,
    trainer_id: 102,
    session_type: "Cardio",
    duration: 45,
    date: new Date("2024-08-02")
  },
  {
    session_id: 203,
    member_id: 3,
    trainer_id: 103,
    session_type: "Yoga",
    duration: 90,
    date: new Date("2024-08-03")
  },
  {
    session_id: 204,
    member_id: 1,
    trainer_id: 102,
    session_type: "Cardio",
    duration: 30,
    date: new Date("2024-08-04")
  },
  {
    session_id: 205,
    member_id: 4,
    trainer_id: 101,
    session_type: "Strength",
    duration: 75,
    date: new Date("2024-08-05")
  },
  {
    session_id: 206,
    member_id: 5,
    trainer_id: 103,
    session_type: "Yoga",
    duration: 60,
    date: new Date("2024-08-05")
  }
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

// 6. Count the number of sessions each member has attended.
db.sessions.aggregate([
  { $group: { _id: "$member_id", session_count: { $sum: 1 } } }
])

// 7. Show average duration of sessions for each session_type.
db.sessions.aggregate([
  { $group: { _id: "$session_type", avg_duration: { $avg: "$duration" } } }
])

// 8. Find all female members who attended a session longer than 60 minutes.
db.sessions.aggregate([
  { $match: { duration: { $gt: 60 } } },
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  { $match: { "member.gender": "Female" } },
  { $project: { _id: 0, name: "$member.name", duration: 1 } }
])

// 9. Display sessions sorted by duration (descending).
db.sessions.find().sort({ duration: -1 })

// 10. Find members who have attended sessions with more than one trainer.
db.sessions.aggregate([
  {
    $group: {
      _id: "$member_id",
      unique_trainers: { $addToSet: "$trainer_id" }
    }
  },
  {
    $project: {
      member_id: "$_id",
      trainer_count: { $size: "$unique_trainers" }
    }
  },
  { $match: { trainer_count: { $gt: 1 } } }
])

// 11. Use $lookup to display sessions with member name and trainer name.
db.sessions.aggregate([
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  {
    $lookup: {
      from: "trainers",
      localField: "trainer_id",
      foreignField: "trainer_id",
      as: "trainer"
    }
  },
  { $unwind: "$trainer" },
  {
    $project: {
      session_id: 1,
      session_type: 1,
      duration: 1,
      date: 1,
      member_name: "$member.name",
      trainer_name: "$trainer.name"
    }
  }
])

// 12. Calculate total session time per trainer.
db.sessions.aggregate([
  {
    $group: {
      _id: "$trainer_id",
      total_duration: { $sum: "$duration" }
    }
  }
])

// 13. List each member and their total time spent in the gym.
db.sessions.aggregate([
  {
    $group: {
      _id: "$member_id",
      total_time: { $sum: "$duration" }
    }
  },
  {
    $lookup: {
      from: "members",
      localField: "_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  {
    $project: {
      member_name: "$member.name",
      total_time: 1
    }
  }
])

// 14. Count how many sessions each trainer has conducted.
db.sessions.aggregate([
  {
    $group: {
      _id: "$trainer_id",
      session_count: { $sum: 1 }
    }
  }
])

// 15. Find which trainer has conducted the longest average session duration.
db.sessions.aggregate([
  {
    $group: {
      _id: "$trainer_id",
      avg_duration: { $avg: "$duration" }
    }
  },
  { $sort: { avg_duration: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "trainers",
      localField: "_id",
      foreignField: "trainer_id",
      as: "trainer"
    }
  },
  { $unwind: "$trainer" },
  {
    $project: {
      trainer_name: "$trainer.name",
      avg_duration: 1
    }
  }
])

// 16. Show how many unique members each trainer has trained.
db.sessions.aggregate([
  {
    $group: {
      _id: "$trainer_id",
      unique_members: { $addToSet: "$member_id" }
    }
  },
  {
    $project: {
      trainer_id: "$_id",
      member_count: { $size: "$unique_members" }
    }
  }
])

// 17. Find the most active member (by total session duration).
db.sessions.aggregate([
  {
    $group: {
      _id: "$member_id",
      total_duration: { $sum: "$duration" }
    }
  },
  { $sort: { total_duration: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "members",
      localField: "_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  {
    $project: {
      member_name: "$member.name",
      total_duration: 1
    }
  }
])

// 18. List all Gold membership members who took at least one Strength session.
db.sessions.aggregate([
  { $match: { session_type: "Strength" } },
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  { $match: { "member.membership_type": "Gold" } },
  {
    $project: {
      _id: 0,
      member_name: "$member.name",
      membership_type: "$member.membership_type"
    }
  },
  { $group: { _id: "$member_name" } }
])

// 19. Display a breakdown of sessions by membership type.
db.sessions.aggregate([
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  {
    $group: {
      _id: "$member.membership_type",
      session_count: { $sum: 1 }
    }
  }
])

// 20. Find members who have not attended any session yet.
db.members.aggregate([
  {
    $lookup: {
      from: "sessions",
      localField: "member_id",
      foreignField: "member_id",
      as: "session_info"
    }
  },
  { $match: { session_info: { $eq: [] } } },
  {
    $project: {
      member_id: 1,
      name: 1
    }
  }
])

