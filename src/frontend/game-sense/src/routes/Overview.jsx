import GameTimeline from "../components/GamePage/GameTimeLine.jsx";
import MatchInformationCard from "../components/GamePage/MatchInformationCard.jsx";
import MvpCard from "../components/GamePage/MvpCard.jsx";
import MostSomethingCard from "../components/GamePage/MostSomethingCard.jsx";
import { useQuery } from "react-query";
import axios from "axios";

const fetchGame = async (id) => {
  const res = await axios.get("/api/v1/live/" + id);
  return res.data;
};
export default function Overview({ id }) {
  const {
    data: game,
    error,
    isLoading,
  } = useQuery("game", () => fetchGame(id));

  const parsedTopStats =
    game?.topStats?.map((stat) => {
      const [name, rest] = stat.split(": ");
      const [value, ...categoryWords] = rest.split(" ");
      const category = categoryWords.join(" ");
      return { name, value, category };
    }) || [];

  return (
    <>
      <div className="p-4 pt-0">
        <GameTimeline id={id} />
      </div>
      <div className="row flex space-x-3">
        {/* Left Side - Match Information */}
        <div className="col w-1/2 pl-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <MatchInformationCard
              kickoff={game.kickoffTime}
              referee={game.referee}
              stadium={game.stadium}
            />
          )}
        </div>

        {/* Right Side - MVP and Carousel */}
        <div className="col flex-col w-1/2 space-y-3 pr-4">
          <div className="row">
            {isLoading ? (
              <p>Loading MVP...</p>
            ) : error ? (
              <p>Error loading MVP: {error.message}</p>
            ) : (
              <MvpCard name={game.currentMVP} score={9.1} />
            )}
          </div>
          <div className="row pb-3">
            {isLoading ? (
              <p>Loading Top Stats...</p>
            ) : error ? (
              <p>Error loading Top Stats: {error.message}</p>
            ) : (
              <MostSomethingCard categories={parsedTopStats} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
