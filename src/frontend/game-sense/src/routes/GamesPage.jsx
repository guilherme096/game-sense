import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import PageTemplate from "./PageTemplate";
import GameCard from "../components/PastGamesPage/GameCard"; 

function GamesPage() {
    const fetchGames = async () => {
        const res = await axios.get("/api/v1/game/");
        return res.data;
    };

    const { data: games, isLoading, error } = useQuery("games", fetchGames);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching data</p>;
    }

    console.log("Games:", games)

    return (
        <PageTemplate>
            <div className="w-full flex flex-col p-4">
                <h1 className="text-2xl font-semibold">Past Games</h1>
                <div className="divider mt-0"></div>
                {games &&
                    games.map((g, key) => {
                        return (
                            <Link to={"/game/" + g.id} key={key}>
                                <GameCard key={g.id} game={g} />
                            </Link>
                        );
                    })}
                {error && <p>Error fetching data</p>}
                {isLoading && <p>Loading...</p>}
            </div>
        </PageTemplate>
    );
    
}

export default GamesPage;