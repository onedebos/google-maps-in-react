import React from "react";
import pin from "../pin.png";
import "../styles/pin.css";

const Marker = ({ found }) => {
  return (
    <div className={`${found ? "d-block" : "d-none"}`}>
      <img src={pin} alt="pin" className="pin" />
    </div>
  );
};

export default Marker;
