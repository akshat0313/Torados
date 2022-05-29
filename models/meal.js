// Getting all the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema for the meal model
const mealSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

}, { timestamps: true });

// Create the model class
const Meal = mongoose.model('Meal', mealSchema);
// export the model
module.exports = Meal;