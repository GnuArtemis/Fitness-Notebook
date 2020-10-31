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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

//==============================================================================================================================//
//Routes go here
//==============================================================================================================================//

app.post("/workout",(req, res) => {
    db.Workout.create(req.body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => res.json(err));
})

app.post("/activity", (req, res) => {
    db.Activity.create(req.body)
    .then(({_id})=> db.Workout.findOneAndUpdate({},{$push: {activities: _id}}, {new: true}))
    .then(dbActivity => {
        res.json(dbActivity);
    }).catch(err => res.json(err));
})

app.get("/workouts", (req, res) => {
    db.Workout.find({})
    .populate("activities")
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => res.json(err));
})

//==============================================================================================================================//


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});