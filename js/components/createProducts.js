import { url as baseUrl } from "../settings/api.js";

export function createProducts(products, target) {
  target.innerHTML = "";
  const { pathname } = document.location;

  products.forEach((products) => {
    let number = `<div class="products--number hideNumber"></div>`;
    let hideNumber = `<div class="products--number">${products.featuredRanking}</div>`;
    if (pathname === "/index.html" || pathname === "/") {
      number = hideNumber;
    }

    target.innerHTML += `
    <div class="products__card">
    <a class="products--link" href="/details.html?id=${products.id}">
      ${number}
      <img
        class="products--img"
        src="${products.image_url}"
        alt="${products.title}"
      />
      <div class="products--title">${products.title}</div>
      <div class="products--edition edition"> ${products.edition} </div>
      <div class="products--price priceTag">$${products.price}</div>
      </a>
    </div>
    `;
  });
  const productsCountElem = document.querySelector(".productsCount-value");
  if (productsCountElem) {
    productsCountElem.innerHTML = `${products.length}`;
  }
}
