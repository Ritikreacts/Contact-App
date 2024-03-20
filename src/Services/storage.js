//set data of user in localStorage
export const setUsersInStorage = (users) => {
  return localStorage.setItem("users", JSON.stringify(users));
};

//get data of user from localStorage
export const getUsersInStorage = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

//set cookie of user
export const setCookie = (userId) => {
  document.cookie = `activeUserId=${userId}`;
  return document.cookie;
};

//get cookie of user
export const getCookie = () => {
  const cookieStored = document.cookie;
  const activeUserId = cookieStored.split("=")[1];
  return activeUserId || null;
};

//save contacts of user in localStorage
export const setContactInStorage = (userId, contact) => {
  return localStorage.setItem(userId, JSON.stringify(contact));
};

//get contacts of user in localStorage
export const getContactInStorage = (userId) => {
  return JSON.parse(localStorage.getItem(userId)) || [];
};
export const clearCookie = () => {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};
