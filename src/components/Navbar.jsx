import React, { useContext } from "react";
import "../styles/Navbar.scss";
import { signOut } from "firebase/auth";
import { Auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import guestImg from "../images/guest.jpg";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="nav-container">
      <div className="logo">
        <p onClick={() => window.location.reload(false)}>Nomad</p>
      </div>
      <div className="user-container">
        <img
          src={currentUser.photoURL ? currentUser.photoURL : guestImg}
          alt="Profile Picture"
        />
        <p>{currentUser.displayName ? currentUser.displayName : "Guest"}</p>
        <button onClick={() => signOut(Auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
