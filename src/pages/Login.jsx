import React from "react";
import { useState } from "react";
import "../styles/Account.scss";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
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
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
