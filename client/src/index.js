import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Security } from "@okta/okta-react";
import config from './app.config';

function onAuthRequired({ history }) {
    history.push('/login');
  }

ReactDOM.render(
  //<React.StrictMode>
    <Router baseName="/login">
      <Security
        issuer={config.issuer}
        client_id={config.client_id}
        redirect_uri={config.redirect_uri}
        onAuthRequired={onAuthRequired}
      >
        <App />
      </Security>
    </Router>,
 // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
