function homeController() {
    return {
        // for rendering the home page i.e. landing.ejs page
        index(req, res) {
            res.render('landing.ejs');
        }
    }
}

// exporting the homeController
module.exports = homeController;