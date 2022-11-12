import React from "react";
import { useState } from "react";
import "../styles/Account.scss";

const Login = () => {
  const [error, setError] = useState(false);

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Nomad</span>
        <span className="title">Login</span>
        <form onSubmit="">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign in</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>You do not have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;
