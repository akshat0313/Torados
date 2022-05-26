function authController() {
    return {
        register(req, res) {
            res.render('registration1.ejs');
        }
    }
}

module.exports = authController;