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
    db.Workout.find({}).lean()
    .populate("activities")
    .then(dbWorkout => {
        // res.json(dbWorkout);
        handleObject = {workouts: dbWorkout}
        // console.log(handleObject)
        res.render("index",handleObject)
    }).catch(err => res.json(err));
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
        res.status(200).redirect('back');
    }).catch(err => res.json(err));
})

app.post("/activity", (req, res) => {
    const workoutid = req.body.workoutid;
    db.Activity.create(req.body)
    .then(({_id})=> db.Workout.findOneAndUpdate({_id: workoutid},{$push: {activities: _id}}, {new: true}))
    .then(dbActivity => {
        res.json(dbActivity);
    }).catch(err => res.json(err));
})


//==============================================================================================================================//


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});