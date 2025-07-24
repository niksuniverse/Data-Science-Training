use jobportal
//jobs collection
db.jobs.insertMany([
  {
    _id: "job1",
    job_title: "Backend Developer",
    company: "TechNova",
    location: "Bangalore",
    salary: 1200000,
    job_type: "remote",
    posted_on: new Date("2025-07-01T00:00:00Z")
  },
  {
    _id: "job2",
    job_title: "Frontend Developer",
    company: "WebWorks",
    location: "Delhi",
    salary: 850000,
    job_type: "on-site",
    posted_on: new Date("2025-06-15T00:00:00Z")
  },
  {
    _id: "job3",
    job_title: "Full Stack Engineer",
    company: "CodeCrush",
    location: "Hyderabad",
    salary: 1100000,
    job_type: "hybrid",
    posted_on: new Date("2025-07-10T00:00:00Z")
  },
  {
    _id: "job4",
    job_title: "Data Scientist",
    company: "DataMind",
    location: "Mumbai",
    salary: 1500000,
    job_type: "remote",
    posted_on: new Date("2025-07-05T00:00:00Z")
  },
  {
    _id: "job5",
    job_title: "DevOps Engineer",
    company: "InfraSys",
    location: "Chennai",
    salary: 950000,
    job_type: "on-site",
    posted_on: new Date("2025-06-20T00:00:00Z")
  }
])


//applicant collection

  db.applicants.insertMany([
  {
    _id: "app1",
    name: "Ankit Sharma",
    skills: ["JavaScript", "MongoDB", "React"],
    experience: 3,
    city: "Delhi",
    applied_on: new Date("2025-07-15T00:00:00Z")
  },
  {
    _id: "app2",
    name: "Priya Reddy",
    skills: ["Python", "Machine Learning", "SQL"],
    experience: 4,
    city: "Hyderabad",
    applied_on: new Date("2025-07-18T00:00:00Z")
  },
  {
    _id: "app3",
    name: "Ravi Kumar",
    skills: ["Java", "Spring Boot", "MongoDB"],
    experience: 5,
    city: "Bangalore",
    applied_on: new Date("2025-07-10T00:00:00Z")
  },
  {
    _id: "app4",
    name: "Megha Jain",
    skills: ["React", "Node.js", "Express"],
    experience: 2,
    city: "Mumbai",
    applied_on: new Date("2025-07-05T00:00:00Z")
  },
  {
    _id: "app5",
    name: "Vikram Das",
    skills: ["DevOps", "AWS", "Docker"],
    experience: 6,
    city: "Chennai",
    applied_on: new Date("2025-07-12T00:00:00Z")
  }
])


//application collection
db.applications.insertMany([
  {
    _id: "appl1",
    applicant_id: "app1",
    job_id: "job1",
    application_status: "interview scheduled",
    interview_scheduled: new Date("2025-07-25T10:00:00Z"),
    feedback: "Positive"
  },
  {
    _id: "appl2",
    applicant_id: "app2",
    job_id: "job4",
    application_status: "under review",
    interview_scheduled: null,
    feedback: ""
  },
  {
    _id: "appl3",
    applicant_id: "app3",
    job_id: "job3",
    application_status: "interview scheduled",
    interview_scheduled: new Date("2025-07-26T14:00:00Z"),
    feedback: "Pending"
  },
  {
    _id: "appl4",
    applicant_id: "app4",
    job_id: "job2",
    application_status: "rejected",
    interview_scheduled: null,
    feedback: "Lacks experience"
  },
  {
    _id: "appl5",
    applicant_id: "app5",
    job_id: "job5",
    application_status: "under review",
    interview_scheduled: null,
    feedback: ""
  }
])

//  Part 2: Write the Following Queries
//  1. Find all remote jobs with a salary greater than 10,00,000.
db.jobs.find({job_type: "remote",salary: { $gt: 1000000 }})

//  2. Get all applicants who know MongoDB.
db.applicants.find({skills:"MongoDB"})

//  3. Show the number of jobs posted in the last 30 days.
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

db.jobs.countDocuments({posted_on: { $gte: thirtyDaysAgo }})

//  4. List all job applications that are in ‘interview scheduled’ status.
db.applications.find({application_status: "interview scheduled"})

//  5. Find companies that have posted more than 2 jobs.
db.jobs.aggregate([
  { $group: { _id: "$company", jobCount: { $sum: 1 } } },
  { $match: { jobCount: { $gt: 2 } } },
  { $project: { company: "$_id", jobCount: 1, _id: 0 } }
])

//  Part 3: Use $lookup and Aggregation
//  6. Join applications with jobs to show job title along with the applicant’s name.
db.applications.aggregate([
  {
    $lookup: {
      from: "jobs",
      localField: "job_id",
      foreignField: "_id",
      as: "job_info"
    }
  },
  {
    $lookup: {
      from: "applicants",
      localField: "applicant_id",
      foreignField: "_id",
      as: "applicant_info"
    }
  },
  {
    $project: {
      _id: 0,
      job_title: { $arrayElemAt: ["$job_info.job_title", 0] },
      applicant_name: { $arrayElemAt: ["$applicant_info.name", 0] },
      application_status: 1
    }
  }
])

//  7. Find how many applications each job has received.
db.applications.aggregate([
  {
    $group: {
      _id: "$job_id",
      applicationCount: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "jobs",
      localField: "_id",
      foreignField: "_id",
      as: "job_info"
    }
  },
  {
    $project: {
      _id: 0,
      job_id: "$_id",
      job_title: { $arrayElemAt: ["$job_info.job_title", 0] },
      applicationCount: 1
    }
  }
])

//  8. List applicants who have applied for more than one job.
db.applications.aggregate([
  {
    $group: {
      _id: "$applicant_id",
      jobCount: { $sum: 1 }
    }
  },
  { $match: { jobCount: { $gt: 1 } } },
  {
    $lookup: {
      from: "applicants",
      localField: "_id",
      foreignField: "_id",
      as: "applicant_info"
    }
  },
  {
    $project: {
      _id: 0,
      applicant_id: "$_id",
      name: { $arrayElemAt: ["$applicant_info.name", 0] },
      jobCount: 1
    }
  }
])

//  9. Show the top 3 cities with the most applicants.
db.applicants.aggregate([
  {
    $group: {
      _id: "$city",
      applicantCount: { $sum: 1 }
    }
  },
  { $sort: { applicantCount: -1 } },
  { $limit: 3 },
  {
    $project: {
      _id: 0,
      city: "$_id",
      applicantCount: 1
    }
  }
])

//  10. Get the average salary for each job type (remote, hybrid, on-site).
db.jobs.aggregate([
  {
    $group: {
      _id: "$job_type",
      avgSalary: { $avg: "$salary" }
    }
  },
  {
    $project: {
      _id: 0,
      job_type: "$_id",
      avgSalary: 1
    }
  }
])

//  Part 4: Data Updates
//  11. Update the status of one application to "offer made".
db.applications.updateOne({ _id: "appl1" },{ $set: { application_status: "offer made" } })

//  12. Delete a job that has not received any applications.
// Find jobs with zero applications
const jobsWithApps = db.applications.distinct("job_id");

db.jobs.deleteMany({_id: { $nin: jobsWithApps }})

//  13. Add a new field shortlisted to all applications and set it to false.
db.applications.updateMany({},{ $set: { shortlisted: false } })

//  14. Increment experience of all applicants from "Hyderabad" by 1 year.
db.applicants.updateMany( { city: "Hyderabad" }, { $inc: { experience: 1 } })

//  15. Remove all applicants who haven’t applied to any job
const applicantsWithApps = db.applications.distinct("applicant_id");

db.applicants.deleteMany({_id: { $nin: applicantsWithApps }})


