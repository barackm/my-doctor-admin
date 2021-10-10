import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import users from "./users";
import doctors from "./doctors";

const reducer = combineReducers({
  auth,
  users,
  doctors,
});

export default reducer;
