// Importing the controllers
const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const mealController = require("../controllers/mealController");
const paymentController = require("../controllers/paymentController");
const otpController = require("../controllers/otpController");
const animationController = require("../controllers/animationController");

function initRoutes(app) {
  // home routes
  app.get("/", homeController().index);
  // register route
  app.get("/register", authController().register);
  // user route for getting all the registered users
  app.get("/user", authController().user);
  // loading route after the user is registered
  app.get("/animation", animationController().animation);
  // payment route
  app.get("/payment", paymentController().payment);
  // meals route
  app.get("/meals", mealController().meal);
  // meal route for adding the meals to the cart
  app.post("/meals", mealController().cartMeal);
  // otp route for sending the otp to the user
  app.post("/send/:name", otpController().send);
  // otp route for verifying the otp
  app.post("/verify", otpController().verify);
}

// exporting the routes
module.exports = initRoutes;
