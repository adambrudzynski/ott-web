import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../contexts/Auth.jsx";
import Home from "./Home.jsx";
import Login, { RequireAuth } from "./Login.jsx";
import Player from "./Player.jsx";
import Splash from "./Splash.jsx";

const App = () => {
  return (
    <Auth>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Splash />} />
          <Route
            path="/:id"
            element={
              <RequireAuth>
                <Player />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Auth>
  );
};

export default App;
