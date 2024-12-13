import MatchCard from "./MatchCard";
import LastMatchesCard from "./LastMatchesCard";
import InjuryStatusCard from "./InjuryStatusCard";
import { useQuery } from "react-query";
import axios from "axios";

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

  const { data: playerFromClub, isLoading, error } = useQuery(
    ["playerFromClub", id],
    fetchPlayersFromClub
  );

  if (isLoading) {
    console.log("Players are loading...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching players:", error);
    return <div>An error has occurred: {error.message}</div>;
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
      <MatchCard matchData={clubData?.nextGame || null} />
      <LastMatchesCard matches={clubData?.lastGames || []} />
      <InjuryStatusCard injuredPlayers={injuredPlayers} />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
