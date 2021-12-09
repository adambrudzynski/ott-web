import ReactDOM from "react-dom";
import React from "react";
import axios from "axios";
import App from "./components/App.jsx";
import "./index.css";

axios.defaults.baseURL = "https://thebetter.bsgroup.eu";
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error?.response?.data.MessageKey === "TOKEN_EXPIRED" ||
      error?.response?.data.MessageKey === "UNAUTHORIZED"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("app"));
