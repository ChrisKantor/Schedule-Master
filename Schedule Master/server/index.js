// Require express and start the app using it. express is how we are connecting to our DB
const express = require('express');
const app = express();

//add mysql2 to our backend, use mysql2 due to some security enhancements that allow it to work with our other systems
const mysql = require('mysql2');

//add CORS to our server, needed to fulfill API calls (?)
const cors = require('cors');
app.use(cors());

//use express.json to parse the body of the requests we sent from the frontend
app.use(express.json());

//connect to our db
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "schedulemaster"
});

//express works by using "routes" that we call when we want to communicate with the backend from the frontend
//we create a new route, in this case /create (ie localhost:3001/create)
//req and res stand for request and response
//request is what we get from the frontend, response is what we send to the frontend


//database schema
// Courses Table    (9 columns total)
// crn              int             (PRIMARY KEY) 
// subject          varchar(3) 
// course_number    int 
// title            varchar(255) 
// instructor       varchar(255) 
// capacity         int 
// open             tinyint 
// time             varchar(255) 
// location         varchar(255)



//this post request allows us to ADD information to the database when we call it from the front end
app.post("/create", (req, res) => {
    const crn = req.body.crn;
    const subject = req.body.subject;
    const course_number = req.body.course_number;
    const title = req.body.title;
    const instructor = req.body.instructor;
    const seats_available = req.body.seats_available;
    const seats_total = req.body.seats_total;
    const is_open = req.body.is_open;
    const meeting_days = req.body.meeting_days;
    const start_time = req.body.time;
    const end_time = req.body.time;
    const location = req.body.location;

    //use a prepared statement (?'s in place of direct input from the variables) for security
    db.query("INSERT INTO courses (crn, subject, course_number, title, instructor, seats_available, seats_total, is_open, meeting_days, start_time, end_time, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [crn, subject, course_number, title, instructor, seats_available, seats_total, is_open, meeting_days, start_time, end_time, location], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Values Inserted");
        }
    });
});


//create the route for our get requests, so that we can display the data in the database on the frontend
//get request pulls data from the database, in this case all of the courses
app.get('/courses', (req, res) => {
    db.query("SELECT * FROM courses", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

//this post request pulls data for this specific crn that we provide
//get requests dont allow body, the information you are passing needs to be stored in the url
//I was having issues getting this to work so I just decided to use a post request
app.post('/cartCourses', (req, res) => {
    const crnList = req.body.crnList;
    db.query("SELECT * FROM courses WHERE crn IN (?)", [crnList], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});



//this post request allows us to ADD information to the database when we call it from the front end
app.post("/registerCourses", (req, res) => {
    const crnList = req.body.crnList;

    //use a prepared statement (?'s in place of direct input from the variables) for security
    db.query("UPDATE courses SET seats_available = seats_available - 1  WHERE crn IN (?)", [crnList], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Courses Registered");
        }
    });
});



//designate a port for our app to run on. Use an empty function to use console.log
app.listen(3001, ()=> {console.log("Server is running on port 3001!")});