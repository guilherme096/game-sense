import Overview from "./Overview.jsx";
import OverviewNotLive from "./OverviewNotLive.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import ScoreBoard from "../components/GamePage/ScoreBoard.jsx";
import ScoreBoardNotLive from "../components/GamePageNotLive/ScoreBoardNotLive.jsx";
import Standings from "../components/standings/Standings.jsx";
import StatisticsTab from "../components/StatisticsTab.jsx";
import PageTemplate from "./PageTemplate.jsx";
import { useParams } from "react-router-dom";

function Game({ isLive }) {
    const { id } = useParams();

    const liveTabs = [
        { name: "Overview", content: <Overview id={id} /> },
        { name: "Stats", content: <StatisticsTab id={id} /> },
        { name: "Standings", content: <Standings showHeader={false} /> },
    ];

    const notLiveTabs = [
        { name: "Overview", content: <OverviewNotLive id={id} /> },
        { name: "Standings", content: <Standings showHeader={false} /> },
    ];

    return (
        <PageTemplate>
            <div className="p-4 font-semibold pt-0">
                {isLive ? <ScoreBoard id={id} /> : <ScoreBoardNotLive id={id} />}
            </div>
            <HorizontalTab categories={isLive ? liveTabs : notLiveTabs} />
        </PageTemplate>
    );
}

export default Game;
