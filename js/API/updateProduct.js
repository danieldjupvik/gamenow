import { getToken } from "../utils/storage.js";
import { createMessage } from "../components/createMessage.js";
import { url as baseUrl } from "../settings/api.js";

const token = getToken();
const message = document.querySelector(".message-container");

export async function updateProduct(
  title,
  price,
  description,
  poster,
  featured,
  id,
  featuredRanking,
  edition
) {
  const url = baseUrl + "/products/" + id;

  const data = JSON.stringify({
    title: title,
    price: price,
    image_url: poster,
    description: description,
    featured: featured,
    featuredRanking: featuredRanking,
    edition: edition,
  });

  const options = {
    method: "PUT",
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

    if (json.updated_at) {
      createMessage("success", "The game is updated", ".message-container");
      setTimeout(() => {
        message.innerHTML = "";
      }, 10000);
    }

    if (json.error) {
      createMessage("error", json.error, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
