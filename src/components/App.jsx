import React from "react";
import Auth from "../contexts/Auth.jsx";
import Splash from "./Splash.jsx";

const App = () => {
  return (
    <Auth>
      <Splash />
    </Auth>
  );
};

export default App;
