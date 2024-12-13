import Overview from "./Overview.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import ScoreBoard from "../components/GamePage/ScoreBoard.jsx";
import Standings from "../components/standings/Standings.jsx";
import StatisticsTab from "../components/StatisticsTab.jsx";
import PageTemplate from "./PageTemplate.jsx";
import { useParams } from "react-router-dom";

function Game() {
    const id = useParams().id;
    const tabs = [
        {
            name: "Overview",
            content: <Overview id={id} />,
        },
        { name: "Stats", content: <StatisticsTab id={id} /> },
        { name: "Standings", content: <Standings showHeader={false} /> },
    ];
    return (
        <>
            <PageTemplate>
                <div className="p-4 font-semibold pt-0">
                    <ScoreBoard id={id} />
                </div>
                <HorizontalTab categories={tabs} />
            </PageTemplate>
        </>
    );
}

export default Game;
