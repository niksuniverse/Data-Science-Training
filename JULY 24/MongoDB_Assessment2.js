//MongoDB Assignment: Library Management System
//Step 1: Create Collections and Insert Sample Data

// books collection
 db.books.insertMany([ 
{ book_id: 201, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", 
copies: 10 }, 
{ book_id: 202, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", 
copies: 5 }, 
{ book_id: 203, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", 
copies: 7 }, 
{ book_id: 204, title: "The Lean Startup", author: "Eric Ries", genre: "Business", 
copies: 3 }, 
{ book_id: 205, title: "Deep Work", author: "Cal Newport", genre: "Productivity", 
copies: 4 } 
])

//members collection
 db.members.insertMany([ 
{ member_id: 101, name: "Ayesha Khan", joined_on: new Date("2024-01-15") }, 
{ member_id: 102, name: "Rahul Verma", joined_on: new Date("2024-03-12") }, 
{ member_id: 103, name: "Nikita Rao", joined_on: new Date("2024-04-10") } 
])

//borrowed collection
 db.borrowed.insertMany([ 
{ borrow_id: 1, member_id: 101, book_id: 201, date: new Date("2024-06-01"), 
returned: true }, 
{ borrow_id: 2, member_id: 101, book_id: 203, date: new Date("2024-06-15"), 
returned: false }, 
{ borrow_id: 3, member_id: 102, book_id: 202, date: new Date("2024-06-20"), 
returned: false }, 
{ borrow_id: 4, member_id: 103, book_id: 204, date: new Date("2024-06-22"), 
returned: true } 
])

//  Step 2: Query Exercises
//  1. Find all books in the Self-Help genre.
db.books.find({genre : "Self-Help"})

//  2. Show members who joined after March 2024.
db.members.find({joined_on :{$gt : new Date("2024-03-01")}})

//  3. List all borrowed books that have not been returned.
db.borrowed.find({returned:false})

//  4. Display all books with fewer than 5 copies in stock.
db.books.find({copies :{$lt :5}})

//  5. Get details of all books written by Cal Newport.
db.books.find({author : "Cal Newport"})

// Join Queries using 
// $lookup
//  6. List all borrow records with book title and member name.
db.borrowed.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  {
    $project: {
      borrow_id: 1,
      date: 1,
      returned: 1,
      "book.title": 1,
      "member.name": 1
    }
  }
]);

//  7. Find which member borrowed "Sapiens".
db.borrowed.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  { $match: { "book.title": "Sapiens" } },
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
    $project: {
      _id: 0,
      "member.name": 1
    }
  }
]);

//  8. Display all members along with the books they've borrowed.
db.members.aggregate([
  {
    $lookup: {
      from: "borrowed",
      localField: "member_id",
      foreignField: "member_id",
      as: "borrow_records"
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "borrow_records.book_id",
      foreignField: "book_id",
      as: "borrowed_books"
    }
  },
  {
    $project: {
      name: 1,
      borrowed_books: { title: 1 }
    }
  }
]);

//  9. Get a list of members who have borrowed books and not returned them.
db.borrowed.aggregate([
  { $match: { returned: false } },
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
    $project: {
      _id: 0,
      "member.name": 1
    }
  }
]);

//  10. Show each book along with how many times it has been borrowed.
db.borrowed.aggregate([
  {
    $group: {
      _id: "$book_id",
      times_borrowed: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $project: {
      title: "$book.title",
      times_borrowed: 1
    }
  }
]);

//  Aggregation & Analysis
//  11. Count how many books each member has borrowed.
db.borrowed.aggregate([
  {
    $group: {
      _id: "$member_id",
      borrow_count: { $sum: 1 }
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
      "member.name": 1,
      borrow_count: 1
    }
  }
]);

//  12. Which genre has the highest number of books?
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      total_books: { $sum: 1 }
    }
  },
  { 
    $sort: 
    { 
      total_books: -1 
    } 
  },
  { 
    $limit: 1
  }
]);

//  13. List the top 2 most borrowed books.
db.borrowed.aggregate([
  {
    $group: {
      _id: "$book_id",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } },
  { $limit: 2 },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $project: {
      title: "$book.title",
      count: 1
    }
  }
]);

//  14. Show the average number of copies available per genre.
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      avg_copies: { $avg: "$copies" }
    }
  }
]);

//  15. Find the total number of books currently borrowed (not returned).
db.borrowed.countDocuments({ returned: false });

//  Advanced Scenarios
//  16. Add a new member who hasn't borrowed any book. Write a query to list such members.
// Add new member
db.members.insertOne({ member_id: 104, name: "Vikram Singh", joined_on: new Date("2024-07-01") });

db.members.aggregate([
  {
    $lookup: {
      from: "borrowed",
      localField: "member_id",
      foreignField: "member_id",
      as: "borrows"
    }
  },
  {
    $match: { borrows: { $eq: [] } }
  }
]);

//  17. Identify books that have never been borrowed.
db.books.aggregate([
  {
    $lookup: {
      from: "borrowed",
      localField: "book_id",
      foreignField: "book_id",
      as: "borrowed"
    }
  },
  {
    $match: { borrowed: { $eq: [] } }
  }
]);

//  18. Get the name of members who borrowed more than one book.
db.borrowed.aggregate([
  {
    $group: {
      _id: "$member_id",
      borrow_count: { $sum: 1 }
    }
  },
  { $match: { borrow_count: { $gt: 1 } } },
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
      "member.name": 1,
      borrow_count: 1
    }
  }
]);

//  19. Display borrowing trends by month (group by date ).
db.borrowed.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$date" },
        month: { $month: "$date" }
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
]);

//  20. Show borrow records where the borrowed book had fewer than 5 copies at the time of borrowing.
db.borrowed.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  { $match: { "book.copies": { $lt: 5 } } },
  {
    $project: {
      borrow_id: 1,
      "book.title": 1,
      "book.copies": 1
    }
  }
]);

//  Bonus Questions
//  Simulate overdue books by adding a due_date and finding overdue records.
db.borrowed.updateMany({}, { $set: { due_date: new Date("2024-07-01") } });

db.borrowed.find({due_date: { $lt: new Date("2025-07-24") },returned: false});

//  Create a chart-style output showing how many books are borrowed per genre
db.borrowed.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $group: {
      _id: "$book.genre",
      total_borrowed: { $sum: 1 }
    }
  },
  { $sort: { total_borrowed: -1 } }
]);
