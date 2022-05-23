const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const mealController = require("../controllers/mealController");
const paymentController = require("../controllers/paymentController");

function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/register", authController().register);
  app.get("/order", paymentController().order);
  app.get("/payment", paymentController().payment);
  app.get('/meals', mealController().meal);
  app.post('/meals', mealController().cartMeal);
}

module.exports = initRoutes;
