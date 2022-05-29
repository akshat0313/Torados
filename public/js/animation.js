// render meals.ejs page after 1.5 seconds as this page is for loading while meals are being fetched from the database
setTimeout(function () {
    // after 1.5 seconds
    window.location = "/meals";
  }, 1500);