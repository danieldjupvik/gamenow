import {
  getUserName,
  getRole,
  getProductFromStorage,
} from "../utils/storage.js";
import { logoutFunction } from "../functions/logoutBtnFunction.js";

export function dynamicMenu() {
  const navbar = document.querySelector("#navbar-navigation");
  const { pathname } = document.location;
  const username = getUserName();
  const role = getRole();
  let loginActive = "";
  let addActive = "";
  let homeActive = "";
  let gamesActive = "";
  let hideElement = "";

  if (username) {
    navbar.classList.add("loggedIn");
  } else {
    navbar.classList.remove("loggedIn");
  }

  if (pathname === "/login.html") {
    loginActive = "active";
  }
  if (pathname === "/add.html") {
    addActive = "active";
  }
  if (pathname === "/index.html" || pathname === "/") {
    homeActive = "active";
  }
  if (pathname === "/products.html") {
    gamesActive = "active";
  }

  if (role == "Registered" || role == "Public") {
    hideElement = "none";
  }

  let loginSection = `
  <div class="nav-buttons">
    <a class="login__btn btn" href="./login.html">Sign in</a>
    <a class="register__btn btn" href="./register.html">Register</a>
  </div>
  `;

  if (username) {
    loginSection = `
    <a class="navbar-navigation__links ${addActive}" style="display: ${hideElement}" href="./add.html">Add game</a>
    <div class="nav-buttons">
      <button id="logout" class="login__btn btn"><i class="fas fa-sign-out-alt"></i> Logout</button>
      <a class="register__btn btn" href="./profile.html">My Profile</a>
    </div>
    `;
  }

  navbar.innerHTML = `
    <a class="navbar-navigation__links ${homeActive}" href="/">Home</a>
    <a class="navbar-navigation__links ${gamesActive}" href="./products.html">Games</a>
    ${loginSection}
  `;
  logoutFunction();
}
export function updateCartCounter() {
  const cartCounterElem = document.querySelector(".navbar__cart--itemCounter");
  const productsInCart = getProductFromStorage();
  cartCounterElem.style.display = "block";
  const cartCount = productsInCart.length;
  cartCounterElem.innerHTML = `${cartCount}`;
}

updateCartCounter();
