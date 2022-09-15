import { cartKey, tokenKey, userKey } from "./keys.js";

export function saveProductToStorage(value) {
  saveToStorage(cartKey, value);
}

export function getProductFromStorage() {
  return getFromStorage(cartKey);
}

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function getRole() {
  const role = getFromStorage(userKey);
  if (role.role) {
    return role.role.name;
  }
  return null;
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUserName() {
  const user = getFromStorage(userKey);
  if (user) {
    return user.username;
  }
  return null;
}

export function getUser() {
  const user = getFromStorage(userKey);
  if (user.username) {
    return user;
  }
  return null;
}

//main save and load from localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (value == null) {
    return [];
  }
  return JSON.parse(value);
}
