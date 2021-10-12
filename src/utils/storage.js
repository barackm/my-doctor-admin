const authKey = "authToken";

const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key),
  getAuthToken: () => JSON.parse(localStorage.getItem(authKey)),
  setAuthToken: (token) => localStorage.setItem(authKey, JSON.stringify(token)),
  removeAuthToken: () => localStorage.removeItem(authKey),
};

export default storage;
