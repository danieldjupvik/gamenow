import { url as baseUrl } from "../settings/api.js";
import { getUserName } from "../utils/storage.js";
import { getProductFromStorage } from "../utils/storage.js";
import { addProductIdToLocalStorage } from "../localstorage/addProductIdToLocalStorage.js";

const username = getUserName();

export function createDetails(products, target) {
  target.innerHTML = "";
  const currentProducts = getProductFromStorage();

  const doesProductExist = currentProducts.find((product) => {
    return parseInt(product.id) === products.id;
  });

  let dynamicClass = " ";
  let ifLoggedIn = "none";

  if (username) {
    ifLoggedIn = "block";
  }

  if (doesProductExist) {
    dynamicClass = "disabled";
  }

  target.innerHTML = `
  <div class="details__image-div">
    <img
      class="details--img"
      src="${products.image_url}"
      alt="${products.title}"
    />
  </div>
  <div class="details__info-div">
    <h3 class="details--title">${products.title}</h3>
    <span class="details--price priceTag-details">$${products.price}</span>
    <div class="details--edition"> ${products.edition}</div>
    <p class="details--description">${products.description}</p>
    <button ${dynamicClass} class="addToCart--btn btn ${dynamicClass}" data-id="${products.id}">Add to cart</button>
    <a href="./edit.html?id=${products.id}" style="display: ${ifLoggedIn};"> 
      <div class="edit--btn fullWidthBtn btn">Edit <i class="edit-icon far fa-edit"></i></div>
    </a>
  </div>
  `;
  addProductIdToLocalStorage();
}
