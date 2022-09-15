import * as menu from "./menu/hamburgerMenu.js";
import { dynamicMenu } from "./menu/dynamicMenu.js";
import { getUser, getToken } from "./utils/storage.js";
import { url as baseUrl } from "./settings/api.js";
import { createMessage } from "./components/createMessage.js";
import { logout } from "./functions/logoutBtnFunction.js";
import { resetPassword } from "./API/resetPassword.js";
import { deleteUserFromApi } from "./API/deleteUserFromApi.js";
import { updateProfileInfo } from "./API/updateProfileInfo.js";
dynamicMenu();

const welcomeElm = document.querySelector(".welcome");
const profileElem = document.querySelector(".profile-div");
const passwordChangeElem = document.querySelector(".passwordChange-div");
const loader = document.querySelector(".cart-loader");
const user = getUser();

if (!user) {
  location.href = "./login.html";
}
const token = getToken();

(async function () {
  const url = baseUrl + "/users/me";

  const options = {
    method: "GET",
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
      welcomeElm.style.display = "block";
      loader.style.display = "none";
      const createdTime = convertTime(json.created_at);
      const updatedTime = convertTime(json.updated_at);
      let emailConfirmed = "";
      if (user.confirmed == true) {
        emailConfirmed = "Yes";
      } else {
        emailConfirmed = "No";
      }
      welcomeElm.innerHTML = `Hi, ${json.username}!`;
      profileElem.innerHTML = `
      <form class="profile-form">
        <h3 class="profile-section__heading">Profile Information</h3>
        <div class="profile-form__wrapper">
          <label class="profile-form__wrapper--label" for="username">Username</label>
          <label class="error__username" for="username" >Username require 2 characters</label>
          <input class="profile-form__wrapper--input username" id="username"></input>
        </div>
        <div class="profile-form__wrapper">
          <label class="profile-form__wrapper--label" for="email">Email</label>
          <label class="error__email" for="email" >Enter a valid email</label>
          <input type="email" class="profile-form__wrapper--input email" id="email"></input>
        </div>
        <div class="profile-form__wrapper">
          <label class="profile-form__wrapper--label" >Email Confirmed</label>
          <div class="profile-form__wrapper--input profile-border">${emailConfirmed}</div>
        </div>
        <div class="profile_form_div">
          <div class="profile-form__wrapper">
            <label class="profile-form__wrapper--label">Created</label>
            <div class="profile-form__wrapper--input profile-border">${createdTime}</div>
          </div>
          <div class="profile-form__wrapper">
            <label class="profile-form__wrapper--label">Updated</label>
            <div class="profile-form__wrapper--input profile-border">${updatedTime}</div>
          </div>
        </div>
        <div class="profile-form__wrapper">
          <label class="profile-form__wrapper--label">Account Type</label>
          <div class="profile-form__wrapper--input profile-border">${json.role.name}</div>
        </div>
        <div class="profile-message"></div>
        <button type="submit" class="btn fullWidthBtn blue-btn updateBtn">Update Profile</button>
      </form>

      `;
      passwordChangeElem.innerHTML = `
      <form class="password-form">
        <h4 class="profile-section__heading">Change Password</h4>
        <div class="profile-form__wrapper">
          <label class="profile-form__wrapper--label" for="newPassword">New Password</label>
          <input type="password" class="profile-form__wrapper--input newPassword" id="newPassword"></input>
        </div>
        <div class="profile-form__wrapper">
          <label class="profile-form__wrapper--label" for="newConfirmPassword">Confirm New Password</label>
          <input type="password" class="profile-form__wrapper--input newConfirmPassword" id="newConfirmPassword"></input>
        </div>
        <div class="password-message"></div>
        <button type="submit" class="blue-btn btn fullWidthBtn changePwBtn" >Change password</button>
        <div class="deleteUser-container">
        <h5 class="profile-section__heading">Delete Account</h5>
        <p>If you want to delete your account you can do it here. If you delete it, your account is deleted forever.</p>
          <button type="button" class="red-btn btn deleteUserBtn"> Delete account</button>
        </div>
      </form>
      `;

      const changePwBtn = document.querySelector(".password-form");
      changePwBtn.addEventListener("submit", () => {
        event.preventDefault();
        const passwordElem = document.querySelector(".newPassword");
        const confPasswordElem = document.querySelector(".newConfirmPassword");
        const passwordValue = passwordElem.value.trim();
        const confPasswordValue = confPasswordElem.value.trim();

        if (passwordValue.length >= 6 && confPasswordValue.length >= 6) {
          if (passwordElem.value == confPasswordElem.value) {
            resetPassword(passwordValue, confPasswordValue);
            passwordElem.value = "";
            confPasswordElem.value = "";
            passwordElem.style.borderColor = "#9346f5";
            confPasswordElem.style.borderColor = "#9346f5";
            logout();
            setTimeout(() => {
              window.location = "./login.html";
            }, 3000);
          } else {
            createMessage(
              "warning",
              `Password needs to match`,
              ".password-message"
            );
            passwordElem.style.borderColor = "red";
            confPasswordElem.style.borderColor = "red";
          }
        } else {
          createMessage(
            "warning",
            `Password needs to be 6 characters`,
            ".password-message"
          );
          passwordElem.style.borderColor = "red";
          confPasswordElem.style.borderColor = "red";
        }
      });

      const btn = document.querySelector(".deleteUserBtn");
      btn.addEventListener("click", () => {
        const checkIfDelete = confirm(
          `Sure you want to delete ${json.username}? NB! This can't be undone`
        );
        if (checkIfDelete) {
          deleteUserFromApi();
        }
      });
      const usernameElem = document.querySelector(".username");
      const emailElem = document.querySelector(".email");
      const usernameErrorElem = document.querySelector(".error__username");
      const emailErrorElem = document.querySelector(".error__email");

      usernameElem.value = json.username;
      emailElem.value = json.email;

      const updateBtn = document.querySelector(".profile-form");
      updateBtn.addEventListener("submit", () => {
        event.preventDefault();
        const usernameValue = usernameElem.value.trim();
        const emailValue = emailElem.value.trim();

        let isValid = true;
        console.log(usernameValue.length);

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

        if (isValid === true) {
          updateProfileInfo(usernameValue, emailValue);

          console.log("Is valid");
        } else {
          console.log("Is not valid");
        }
      });
    }
    if (json.error) {
      createMessage("error", `${json.message}`, ".message-container");
      loader.style.display = "none";
      welcomeElm.style.display = "none";
    }
  } catch (error) {
    createMessage("error", `${error}`, ".message-container");
    loader.style.display = "none";
  }
})();

function convertTime(dateToConvert) {
  var d = new Date(dateToConvert);
  var date = d.toLocaleDateString();
  var time = d.toLocaleTimeString();
  var dateAndTime = date + " " + time;
  return dateAndTime;
}

function validateEmail(email) {
  let regEx = /\S+@\S+\.\S+/;
  let checkMail = regEx.test(email);
  return checkMail;
}
