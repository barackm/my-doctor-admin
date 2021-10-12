import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import users from "./users";
import doctors from "./doctors";
import tests from "./tests";

const reducer = combineReducers({
  auth,
  users,
  doctors,
  tests,
});

export default reducer;
