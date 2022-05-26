// import axios from 'axios';
let pizza = document.getElementById('pizza2');
let displayMeal = document.getElementById('meal-to-display');
let toDisplay = "all";
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cart-counter');

function updateCart(meal) {



  $.ajax({
    url: '/meals',
    method: 'POST',
    data: meal,
    success: function(data) {
      console.log(data.totalQty);
      console.log(cartCounter);
      updateCartNew();
      // cartCounter.value++;
      // cartCounter.innerHTML = data.totalQty;
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
    updateCart(meal);
    console.log(meal)
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
    toDisplay = "pizza";
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

// let tl = gsap.timeline({ease:Sine.in});
// const button = document.querySelector('#button')
//   tl.to('#text0',{translateY:'160%',duration:.5,onComplete:()=>{
//   document.querySelector('#text0').innerHTML="Thanks for selecting"
// }})
// .to('#cart',{translateX:'1.129%',duration:1.2})
// .to('#tomato',{y:'0.28%',duration:1})
// .to('#banana',{translateY:'0.25%',duration:.8})
// .to('#paper',{translateY:'0.25%',duration:.8})
// .to('#cart',{translateX:'1.699%',duration:.8,onStart:()=>{
//   gsap.to('#tomato',{translateX:'1.759%',duration:1})
// gsap.to('#banana',{translateX:'2.0999%',duration:1})
// gsap.to('#paper',{translateX:'2.599%',duration:1,onStart:()=>{
//   gsap.to('#text0',{translateX:'-20%'})
// }})
// }})
// .to('#text0',{translateY:'0%',duration:.5})
// .to('#text0',{translateY:'160%',duration:1.,delay:.5,onComplete:()=>{
//   document.querySelector('#text0').innerHTML="Add to cart"
//     gsap.to('#text0',{translateX:'6%',duration:.1})

//      gsap.set('#cart',{translateX:'0%'})
//        gsap.to('#banana',{translateY:'0%',duration:0.1})
//        gsap.to('#tomato',{translateY:'0%',duration:0.1})
//        gsap.to('#paper',{translateY:'0%',duration:0.1})
//     gsap.to('#banana',{translateX:'1.22%',delay:0.1})
//        gsap.to('#tomato',{translateX:'1.08%',delay:0.1})
//        gsap.to('#paper',{translateX:'1.61%',delay:0.1})

// }})
//   .to('#text0',{translateY:'0%',duration:.5,delay:.2,onComplete:()=>{

//   }})
//    .pause()
  

// button.addEventListener('click',()=>{
//    tl.restart()
 
   

// })
