import MatchCard from "./MatchCard";
import LastMatchesCard from "./LastMatchesCard";
import InjuryStatusCard from "./InjuryStatusCard";

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

