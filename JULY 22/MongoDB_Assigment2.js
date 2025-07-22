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
