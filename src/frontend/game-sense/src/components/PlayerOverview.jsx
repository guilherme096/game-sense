import PlayerStatsCard from "../components/PlayerStatsCards.jsx";
import GeneralCard from "../components/cards/GeneralCard.jsx";
import player from "../static/player.js";

function PlayerOverview() {
    const { leagueStats, mainStats, statCard } = player;

    return (
        <>
            <div className="w-[90%] mx-auto space-y-4">
                {/* Player Stats Card */}
                <PlayerStatsCard stats={statCard} />
                {/* League Score */}
                <GeneralCard title="League Score" button={""}>
                    <div className="flex justify-between items-center p-5">
                        {Object.entries(leagueStats).map(([key, stat]) => {
                            const circleColor =
                                stat.category === "Top 10"
                                    ? "bg-yellow-400"
                                    : stat.category === "Top 30"
                                        ? "bg-gray-400"
                                        : "bg-green-500";

                            return (
                                <div key={key} className="text-center justify-items-center">
                                    <p className="text-sm font-semibold text-gray-500 pb-2">{stat.category}</p>
                                    <div
                                        className={`w-8 h-8 rounded-full ${circleColor} flex items-center justify-center text-white font-bold text-xs`}
                                    >
                                        {stat.rank}
                                    </div>
                                    <p className="text-base font-bold mt-2">
                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </GeneralCard>

                {/* Main Stats */}
                <GeneralCard title="Main Stats" button={"Premier League 24/25"}>
                    <div className="grid grid-cols-3 gap-4 p-5">
                        {Object.entries(mainStats).map(([key, value]) => {
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
                </GeneralCard>
            </div>
        </>
    );
}

export default PlayerOverview;

