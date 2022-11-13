import React from "react";
import Dubrovnik from "../images/dubrovnik.jpg";
import "../styles/ItemInfo.scss";

const LocationInfo = () => {
  return (
    <div className="item-info-container">
      <div className="item-info-wrapper">
        <div className="text-container">
          <div className="title">
            <p>Dubrovnik</p>
          </div>
          <div className="tags">
            <p>#dubrovnik</p>
            <p>#crotia</p>
            <p>#europe</p>
          </div>
          <div className="text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              officia laudantium sed repellendus ratione illo nihil velit!
              Fugiat, cupiditate! Eius ratione consectetur libero accusantium.
              Quisquam.
            </p>
          </div>
          <div className="author-text">
            <p>author</p>
            <p id="time">2 hours ago</p>
          </div>
        </div>
        <div className="image-container">
          <img src={Dubrovnik} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
