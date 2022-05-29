// importing the required models
const User = require('../models/user');

function authController() {
    return {
        // for rendering the registeration.ejs page
        register(req, res) {
            res.render('registration.ejs');
        },
        // for getting all the registered users from the database
        user(req, res) {
            User.find().sort({ createdAt: -1 })
            .then(item => res.json({users:item}))
            .catch(err => console.log(err));
        }
    }
}

// exporting the authController function
module.exports = authController;