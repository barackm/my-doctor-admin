import { configureStore } from "@reduxjs/toolkit";
import api from "./middlewares/api";
import error from "./middlewares/error";
import reducer from "./reducers";

export default function store() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api, error),
  });
}
