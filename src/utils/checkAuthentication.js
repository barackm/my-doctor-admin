import storage from "./storage";

const checkAuthentication = (history) => {
  if (!storage.getAuthToken()) {
    return history.replace("/login");
  } else {
    return history.replace("/");
  }
};

export default checkAuthentication;
