import React from "react";
import { useState } from "react";
import "../styles/Account.scss";
import icon from "../images/camera-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [error, setError] = useState(false);

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Sneed Chat</span>
        <span className="title">Register</span>
        <form onSubmit="">
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <FontAwesomeIcon id="cart-icon" icon={faImages} />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>You do not have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
