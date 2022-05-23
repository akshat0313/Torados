function paymentController() {
    return {
        order(req, res) {
            res.render('order.ejs');
        },
        payment(req, res) {
            res.render('payment.ejs');
        }
    }
}

module.exports = paymentController;