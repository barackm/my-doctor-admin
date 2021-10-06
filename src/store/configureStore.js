import { configureStore } from "@reduxjs/toolkit";
import api from "./middlewares/api";
import error from "./middlewares/error";
import auth from "./middlewares/auth";
import reducer from "./reducers";

export default function store() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(auth, api, error),
  });
}
