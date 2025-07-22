//Books table
db.books.insertMany([
  { book_id: 101, title: "The AI Revolution", author: "Ray Kurzweil", genre: "Technology", price: 799, stock: 20 },
  { book_id: 102, title: "Deep Learning with Python", author: "Francois Chollet", genre: "Technology", price: 999, stock: 10 },
  { book_id: 103, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", genre: "Biography", price: 499, stock: 15 },
  { book_id: 104, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", price: 650, stock: 25 },
  { book_id: 105, title: "Percy Jackson", author: "Rick Riordan", genre: "Fantasy", price: 600, stock: 18 }
])

//customers table

db.customers.insertMany([
  { customer_id: 201, name: "Ahana", email: "ahana_tha@example.com", city: "Hyderabad" },
  { customer_id: 202, name: "Nikitha", email: "nikitha.shh@example.com", city: "Hyderabad" },
  { customer_id: 203, name: "Zara", email: "zara.gou@example.com", city: "Delhi" },
  { customer_id: 204, name: "Varshi", email: "varshi_nv@example.com", city: "Chennai" },
  { customer_id: 205, name: "Shifa", email: "shifa_na21@example.com", city: "Mumbai" }
])

//orders table

db.orders.insertMany([
  { order_id: 301, customer_id: 201, book_id: 101, order_date: ISODate("2024-01-10"), quantity: 1 },
  { order_id: 302, customer_id: 202, book_id: 102, order_date: ISODate("2023-03-12"), quantity: 2 },
  { order_id: 303, customer_id: 203, book_id: 103, order_date: ISODate("2022-07-20"), quantity: 1 },
  { order_id: 304, customer_id: 204, book_id: 104, order_date: ISODate("2024-08-22"), quantity: 3 },
  { order_id: 305, customer_id: 205, book_id: 105, order_date: ISODate("2022-01-05"), quantity: 2 },
  { order_id: 306, customer_id: 201, book_id: 104, order_date: ISODate("2025-02-10"), quantity: 1 },
  { order_id: 307, customer_id: 201, book_id: 105, order_date: ISODate("2025-03-15"), quantity: 2 }
])

//PART 3 
//BASIC QUERIES
// 1. List all books priced above 500
db.books.find({price : {$gt : 500}})

//  2. Show all customers from ‘Hyderabad’.
db.customers.find({city : "Hyderabad"})

// 3. Find all orders placed after January 1, 2023.
db.orders.find({ order_date: { $gt: ISODate("2023-01-01") } })

//Joins via $lookup :
//4. Display order details with customer name and book title.

db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer_info"
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book_info"
    }
  },
  {
    $project: {
      order_id: 1,
      quantity: 1,
      customer_name: { $arrayElemAt: ["$customer_info.name", 0] },
      book_title: { $arrayElemAt: ["$book_info.title", 0] }
    }
  }
])

 //5. Show total quantity ordered for each book.
db.orders.aggregate([
    {
        $group: {
            _id :'$book_id',
            total_quantity:{ $sum :"$quantity"}
        }
    },
    {
        $lookup: {
            from :"books",
            localField:"_id",
            foreignField :"book_id",
            as :"book_info"
        }
    },
    {
        $project:{
            book_title:{$arrayElemAt:["$book_info.title",0]},
            total_quantity:1
        }
    }
])

//6. Show the total number of orders placed by each customer

db.orders.aggregate([
  {
    $group: {
      _id: "$customer_id",
      total_orders: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer_info"
    }
  },
  {
    $project: {
      customer_name: { $arrayElemAt: ["$customer_info.name", 0] },
      total_orders: 1
    }
  }
])

// 7. Calculate total revenue generated per book
db.orders.aggregate([
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
      _id: "$book.title",
      totalRevenue: { $sum: { $multiply: ["$quantity", "$book.price"] } }
    }
  }
]);

// 8. Find the book with the highest total revenue
db.orders.aggregate([
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
      _id: "$book.title",
      totalRevenue: { $sum: { $multiply: ["$quantity", "$book.price"] } }
    }
  },
  { $sort: { totalRevenue: -1 } },
  { $limit: 1 }
]);

// 9. List genres and total books sold in each genre
db.orders.aggregate([
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
      totalSold: { $sum: "$quantity" }
    }
  }
]);

// 10. Show customers who ordered more than 2 different books
db.orders.aggregate([
  {
    $group: {
      _id: { customer_id: "$customer_id", book_id: "$book_id" }
    }
  },
  {
    $group: {
      _id: "$_id.customer_id",
      differentBooks: { $sum: 1 }
    }
  },
  { $match: { differentBooks: { $gt: 2 } } },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $project: {
      _id: 0,
      customer_id: "$_id",
      name: "$customer.name",
      differentBooks: 1
    }
  }
]);
