const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;



const db = require("./models");
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbFitness", { useNewUrlParser: true });

//==============================================================================================================================//
//Routes go here
//==============================================================================================================================//

app.get("/",(req, res) => {
    res.render("index",{})
} )

app.get("/workouts", (req, res) => {
    db.Workout.find({})
    .populate("activities")
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => res.json(err));
})

app.post("/workout",(req, res) => {
    console.log(req.body)
    db.Workout.create(req.body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => res.json(err));
})

app.post("/activity", (req, res) => {
    db.Activity.create(req.body)
    .then(({_id})=> db.Workout.findOneAndUpdate({/*id of workout stored on html somehow */},{$push: {activities: _id}}, {new: true}))
    .then(dbActivity => {
        res.json(dbActivity);
    }).catch(err => res.json(err));
})


//==============================================================================================================================//


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});