// jquery for the animation in the registration page
$(document).ready(function () {
  console.log("ready!");
  $(".input").on("focus", function () {
    $(".login").addClass("clicked");
  });
  $(".login").on("submit", function (e) {
    $(".login").removeClass("clicked").addClass("loading");
  });
});
