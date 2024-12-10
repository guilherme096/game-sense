import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useQuery } from "react-query";
import axios from "axios";

export default function ClubCard({ clubData, id }) {
  const [isFollowed, setIsFollowed] = useState(clubData.isStarred);

  const handleFollowClick = () => {
    setIsFollowed((prev) => !prev);
  };

  // Fetch league club information
  const fetchLeagueClubInformation = async () => {
    console.log("Fetching league club information");
    const response = await axios.get(`/api/v1/league/club/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    console.log("API Response: ", response.data);
    return response.data; // Ensure response structure matches this
  };

  const {
    data: leagueClub,
    isLoading: isLoadingLeagueClub,
    error: errorLeagueClub,
  } = useQuery(["leagueClub", id], fetchLeagueClubInformation);

  if (isLoadingLeagueClub) {
    return <div>Loading...</div>;
  }
  if (errorLeagueClub || !leagueClub) {
    console.error("Error fetching league club: ", errorLeagueClub);
    return <div>An error has occurred: {errorLeagueClub?.message}</div>;
  }

  const leagueId = leagueClub.league_id || leagueClub.leagueId; // Extract the correct field

  // Fetch league information
  const fetchLeagueInformation = async () => {
    console.log("Fetching league information");
    const response = await axios.get(`/api/v1/league/${leagueId}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    console.log("League API Response: ", response.data);
    return response.data;
  };

  const {
    data: league,
    isLoading: isLoadingLeague,
    error: errorLeague,
  } = useQuery(["league", leagueId], fetchLeagueInformation, {
    enabled: !!leagueId, // Ensure this runs only when leagueId is available
  });

  if (isLoadingLeague) {
    return <div>Loading...</div>;
  }
  if (errorLeague || !league) {
    console.error("Error fetching league data: ", errorLeague);
    return <div>An error has occurred: {errorLeague?.message}</div>;
  }

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
            {leagueClub.place}º {league.name}{" "}
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
