import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LastGames = ({ matches }) => {
  const [gameData, setGameData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchDetails = async () => {
      const updatedMatches = await Promise.all(
        matches.map(async (match) => {
          try {
            // Fetch home and away team logos
            const homeClubResponse = await axios.get(
              `api/v1/club/${match.homeClubId}`
            );
            const awayClubResponse = await axios.get(
              `api/v1/club/${match.awayClubId}`
            );

            const homeLogo = homeClubResponse.data.logo;
            const homeName = homeClubResponse.data.name;
            const awayLogo = awayClubResponse.data.logo;
            const awayName = awayClubResponse.data.name;

            // Fetch events and calculate goals
            const eventsResponse = await axios.get(
              `api/v1/game/${match.id}/events`
            );

            const events = Array.isArray(eventsResponse.data)
              ? eventsResponse.data
              : [];

            const homeGoals = events.filter(
              (event) =>
                event.type === "Goal" && event.event_club_id === match.homeClubId
            ).length;

            const awayGoals = events.filter(
              (event) =>
                event.type === "Goal" && event.event_club_id === match.awayClubId
            ).length;

            return {
              id: match.id,
              homeLogo,
              homeName,
              awayLogo,
              awayName,
              score: `${homeGoals}-${awayGoals}`,
            };
          } catch (error) {
            console.error("Error fetching match details:", error);
            return null;
          }
        })
      );

      setGameData(updatedMatches.filter((match) => match !== null));
    };

    if (matches && matches.length > 0) {
      fetchMatchDetails();
    }
  }, [matches]);

  if (!matches || matches.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-10">
        <span>No matches available! Check back later</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      {/* Scrollable container */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 whitespace-nowrap items-center">
          {/* Individual Game Cards */}
          {gameData.map((match, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-2 shadow-md border rounded-md 
                         bg-neutral-100 flex-shrink-0 w-20 h-20 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => navigate(`/game/${match.id}`)} // Navigate to game details page
            >
              {/* Logos side by side */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <img
                  src={match.homeLogo}
                  alt={match.homeName}
                  className="w-6 h-6 object-contain"
                />
                <img
                  src={match.awayLogo}
                  alt={match.awayName}
                  className="w-6 h-6 object-contain"
                />
              </div>
              {/* Score below the logos */}
              <div className="text-sm font-bold text-center">{match.score}</div>
            </div>
          ))}

          {/* View More Button */}
          <div
            className="flex items-center justify-center shadow-md border rounded-md bg-neutral-100 
                       flex-shrink-0 w-20 h-20 cursor-pointer hover:bg-gray-200 transition"
            onClick={() => navigate("/gamesPage")}
          >
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastGames;
