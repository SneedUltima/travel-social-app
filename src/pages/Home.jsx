import React from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import SearchLocation from "../components/SearchLocation";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchLocation />
    </div>
  );
};

export default Home;
