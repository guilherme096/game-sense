import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

export default function ClubCard({ clubData, leagueClubData}) {
  const [isFollowed, setIsFollowed] = useState(clubData.starred);

  const handleFollowClick = () => {
    setIsFollowed((prev) => !prev);
  };

  console.log("Club Data:", clubData);
  console.log("League Club Data:", leagueClubData);
  console.log("leagueId:", leagueClubData.leagueId);

  // Fetch league information
  const fetchLeagueInformation = async () => {
    console.log("Fetching league information with leagueId:", leagueClubData.leagueId);
    const response = await axios.get(`/api/v1/league/${leagueClubData.leagueId}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    console.log("League API Response:", response.data);
    return response.data;
  };

  const {data: league,isLoading: isLoadingLeague, error: errorLeague} = useQuery(
    ["leagueInformation", leagueClubData.leagueId],
     fetchLeagueInformation, 
     { enabled: !!leagueClubData.leagueId});

  if (isLoadingLeague) {
    console.log("League data is loading...");
    return <div>Loading League Data...</div>;
  }

  if (errorLeague || !league) {
    console.error("Error fetching league data:", errorLeague);
    const errorMessage =
        errorLeague?.response?.data?.message || // API-specific error message
        errorLeague?.message || // Generic Axios error message
        "Unknown error"; // Fallback message
    return (
        <div>
            An error has occurred while fetching league data: {errorMessage}
        </div>
    );
  }

  const leagueName = league.name || "Unknown League";

  return (
    <div className="card card-side bg-base-100 shadow-xl m-4 flex items-center relative overflow-hidden rounded-lg">
      <div
        className="absolute"
        style={{
          top: "75%",
          left: "-5%",
          width: "200%",
          height: "400%",
          transform: "rotate(165deg)",
          backgroundColor: "#333D4D",
          zIndex: 1,
        }}
      />
      <div className="flex flex-row w-full items-center justify-between z-10">
        <div className="flex items-center p-4">
          <img
            src={clubData.logo}
            alt={clubData.name}
            className="w-[10rem] h-[10rem] object-contain"
          />
        </div>
        <div className="flex flex-col text-black ml-4">
          <span className="text-xl font-bold">{clubData.name}</span>
          <span className="text-sm text-gray-700 cursor-pointer" onClick={() => navigate(`/leaguePage`)}>
            {leagueClubData.place}º {leagueName}
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
        starred: PropTypes.bool.isRequired,
    }).isRequired,
    leagueClubData: PropTypes.shape({
        place: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired,
        countryFlag: PropTypes.string.isRequired,
    }).isRequired,
    isFollowed: PropTypes.bool.isRequired,
    setIsFollowed: PropTypes.func.isRequired,
    handleFollowClick: PropTypes.func.isRequired,
};
