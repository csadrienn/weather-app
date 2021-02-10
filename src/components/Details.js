import React from "react";
import { icons } from "../weatherIcons";

const Details = ({ parentName, details }) => {
  return (
    <div className={`card card-sec ${parentName}-details`}>
      {details.map((detail, index) => {
        let popupText = detail.name;
        if (popupText === "windDir") {
          popupText = "wind direction";
        }
        if (popupText === "windSpeed") {
          popupText = "wind speed";
        }
        if (popupText === "cloud") {
          popupText = "cloud cover";
        }

        return (
          <div className="info" key={index}>
            <div className="popup">
              <small>{popupText}</small>
            </div>
            {icons[detail.name]}
            <span>{`${detail.value}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Details;
