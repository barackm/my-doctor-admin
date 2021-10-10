import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { icons } from "./assets/icons";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

React.icons = icons;

const store = configureStore();
localStorage.setItem(
  "authToken",
  JSON.stringify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIyY2RmYjhhNGU1MjAwMTY0NTE5ZGMiLCJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiIiwicGhvbmVOdW1iZXIiOiIiLCJhZ2UiOiIiLCJwcm9maWxlSW1hZ2UiOiIiLCJnZW5kZXIiOiIiLCJjb3VudHJ5IjoiIiwiY2l0eSI6IiIsInN0cmVldE51bWJlciI6IiIsImlzQWRtaW4iOnRydWUsImlzU3VwZXJBZG1pbiI6dHJ1ZSwiaWF0IjoxNjMzODc4MzU2fQ.JnXuHJUciK87KnSTHGC0fASJDSqWyF3VD8C9MIHre0s"
  )
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
