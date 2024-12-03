import  { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

export default function ClubCard({ clubData }) {
  const [isFollowed, setIsFollowed] = useState(clubData.isStarred);

  const handleFollowClick = () => {
    setIsFollowed((prev) => !prev);
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl m-4 flex items-center relative overflow-hidden rounded-lg">
      <div
        className="absolute"
        style={{
          top: "65%",
          left: "-5%",
          width: "200%",
          height: "400%",
          transform: "rotate(160deg)",
          backgroundColor: "#333D4D",
          zIndex: 1,
        }}
      />
      <div className="flex flex-row w-full items-center justify-between z-10">
        <div className="flex items-center pl-4">
          <img
            src={clubData.logo}
            alt={`${clubData.name} Logo`}
            className="w-[10rem] h-[10rem] object-contain"
          />
        </div>
        <div className="flex flex-col text-black ml-4">
          <span className="text-xl font-bold">{clubData.name}</span>
          <span className="text-sm text-gray-700">
            {clubData.league_position}º {clubData.league}{" "}
            {clubData.countryFlag && (
              <img
                src={clubData.countryFlag}
                alt="Country"
                className="inline w-4 h-4 ml-1"
              />
            )}
          </span>
        </div>
        <div className="flex items-center mr-3 pt-28">
          <button
            className="flex items-center px-2 py-1 rounded-lg text-xs font-medium shadow bg-gray-100 text-gray-700 w-[90px]"
            onClick={handleFollowClick}
          >
            <FontAwesomeIcon
              icon={isFollowed ? solidStar : regularStar}
              className="mr-1 text-[#FFD700]"
              
            />
            <span>{isFollowed ? "Following" : "Follow"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

ClubCard.propTypes = {
  clubData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    league: PropTypes.string.isRequired,
    league_position: PropTypes.number.isRequired,
    countryFlag: PropTypes.string,
    isStarred: PropTypes.bool.isRequired,
  }).isRequired,
};
