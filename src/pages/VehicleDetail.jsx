// eslint-disable-next-line no-unused-vars
import React from "react";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import InfoVehicle from "../components/InfoVehicle";

const VehicleDetail = () => {
  return (
    <div className="app">
      <HeaderBar />
      <InfoVehicle />
      <Footer />
    </div>
  );
};

export default VehicleDetail;
