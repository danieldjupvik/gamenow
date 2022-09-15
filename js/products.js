import * as menu from "./menu/hamburgerMenu.js";
import { getProducts } from "./API/getProducts.js";
import { createProducts } from "./components/createProducts.js";
import { searchFunction } from "./functions/searchFunction.js";
import { dynamicMenu } from "./menu/dynamicMenu.js";
import { createMessage } from "./components/createMessage.js";
dynamicMenu();

const productsElem = document.querySelector(".products");
let result = "";
getProducts().then(function (data) {
  result = data.result;
  if (data.success === true) {
    function sortBestsellers(a, b) {
      if (a.featuredRanking === b.featuredRanking) {
        return 0;
      } else if (a.featuredRanking === null) {
        return 1;
      } else if (b.featuredRanking === null) {
        return -1;
      }

      return a.featuredRanking - b.featuredRanking;
    }
    const sortedBestsellers = result.sort(sortBestsellers);
    createProducts(sortedBestsellers, productsElem);
    searchFunction(result);
  } else {
    createMessage("error", `<b>Error message:</b> ${data.error}`, ".products");
  }
});

/* ----- Sorting ----- */
const selectElem = document.querySelector("#sortButton");

selectElem.addEventListener("input", sortOrder);
function sortOrder(event) {
  var copiedArray = [...result];
  console.log(result);

  if (event.target.value === "default") {
    createProducts(result, productsElem);
  }

  if (event.target.value === "title-asc") {
    const AtoZ = copiedArray.sort(sortTitleAtoZ);
    createProducts(AtoZ, productsElem);
  }

  if (event.target.value === "title-desc") {
    const ZToA = copiedArray.sort(sortTitleZtoA);
    createProducts(ZToA, productsElem);
  }

  if (event.target.value === "price-lowToHigh") {
    const lowToHighArray = copiedArray.sort(sortPriceLowToHigh);
    console.log(lowToHighArray);
    createProducts(lowToHighArray, productsElem);
  }

  if (event.target.value === "price-highToLow") {
    const highToLowArray = copiedArray.sort(sortPriceHighToLow);
    createProducts(highToLowArray, productsElem);
  }

  if (event.target.value === "edition") {
    const sortEditionArray = copiedArray.sort(sortEdition);
    createProducts(sortEditionArray, productsElem);
  }
}

/* Sort the array functions */
function sortPriceLowToHigh(a, b) {
  return a.price - b.price;
}

function sortPriceHighToLow(a, b) {
  return b.price - a.price;
}

function sortTitleAtoZ(a, b) {
  var titleA = a.title.toUpperCase();
  var titleB = b.title.toUpperCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  return 0;
}

function sortTitleZtoA(a, b) {
  var titleA = a.title.toUpperCase();
  var titleB = b.title.toUpperCase();
  if (titleB < titleA) {
    return -1;
  }
  if (titleB > titleA) {
    return 1;
  }

  return 0;
}

function sortEdition(a, b) {
  var titleA = a.edition.toUpperCase();
  var titleB = b.edition.toUpperCase();
  if (titleB < titleA) {
    return -1;
  }
  if (titleB > titleA) {
    return 1;
  }

  return 0;
}
