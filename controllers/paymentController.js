const User = require('../models/user');

function paymentController() {
    return {
        payment(req, res) {
            User.find().sort({ createdAt: -1 })
            .then(item => res.render('payment.ejs', {users:item}))
            
        }
    }
}

module.exports = paymentController;