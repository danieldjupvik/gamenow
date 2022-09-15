import { createMessage } from "./components/createMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { url as baseUrl } from "./settings/api.js";

const form = document.querySelector("form");
const usernameElem = document.querySelector("#username");
const emailElem = document.querySelector("#email");
const passwordElem = document.querySelector("#password");
const confPasswordElem = document.querySelector("#confirmPassword");
const messageContainer = document.querySelector(".message-container");
const usernameErrorElem = document.querySelector(".error__username");
const passwordErrorElem = document.querySelector(".error__password");
const confPasswordErrorElem = document.querySelector(".error__conf-password");
const emailErrorElem = document.querySelector(".error__email");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  messageContainer.innerHTML = "";

  const usernameValue = usernameElem.value.trim();
  const emailValue = emailElem.value.trim();
  const passwordValue = passwordElem.value.trim();
  const confPasswordValue = confPasswordElem.value.trim();

  let isValid = true;

  if (usernameValue.length < 2) {
    isValid = false;
    usernameErrorElem.style.display = "block";
    usernameElem.style.borderColor = "red";
  } else {
    usernameErrorElem.style.display = "none";
    usernameElem.style.borderColor = "#9346f5";
  }

  if (validateEmail(emailValue) == false) {
    isValid = false;
    emailErrorElem.style.display = "block";
    emailElem.style.borderColor = "red";
  } else {
    emailErrorElem.style.display = "none";
    emailElem.style.borderColor = "#9346f5";
  }

  if (passwordValue.length < 6) {
    isValid = false;
    passwordErrorElem.style.display = "block";
    passwordElem.style.borderColor = "red";
  } else {
    passwordErrorElem.style.display = "none";
    passwordElem.style.borderColor = "#9346f5";
  }

  if (confPasswordValue.length < 6) {
    isValid = false;
    confPasswordErrorElem.style.display = "block";
    confPasswordElem.style.borderColor = "red";
  } else {
    confPasswordErrorElem.style.display = "none";
    confPasswordElem.style.borderColor = "#9346f5";
  }

  if (passwordValue == confPasswordValue) {
  } else {
    isValid = false;
    createMessage("error", "Password need to match", ".message-container");
    confPasswordElem.style.borderColor = "red";
    passwordElem.style.borderColor = "red";
  }

  if (isValid === true) {
    console.log("Is valid");
    createUser(usernameValue, emailValue, passwordValue);
  } else {
  }
}

async function createUser(username, email, password) {
  const url = baseUrl + "/auth/local/register";

  const data = JSON.stringify({
    username: username,
    email: email,
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
      emailElem.value = "";
      passwordElem.value = "";
    }
  } catch (error) {
    console.log(error);
  }
}

function validateEmail(email) {
  let regEx = /\S+@\S+\.\S+/;
  let checkMail = regEx.test(email);
  return checkMail;
}
