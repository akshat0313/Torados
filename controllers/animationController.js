function animationController() {
  return {
    // returns the animation.ejs page
    animation(req, res) {
      res.render("animation.ejs");
    }
  }
}

// exporting the animationController
module.exports = animationController;
