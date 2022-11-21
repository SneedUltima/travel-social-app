import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faLightThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "../styles/ItemCard.scss";
import { AuthContext } from "../context/AuthContext";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ItemCard = ({
  image,
  author,
  date,
  tags,
  title,
  message,
  comments,
  likes,
}) => {
  const { setLocationInfo, setClickLocation } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [likeCounter, setLikeCounter] = useState(likes);

  const handleClick = () => {
    setClickLocation(true);
    console.log(image);
    setLocationInfo((existingValues) => ({
      ...existingValues,
      image,
      author,
      date,
      tags,
      title,
      message,
      comments,
      likes,
    }));
  };

  const handleLike = async (title) => {
    setLike(true);
    const likesRef = doc(db, "locations", title);
    await updateDoc(likesRef, {
      likes: increment(1),
    });
    setLikeCounter((prevValue) => prevValue + 1);
  };

  return (
    <div className="item-card-container">
      <div className="image" onClick={() => handleClick()}>
        <img src={image} alt="" />
        <div className="image-text">
          <p>{author}</p>
          <p>{date}</p>
        </div>
      </div>
      <div className="text-container">
        <div className="tags">
          <p>{tags}</p>
        </div>
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="text">
          <p>
            {message.length > 160 ? `${message.substring(0, 160)}...` : message}
          </p>
        </div>
        <div className="likes">
          {like ? (
            <FontAwesomeIcon
              id="like-icon"
              icon={faThumbsUp}
              onClick={() => (like ? setLike(false) : setLike(true))}
            />
          ) : (
            <FontAwesomeIcon
              id="like-icon"
              icon={faLightThumbsUp}
              onClick={() => handleLike(title)}
            />
          )}
          <p>{likeCounter} Likes</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
