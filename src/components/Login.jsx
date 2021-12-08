import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { UserContext } from "../contexts/Auth.jsx";

const Login = () => {
  const { signIn } = useContext(UserContext);
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

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>
        <label>
          Password: <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
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
