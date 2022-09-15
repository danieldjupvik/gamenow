import * as menu from "./menu/hamburgerMenu.js";
import { getHero } from "./API/getHero.js";
import { getFeatured } from "./API/getFeatured.js";
import { createProducts } from "./components/createProducts.js";
import { dynamicMenu } from "./menu/dynamicMenu.js";
import { createMessage } from "./components/createMessage.js";
dynamicMenu();

const heroElem = document.querySelector(".hero");
const heroElemDesktop = document.querySelector(".desktop");

/* Hero banner */
getHero().then(function (data) {
  const result = data.result;
  if (data.success === true) {
    const heroUrlMobile = result.hero_banner_image_url;
    const heroUrlDesktop = result.hero_banner_desktop_image_url;
    heroElem.style.backgroundImage = `url(${heroUrlMobile})`;
    heroElem.style.backgroundRepeat = `no-repeat`;
    heroElem.style.backgroundPosition = "top center";
    heroElem.style.backgroundSize = "750px";
    heroElemDesktop.style.backgroundImage = `url(${heroUrlDesktop})`;
    heroElemDesktop.style.backgroundRepeat = `no-repeat`;
    heroElemDesktop.style.backgroundPosition = "top center";
    heroElemDesktop.style.backgroundSize = "cover";
  } else {
    createMessage("error", `<b>Error message:</b> ${data.error}`, ".products");
  }
});

/* Best sellers */
const productsElem = document.getElementById("products");
const productsElemDesktop = document.getElementById("products-desktop");

getFeatured().then(function (data) {
  const result = data.result;
  if (data.success === true) {
    createProducts(result, productsElem);
    createProducts(result, productsElemDesktop);
  } else {
    createMessage("error", `<b>Error message:</b> ${data.error}`, "#products");
    createMessage(
      "error",
      `<b>Error message:</b> ${data.error}`,
      "#products-desktop"
    );
  }
});
