import MatchCard from "./MatchCard";
import LastMatchesCard from "./LastMatchesCard";
import InjuryStatusCard from "./InjuryStatusCard";
import PropTypes from "prop-types";

export default function Overview({ clubData }) {
  const injuredPlayers = clubData.players.filter(player => player.injured);
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
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        injured: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
