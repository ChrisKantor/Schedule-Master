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

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "employeesystem"
});

//express works by using "routes" that we call when we want to communicate with the backend from the frontend
//we create a new route, in this case /create (ie localhost:3001/create)
//req and res stand for request and response
//request is what we get from the frontend, response is what we send to the frontend
app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    //use a prepared statement (?'s in place of direct input from the variables) for security
    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)", 
    [name, age, country, position, wage], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Values Inserted");
        }
    });
});


//create the route for our get requests, so that we can display the data in the database on the frontend
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

//designate a port for our app to run on. Use an empty function to use console.log
app.listen(3001, ()=> {console.log("Server is running on port 3001!")});