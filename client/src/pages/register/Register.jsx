import "./register.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "./../../contexts/AuthContext";
import { useHistory } from "react-router";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const history = useHistory();

  // Context
  const { register } = useContext(AuthContext);

  const handleClick = (event) => {
    event.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      if (register(user)) history.push("/login");
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <div className="registerLogo">Lamasocial</div>
          <div className="registerDesc">
            Connect with friends and the world around you on Lammasocial
          </div>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <form className="registerForm" onSubmit={handleClick}>
              <input
                type="text"
                className="registerInput"
                placeholder="Username"
                ref={username}
                required
              />
              <input
                type="email"
                className="registerInput"
                placeholder="Email"
                ref={email}
                required
              />
              <input
                type="password"
                className="registerInput"
                placeholder="Password"
                ref={password}
                required
                minLength="6"
              />
              <input
                type="password"
                className="registerInput"
                placeholder="Password Again"
                ref={passwordAgain}
                required
                minLength="6"
              />
              <button className="registerBtn" type="submit">
                Sign up
              </button>
            </form>
            <Link to="/login" className="redirectLink">
              <button className="registerRegisterBtn">
                Login into Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
