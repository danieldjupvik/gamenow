/*----- Hamburger menu -----*/
var topnavContainer = document.querySelector(".icon-container");
topnavContainer.addEventListener("click", openHamburgerMenu);

function openHamburgerMenu(elem) {
  this.classList.toggle("change");
  var topnavContainer = document.getElementById("navbar-navigation");
  topnavContainer.classList.toggle("open");
}
/*----- Close hamburger menu by touching outside the navbar-----*/
const bodyElem = document.querySelector("main");
const iconContainer = document.querySelector(".icon-container");

bodyElem.addEventListener("click", function () {
  var topnavContainer = document.getElementById("navbar-navigation");
  topnavContainer.classList.remove("open");
  iconContainer.classList.remove("change");
});

/* Fix a bug, mobile navbar would not close when resized to desktop and remove shadow and toggle icon */
var topnavContainer = document.getElementById("navbar-navigation");
window.addEventListener("resize", displayWindowSize);

function displayWindowSize() {
  var currentWidth = window.innerWidth;
  if (currentWidth > 768) {
  } else {
    topnavContainer.classList.remove("open");
    iconContainer.classList.remove("change");
  }
}
