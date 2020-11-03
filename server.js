//Package to manage routing and data
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

//Initializes database and server
const db = require("./models");
const app = express();

//Express configuration
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Initializes html templates
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Connects to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbFitness", { useNewUrlParser: true });

//==============================================================================================================================//
//Routes
//==============================================================================================================================//

//Populates main page with previously created activities
app.get("/",(req, res) => {
    db.Workout.find({}).lean()
    .populate("activities")
    .then(dbWorkout => {
        // res.json(dbWorkout);
        handleObject = {workouts: dbWorkout}
        // console.log(handleObject)
        res.render("index",handleObject)
    }).catch(err => res.json(err));
} )

//Creates new workouts
app.post("/workout",(req, res) => {
    console.log(req.body)
    db.Workout.create(req.body)
    .then(dbWorkout => {
        res.status(200).redirect('back');
    }).catch(err => res.json(err));
})

//Creates new exercises
app.post("/activity", (req, res) => {
    const workoutid = req.body.workoutid;
    db.Activity.create(req.body)
    .then(({_id})=> db.Workout.findOneAndUpdate({_id: workoutid},{$push: {activities: _id}}, {new: true}))
    .then(dbActivity => {
        res.json(dbActivity);
    }).catch(err => res.json(err));
})

//Updates an activity
app.put("/activityUpdate", (req, res) => {
    const activityid = req.body.activityid;
    console.log(req.body)
    db.Activity.findOneAndUpdate({_id: activityid}, req.body, {new: true})
    .then(dbActivity => {
        res.json(dbActivity);
    }).catch(err => res.json(err));
})
//==============================================================================================================================//

//Starts the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});