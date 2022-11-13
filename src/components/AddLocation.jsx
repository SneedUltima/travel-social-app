import React from "react";
import "../styles/UserPanel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

const AddLocation = () => {
  return (
    <div className="panel-wrapper">
      <div className="panel-container">
        <input type="text" placeholder="Title" />
        <textarea
          name=""
          id=""
          cols="18"
          rows="6"
          placeholder="Message"
        ></textarea>
        <input type="text" placeholder="Tags" />
        <input style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
          <FontAwesomeIcon id="file-icon" icon={faImages} />
          <span>Add an Image</span>
        </label>
        <button>Search</button>
        <button id="clear-button">Clear</button>
      </div>
    </div>
  );
};

export default AddLocation;
