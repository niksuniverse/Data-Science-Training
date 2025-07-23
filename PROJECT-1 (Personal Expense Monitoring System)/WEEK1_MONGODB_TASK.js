
> use PersonalExpenseTracker

// 1. user collection 
> db.users.insertMany([
  {
    _id: 1,
    name: "Nikitha",
    email: "nikithays06@gmail.com"
  },
  {
    _id: 2,
    name: "Arivu",
    email: "arivunazi21@gmail.com"
  },
  {
    _id: 3,
    name: "Lokesh",
    email: "lokkii_nikey29@gmail.com"
  }
]);

// 2. category collection
>db.categories.insertMany([
  { 
    _id: 1, 
    category_name: "Groceries" 
  },
  { 
    _id: 2, 
    category_name: "Transport" 
  },
  { 
    _id: 3, 
    category_name: "Utilities" 
  },
  { 
    _id: 4, 
    category_name: "Dining" 
  },
  { 
    _id: 5, 
    category_name: "Entertainment" 
  }
]);

// 3. expense collection
>db.expenses.insertMany([
  {
    user_id: 1,
    category_id: 1,
    amount: 1500,
    expense_date: ISODate("2025-07-02"),
    notes: "Monthly grocery",
    receipt: { shop: "SuperMart", bill_no: "GROC1234", items: 15 }
  },
  {
    user_id: 1,
    category_id: 2,
    amount: 300,
    expense_date: ISODate("2025-07-05"),
    notes: "Bus pass recharge",
    receipt: { transport_mode: "Bus", receipt_id: "BUS456" }
  },
  {
    user_id: 2,
    category_id: 3,
    amount: 800,
    expense_date: ISODate("2025-07-10"),
    notes: "Electricity bill",
    receipt: { provider: "TNEB", customer_id: "ELEC789" }
  },
  {
    user_id: 2,
    category_id: 4,
    amount: 550,
    expense_date: ISODate("2025-07-12"),
    notes: "Dinner with friends",
    receipt: { restaurant: "Barbeque Nation", table: 4 }
  },
  {
    user_id: 3,
    category_id: 5,
    amount: 1200,
    expense_date: ISODate("2025-07-15"),
    notes: "Movie + Snacks",
    receipt: { cinema: "PVR", movie: "Inception", snacks: "Popcorn" }
  }
]);

// 4. index creation for quick lookup
>db.expenses.createIndex({ user_id: 1 });
>db.expenses.createIndex({ "receipt.receipt_id": 1 });
>db.users.createIndex({ email: 1 }, { unique: true });

// 5. SAMPLE QUERIES (MongoDB Shell Format)
// a) Get all expenses of Nikitha
>db.expenses.find({ user_id: 1 });

// b) Get total expenses by category for user_id = 1
> db.expenses.aggregate([
  { $match: { user_id: 1 } },
  { $group: {
      _id: "$category_id",
      total_spent: { $sum: "$amount" }
  }},
  { $lookup: {
      from: "categories",
      localField: "_id",
      foreignField: "_id",
      as: "category"
  }},
  { $unwind: "$category" },
  { $project: {
      category_name: "$category.category_name",
      total_spent: 1
  }}
]);

// c) Find expense with receipt bill_no = "GROC1234"
>db.expenses.find({ "receipt.bill_no": "GROC1234" });

