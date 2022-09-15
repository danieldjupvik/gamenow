import * as menu from "./menu/hamburgerMenu.js";
import { getToken, getRole } from "./utils/storage.js";
import { addProductToApi } from "./API/addProductToApi.js";
import { createPreview } from "./components/createPreview.js";
import { dynamicMenu } from "./menu/dynamicMenu.js";
import { goBackFunction } from "./functions/goBackFunction.js";
dynamicMenu();
goBackFunction();

const token = getToken();
if (token.length == 0) {
  location.href = "/";
}
const role = getRole();

if (role == "Registered" || role == "Public") {
  location.href = "/";
}

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const edition = document.querySelector("#edition");
const featuredRankingElem = document.querySelector(".edit__featuredRanking");
const featuredRanking = document.querySelector("#featuredRanking");
const posterLink = document.querySelector("#link");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");
const toggleBtn = document.querySelector("#toggleBtn");
const titleErrorElem = document.querySelector(".error__title");
const priceErrorElem = document.querySelector(".error__price");
const urlErrorElem = document.querySelector(".error__url");
const descriptionErrorElem = document.querySelector(".error__description");
const editionErrorElem = document.querySelector(".error__edition");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = price.value;
  const editionValue = edition.value.trim();
  const descriptionValue = description.value.trim();
  const posterLinkValue = posterLink.value.trim();
  const featuredValue = toggleBtn.checked;
  let featuredRankingValue = featuredRanking.value.trim();

  if (featuredRankingValue == 0) {
    featuredRankingValue = null;
  }

  let isValid = true;

  if (titleValue.length < 2) {
    isValid = false;
    titleErrorElem.style.display = "block";
    title.style.borderColor = "red";
  } else {
    title.style.borderColor = "#9346f5";
    titleErrorElem.style.display = "none";
  }

  if (priceValue.length < 1) {
    isValid = false;
    priceErrorElem.style.display = "block";
    price.style.borderColor = "red";
  } else {
    priceErrorElem.style.display = "none";
    price.style.borderColor = "#9346f5";
  }

  if (editionValue.length < 2) {
    isValid = false;
    editionErrorElem.style.display = "block";
    edition.style.borderColor = "red";
  } else {
    editionErrorElem.style.display = "none";
    edition.style.borderColor = "#9346f5";
  }

  if (descriptionValue.length < 2) {
    isValid = false;
    descriptionErrorElem.style.display = "block";
    description.style.borderColor = "red";
  } else {
    descriptionErrorElem.style.display = "none";
    description.style.borderColor = "#9346f5";
  }

  if (posterLinkValue.length < 7) {
    isValid = false;
    urlErrorElem.style.display = "block";
    posterLink.style.borderColor = "red";
  } else {
    urlErrorElem.style.display = "none";
    posterLink.style.borderColor = "#9346f5";
  }

  if (isValid === true) {
    addProductToApi(
      titleValue,
      priceValue,
      descriptionValue,
      posterLinkValue,
      featuredValue,
      featuredRankingValue,
      editionValue
    );
  } else {
    console.log("Is not valid");
  }
});

if (toggleBtn.checked == false) {
  featuredRankingElem.style.display = "none";
}

toggleBtn.addEventListener("change", () => {
  if (toggleBtn.checked == false) {
    featuredRankingElem.style.display = "none";
  } else {
    featuredRankingElem.style.display = "block";
  }
});

createPreview();
