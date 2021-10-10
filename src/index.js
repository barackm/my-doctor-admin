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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYwZDc1MTk2ZDRmNmEyODA4ZGRjNmIiLCJuYW1lIjoiQmFyYWNrICIsImVtYWlsIjoiYmFyYWNrQGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiTXVrZWxlbmdhIiwicGhvbmVOdW1iZXIiOiIrMjUwNzgwMDgzMTIyIiwiYWdlIjoiMTk5OS0xMS0xNyIsInByb2ZpbGVJbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS81NTQ2NTEzMz9zPTQwMCZ1PWIwMTNlMzIzNTVhOTU3NGIyMzIxNzBmZTZlOGRjMjhlNWRiOTEyNzkmdj00IiwiZ2VuZGVyIjoiTSIsImNvdW50cnkiOiJSd2FuZGEiLCJjaXR5IjoiS2lnYWxpIiwic3RyZWV0TnVtYmVyIjoiS0cgNzUyIFNUIiwiaXNBZG1pbiI6dHJ1ZSwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE2MzM3NjgyNzV9.Wt2LIV_SDMz_M_QCHhOcZPBaEyNTWWi9CI74kl6_GPc"
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
