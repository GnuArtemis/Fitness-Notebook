const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "What is the name of your workout?"
    },
    type: String,

    weight: Number,

    sets: Number,

    

})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;