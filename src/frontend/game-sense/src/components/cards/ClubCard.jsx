import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export default function EntityCard({ image, name, league, rank, countryFlag, initialFollowed }) {
  // Local state for follow status
  const [isFollowed, setIsFollowed] = useState(initialFollowed);

  // Toggle follow state
  const handleFollowClick = () => {
    setIsFollowed((prev) => !prev);
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl m-4 flex items-center relative overflow-hidden rounded-lg">
      {/* Background Div */}
      <div
        className="absolute"
        style={{
          top: "65%",
          left: "-5%",
          width: "200%",
          height: "250%",
          transform: "rotate(160deg)",
          backgroundColor: "#333D4D",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="flex flex-row w-full items-center justify-between z-10">
        {/* Image Section */}
        <div className="flex items-center pl-4">
          <img
            src={image}
            alt="Club Logo"
            className="w-[10rem] h-[10rem] object-contain"
          />
        </div>

        {/* Club Details */}
        <div className="flex flex-col text-black ml-4">
          <span className="text-xl font-bold">{name}</span>
          <span className="text-sm text-gray-700">
            {rank}º {league}{" "}
            {countryFlag && (
              <img
                src={countryFlag}
                alt="Country"
                className="inline w-4 h-4 ml-1"
              />
            )}
          </span>
        </div>

        {/* Follow Button */}
        <div className="flex items-center mr-2 pt-28">
          <button
            className="flex items-center px-2 py-1 rounded-lg text-xs font-medium shadow bg-gray-100 text-gray-700"
            onClick={handleFollowClick}
            style={{ width: "90px" }} 
          >
            <FontAwesomeIcon
              icon={isFollowed ? solidStar : regularStar}
              className="mr-1"
              style={{
                color: "#FFD700",
              }}
            />
            <span>{isFollowed ? "Following" : "Follow"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
