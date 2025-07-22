>use MovieStreamingApp
< switched to db MovieStreamingApp
>db["users"].find()

// user table
db.users.insertMany([
  { user_id: 1, 
   name: "Ananya", 
   email: "ananya_pandey38@example.com", 
   country: "India" 
  },
  { 
    user_id: 2, 
    name: "John", 
    email: "john@example.com", 
    country: "USA" 
  },
  { 
    user_id: 3, 
    name: "Mrithi", 
    email: "mrithi2003@example.com", 
    country: "China" 
  },
  { 
    user_id: 4, 
    name: "Goutham", 
    email: "borntogou21@example.com", 
    country: "Brazil" 
  },
  { 
    user_id: 5,
    name: "Rashika", 
    email: "rashi56.8@example.com", 
    country: "India" }
]);

//movies table

db.movies.insertMany([
  {
    movie_id: 101,
    title: "Dream Beyond Code",
    genre: "Sci-Fi",
    release_year: 2022,
    duration: 120
  },
  {
    movie_id: 102,
    title: "Love in Autumn",
    genre: "Romance",
    release_year: 2021,
    duration: 95
  },
  {
    movie_id: 103,
    title: "Haunted Truth",
    genre: "Horror",
    release_year: 2019,
    duration: 105
  },
  {
    movie_id: 104,
    title: "The Silent War",
    genre: "Action",
    release_year: 2023,
    duration: 130
  },
  {
    movie_id: 105,
    title: "Laughter Therapy",
    genre: "Comedy",
    release_year: 2020,
    duration: 90
  },
  {
    movie_id: 106,
    title: "Ancient Echoes",
    genre: "History",
    release_year: 2024,
    duration: 110
  }
]);


//watch_history table

db.watch_history.insertMany([
  {
    watch_id: 1,
    user_id: 1,
    movie_id: 101,
    watched_on: ISODate("2020-06-01"),
    watch_time: 100
  },
  {
    watch_id: 2,
    user_id: 2,
    movie_id: 104,
    watched_on: ISODate("2021-06-03"),
    watch_time: 120
  },
  {
    watch_id: 3,
    user_id: 3,
    movie_id: 101,
    watched_on: ISODate("2022-06-05"),
    watch_time: 115
  },
  {
    watch_id: 4,
    user_id: 1,
    movie_id: 102,
    watched_on: ISODate("2023-06-08"),
    watch_time: 95
  },
  {
    watch_id: 5,
    user_id: 4,
    movie_id: 103,
    watched_on: ISODate("2021-06-10"),
    watch_time: 105
  },
  {
    watch_id: 6,
    user_id: 5,
    movie_id: 106,
    watched_on: ISODate("2024-06-12"),
    watch_time: 100
  },
  {
    watch_id: 7,
    user_id: 1,
    movie_id: 101,
    watched_on: ISODate("2019-06-15"),
    watch_time: 110
  },
  {
    watch_id: 8,
    user_id: 2,
    movie_id: 105,
    watched_on: ISODate("2020-06-18"),
    watch_time: 90
  }
]);


//basic 
//1 Find all movies with duration > 100 minutes.
db.watch_history.find({ watch_time : { $gt :100}})

//2. List users from 'India'
db.users.find({country : "India"})

// 3. Get all movies released after 2020
db.movies.find({release_year : {$gt : 2020}})

// Intermediate:
// 4. Show full watch history: user name, movie title, watch time.
db.watch_history.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "user_id",
      as: "user"
    }
  },
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  {
    $project: {
      _id: 0,
      user_name: "$user.name",
      movie_title: "$movie.title",
      watch_time: 1
    }
  }
])

// 5. List each genre and number of times movies in that genre were watched.
db.watch_history.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  {
    $group: {
      _id: "$movie.genre",
      watch_count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      genre: "$_id",
      watch_count: 1
    }
  },
  {
    $sort: { watch_count: -1 }
  }
])

// 6. Display total watch time per user.
db.watch_history.aggregate([
  {
    $group: {
      _id: "$user_id",
      total_watch_time: { $sum: "$watch_time" }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "user_id",
      as: "user"
    }
  },
  {
    $project: {
      _id: 0,
      user_name: "$user.name",
      total_watch_time: 1
    }
  },
  {
    $sort: { total_watch_time: -1 }
  }
])

 // Advanced:
 // 7. Find which movie has been watched the most (by count).
db.watch_history.aggregate([
  {
    $group: {
      _id: "$movie_id",
      watch_count: { $sum: 1 }
    }
  },
  { $sort: { watch_count: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "movies",
      localField: "_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  {
    $project: {
      _id: 0,
      movie_title: "$movie.title",
      watch_count: 1
    }
  }
])

 // 8. Identify users who have watched more than 2 movies.
db.watch_history.aggregate([
  {
    $group: {
      _id: { user_id: "$user_id", movie_id: "$movie_id" }
    }
  },
  {
    $group: {
      _id: "$_id.user_id",
      unique_movies_watched: { $sum: 1 }
    }
  },
  { $match: { unique_movies_watched: { $gt: 2 } } },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "user_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      _id: 0,
      user_name: "$user.name",
      unique_movies_watched: 1
    }
  }
])

 // 9. Show users who watched the same movie more than once.
db.watch_history.aggregate([
  {
    $group: {
      _id: { user_id: "$user_id", movie_id: "$movie_id" },
      watch_count: { $sum: 1 }
    }
  },
  { $match: { watch_count: { $gt: 1 } } },
  {
    $lookup: {
      from: "users",
      localField: "_id.user_id",
      foreignField: "user_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $lookup: {
      from: "movies",
      localField: "_id.movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  {
    $project: {
      _id: 0,
      user_name: "$user.name",
      movie_title: "$movie.title",
      watch_count: 1
    }
  }
])

 // 10. Calculate percentage of each movie watched compared to its full duration (watch_time/duration * 100 )
db.watch_history.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  {
    $project: {
      _id: 0,
      movie_title: "$movie.title",
      user_id: 1,
      watch_time: 1,
      duration: "$movie.duration",
      percentage_watched: {
        $round: [
          { $multiply: [{ $divide: ["$watch_time", "$movie.duration"] }, 100] },
          2
        ]
      }
    }
  }
])
