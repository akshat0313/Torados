let pizzaID = document.getElementById("pizza");
let displayMeal = document.getElementById("meal-to-display");
let addToCart = document.querySelectorAll(".btn-6");
let cartCounter = document.querySelector("#cart-counter");
let foodInc = document.querySelector(".food-buy-amount");
let foodName = document.querySelector(".food-name");
let foorPrice = document.querySelector(".food-price");
let foodBuyAmount = document.querySelector("#food-buy-amount-new");
let foodImage = document.querySelector(".food-image");
let sushi = document.getElementById("sushi-click");
let burger = document.getElementById("burger-click");
let asian = document.getElementById("asian-click");
let barbeque = document.getElementById("barbeque-click");
let thai = document.getElementById("thai-click");
let dessert = document.getElementById("dessert-click");
let pizza = document.getElementById("pizza-click");
let asianID = document.getElementById("asian");
let burgerID = document.getElementById("burgers");
let barbequeID = document.getElementById("bbq");
let dessertID = document.getElementById("dessers");
let thaiID = document.getElementById("thai");
let sushiID = document.getElementById("sushi");
let checkout = document.getElementById("checkout");

// for post request to add the meal to the cart
function updateCart(meal) {
  // ajax call to add the meal to the cart
  $.ajax({
    url: "/meals",
    method: "POST",
    data: meal,
    success: function (data) {
      console.log(data);
    },
  });
  console.log("cart updated");
}

// click event for all the add to cart buttons
addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let meal = JSON.parse(btn.dataset.meal);
    updateCart(meal);
    // load the page to display the meal added to the cart
    window.location = "/animation";
  });
});

// Click events for all the categories to display the meals
pizzaID.addEventListener("click", (e) => {
  [sushi, thai, asian, burger, barbeque, dessert].forEach((btn) => {
    btn.style.display = "none";
  });
  pizza.style.display = "grid";
});

asianID.addEventListener("click", (e) => {
  [sushi, thai, pizza, burger, barbeque, dessert].forEach((btn) => {
    btn.style.display = "none";
  });
  asian.style.display = "grid";
});

burgerID.addEventListener("click", (e) => {
  [sushi, thai, pizza, asian, barbeque, dessert].forEach((btn) => {
    btn.style.display = "none";
  });
  burger.style.display = "grid";
});

dessertID.addEventListener("click", (e) => {
  [sushi, thai, pizza, burger, barbeque, asian].forEach((btn) => {
    btn.style.display = "none";
  });
  dessert.style.display = "grid";
});

thaiID.addEventListener("click", (e) => {
  [sushi, asian, pizza, burger, barbeque, dessert].forEach((btn) => {
    btn.style.display = "none";
  });
  thai.style.display = "grid";
});

sushiID.addEventListener("click", (e) => {
  [asian, thai, pizza, burger, barbeque, dessert].forEach((btn) => {
    btn.style.display = "none";
  });
  sushi.style.display = "grid";
});

barbequeID.addEventListener("click", (e) => {
  [sushi, thai, pizza, burger, asian, dessert].forEach((btn) => {
    btn.style.display = "none";
  });
  barbeque.style.display = "grid";
});

// click event for the checkout button to send the user to the payment page
checkout.addEventListener("click", (e) => {
  window.location.href = "/payment";
});
