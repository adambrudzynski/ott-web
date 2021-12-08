import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../contexts/Auth.jsx";
import Home from "./Home.jsx";
import Player from "./Player.jsx";
import Splash from "./Splash.jsx";

const App = () => {
  return (
    <Auth>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Player />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Splash />} />
        </Routes>
      </BrowserRouter>
    </Auth>
  );
};

export default App;
