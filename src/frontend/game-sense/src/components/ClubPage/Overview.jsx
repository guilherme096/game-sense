import React from "react";
import MatchCard from "./MatchCard";
import LastMatchesCard from "./LastMatchesCard";
import InjuryStatusCard from "./InjuryStatusCard";

export default function Overview({ clubData }) {
  return (
    <>
      <MatchCard matchData={clubData.nextMatch} />
      <LastMatchesCard matches={clubData.lastMatches} />
      <InjuryStatusCard injuries={clubData.injuries} /> 
      <br /><br /> <br /> <br />
    </>
  );
}
