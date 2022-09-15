import {
  saveProductToStorage,
  getProductFromStorage,
} from "../utils/storage.js";
import { getOneProduct } from "../API/getOneProduct.js";
import { createCart } from "../components/createCart.js";
import { getProducts } from "../API/getProducts.js";
import { createMessage } from "../components/createMessage.js";
import { updateCartCounter } from "../menu/dynamicMenu.js";

export function removeProductIdFromLocalStorage() {
  const deleteItemCartButton = document.querySelectorAll(".deleteItemCart");
  const cartElem = document.querySelector(".cart");
  const emptyCartElem = document.querySelector(".empty-cart");
  const cartSection = document.querySelector(".cart-section");

  console.log(deleteItemCartButton);
  deleteItemCartButton.forEach((deleteItemCartButton) => {
    deleteItemCartButton.addEventListener("click", (event) => {
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
      } else {
        const newProducts = currentProducts.filter((product) => {
          return product.id !== id;
        });
        saveProductToStorage(newProducts);
        getProducts().then(function (data) {
          const result = data.result;
          if (data.success === true) {
            const filteredCart = result.filter(function (ApiResult) {
              return (
                newProducts.filter(function (currentProducts) {
                  return parseInt(currentProducts.id) == ApiResult.id;
                }).length !== 0
              );
            });
            createCart(filteredCart, cartElem);

            if (filteredCart.length <= 0) {
              emptyCartElem.style.display = "block";
              cartSection.style.display = "none";
            }
          } else {
            createMessage(
              "error",
              `<b>Error message:</b> ${data.error}`,
              ".cart"
            );
          }
        });
      }
      updateCartCounter();
    });
  });
}
