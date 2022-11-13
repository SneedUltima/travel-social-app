import React, { useState } from "react";
import Dubrovnik from "../images/dubrovnik.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faLightThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "../styles/ItemCard.scss";

const ItemCard = () => {
  const [like, setLike] = useState(false);

  return (
    <div className="item-card-container">
      <div className="image">
        <img src={Dubrovnik} alt="" />
        <div className="image-text">
          <p>author</p>
          <p>2 hours ago</p>
        </div>
      </div>
      <div className="text-container">
        <div className="tags">
          <p>#dubrovnik</p>
          <p>#crotia</p>
          <p>#europe</p>
        </div>
        <div className="title">
          <p>Dubrovnik</p>
        </div>
        <div className="text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            officia laudantium sed repellendus ratione illo nihil velit! Fugiat,
            cupiditate! Eius ratione consectetur libero accusantium. Quisquam.
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
              onClick={() => (like ? setLike(false) : setLike(true))}
            />
          )}
          <p>1 Like</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
