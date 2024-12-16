import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import axios from "axios";

function GameCard({ game }) {
    const [homeClub, setHomeClub] = useState(null);
    const [awayClub, setAwayClub] = useState(null);
    const [homeGoals, setHomeGoals] = useState(0);
    const [awayGoals, setAwayGoals] = useState(0);

    const navigate = useNavigate(); // React Router navigate function

    // Fetch team and events data when the component mounts
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const homeClubResponse = await axios.get(
                    `api/v1/club/${game.homeClubId}`
                );
                const awayClubResponse = await axios.get(
                    `api/v1/club/${game.awayClubId}`
                );

                setHomeClub(homeClubResponse.data);
                setAwayClub(awayClubResponse.data);

                const eventsResponse = await axios.get(
                    `api/v1/game/${game.id}/events`
                );

                const events = Array.isArray(eventsResponse.data)
                    ? eventsResponse.data
                    : [];

                const homeGoalsCount = events.filter(
                    (event) =>
                        event.type === "Goal" &&
                        event.event_club_id === game.homeClubId
                ).length;

                const awayGoalsCount = events.filter(
                    (event) =>
                        event.type === "Goal" &&
                        event.event_club_id === game.awayClubId
                ).length;

                setHomeGoals(homeGoalsCount);
                setAwayGoals(awayGoalsCount);
            } catch (error) {
                console.error("Error fetching game details:", error);
            }
        };

        fetchDetails();
    }, [game]);

    if (!homeClub || !awayClub) {
        return <p>Loading...</p>; // Loading state
    }

    return (
        <div
            className="flex flex-row w-full p-5 bg-neutral-100 rounded-lg drop-shadow-lg my-4 items-center cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(`/game/${game.id}`)} // Navigate to game details
        >
            <div className="flex flex-col w-full">
                {/* Home Team */}
                <div
                    className="flex items-center w-full mb-2 cursor-pointer hover:text-blue-600"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering game card click
                        navigate(`/club/${game.homeClubId}`); // Navigate to home club details
                    }}
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                        {homeClub.logo ? (
                            <img
                                className="w-full h-full object-contain"
                                src={homeClub.logo}
                                alt={homeClub.name}
                            />
                        ) : (
                            <div className="text-xs font-semibold text-black">
                                {homeClub.name}
                            </div>
                        )}
                    </div>
                    <div className="text-sm font-bold ml-3">{homeClub.name}</div>
                    <div className="font-extrabold ml-auto">{homeGoals}</div>
                </div>

                {/* Away Team */}
                <div
                    className="flex items-center w-full cursor-pointer hover:text-blue-600"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering game card click
                        navigate(`/club/${game.awayClubId}`); // Navigate to away club details
                    }}
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                        {awayClub.logo ? (
                            <img
                                className="w-full h-full object-contain"
                                src={awayClub.logo}
                                alt={awayClub.name}
                            />
                        ) : (
                            <div className="text-xs font-semibold text-black">
                                {awayClub.name}
                            </div>
                        )}
                    </div>
                    <div className="text-sm font-bold ml-3">{awayClub.name}</div>
                    <div className="font-extrabold ml-auto">{awayGoals}</div>
                </div>
            </div>
        </div>
    );
}

export default GameCard;
