import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export default function LastMatchesCard({ id }) {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchMatchesDetails = async () => {
      try {
        const gamesResponse = await axios.get(`/api/v1/game/club/${id}`);
        const games = gamesResponse.data;

        const updatedMatches = await Promise.all(
          games.map(async (game) => {
            try {
              const homeClubResponse = await axios.get(
                `/api/v1/club/${game.homeClubId}`
              );
              const awayClubResponse = await axios.get(
                `/api/v1/club/${game.awayClubId}`
              );

              const eventsResponse = await axios.get(
                `/api/v1/game/${game.id}/events`
              );

              const events = Array.isArray(eventsResponse.data)
                ? eventsResponse.data
                : [];

              const homeGoals = events.filter(
                (event) =>
                  event.type === "Goal" &&
                  event.event_club_id === game.homeClubId
              ).length;

              const awayGoals = events.filter(
                (event) =>
                  event.type === "Goal" &&
                  event.event_club_id === game.awayClubId
              ).length;

              return {
                id: game.id,
                homeTeam: homeClubResponse.data.name,
                homeTeamLogo: homeClubResponse.data.logo,
                awayTeam: awayClubResponse.data.name,
                awayTeamLogo: awayClubResponse.data.logo,
                score: `${homeGoals} - ${awayGoals}`,
                result:
                  homeGoals > awayGoals
                    ? "W"
                    : homeGoals < awayGoals
                    ? "L"
                    : "D",
              };
            } catch (innerError) {
              console.error("Error fetching match details:", innerError);
              return null;
            }
          })
        );

        setMatches(updatedMatches.filter((match) => match !== null));
      } catch (error) {
        console.error("Error fetching matches:", error);
        setError("Failed to fetch matches");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchesDetails();
  }, [id]);

  if (isLoading) {
    return <div className="bg-white shadow-lg rounded-lg m-5 p-4 text-center">Loading matches...</div>;
  }

  if (error) {
    return (
      <div className="bg-white shadow-lg rounded-lg m-5 p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg m-5">
        <div className="bg-gray-700 text-white font-bold text-lg pl-3 p-2 rounded-t-lg">
          Last Matches
        </div>
        <div className="p-4 text-gray-500 text-center">No match data available.</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg m-5">
      <div className="bg-gray-700 text-white font-bold text-lg pl-3 p-2 rounded-t-lg">
        Last Matches
      </div>
      <div className="flex flex-row justify-around items-center p-4 gap-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex flex-col items-center text-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            onClick={() => navigate(`/game/${match.id}`)} // Navigate to match details
          >
            <div
              className={`text-white font-bold text-xs px-3 py-1 rounded-full ${
                match.result === "W"
                  ? "bg-green-500"
                  : match.result === "L"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            >
              {match.score}
            </div>
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 my-2 p-2 shadow-md cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/club/${match.awayTeamLogo}`);
              }}
            >
              <img
                src={match.awayTeamLogo}
                alt={match.awayTeam}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="text-xs font-medium text-gray-700">{match.awayTeam}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

LastMatchesCard.propTypes = {
  id: PropTypes.string.isRequired,
};
