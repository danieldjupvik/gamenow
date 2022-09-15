import { getToken } from "../utils/storage.js";
import { url as baseUrl } from "../settings/api.js";

export function deleteProductFromApi(id) {
  (async function () {
    const doDelete = confirm("Are you sure want to delete?");
    if (doDelete) {
      const url = baseUrl + "/products/" + id;
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        location.href = "/products.html";
      } catch (error) {
        console.log(error);
      }
    }
  })();
}
