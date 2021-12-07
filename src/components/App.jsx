import React from "react";
import Auth from "../contexts/Auth.jsx";
import Home from "./Home.jsx";
import Splash from "./Splash.jsx";

const App = () => {
  return (
    <Auth>
      {/* <Splash /> */}
      <Home />
    </Auth>
  );
};

export default App;
