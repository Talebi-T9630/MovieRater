const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    moiveRef: {
        type: String,
        required: [true, "please insert the movie refrence number."]
    },
    userFistName: {
        type: String,
        required: [true, "please enter your fist name."]
    },
    userLastName: {
        type: String,
        min: 18,
        max: 40,
        required: [true, "please enter your last name."]
    },
    userCommand: {
        type: String,
        required: [true, "please enter your command."]
    },
    userRate:{
        type: Number,
        required: [true, "please enter your command."]}

});

//compiling the schema into model
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;