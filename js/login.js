import { createMessage } from "./components/createMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { url as baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";

const form = document.querySelector("form");
const usernameElem = document.querySelector("#username");
const passwordElem = document.querySelector("#password");
const messageContainer = document.querySelector(".message-container");
const usernameErrorElem = document.querySelector(".error__username");
const passwordErrorElem = document.querySelector(".error__password");

const token = getToken();
if (token.length > 1) {
  location.href = "/";
}

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  messageContainer.innerHTML = "";
  const usernameValue = usernameElem.value.trim();
  const passwordValue = passwordElem.value.trim();
  let isValid = true;

  if (usernameValue.length < 2) {
    isValid = false;
    usernameErrorElem.style.display = "block";
    usernameElem.style.borderColor = "red";
  } else {
    usernameErrorElem.style.display = "none";
    usernameElem.style.borderColor = "#9346f5";
  }

  if (passwordValue.length < 6) {
    isValid = false;
    passwordErrorElem.style.display = "block";
    passwordElem.style.borderColor = "red";
  } else {
    passwordErrorElem.style.display = "none";
    passwordElem.style.borderColor = "#9346f5";
  }

  if (isValid === true) {
    login(usernameValue, passwordValue);
    console.log("Is valid");
  } else {
    passwordElem.value = "";
    console.log("Is not valid");
  }
}

async function login(username, password) {
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({
    identifier: username,
    password: password,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    if (json.user) {
      console.log(json.jwt);
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/";
    }
    if (json.error) {
      createMessage(
        "error",
        `${json.message[0].messages[0].message}`,
        ".message-container"
      );
      usernameElem.value = "";
      passwordElem.value = "";
    }
  } catch (error) {
    console.log(error);
  }
}
