import Overview from "./Overview.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import ScoreBoard from "../components/GamePage/ScoreBoard.jsx";
import Standings from "../components/standings/Standings.jsx";
import StatisticsTab from "../components/StatisticsTab.jsx";
import PageTemplate from "./PageTemplate.jsx";

const tabs = [
  { name: "Overview", content: <Overview /> },
  { name: "Stats", content: <StatisticsTab /> },
  { name: "Standings", content: <Standings showHeader={false} /> },
];

function Game() {
  return (
    <>
    <PageTemplate>
      <div className="p-4 font-semibold pt-0">
        <ScoreBoard />
      </div>
      <HorizontalTab categories={tabs} />
    </PageTemplate>
    </>
  );
}

export default Game;
