import PageTemplate from "./PageTemplate.jsx";
import PlayerEntityCard from "../components/PlayerPage/PlayerEntityCard.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import PlayerOverview from "../components/PlayerPage/PlayerOverview.jsx";
import InjuryOverview from "../components/PlayerPage/InjuryOverview.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

function PlayerPageBase() {
    const id = useParams().id;

    const fetchPlayer = async () => {
        console.log("Fetching player");
        const response = await axios.get(`/api/v1/player/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
            },
        });
        console.log("Player API Response:", response.data);
        return response.data;
    };

    const { data: player, isLoading, error } = useQuery(["player", id], fetchPlayer);

    if (isLoading) {
        console.log("Data is loading...");
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching data:", error);
        return <div>An error has occurred: {error?.message}</div>;
    }

    if (!player) {
        console.error("Unexpected response format for player.");
        return <div>An error occurred while fetching player.</div>;
    }

    console.log("Player:", player);

    return (
        <>
            <PageTemplate>
                {/* Entity Card */}
                <PlayerEntityCard name1={player.name} name2={player.surname} playerData={player}/>
                {/* Horizontal Tab */}
                <HorizontalTab
                    color_back="bg-gray-700"
                    categories={[
                        { name: "Overview", content: <PlayerOverview playerData={player} /> },
                        { name: "Statistics" },
                        { name: "Injuries", content: <InjuryOverview playerData={player} /> },
                        { name: "Tips" },
                    ]}
                />
            </PageTemplate>
        </>
    );
}

export default PlayerPageBase;

PlayerPageBase.propTypes = {
    playerData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        injured: PropTypes.bool.isRequired,
    }).isRequired
};
