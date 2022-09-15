import { url as baseUrl } from "../settings/api.js";
import { removeProductIdFromLocalStorage } from "../localstorage/removeProductIdFromLocalStorage.js";
import { getCurrency } from "../API/getCurrency.js";

const subtotalELem = document.querySelector("#subtotal");
const totalElem = document.querySelector("#total");
const taxElem = document.querySelector("#tax");
const currencyElem = document.querySelector("#currency");

export function createCart(products, target) {
  target.innerHTML = "";
  let subTotal = 0;

  products.forEach((products) => {
    subTotal += products.price;
    target.innerHTML += `
    <div class="cart__card">
      <a href="./details.html?id=${products.id}">
        <div class="cart__img-div">
          <img class="cart__img-div--image" src="${products.image_url}" alt="${products.title}" />
          <span class="cart__img-div--title">${products.title}</span>
          <div class="cart__img-div--edition">${products.edition}</div>
        </div>
      </a>
      <div class="cart__info-div">
        <span class="cart__info-div--price">$${products.price}</span>
        <i data-id="${products.id}"  class="cart__info-div--delete-btn deleteItemCart fas fa-trash-alt"></i>
      </div>
    </div>
    <hr class="cart-line" />
  `;
  });
  getCurrency().then(function (data) {
    const result = data.result;
    const valueOfOneDollar = result.rates.NOK;

    subtotalELem.innerHTML = "$" + subTotal;
    const tax = (8 * subTotal) / 100;
    let total = subTotal + tax;
    total = total.toFixed(2);
    let totalValueInNok = valueOfOneDollar * total;
    taxElem.innerHTML = "$" + tax.toFixed(2);
    totalElem.innerHTML = "$" + total;
    currencyElem.innerHTML = totalValueInNok.toFixed(2) + " " + "kr";
  });

  removeProductIdFromLocalStorage();
}
