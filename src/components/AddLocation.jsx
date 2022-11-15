import React, { useContext, useState } from "react";
import "../styles/UserPanel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc } from "firebase/firestore";
import { Storage, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddLocation = () => {
  const { currentUser, docs, setDocs } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const year = new Date().getFullYear();
    let monthNumber = new Date();
    let month = monthNumber.toLocaleString("default", { month: "long" });
    const day = new Date().getDate();
    const date = `${day} ${month} ${year}`;
    const title = e.target[0].value;
    const message = e.target[1].value;
    const tags = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const storageRef = ref(Storage, title);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await setDoc(doc(db, "locations", title), {
              title: title,
              tags: tags,
              message: message,
              likes: 0,
              date: date,
              photoURL: downloadURL,
              author: currentUser.displayName,
            });
            setDocs((prevState) => [
              ...prevState,
              {
                data: {
                  title: title,
                  tags: tags,
                  message: message,
                  likes: 0,
                  date: date,
                  photoURL: downloadURL,
                  author: currentUser.displayName,
                },
              },
            ]);
          });
        }
      );
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="panel-wrapper">
      <div className="panel-container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title of Location" />
          <textarea
            name="message"
            id="message"
            cols="16"
            rows="6"
            placeholder="Message"
          ></textarea>
          <input type="text" placeholder="Tags" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <FontAwesomeIcon id="file-icon" icon={faImages} />
            <span>Add an Image</span>
          </label>
          <button type="submit">Add Location</button>
          {error && <span id="error">Something went wrong</span>}
        </form>
      </div>
    </div>
  );
};

export default AddLocation;
