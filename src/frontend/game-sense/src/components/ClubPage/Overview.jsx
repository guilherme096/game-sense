import LastMatchesCard from "./LastMatchesCard";
import InjuryStatusCard from "./InjuryStatusCard";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

export default function Overview({ clubData, id }) {
  const fetchPlayersFromClub = async () => {
    console.log("Fetching players from club");
    const response = await axios.get(`/api/v1/player/club/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    console.log("Players API Response:", response.data);
    return response.data;
  };

  // Query for players
  const {
    data: playerFromClub,
    isLoading: playersLoading,
    error: playersError,
  } = useQuery(["playerFromClub", id], fetchPlayersFromClub);

  if (playersLoading) {
    console.log("Data is loading...");
    return <div>Loading...</div>;
  }

  if (playersError) {
    console.error("Error fetching data:", playersError);
    return (
      <div>
        An error has occurred: {playersError?.message}
      </div>
    );
  }

  if (!Array.isArray(playerFromClub)) {
    console.error("Unexpected response format for players.");
    return <div>An error occurred while fetching players.</div>;
  }

  // Debugging the `injured` property
  console.log("Raw Players Data:", playerFromClub);

  // Ensure injured is a boolean (normalize data if necessary)
  const injuredPlayers = playerFromClub.filter((player) => {
    const isInjured = Boolean(player.injured); // Explicitly cast to boolean
    console.log(`Player: ${player.name}, Injured: ${isInjured}`);
    return isInjured;
  });

  console.log("Injured Players:", injuredPlayers);

  return (
    <>
      <LastMatchesCard id={id} />
      <InjuryStatusCard injuredPlayers={injuredPlayers} />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

Overview.propTypes = {
  clubData: PropTypes.shape({
    nextGame: PropTypes.object, // Optional, since you check for null
  }),
  id: PropTypes.string.isRequired,
};
