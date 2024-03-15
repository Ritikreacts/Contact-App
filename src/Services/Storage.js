//set data of user in localStorage
export const setUsersInStorage = (users) => {
  return localStorage.setItem("users", JSON.stringify(users));
};

//get data of user from localStorage
export const getUsersInStorage = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

//set session of user
export const setSession = (userId) => {
  return sessionStorage.setItem("activeUserId", userId);
};

//get session of user
export const getSession = () => {
  return sessionStorage.getItem("activeUserId") || null;
};

//save contacts of user in localStorage
export const setContactInStorage = (userId, contact) => {
  return localStorage.setItem(userId, JSON.stringify(contact));
};

//get contacts of user in localStorage
export const getContactInStorage = (userId) => {
  return JSON.parse(localStorage.getItem(userId)) || [];
};
