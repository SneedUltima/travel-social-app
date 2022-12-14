import React from "react";
import { useState } from "react";
import "../styles/Account.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Auth, Storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const handleFile = (e) => {
    const fileSize = e.target.files[0].size;
    const fileMb = fileSize / 1000;
    if (fileMb <= 210) {
      setFile(e.target.files[0]);
    } else {
      alert("File size too large, max size 210 KB");
      setFile("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(Auth, email, password);

      const storageRef = ref(Storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            navigate("/");
          });
        }
      );
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Nomad</span>
        <span className="title">Register</span>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => handleFile(e)}
          />
          <label htmlFor="file">
            <FontAwesomeIcon id="file-icon" icon={faImages} />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
          {error && <span id="error">Something went wrong</span>}
        </form>
        <p>
          Have an account?{" "}
          <Link to="/login" id="Link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
