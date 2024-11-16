import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MvpCard = ({ name, score }) => {
  return (
    <div className="card-compact rounded-xl bg-base-100 shadow-md">
      <div className="card-body text-center">
        {/* Card Title */}
        <h2 className="card-title text-gray-500">Current MVP</h2>

        {/* MVP Details */}
        <div className="flex flex-col items-center">
          {/* MVP Name */}
          <p className="text-lg font-bold">{name}</p>

          {/* MVP Score */}
          <div className="flex items-center space-x-1">
            <div className="text-lg">{score}</div>
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-400 h-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvpCard;
