const mongoose = require('mongoose');

// defining the schema
/**
 * we do not need to insert the movie's info becouse all the info will be
 * fetch form the https://imdb-api.com/API
 *  key = k_tqc3a27f
 *  url = `https://imdb-api.com/en/API/Top250Movies/k_tqc3a27f`;
 */
const moiveSchema = new mongoose.Schema({
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
    }

});

//compiling the schema into model
const Moive = mongoose.model("Moive", moiveSchema);
module.exports = Moive;