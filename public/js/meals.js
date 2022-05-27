// import axios from 'axios';
let pizza = document.getElementById('pizza2');
let displayMeal = document.getElementById('meal-to-display');
let toDisplay = "all";
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cart-counter');
let foodInc = document.querySelector('.food-buy-amount');
let foodName = document.querySelector('.food-name');
let foorPrice = document.querySelector('.food-price');
let foodBuyAmount = document.querySelector('#food-buy-amount-new'); 
let foodImage = document.querySelector('.food-image');
let sushi = document.getElementById('sushi-click');
let burger = document.getElementById('burger-click');
let asian = document.getElementById('asian-click');
let barbeque = document.getElementById('barbeque-click');
let thai = document.getElementById('thai-click');
let dessert = document.getElementById('dessert-click');
let pizzan = document.getElementById('pizza-click');
let asianID = document.getElementById('asian');
let burgerID = document.getElementById('burgers');
let barbequeID = document.getElementById('bbq');
let dessertID = document.getElementById('dessers');
let thaiID = document.getElementById('thai');
let sushiID = document.getElementById('sushi');
let checkout = document.getElementById('checkout');



function updateCart(meal) {
  $.ajax({
    url: '/meals',
    method: 'POST',
    data: meal,
    success: function(data) {
      console.log(data);
      const {items: {undefined: {item : {category, image, name, price }}}} = data;
      location.reload();
      // const {items: items} = data;
      // const newItems =JSON.parse(items);
      // console.log(newItems);
      // Items.Map(item => {
      // // const {items: {undefined: {item : {category, image, name, price }}}} = data;
      // // const { item: {category, image, name, price }} = item;
      // console.log(name)
      // console.log(category)
      // console.log(price)
      
      // foodName.innerText = name;
      // foorPrice.innerText = price;
      // foodImage.src = "img/all/" + image;
      // });
      foodName.innerText = name;
      foorPrice.innerText = price;
      foodImage.src = "img/all/" + image;
      console.log(items)
      console.log(data);
      cartCounter.innerText = data.totalQty;
      foodInc.innerText = data.totalQty + "x";
    },
  });
}

//   axios.post('/meals', meal)
//   .then(function(response) { 
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
// }

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let meal = JSON.parse(btn.dataset.meal)
    console.log(meal)
    updateCart(meal);
  });
});

function updateCartNew() {
  console.log('updateCartNew');
  $.ajax({
    url: '/meals',
    method: 'GET',
    // dataType: 'json',
    success: function(data) {
      data.$('#cart-counter').innerHTML = data.totalQty
      // console.log(cartCounter) ;
      // cartCounter.innerHTML = data.totalQty;
    },
    error: function(error) {
      console.log("error");
    }
  });
}


pizza.addEventListener('click', (e)=> {
    toDisplay = "pizzas";
    console.log("clicked");

    displayMeal.innerHTML = `
    <div class="row">
    ${toDisplay}
      <% meals.forEach(meal => { %>
        <h1> <%= meal.name %> </h1>
        <h2> <%= meal.price %> </h2>
        <% }); %>
        `

});

asianID.addEventListener('click', (e)=> {
  [sushi,thai,pizzan,burger,barbeque,dessert].forEach((btn) => {btn.style.display = 'none'});
  asian.style.display = "grid";
});

burgerID.addEventListener('click', (e)=> {
  [sushi,thai,pizzan,asian,barbeque,dessert].forEach((btn) => {btn.style.display = 'none'});
  burger.style.display = "grid";
});

dessertID.addEventListener('click', (e)=> {
  [sushi,thai,pizzan,burger,barbeque,asian].forEach((btn) => {btn.style.display = 'none'});
  dessert.style.display = "grid";
});

thaiID.addEventListener('click', (e)=> {
  [sushi,asian,pizzan,burger,barbeque,dessert].forEach((btn) => {btn.style.display = 'none'});
  thai.style.display = "grid";
});

sushiID.addEventListener('click', (e)=> {
  [asian,thai,pizzan,burger,barbeque,dessert].forEach((btn) => {btn.style.display = 'none'});
  sushi.style.display = "grid";
});

barbequeID.addEventListener('click', (e)=> {
  [sushi,thai,pizzan,burger,asian,dessert].forEach((btn) => {btn.style.display = 'none'});
  barbeque.style.display = "grid";
});

checkout.addEventListener('click', (e)=> {
  window.location.href = "/payment";
})


let tl = gsap.timeline({ease:Sine.in});
const button = document.querySelector('#button')
  tl.to('#text0',{translateY:'160%',duration:.5,onComplete:()=>{
  document.querySelector('#text0').innerHTML="Thanks for selecting"
}})
.to('#cart',{translateX:'1.129%',duration:1.2})
.to('#tomato',{y:'0.28%',duration:1})
.to('#banana',{translateY:'0.25%',duration:.8})
.to('#paper',{translateY:'0.25%',duration:.8})
.to('#cart',{translateX:'1.699%',duration:.8,onStart:()=>{
  gsap.to('#tomato',{translateX:'1.759%',duration:1})
gsap.to('#banana',{translateX:'2.0999%',duration:1})
gsap.to('#paper',{translateX:'2.599%',duration:1,onStart:()=>{
  gsap.to('#text0',{translateX:'-20%'})
}})
}})
.to('#text0',{translateY:'0%',duration:.5})
.to('#text0',{translateY:'160%',duration:1.,delay:.5,onComplete:()=>{
  document.querySelector('#text0').innerHTML="Add to cart"
    gsap.to('#text0',{translateX:'6%',duration:.1})

     gsap.set('#cart',{translateX:'0%'})
       gsap.to('#banana',{translateY:'0%',duration:0.1})
       gsap.to('#tomato',{translateY:'0%',duration:0.1})
       gsap.to('#paper',{translateY:'0%',duration:0.1})
    gsap.to('#banana',{translateX:'1.22%',delay:0.1})
       gsap.to('#tomato',{translateX:'1.08%',delay:0.1})
       gsap.to('#paper',{translateX:'1.61%',delay:0.1})

}})
  .to('#text0',{translateY:'0%',duration:.5,delay:.2,onComplete:()=>{

  }})
   .pause()
  

   button.addEventListener('click',()=>{
    tl.restart()
  
    
 
 })
