function authController() {
    return {
        register(req, res) {
            res.render('registration.ejs');
        }
    }
}

module.exports = authController;