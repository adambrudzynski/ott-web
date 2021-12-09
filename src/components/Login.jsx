import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { UserContext } from "../contexts/Auth.jsx";
import Splash from "./Splash.jsx";

const Input = ({ label, name, type, required = true }) => (
  <label className="w-full my-1 text-sm">
    {label}
    <input
      className="w-full p1 my-1 rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:border-transparent bg-gray-800 focus:bg-gray-700"
      required={required}
      name={name}
      type={type}
    />
  </label>
);

const Login = () => {
  const { signIn, isAuth } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    signIn(username, password, () => {
      navigate(from, { replace: true });
    });
  };

  if (isAuth) return <Navigate to={from} />;

  return (
    <Splash>
      <div className="mx-auto w-full md:w-2/4 xl:w-1/4">
        <p>Please log in or browse as a guest </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input label="Username:" name="username" type="text" />
          <Input label=" Password:" name="password" type="password" />
          <button
            type="submit"
            className="w-full p1 my-1 rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:border-transparent bg-purple-600 hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    </Splash>
  );
};

const RequireAuth = ({ children }) => {
  const { isAuth } = useContext(UserContext);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
export default Login;
