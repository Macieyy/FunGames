import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css"
import AuthProvider from "./context/AuthContext";

ReactDOM.render(
      <AuthProvider>
        <App />
      </AuthProvider>,
  document.getElementById("root")
);
