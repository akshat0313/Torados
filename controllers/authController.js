const User = require('../models/user');

function authController() {
    return {
        register(req, res) {
            res.render('registration1.ejs');
        },
        user(req, res) {
            User.find().sort({ createdAt: -1 })
            .then(item => res.json({users:item}))
            .catch(err => console.log(err));
        }
    }
}

module.exports = authController;