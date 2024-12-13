import PageTemplate from "./PageTemplate";
import GameCard from "../components/Home/YourTeamCard";
import LiveGame from "../components/Home/LiveGame";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchGames = async () => {
    const res = await axios.get("/api/v1/live/");
    return res.data;
};

function Home() {
    const {
        data: games,
        isLoading,
        error,
    } = useQuery("games", fetchGames, {
        refetchInterval: 10000,
    });
    return (
        <PageTemplate>
            <div className="w-full flex flex-col p-4">
                <h1 className="text-2xl font-semibold">Your Teams</h1>
                <div className="divider mt-0"></div>
                {games &&
                    games.map((g, key) => {
                        if (g.home_team.stared || g.away_team.stared) {
                            return (
                                <Link to={"/game/" + g.id} key={key}>
                                    <GameCard key={g.id} game={g} />
                                </Link>
                            );
                        }
                    })}
                {error && <p>Error fetching data</p>}
                {isLoading && <p>Loading...</p>}
                <h1 className="text-2xl font-semibold mt-6">Other Games</h1>
                <div className="divider mt-0"></div>
                {games &&
                    games.map((g, key) => {
                        if (!g.home_team.stared && !g.away_team.stared) {
                            return (
                                <Link to={"/game/" + g.match_id} key={key}>
                                    <div className="-mt-3">
                                        <LiveGame key={g.id} game={g} />
                                    </div>
                                </Link>
                            );
                        }
                    })}
            </div>
        </PageTemplate>
    );
}

export default Home;
