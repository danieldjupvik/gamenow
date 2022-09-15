import * as menu from "./menu/hamburgerMenu.js";
import { getToken, getRole } from "./utils/storage.js";
import { createMessage } from "./components/createMessage.js";
import { createPreview } from "./components/createPreview.js";
import { getOneProduct } from "./API/getOneProduct.js";
import { deleteProductFromApi } from "./API/deleteProductFromApi.js";
import { updateProduct } from "./API/updateProduct.js";
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

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const edition = document.querySelector("#edition");
const posterLink = document.querySelector("#link");
const featuredRankingElem = document.querySelector(".edit__featuredRanking");
const featuredRanking = document.querySelector("#featuredRanking");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");
const preview = document.querySelector(".img-preview");
const editLoader = document.querySelector(".edit-loader");
const editElem = document.querySelector(".edit");
const toggleBtn = document.querySelector("#toggleBtn");
const errorDiv = document.querySelector(".error-div");
const titleErrorElem = document.querySelector(".error__title");
const priceErrorElem = document.querySelector(".error__price");
const urlErrorElem = document.querySelector(".error__url");
const descriptionErrorElem = document.querySelector(".error__description");
const editionErrorElem = document.querySelector(".error__edition");

getOneProduct(id).then(function (data) {
  const result = data.result;
  if (data.success === true) {
    title.value = result.title;
    price.value = result.price;
    edition.value = result.edition;
    description.value = result.description;
    posterLink.value = result.image_url;
    featuredRanking.value = result.featuredRanking;
    preview.innerHTML = `<img class="preview-img" src="${result.image_url}" alt="Preview">`;
    editLoader.style.display = "none";
    editElem.style.display = "flex";
    document.title = result.title + " " + "| Game Now";

    if (result.featured == true) {
      toggleBtn.setAttribute("checked", "");
      featuredRankingElem.style.display = "block";
    } else {
      toggleBtn.setAttribute("unchecked", "");
      featuredRankingElem.style.display = "none";
    }
  } else {
    createMessage("error", `<b>Error message:</b> ${data.error}`, "form");
  }
});

toggleBtn.addEventListener("change", () => {
  if (toggleBtn.checked == false) {
    featuredRankingElem.style.display = "none";
  } else {
    featuredRankingElem.style.display = "block";
  }
});

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
    titleErrorElem.style.display = "none";
    title.style.borderColor = "#9346f5";
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
    updateProduct(
      titleValue,
      priceValue,
      descriptionValue,
      posterLinkValue,
      featuredValue,
      id,
      featuredRankingValue,
      editionValue
    );
  } else {
    console.log("Is not valid");
  }
});

const delBtn = document.querySelectorAll(".edit__delete-btn--icon");
if (delBtn) {
  delBtn.forEach(function (button) {
    button.addEventListener("click", (event) => {
      deleteProductFromApi(id);
    });
  });
}

createPreview();
