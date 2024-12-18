import React from 'react';
import PageTemplate from "./PageTemplate";
import GameCard from "../components/Home/YourTeamCard";
import LiveGame from "../components/Home/LiveGame";
import LastGames from "../components/Home/LastGames";
import LoadingLogo from '../components/LoadingLogo';
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchGames = async () => {
    try {
        const res = await axios.get("/api/v1/live/", { withCredentials: true });
        console.log("Fetched Games:", res.data); 
        return res.data;
    } catch (error) {
        console.error("Error fetching games:", error);
        throw error; 
    }
};

const fetchUserInfo = async () => {
    try {
        const res = await axios.get("/api/v1/management/user-info", { withCredentials: true });
        console.log("User Info:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error; 
    }
};

const fetchLastGames = async () => {
    const res = await axios.get("/api/v1/game/");
    return res.data;
};


function Home() {
    const {
        data: games,
        isLoading: isLoadingGames,
        error: errorGames,
    } = useQuery("games", fetchGames, {
        refetchInterval: 10000, 
    });

    const {
        data: userInfo,
        isLoading: isLoadingUser,
        error: errorUser,
    } = useQuery("userInfo", fetchUserInfo);

    const isLoading = isLoadingGames || isLoadingUser;
    const error = errorGames || errorUser;

    const favoriteTeamName = userInfo?.favouriteTeam || null;

    const normalizedFavTeam = favoriteTeamName?.trim().toLowerCase();

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


    const { data: lastGames, isLoading: isLoadingLastGames, error: errorLastGames } = useQuery("lastGames", fetchLastGames)

    if (isLoadingLastGames) {
        return <p>Loading...</p>;
    }

    if (errorLastGames) {
        return <p>Error fetching data</p>;
    }

    return (
        <PageTemplate>
            <div className="w-full flex flex-col p-4">
                <LastGames matches={lastGames} />
                {/* Your Teams Section */}
                <h1 className="text-2xl font-semibold">Favorite Team</h1>
                <div className="divider mt-0"></div>
                {isLoading ? (
                    <p>No ongoing games.</p>
                ) : error ? (
                    <p>Error fetching your favorite teams games</p>
                ) : yourTeamGames.length > 0 ? (
                    yourTeamGames.map((g) => {
                        const gameId = g.match_id || g.id;
                        if (!gameId) {
                            console.warn("Game ID is undefined for game:", g);
                            return null; 
                        }
                        return (
                            <Link to={`/live/${gameId}`} key={gameId} className="-mt-3">
                                <GameCard game={g} />
                            </Link>
                        );
                    })
                ) : (
                    <p>No current games from your favorite team.</p>
                )}

                {/* Other Games Section */}
                <h1 className="text-2xl font-semibold mt-6">Other Live Games</h1>
                <div className="divider mt-0"></div>
                {isLoading ? (
                    <LoadingLogo />
                ) : error ? (
                    <p>Error fetching other live games.</p>
                ) : otherGames.length > 0 ? (
                    otherGames.map((g) => {
                        const gameId = g.match_id || g.id;
                        if (!gameId) {
                            console.warn("Game ID is undefined for game:", g);
                            return null;
                        }
                        return (
                            <Link to={`/live/${gameId}`} key={gameId}>
                                <div className="-mt-3">
                                    <LiveGame game={g} />
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>No other live games available at the moment.</p>
                )}
            </div>
        </PageTemplate>
    );
}

export default Home;
