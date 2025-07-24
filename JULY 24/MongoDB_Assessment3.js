use jobportal
//jobs collection
db.jobs.insertMany([
  {
    _id: ObjectId(),
    title: "Backend Developer",
    company: "TechCorp",
    location: "Hyderabad",
    salary: 1200000,
    job_type: "remote",
    posted_on: ISODate("2025-06-20")
  },
  {
    _id: ObjectId(),
    title: "Frontend Engineer",
    company: "WebWorks",
    location: "Bangalore",
    salary: 950000,
    job_type: "on-site",
    posted_on: ISODate("2025-07-01")
  },
  {
    _id: ObjectId(),
    title: "Data Analyst",
    company: "DataPros",
    location: "Hyderabad",
    salary: 1050000,
    job_type: "hybrid",
    posted_on: ISODate("2025-06-10")
  },
  {
    _id: ObjectId(),
    title: "DevOps Engineer",
    company: "Cloud9",
    location: "Chennai",
    salary: 1300000,
    job_type: "remote",
    posted_on: ISODate("2025-06-25")
  },
  {
    _id: ObjectId(),
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Mumbai",
    salary: 850000,
    job_type: "on-site",
    posted_on: ISODate("2025-07-05")
  }
]);

//applicant table
db.applicants.insertMany([
  {
    _id: ObjectId(),
    name: "Alice",
    skills: ["MongoDB", "Node.js"],
    experience: 3,
    city: "Hyderabad",
    applied_on: ISODate("2025-07-10")
  },
  {
    _id: ObjectId(),
    name: "Bob",
    skills: ["Python", "SQL"],
    experience: 2,
    city: "Chennai",
    applied_on: ISODate("2025-07-12")
  },
  {
    _id: ObjectId(),
    name: "Charlie",
    skills: ["Java", "MongoDB"],
    experience: 5,
    city: "Bangalore",
    applied_on: ISODate("2025-07-11")
  },
  {
    _id: ObjectId(),
    name: "Diana",
    skills: ["React", "CSS"],
    experience: 4,
    city: "Hyderabad",
    applied_on: ISODate("2025-07-09")
  },
  {
    _id: ObjectId(),
    name: "Eve",
    skills: ["MongoDB", "Angular"],
    experience: 1,
    city: "Mumbai",
    applied_on: ISODate("2025-07-08")
  }
]);

