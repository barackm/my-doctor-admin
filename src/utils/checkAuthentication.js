import storage from "./storage";

const checkAuthentication = () => {
  if (!storage.getAuthToken()) return false;
  return true;
};

export default checkAuthentication;
