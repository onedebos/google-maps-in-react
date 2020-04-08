import React from "react";
import "../styles/MapComponents.css";

export const InfoBox = ({ address, found, didLocationUpdate }) => {
  return (
    <div
      className={`${
        found ? "d-block" : "d-none"
      } card-body bg-light mt-4 mr-4 card`}
    >
      <h5 className="card-title">You're currently at</h5>
      <div className="card-text">{didLocationUpdate ? address : ""}</div>
    </div>
  );
};

export const Button = ({ handleClick }) => {
  return (
    <button
      type="button"
      className="btn btn-primary mb-2"
      onClick={handleClick}
    >
      Find me
    </button>
  );
};
