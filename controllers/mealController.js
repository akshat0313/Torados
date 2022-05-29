// importing the required models
const Meal = require('../models/meal'); 

function mealController() {
    return {
        // for rendering the meals.ejs page and getting all the meals from the database
        meal(req, res) {
            Meal.find().sort({ createdAt: -1 })
            // sending the meals to the meals.ejs page
          .then(item => res.render('meals.ejs', {meals:item}))
          .catch(err => console.log(err));
        },
        // for adding the meals to the cart
        cartMeal(req, res) {
            // for the first time creating cart and adding basic object structure            
            if (!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            // storing the cart data from session in the cart variable
            let cart = req.session.cart;
            req.body.price = parseInt(req.body.price)
            parseInt(cart.totalPrice)

                // check if item is already in cart
                if(!cart.items[req.body._id]){
                    cart.items[req.body._id] = {
                        item: req.body,
                        qty: 1,
                        price: parseInt(req.body.price)
                    }
                    cart.totalQty += 1;
                    cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price);
                } else {
                    cart.items[req.body._id].qty += 1;
                    cart.items[req.body._id].price += req.body.price;
                    cart.totalQty += 1;
                    cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price); 
                }
            // sending the cart data in json format    
            return res.json({totalQty: req.session.cart.totalQty, totalPrice: parseInt(req.session.cart.totalPrice), items: req.session.cart.items});
        }
    }
}

// exporting the mealController function
module.exports = mealController;