import MatchCard from "./MatchCard";
import LastMatchesCard from "./LastMatchesCard";
import InjuryStatusCard from "./InjuryStatusCard";

export default function Overview({ clubData }) {
  return (
    <>
      <MatchCard matchData={clubData.nextGame} />
      <LastMatchesCard matches={clubData.lastGames} />
      <InjuryStatusCard injuries={clubData.players} />
      <br /><br /> <br /> <br />
    </>
  );
}

