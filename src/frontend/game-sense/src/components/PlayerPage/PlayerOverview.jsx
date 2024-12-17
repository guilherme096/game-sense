import PlayerStatsCard from "../PlayerPage/PlayerStatsCards.jsx";
import GeneralCard from "../cards/GeneralCard.jsx";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

function getPlayerString(position) {
    switch (position) {
        case 1:
            return "Goalkeeper";
        case 2:
            return "Right Back";
        case 3:
            return "Left Back";
        case 4:
        case 5:
            return "Center Back";
        case 6:
            return "Defensive Midfielder";
        case 7:
            return "Winger";
        case 8:
            return "Central Midfielder";
        case 9:
            return "Striker";
        case 10:
            return "Attacking Midfielder";
        case 11:
            return "Forward";
        default:
            return "Unknown";
    }
}

function PlayerOverview({ playerData }) {
    const fetchPlayerMainStats = async () => {
        console.log("Fetching player main stats");
        try {
            const response = await axios.get(`/api/v1/player/${playerData.id}/statistics`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/json",
                },
            });
            console.log("Player Main Stats API Response:", response.data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Main stats not found for player:", playerData.id);
                return []; // Return an empty array if stats are not found
            }
            throw error; // Rethrow the error if it’s not a 404
        }
    };

    const { data: mainStats = [], isLoadingMainStats, errorMainStats } = useQuery(
        ["mainStats", playerData.id],
        fetchPlayerMainStats,
        {
            retry: false, // Disable retries for 404 errors
        }
    );

    if (isLoadingMainStats) {
        console.log("Main stats data is loading...");
        return <div>Loading Main Stats...</div>;
    }

    if (errorMainStats && errorMainStats.response?.status !== 404) {
        console.error("Error fetching main stats:", errorMainStats);
        return <div>An error has occurred: {errorMainStats?.message}</div>;
    }

    // Function to sum stats across all games
    const sumStats = (stats) => {
        const summedStats = {
            goals: 0,
            assists: 0,
            fouls: 0,
            yellowCards: 0,
            redCards: 0,
            saves: 0,
            minutesPlayed: 0,
            rating: 0, // You may want to calculate an average or sum for the rating, depending on your needs.
        };

        // Ensure stats is an array before using .forEach
        if (Array.isArray(stats)) {
            stats.forEach((stat) => {
                summedStats.goals += stat.goals || 0;
                summedStats.assists += stat.assists || 0;
                summedStats.fouls += stat.fouls || 0;
                summedStats.yellowCards += stat.yellowCards || 0;
                summedStats.redCards += stat.redCards || 0;
                summedStats.saves += stat.saves || 0;
                summedStats.minutesPlayed += stat.minutesPlayed || 0;
                summedStats.rating += stat.rating || 0; // Rating may need averaging, not summing
            });

            // Calculate average rating if you prefer that
            if (stats.length > 0) {
                summedStats.rating = (summedStats.rating / stats.length).toFixed(2);
            }
        }

        return summedStats;
    };

    // Sum the stats
    const summedStats = sumStats(mainStats);

    // Prepare stats for PlayerStatsCard
    const statCard = [
        { label: "Age", value: playerData.age },
        { label: "Height", value: `${playerData.height} m` },
        { label: "Weight", value: `${playerData.weight} kg` },
        { label: "Jersey", value: playerData.jerseyNumber },
        { label: "Position", value: getPlayerString(playerData.position) },
        { label: "Country", value: playerData.country },
    ];

    // If mainStats is empty, show "No available data"
    const renderMainStats = () => {
        if (!mainStats || mainStats.length === 0) {
            return (
                <div className="text-center text-gray-500 py-4">
                    No available data
                </div>
            );
        }
    
        // Sum the stats
        const summedStats = sumStats(mainStats);
    
        // Check if all summedStats values are zero (indicating no real data)
        const allStatsZero = Object.values(summedStats).every(value => value === 0 || value === "0.00");
        if (allStatsZero) {
            return (
                <div className="text-center text-gray-500 py-4">
                    Player has not played any games yet
                </div>
            );
        }
    
        return (
            <div className="grid grid-cols-3 gap-4 p-5">
                {Object.entries(summedStats).map(([key, value]) => {
                    const isRating = key === "rating";
                    const ratingColor =
                        value < 5
                            ? "text-red-500"
                            : value >= 5 && value <= 7
                            ? "text-yellow-500"
                            : "text-green-500";
    
                    return (
                        <div key={key} className="text-center">
                            <p className="text-sm font-semibold text-gray-500">
                                {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                            </p>
                            <p className={`text-lg font-bold ${isRating ? ratingColor : ""}`}>
                                {value}
                            </p>
                        </div>
                    );
                })}
            </div>
        );
    };
    

    return (
        <>
            <div className="w-[90%] mx-auto space-y-4">
                {/* Player Stats Card */}
                <PlayerStatsCard stats={statCard} />

                {/* Main Stats */}
                <GeneralCard title="Main Stats">
                    {renderMainStats()}
                </GeneralCard>
            </div>
        </>
    );
}

export default PlayerOverview;

PlayerOverview.propTypes = {
    playerData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        injured: PropTypes.bool.isRequired,
    }).isRequired,
    mainStats: PropTypes.arrayOf(
        PropTypes.shape({
            goals: PropTypes.number.isRequired,
            assists: PropTypes.number.isRequired,
            fouls: PropTypes.number.isRequired,
            yellowCards: PropTypes.number.isRequired,
            redCards: PropTypes.number.isRequired,
            saves: PropTypes.number.isRequired,
            minutesPlayed: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
        })
    ).isRequired,
    statCard: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
};
