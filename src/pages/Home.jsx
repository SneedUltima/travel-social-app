import React from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import SearchLocation from "../components/SearchLocation";
import AddLocation from "../components/AddLocation";
import LocationInfo from "../components/LocationInfo";

const Home = () => {
  return (
    <div>
      <Navbar />
      <LocationInfo />
    </div>
  );
};

export default Home;
