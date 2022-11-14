import React from "react";
import "../styles/Navbar.scss";
import { signOut } from "firebase/auth";
import { Auth } from "../firebase";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo">
        <p>Nomad</p>
      </div>
      <div className="user-container">
        <p>img</p>
        <p>User 1</p>
        <button onClick={() => signOut(Auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
