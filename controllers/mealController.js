const Meal = require('../models/meal'); 
function mealController() {
    return {
        meal(req, res) {
            Meal.find().sort({ createdAt: -1 })
          .then(item => res.render('meals.ejs', {meals:item}))
          .catch(err => console.log(err));
        },
        cartMeal(req, res) {
// for the first time creating cart and adding basic object structure            
            if (!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart;

            console.log(req.body);
                // check if item is already in cart

                if(!cart.items[req.body.id]){
                    cart.items[req.body.id] = {
                        item: req.body,
                        qty: 1,
                        price: req.body.price
                    }
                    cart.totalQty += 1;
                    cart.totalPrice += req.body.price;
                } else {
                    cart.items[req.body.id].qty += 1;
                    cart.items[req.body.id].price += req.body.price;
                    cart.totalQty += 1;
                    cart.totalPrice += req.body.price; 
                }
            return res.json({totalQty: req.session.cart.totalQty, totalPrice: req.session.cart.totalPrice});
        }
    }
}

module.exports = mealController;