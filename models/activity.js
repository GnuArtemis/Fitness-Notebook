//A schema of our "exercises" associated with each workout. Name, aerobic(as a true or false), and duration are always present, the others can vary depending on the exercise

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    
    name: {
        type: String,
        trim: true,
        required: "What is the name of your activity?"
    },
    
    aerobic: {
        type: Boolean,
        required: "Please choose aerobic or anaerobic."
    },

    weight: Number,

    sets: Number,

    reps: Number,

    duration: Number,

    distance: Number

})

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;