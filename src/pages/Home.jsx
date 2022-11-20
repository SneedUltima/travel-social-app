import React, { useContext, useEffect, useState } from "react";
import "../styles/Home.scss";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import AddLocation from "../components/AddLocation";
import LocationInfo from "../components/LocationInfo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { docs, setDocs, clickLocation } = useContext(AuthContext);

  useEffect(() => {
    const query = async () => {
      setDocs([]);
      const docs = await getDocs(collection(db, "locations"));
      docs.forEach((doc) => {
        const data = doc.data();
        setDocs((prevState) => [...prevState, { data }]);
      });
    };

    return () => {
      query();
    };
  }, [setDocs]);

  return (
    <div>
      <Navbar />
      <div className="home-wrapper">
        <div className="home-container">
          <div className="item-container">
            {clickLocation ? (
              <LocationInfo />
            ) : (
              docs.map((doc) => (
                <ItemCard
                  image={doc.data.photoURL}
                  author={doc.data.author}
                  date={doc.data.date}
                  tags={doc.data.tags}
                  title={doc.data.title}
                  message={doc.data.message}
                  likes={doc.data.likes}
                  comments={doc.data.comments}
                  key={doc.data.title}
                />
              ))
            )}
          </div>
          <div className="user-container">
            {!clickLocation ? <AddLocation /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
