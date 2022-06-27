const authKey = "authToken";

const storage = {
  get: (key) => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  },
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value) || ""),
  remove: (key) => localStorage.removeItem(key),
  getAuthToken: () => {
    const token = storage.get(authKey);
    if (token) {
      return token;
    }
  },
  setAuthToken: (token) =>
    localStorage.setItem(authKey, JSON.stringify(token) || ""),
  removeAuthToken: () => localStorage.removeItem(authKey || ""),
};

export default storage;
