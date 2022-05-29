// Getting all the required modeles
const User = require('../models/user');

function paymentController() {
    return {
        // for rendering the payment.ejs page
        payment(req, res) {
            // getting all the registered users from the database
            User.find().sort({ createdAt: -1 })
            .then(item => res.render('payment.ejs', {users:item}))
            
        }
    }
}

// exporting the paymentController
module.exports = paymentController;