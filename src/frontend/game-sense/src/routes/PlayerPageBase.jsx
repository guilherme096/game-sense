import PageTemplate from "./PageTemplate.jsx";
import EntityCard from "../components/cards/EntityCard.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import player from "../static/player.js";
import PlayerOverview from "../components/PlayerOverview.jsx";

function PlayerPageBase() {
    return (
        <>
            <PageTemplate>
                {/* Entity Card */}
                <EntityCard image={player.image} name1={player.name1} name2={player.name2} />
                {/* Horizontal Tab */}
                <HorizontalTab
                    color_back="bg-gray-700"
                    categories={[
                        { name: "Overview", content: <PlayerOverview /> },
                        { name: "Statistics" },
                        { name: "Injuries" },
                        { name: "Tips" },
                    ]}
                />
            </PageTemplate>
        </>
    );
}

export default PlayerPageBase;
