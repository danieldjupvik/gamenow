import * as menu from "./menu/hamburgerMenu.js";
import { dynamicMenu } from "./menu/dynamicMenu.js";
import { getProductFromStorage } from "./utils/storage.js";
import { createCart } from "./components/createCart.js";
import { clearCartFunction } from "./functions/clearCartFunction.js";
import { getProducts } from "./API/getProducts.js";
import { createMessage } from "./components/createMessage.js";
dynamicMenu();

const cartElem = document.querySelector(".cart");
const cartSection = document.querySelector(".cart-section");
const emptyCartElem = document.querySelector(".empty-cart");
const loader = document.querySelector(".cart-loader");

const currentProducts = getProductFromStorage();

getProducts().then(function (data) {
  const result = data.result;
  if (data.success === true) {
    const filteredCart = result.filter(function (ApiResult) {
      return (
        currentProducts.filter(function (currentProducts) {
          return parseInt(currentProducts.id) == ApiResult.id;
        }).length !== 0
      );
    });

    if (filteredCart.length <= 0) {
      emptyCartElem.style.display = "block";
      loader.style.display = "none";
    } else {
      createCart(filteredCart, cartElem);
      cartSection.style.display = "block";
      loader.style.display = "none";
    }
  } else {
    createMessage(
      "error",
      `<b>Error message:</b> ${data.error}`,
      ".message-container"
    );
    loader.style.display = "none";
  }
});

clearCartFunction();
