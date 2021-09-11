import { useContext, useRef } from "react";
import "./login.css";
import { AuthContext } from "./../../contexts/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = () => {
  // Context
  const {
    state: { user, isFetching, error },
    login,
  } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  const handleClick = (event) => {
    event.preventDefault();
    login({ email: email.current.value, password: password.current.value });
  };

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">Lamasocial</div>
          <div className="loginDesc">
            Connect with friends and the world around you on Lammasocial
          </div>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form className="loginForm" onSubmit={handleClick}>
              <input
                type="email"
                className="loginInput"
                placeholder="Email"
                required
                ref={email}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="Password"
                required
                minLength="6"
                ref={password}
              />
              <button className="loginBtn" disabled={isFetching} type="submit">
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <span className="loginForgot">Forgot password?</span>
            <Link to="/register" className="redirectLink">
              <button className="loginRegisterBtn" disabled={isFetching}>
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
