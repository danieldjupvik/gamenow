import {
  saveProductToStorage,
  getProductFromStorage,
} from "../utils/storage.js";
import { createDetails } from "../components/createDetails.js";
import { getOneProduct } from "../API/getOneProduct.js";
import { updateCartCounter } from "../menu/dynamicMenu.js";

export function addProductIdToLocalStorage() {
  const addToCartButton = document.querySelectorAll(".addToCart--btn");
  addToCartButton.forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", (event) => {
      const id = event.target.dataset.id;

      const currentProducts = getProductFromStorage();

      const ifProductExist = currentProducts.find(function (product) {
        return product.id === id;
      });

      if (ifProductExist === undefined) {
        const products = {
          id: id,
        };
        currentProducts.push(products);
        saveProductToStorage(currentProducts);
        const detailsElem = document.querySelector(".details");
        getOneProduct(id).then(function (data) {
          const result = data.result;
          if (data.success === true) {
            createDetails(result, detailsElem);
          }
        });
      } else {
        const newProducts = currentProducts.filter((product) => {
          return product.id !== id;
        });
        saveProductToStorage(newProducts);
      }
      updateCartCounter();
    });
  });
}
