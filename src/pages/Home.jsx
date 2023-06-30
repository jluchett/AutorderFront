//page Home.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import HeaderBar from "../components/HeaderBar";
import "../styles/Home.css";
import Footer from "../components/Footer";
import Body from "../components/Body";

const Home = () => {
  return (
    <div className="app">
      <HeaderBar />
      <div className="content">
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
