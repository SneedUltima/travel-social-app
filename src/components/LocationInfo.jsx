import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/ItemInfo.scss";

const LocationInfo = () => {
  const { locationInfo, setClickLocation } = useContext(AuthContext);

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
            <button onClick={() => setClickLocation(false)}>Back home</button>
          </div>
        </div>
        <div className="image-container">
          <img src={locationInfo.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
