const mongoose = require('mongoose');

const moiveSchema = new mongoose.Schema({
    moiveRef:{
        type: String,
        required: [true, "please enter moive's."]
    },
    title: {
        type: String,
        required: [true, "please enter moive's."]
    },
    year: {
        type: Number,
        required: [true, "please enter your year."]
    },
    image: {
        type: String,
        required: [true]
    },
    crew:{
        type: String,
        required: [true, "please enter the crew."]}

});

//compiling the schema into model
const Moive = mongoose.model("Moive", moiveSchema);
module.exports = Moive;