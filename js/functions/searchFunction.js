import { createProducts } from "../components/createProducts.js";

const resultContainer = document.querySelector(".products");

export function searchFunction(json) {
  const input = document.querySelector("#searchField");
  input.addEventListener("keyup", (event) => {
    const inputValue = event.target.value.trim();

    if (inputValue.length >= 1) {
      filterArray(json, inputValue);
    } else {
      createProducts(json, resultContainer);
    }
  });
}

function filterArray(json, value) {
  const productsCountElem = document.querySelector(".productsCount-value");
  const sortedArray = json.filter((products) =>
    products.title.toLowerCase().includes(value.toLowerCase())
  );
  if (sortedArray.length == 0) {
    productsCountElem.innerHTML = "0";
    resultContainer.innerHTML = `<p class="searchResult">No Result </p>`;
  } else {
    createProducts(sortedArray, resultContainer);
  }
}
