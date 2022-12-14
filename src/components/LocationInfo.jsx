import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/ItemInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  doc,
  updateDoc,
  arrayUnion,
  query,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const LocationInfo = () => {
  const { locationInfo, currentUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    const title = locationInfo.title;
    const q = query(collection(db, "locations"), where("title", "==", title));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let commentsArr = [];
      QuerySnapshot.forEach((comment) => {
        commentsArr.push(...comment.data().comments);
      });
      setComments(commentsArr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleAdd = async (title) => {
    if (comment === "") {
      alert("Please add a valid comment");
      return;
    }
    const commentsRef = doc(db, "locations", title);
    await updateDoc(commentsRef, {
      comments: arrayUnion({
        author: currentUser.displayName,
        comment: comment,
        image: currentUser.photoURL,
      }),
    });
    setOpenModal(false);
  };

  return (
    <div className="item-info-container">
      <div className="item-info-wrapper">
        <div className="text-container">
          <div className="title">
            <p>{locationInfo.title}</p>
          </div>
          <div className="tags">
            <p>{locationInfo.tags}</p>
          </div>
          <div className="text">
            <p>{locationInfo.message}</p>
          </div>
          <div className="author-text">
            <p>Created by {locationInfo.author}</p>
            <p id="time">At {locationInfo.date}</p>
          </div>
          <div className="button">
            <button onClick={() => window.location.reload(false)}>
              Return
            </button>
          </div>
        </div>
        <div className="image-container">
          <img src={locationInfo.image} alt="" />
        </div>
      </div>
      <div className="comments-container">
        <p id="title">Comments</p>
        {!comments
          ? null
          : comments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="comment-image-container">
                  <img src={comment.image} alt="" />
                </div>
                <div className="comment-text-container">
                  <p>{comment.author}</p>
                  <p id="comment">"{comment.comment}"</p>
                </div>
              </div>
            ))}
        <button>
          <div className="button-plus">
            <FontAwesomeIcon id="button-icon" icon={faPlus} />
          </div>
          <div
            className="button-text"
            onClick={() =>
              !currentUser.isAnonymous
                ? setOpenModal(true)
                : setOpenModal(false)
            }
          >
            Add a comment
          </div>
        </button>
        {openModal && (
          <div className="comment-modal">
            <input
              type="text"
              placeholder="Add your thoughts..."
              onChange={handleChange}
            />
            <button>
              <FontAwesomeIcon
                id="add-icon"
                icon={faPlus}
                onClick={() => handleAdd(locationInfo.title)}
              />
            </button>
            <button onClick={() => setOpenModal(false)}>
              <FontAwesomeIcon id="close-icon" icon={faXmark} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInfo;
