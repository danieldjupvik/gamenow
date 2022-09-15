import { userKey, tokenKey } from "../utils/keys.js";
export function logoutFunction() {
  const btn = document.querySelector("#logout");
  if (btn) {
    btn.addEventListener("click", function () {
      localStorage.removeItem(userKey);
      localStorage.removeItem(tokenKey);
      location.reload();
    });
  }
}

export function logout() {
  localStorage.removeItem(userKey);
  localStorage.removeItem(tokenKey);
}
