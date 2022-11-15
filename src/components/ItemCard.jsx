import React, { useState } from "react";
import Dubrovnik from "../images/dubrovnik.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faLightThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "../styles/ItemCard.scss";

const ItemCard = ({ image, author, date, tags, title, message, likes }) => {
  const [like, setLike] = useState(false);

  return (
    <div className="item-card-container">
      <div className="image">
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
          <p>{message}</p>
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
              onClick={() => (like ? setLike(false) : setLike(true))}
            />
          )}
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
