import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export const UserContext = React.createContext();

const Auth = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!localStorage.getItem("token")) setIsAuth(false);
    if (user) setUser(JSON.parse(user));
  }, []);

  const signIn = async (username, password, callback) => {
    const {
      data: { User, AuthorizationToken },
    } = await axios.post("/Authorization/SignIn", {
      device: {
        PlatformCode: "WEB",
        Name: uuid(),
      },
    });

    localStorage.setItem("token", AuthorizationToken.Token);
    localStorage.setItem("user", JSON.stringify(User));
    setUser(User);
    setIsAuth(true);
    callback();
  };

  return (
    <UserContext.Provider value={{ user, signIn, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default Auth;
