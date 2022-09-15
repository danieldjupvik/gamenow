import { createMessage } from "../components/createMessage.js";
import { url as baseUrl } from "../settings/api.js";
import { getToken, getUser } from "../utils/storage.js";

const token = getToken();
export async function resetPassword(password, confirmedPassword) {
  const user = getUser();
  const userId = user.id;
  const url = baseUrl + "/users/" + userId;

  const data = JSON.stringify({
    password: password,
    passwordConfirmation: confirmedPassword,
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
    if (json.created_at) {
      createMessage("success", `Password is changed`, ".password-message");
    }
    if (json.error) {
      createMessage("error", `${json.message}`, ".profile-message");
    }
  } catch (error) {
    console.log(error);
  }
}
