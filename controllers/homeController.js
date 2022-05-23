function homeController() {
    return {
        index(req, res) {
            res.render('landing.ejs');
        }
    }
}

module.exports = homeController;