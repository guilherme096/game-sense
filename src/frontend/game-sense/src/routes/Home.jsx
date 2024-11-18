import PageTemplate from "./PageTemplate";
import GameCard from "../components/Home/YourTeamCard";
import LiveGame from "../components/Home/LiveGame";

const game = {
  schedule: "In two games",
  team1: {
    name: "Manchester United",
    image:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  },
  team2: {
    name: "Chelsea",
    image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  },
};

function Home() {
  return (
    <PageTemplate>
      <div className="w-full flex flex-col px-4">
        <GameCard game={game} />
        <LiveGame game={game} />
      </div>
    </PageTemplate>
  );
}

export default Home;
