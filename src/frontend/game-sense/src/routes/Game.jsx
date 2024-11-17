import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";
import Overview from "./Overview.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import ScoreBoard from "../components/GamePage/ScoreBoard.jsx";
import StatisticsTab from "../components/StatisticsTab.jsx";

const tabs = [
  { name: "Overview", content: <Overview /> },
  { name: "Stats", content: <StatisticsTab /> },
];

function Game() {
  return (
    <>
      <Header />
      <div className="p-4 font-semibold pt-0">
        <ScoreBoard />
      </div>
      <HorizontalTab categories={tabs} />
      <Navbar />
    </>
  );
}

export default Game;
