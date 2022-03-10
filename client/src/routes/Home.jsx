import React from "react";
import Header from "../components/Header";
import AddPub from "../components/AddPub";
import PubList from "../components/PubList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddPub />
      <PubList />
    </div>
  );
};

export default Home;
