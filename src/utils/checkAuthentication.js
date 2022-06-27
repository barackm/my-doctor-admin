import storage from "./storage";

const checkAuthentication = (history) => {
  // if (!storage.getAuthToken()) {
  //   return history?.replace("/login");
  // } else {
  //   return history?.replace("/");
  // }
  console.log("checkAuthentication", history);
  return "/";
};

export default checkAuthentication;
