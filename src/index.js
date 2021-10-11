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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYzMzAwOWZiYWIzZDI4M2NlMDhlYjQiLCJuYW1lIjoiY2FsZWIyIiwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJsYXN0TmFtZSI6IiIsInBob25lTnVtYmVyIjoiIiwiYWdlIjoiIiwicHJvZmlsZUltYWdlIjoiIiwiZ2VuZGVyIjoiIiwiY291bnRyeSI6IiIsImNpdHkiOiIiLCJzdHJlZXROdW1iZXIiOiIiLCJpc0FkbWluIjp0cnVlLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYzMzg5MDQ4MH0.VEXZjDw_1qiq4G9BDpT0WPNEzqc80d9Ar3un7ghB4ZU"
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
