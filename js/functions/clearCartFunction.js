import { cartKey } from "../utils/keys.js";
import { updateCartCounter } from "../menu/dynamicMenu.js";

const clearBtn = document.querySelector(".cart__btn");
const emptyCartElem = document.querySelector(".empty-cart");
const cartSection = document.querySelector(".cart-section");

export function clearCartFunction() {
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(cartKey);
    emptyCartElem.style.display = "block";
    cartSection.style.display = "none";
    updateCartCounter();
  });
}
