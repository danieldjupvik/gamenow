import { createMessage } from "../components/createMessage.js";
import { url as baseUrl } from "../settings/api.js";
import { userKey, tokenKey } from "../utils/keys.js";
import { getUser } from "../utils/storage.js";
import { getToken } from "../utils/storage.js";

export async function deleteUserFromApi() {
  const token = getToken();
  const user = getUser();
  const userId = user.id;

  const url = baseUrl + "/users/" + userId;

  const options = {
    method: "DELETE",
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
      localStorage.removeItem(userKey);
      localStorage.removeItem(tokenKey);
      location.href = "/";
    }
    if (json.error) {
      createMessage("error", `${json.message}`, ".profile-message");
    }
  } catch (error) {
    console.log(error);
  }
}
