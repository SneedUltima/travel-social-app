import React from "react";
import "../styles/Navbar.scss";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo">
        <p>Nomad</p>
      </div>
      <div className="user-container">
        <p>img</p>
        <p>User 1</p>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
