import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

export const UserContext = React.createContext();

const Auth = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(true);
  let toastId;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!localStorage.getItem("token")) setIsAuth(false);
    if (user) setUser(JSON.parse(user));
  }, []);

  const signIn = async (username, password, callback) => {
    try {
      toastId = toast.loading("Logging in...");
      const payload = { device: { PlatformCode: "WEB", Name: uuid() } };
      if (username && password) {
        payload.Username = username;
        payload.Password = password;
      }

      const promise = await axios.post("/Authorization/SignIn", {
        ...payload,
      });
      const {
        data: { User, AuthorizationToken },
      } = promise;

      if (User) {
        toast.success("Successfully logged in!", {
          id: toastId,
        });
      }

      localStorage.setItem("token", AuthorizationToken.Token);
      localStorage.setItem("user", JSON.stringify(User));
      setUser(User);
      setIsAuth(true);
      callback();
      return promise;
    } catch (error) {
      toast.error(error.response.data.Message, {
        id: toastId,
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, signIn, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default Auth;
