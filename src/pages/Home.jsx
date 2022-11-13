import React from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import SearchLocation from "../components/SearchLocation";
import AddLocation from "../components/AddLocation";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchLocation />
      <AddLocation />
    </div>
  );
};

export default Home;
