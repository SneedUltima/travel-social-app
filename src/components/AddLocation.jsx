import React, { useContext, useState } from "react";
import "../styles/UserPanel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc } from "firebase/firestore";
import { Storage, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddLocation = () => {
  const { currentUser, setDocs } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState("");

  const handleFile = (e) => {
    const fileSize = e.target.files[0].size;
    const fileMb = fileSize / 1000;
    if (fileMb <= 210) {
      setFile(e.target.files[0]);
    } else {
      alert("File size too large");
      setFile("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const year = new Date().getFullYear();
    let monthNumber = new Date();
    let month = monthNumber.toLocaleString("default", { month: "short" });
    const day = new Date().getDate();
    const date = `${day} ${month} ${year}`;
    const title = e.target[0].value;
    const message = e.target[1].value;
    const tags = e.target[2].value;

    setTitle("");
    setMessage("");
    setTags("");
    setFile("");

    try {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(Storage, name);
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
              comments: [],
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
                  comments: [],
                },
              },
            ]);
          });
        }
      );
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="panel-wrapper">
      <div className="panel-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title of Location"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <textarea
            name="message"
            id="message"
            cols="16"
            rows="8"
            placeholder="Message"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          ></textarea>
          <input
            type="text"
            placeholder="Tags"
            onChange={(event) => setTags(event.target.value)}
            value={tags}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => handleFile(e)}
          />
          <label htmlFor="file">
            <FontAwesomeIcon id="file-icon" icon={faImages} />
            <span>Add an Image</span>
            <p id="warning">Max file size 210 KB</p>
          </label>
          {error && <span id="error">Something went wrong</span>}
          <button
            type="submit"
            disabled={!title || !message || !tags || currentUser.isAnonymous}
          >
            Add Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLocation;
