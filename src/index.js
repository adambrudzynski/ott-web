import ReactDOM from "react-dom";
import React from "react";
import axios from "axios";
import App from "./components/App.jsx";
import "./index.css";

axios.defaults.baseURL = "https://thebetter.bsgroup.eu";
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("app"));
