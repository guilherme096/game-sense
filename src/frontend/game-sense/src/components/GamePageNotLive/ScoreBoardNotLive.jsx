import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import shareIcon from "../../../public/icons8-share-256 1.png";

// Fetch game details to get club IDs
const fetchGameDetails = async (id) => {
    const response = await axios.get(`/api/v1/game/${id}`);
    return response.data;
};

// Fetch club details by club ID
const fetchClubDetails = async (clubId) => {
    const response = await axios.get(`/api/v1/club/${clubId}`);
    return response.data;
};

// Fetch match events
const fetchGameEvents = async (id) => {
    const response = await axios.get(`/api/v1/game/${id}/events`);
    return response.data;
};

export default function ScoreBoardNotLive({ id }) {
    const [team1Stared, setTeam1Stared] = useState(false);
    const [team2Stared, setTeam2Stared] = useState(false);
    const navigate = useNavigate();

    // Fetch game details
    const { data: game, isLoading: loadingGame, error: gameError } = useQuery(
        ["gameDetails", id],
        () => fetchGameDetails(id)
    );

    // Fetch events to calculate scores
    const { data: events = [], isLoading: loadingEvents, error: eventsError } = useQuery(
        ["gameEvents", id],
        () => fetchGameEvents(id)
    );

    // Fetch home and away club details
    const {
        data: homeClub,
        isLoading: loadingHomeClub,
        error: homeClubError,
    } = useQuery(
        game?.homeClubId ? ["clubDetails", game.homeClubId] : [],
        () => fetchClubDetails(game.homeClubId),
        { enabled: !!game?.homeClubId }
    );

    const {
        data: awayClub,
        isLoading: loadingAwayClub,
        error: awayClubError,
    } = useQuery(
        game?.awayClubId ? ["clubDetails", game.awayClubId] : [],
        () => fetchClubDetails(game.awayClubId),
        { enabled: !!game?.awayClubId }
    );

    if (loadingGame || loadingEvents || loadingHomeClub || loadingAwayClub) {
        return <div>Loading...</div>;
    }

    if (gameError || eventsError || homeClubError || awayClubError) {
        return <div>Error fetching data</div>;
    }

    // Calculate scores dynamically from events
    const homeGoals = events.filter(
        (event) => event.type === "Goal" && event.event_club_id === game.homeClubId
    ).length;

    const awayGoals = events.filter(
        (event) => event.type === "Goal" && event.event_club_id === game.awayClubId
    ).length;

    return (
        <div className="scoreboard-container">
            {/* Game State */}
            <div className="w-full text-center font-semibold mb-2">
                {game.minute <= 45
                    ? "1st Half"
                    : game.minute > 45 && game.minute < 90
                    ? "2nd Half"
                    : "Full Time"}
            </div>

            {/* Main Scoreboard */}
            <div className="w-full h-fit flex flex-row justify-between align-middle items-center p-4 bg-gray-100 rounded-md shadow-md">
                {/* Home Team Section */}
                <div className="flex flex-row items-center">
                    <div className="flex items-center ml-2">
                        <button onClick={() => setTeam1Stared(!team1Stared)}>
                            <FontAwesomeIcon
                                icon={faStar}
                                className={`w-6 h-6 mr-2 ${
                                    team1Stared ? "text-yellow-400" : "text-gray-400"
                                }`}
                            />
                        </button>
                    </div>
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => navigate(`/club/${game.homeClubId}`)}
                    >
                        <div className="w-24 h-24 bg-base-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {homeClub.logo ? (
                                <img
                                    className="w-full h-full object-contain p-2"
                                    src={homeClub.logo}
                                    alt={`${homeClub.name}'s logo`}
                                />
                            ) : (
                                <span className="text-sm text-gray-500">
                                    {homeClub.name}'s logo
                                </span>
                            )}
                        </div>
                        <div className="text-center mt-2 font-semibold">{homeClub.name}</div>
                    </div>
                </div>

                {/* Match Score */}
                <div className="h-fit flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold">
                        {homeGoals} - {awayGoals}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {game.minute ? `${game.minute}'` : "No Data"}
                    </div>
                    <button className="mt-2">
                        <img
                            src={shareIcon}
                            alt="Share Icon"
                            className="w-6 h-6 cursor-pointer"
                        />
                    </button>
                </div>

                {/* Away Team Section */}
                <div className="flex flex-row items-center">
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => navigate(`/club/${game.awayClubId}`)}
                    >
                        <div className="w-24 h-24 bg-base-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {awayClub.logo ? (
                                <img
                                    className="w-full h-full object-contain p-2"
                                    src={awayClub.logo}
                                    alt={`${awayClub.name}'s logo`}
                                />
                            ) : (
                                <span className="text-sm text-gray-500">
                                    {awayClub.name}'s logo
                                </span>
                            )}
                        </div>
                        <div className="text-center mt-2 font-semibold">{awayClub.name}</div>
                    </div>
                    <div className="flex items-center ml-2">
                        <button onClick={() => setTeam2Stared(!team2Stared)}>
                            <FontAwesomeIcon
                                icon={faStar}
                                className={`w-6 h-6 ml-2 ${
                                    team2Stared ? "text-yellow-400" : "text-gray-400"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
