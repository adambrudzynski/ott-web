import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const UserContext = React.createContext();

const Auth = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (!user) signIn();
  }, []);

  const signIn = async () => {
    const {
      data: { User, AuthorizationToken },
    } = await axios.post("/Authorization/SignIn", {
      device: {
        PlatformCode: "WEB",
        Name: uuid(),
      },
    });
    
    localStorage.setItem("token", AuthorizationToken.Token);
    setUser(User);
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default Auth;
