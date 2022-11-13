import React from "react";
import "../styles/UserPanel.scss";

const SearchLocation = () => {
  return (
    <div className="panel-wrapper">
      <div className="panel-container">
        <input type="text" placeholder="Search Locations" />
        <input type="text" placeholder="Search Tags" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default SearchLocation;
