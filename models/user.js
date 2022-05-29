// Getting all the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema for the user model
const userSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
}, { timestamps: true });

// Create the model class
const User = mongoose.model('User', userSchema);
// export the model
module.exports = User;
