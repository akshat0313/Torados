function animationController() {
  return {
    animation(req, res) {
      res.render("animation.ejs");
    },
    animationPost(req, res) {
      console.log(req.file);
      const { name, email } = req.body;
      const image = req.file.path;
      const newUser = new User({
        name,
        email,
        image,
      });
      newUser
        .save()
        .then(res.render("animation.ejs"))
        .catch((err) => console.log(err));
    },
  };
}

module.exports = animationController;
