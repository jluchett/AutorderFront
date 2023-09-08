// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../store";

const InfoOrder = () => {
  const { orders } = useStore();
  const { idOrden } = useParams();
  const orderNum = parseInt(idOrden);
  const ordenM = orders.find((order) => order.id === orderNum);

  return (
    <div>
      <h1>InfoOrder</h1>
      <span>Hola mundo</span>
    </div>
  );
};

export default InfoOrder;
