import MatchCard from "./MatchCard";
import LastMatchesCard from "./LastMatchesCard";
import InjuryStatusCard from "./InjuryStatusCard";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import axios from "axios";

export default function Overview({ clubData, id }) {

  const fetchPlayersFromClub = async () => {
    console.log("fetching players from club");
    const response = await axios.get("/api/v1/player/club/" + id, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
        },
    });
    return response.playerFromClub;
  }

  const { playerFromClub: playerFromClub, isLoading, error } = useQuery("playerFromClub", fetchPlayersFromClub);
  console.log("LeagueClub");
  console.log(playerFromClub);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  const injuredPlayers = playerFromClub.filter(player => player.injured);

  return (
    <>
      <MatchCard matchData={clubData.nextGame} />
      <LastMatchesCard matches={clubData.lastGames} />
      <InjuryStatusCard injuredPlayers={injuredPlayers} />
      <br /><br /> <br /> <br />
    </>
  );
}

Overview.propTypes = {
  clubData: PropTypes.shape({
    nextGame: PropTypes.shape({
      league: PropTypes.string.isRequired,
      homeTeam: PropTypes.string.isRequired,
      homeTeamLogo: PropTypes.string.isRequired,
      awayTeam: PropTypes.string.isRequired,
      awayTeamLogo: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
    lastGames: PropTypes.arrayOf(
      PropTypes.shape({
        awayTeam: PropTypes.string.isRequired,
        awayTeamLogo: PropTypes.string.isRequired,
        homeTeam: PropTypes.string.isRequired,
        homeTeamLogo: PropTypes.string.isRequired,
        score: PropTypes.string.isRequired,
        result: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
