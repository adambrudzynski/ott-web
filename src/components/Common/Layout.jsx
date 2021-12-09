import React, { useContext } from "react";
import { UserContext } from "../../contexts/Auth.jsx";

const Layout = ({ children }) => {
  const { logOut } = useContext(UserContext);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="w-full">
        <button
          type="button"
          className="float-right p-1 my-4 text-sm rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:border-transparent bg-gray-600 hover:bg-gray-700"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
      <div className="pt-12">{children}</div>
    </div>
  );
};

export default Layout;
