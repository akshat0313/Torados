const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const mealController = require("../controllers/mealController");
const paymentController = require("../controllers/paymentController");
const otpController = require("../controllers/otpController");
const animationController = require("../controllers/animationController");

function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/register", authController().register);
  app.get("/user", authController().user);
  app.get("/animation", animationController().animation);
  app.get("/payment", paymentController().payment);
  app.get("/meals", mealController().meal);
  app.post("/meals", mealController().cartMeal);
  app.post("/send/:name", otpController().send);
  app.post("/verify", otpController().verify);
}

module.exports = initRoutes;
