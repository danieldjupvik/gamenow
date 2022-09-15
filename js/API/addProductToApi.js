import { getToken } from "../utils/storage.js";
import { createMessage } from "../components/createMessage.js";
import { url as baseUrl } from "../settings/api.js";

const token = getToken();
const form = document.querySelector("form");
const preview = document.querySelector(".img-preview");
const message = document.querySelector(".message-container");

export async function addProductToApi(
  title,
  price,
  description,
  poster,
  featured,
  featuredRankingValue,
  edition
) {
  const url = baseUrl + "/products";

  const data = JSON.stringify({
    title: title,
    price: price,
    image_url: poster,
    description: description,
    featured: featured,
    featuredRanking: featuredRankingValue,
    edition: edition,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    if (json.created_at) {
      createMessage("success", "Game added", ".message-container");
      form.reset();
      preview.innerHTML = `<img class="preview-img" src="https://dummyimage.com/341%E2%80%8Ax447/000000/fff.jpg&text=Image" alt="Preview">`;
      setTimeout(() => {
        message.innerHTML = "";
      }, 5000);
    }

    if (json.error) {
      createMessage(
        "error",
        `Error: ${json.error} <br> Code: ${json.statusCode}`,
        ".message-container"
      );
    }
  } catch (error) {
    createMessage("error", `Error: ${error}`, ".message-container");
  }
}
