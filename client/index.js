import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./main.scss";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Switch>
      <App />
    </Switch>
  </Provider>,
  document.getElementById("app")
);
