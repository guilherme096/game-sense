import React from 'react';
import PageTemplate from "./PageTemplate";
import GameCard from "../components/Home/YourTeamCard";
import LiveGame from "../components/Home/LiveGame";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

// Function to fetch live games with credentials
const fetchGames = async () => {
    try {
        const res = await axios.get("/api/v1/live/", { withCredentials: true });
        console.log("Fetched Games:", res.data); // For debugging
        return res.data;
    } catch (error) {
        console.error("Error fetching games:", error);
        throw error; // Propagate error to react-query
    }
};

// Function to fetch user info with credentials
const fetchUserInfo = async () => {
    try {
        const res = await axios.get("/api/v1/management/user-info", { withCredentials: true });
        console.log("User Info:", res.data); // For debugging
        return res.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error; // Propagate error to react-query
    }
};

function Home() {
    // Fetch live games
    const {
        data: games,
        isLoading: isLoadingGames,
        error: errorGames,
    } = useQuery("games", fetchGames, {
        refetchInterval: 10000, // Refetch every 10 seconds
    });

    // Fetch user info to get favorite club
    const {
        data: userInfo,
        isLoading: isLoadingUser,
        error: errorUser,
    } = useQuery("userInfo", fetchUserInfo);

    // Determine overall loading and error states
    const isLoading = isLoadingGames || isLoadingUser;
    const error = errorGames || errorUser;

    // Extract favorite team name (ensure consistent spelling)
    const favoriteTeamName = userInfo?.favouriteTeam || null;

    // Normalize favorite team name for comparison
    const normalizedFavTeam = favoriteTeamName?.trim().toLowerCase();

    // Filter games based on favorite team name (case-insensitive and trimmed)
    const yourTeamGames = games
        ? games.filter((g) => {
              const homeTeamName = g.home_team?.name?.trim().toLowerCase();
              const awayTeamName = g.away_team?.name?.trim().toLowerCase();
              return homeTeamName === normalizedFavTeam || awayTeamName === normalizedFavTeam;
          })
        : [];

    const otherGames = games
        ? games.filter((g) => {
              const homeTeamName = g.home_team?.name?.trim().toLowerCase();
              const awayTeamName = g.away_team?.name?.trim().toLowerCase();
              return !(homeTeamName === normalizedFavTeam || awayTeamName === normalizedFavTeam);
          })
        : [];

    return (
        <PageTemplate>
            <div className="w-full flex flex-col p-4">
                {/* Your Teams Section */}
                <h1 className="text-2xl font-semibold">Favorite Team</h1>
                <div className="divider mt-0"></div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>No current games from your favorite team.</p>
                ) : yourTeamGames.length > 0 ? (
                    yourTeamGames.map((g) => {
                        const gameId = g.match_id || g.id;
                        if (!gameId) {
                            console.warn("Game ID is undefined for game:", g);
                            return null; 
                        }
                        return (
                            <Link to={`/game/${gameId}`} key={gameId} className="-mt-3">
                                <GameCard game={g} />
                            </Link>
                        );
                    })
                ) : (
                    <p>No current games from your favorite team.</p>
                )}

                {/* Other Games Section */}
                <h1 className="text-2xl font-semibold mt-6">Other Games</h1>
                <div className="divider mt-0"></div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>No current games.</p>
                ) : otherGames.length > 0 ? (
                    otherGames.map((g) => {
                        const gameId = g.match_id || g.id;
                        if (!gameId) {
                            console.warn("Game ID is undefined for game:", g);
                            return null; // Skip rendering if gameId is undefined
                        }
                        return (
                            <Link to={`/game/${gameId}`} key={gameId}>
                                <div className="-mt-3">
                                    <LiveGame game={g} />
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>No current games.</p>
                )}
            </div>
        </PageTemplate>
    );
}

export default Home;
