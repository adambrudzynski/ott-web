import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/Auth.jsx";

const Splash = ({ children }) => {
  const { signIn, isAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const loginAnonymusly = () =>
    signIn(undefined, undefined, () => {
      navigate("/home", { replace: true });
    });

  return (
    <div className="flex flex-col h-screen p-4 justify-center place-items-center">
      <h1 className="text-5xl">OTT WEB</h1>
      <p className="text-gray-600">Video playback application.</p>
      <button
        type="button"
        className="w-full md:w-2/4 xl:w-1/4 p1 my-4 mx-auto rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:border-transparent bg-gray-600 hover:bg-gray-700"
        onClick={loginAnonymusly}
      >
        Browse as a guest
      </button>
      {!children && (
        <Link to="/login" className="text-purple-400 underline">
          or login Here
        </Link>
      )}
      {children}
    </div>
  );
};

export default Splash;
