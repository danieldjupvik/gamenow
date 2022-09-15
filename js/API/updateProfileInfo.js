import { createMessage } from "../components/createMessage.js";
import { url as baseUrl } from "../settings/api.js";
import { getToken, getUser } from "../utils/storage.js";

export async function updateProfileInfo(username, email) {
  const user = getUser();
  const token = getToken();
  const userId = user.id;

  const url = baseUrl + "/users/" + userId;

  const data = JSON.stringify({
    username: username,
    email: email,
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
    if (json.created_at) {
      createMessage("success", `Profile Updated`, ".profile-message");
      location.reload();
    }
    if (json.error) {
      createMessage(
        "error",
        `${json.data[0].messages[0].message}`,
        ".profile-message"
      );
    }
  } catch (error) {
    console.log(error);
  }
}
