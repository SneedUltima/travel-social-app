import React from "react";
import { useState } from "react";
import "../styles/Account.scss";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInAnonymously,
} from "firebase/auth";
import { Auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(Auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  const handleGuestLogin = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Nomad</span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign in</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" id="Link">
            Register
          </Link>
        </p>
        <p>
          Or try a{" "}
          <Link onClick={() => handleGuestLogin()} id="Link">
            Guest Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
