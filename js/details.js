import * as menu from "./menu/hamburgerMenu.js";
import { getOneProduct } from "./API/getOneProduct.js";
import { createDetails } from "./components/createDetails.js";
import { dynamicMenu } from "./menu/dynamicMenu.js";
import { createMessage } from "./components/createMessage.js";
import { goBackFunction } from "./functions/goBackFunction.js";
dynamicMenu();
goBackFunction();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const detailsElem = document.querySelector(".details");

getOneProduct(id).then(function (data) {
  const result = data.result;
  if (data.success === true) {
    document.title = result.title + " " + "| Game Now";
    createDetails(result, detailsElem);
  } else {
    createMessage("error", `<b>Error message:</b> ${data.error}`, ".details");
  }
});
