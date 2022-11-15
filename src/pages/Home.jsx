import React, { useEffect, useState } from "react";
import "../styles/Home.scss";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import SearchLocation from "../components/SearchLocation";
import AddLocation from "../components/AddLocation";
import LocationInfo from "../components/LocationInfo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const query = async () => {
      const docs = await getDocs(collection(db, "locations"));
      docs.forEach((doc) => {
        const data = doc.data();
        setDocs((prevState) => [...prevState, { data }]);
      });
    };

    return () => {
      query();
    };
  }, []);

  console.log(docs);

  return (
    <div>
      <Navbar />
      <div className="home-wrapper">
        <div className="home-container">
          <div className="item-container">
            {docs.map((doc) => (
              <ItemCard
                image={doc.data.photoURL}
                author={doc.data.author}
                date={doc.data.date}
                tags={doc.data.tags}
                title={doc.data.title}
                message={doc.data.message}
                likes={doc.data.likes}
                key={doc.data.title}
              />
            ))}
          </div>
          <div className="user-container">
            <SearchLocation />
            <AddLocation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
