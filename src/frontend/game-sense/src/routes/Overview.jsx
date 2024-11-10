import GameTimeline from "../components/GamePage/GameTimeLine.jsx";
import MatchInformationCard from "../components/GamePage/MatchInformationCard.jsx";
import MvpCard from "../components/GamePage/MvpCard.jsx";
import MostSomethingCard from "../components/GamePage/MostSomethingCard.jsx";

import {
  matchInformation,
  mvp,
  mostSomethingCategories,
  gameEvents,
} from "../static/game.js";
export default function Overview() {
  return (
    <>
      <div className="p-4">
        <GameTimeline events={gameEvents} />
      </div>
      <div className="row flex space-x-3">
        {/* Left Side - Match Information */}
        <div className="col w-1/2 pl-4">
          <MatchInformationCard
            kickoff={matchInformation.kickoff}
            referee={matchInformation.referee}
            stadium={matchInformation.stadium}
          />
        </div>

        {/* Right Side - MVP and Carousel */}
        <div className="col flex-col w-1/2 space-y-3 pr-4">
          <div className="row">
            <MvpCard name={mvp.name} score={mvp.score} />
          </div>
          <div className="row pb-3">
            <MostSomethingCard categories={mostSomethingCategories} />
          </div>
        </div>
      </div>
    </>
  );
}
