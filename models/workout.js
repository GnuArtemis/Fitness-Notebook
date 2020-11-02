const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: "What is the name of your workout?"
    },

    activities: [
        {
            type: Schema.Types.ObjectId,
            ref: "Activity"
        }
    ]
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;