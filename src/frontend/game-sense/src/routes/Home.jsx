import PageTemplate from "./PageTemplate";
import GameCard from "../components/Home/YourTeamCard";
import LiveGame from "../components/Home/LiveGame";
import { useQuery } from "react-query";
import axios from "axios";

const fetchGames = async () => {
    const res = await axios.get("http://localhost:8082/api/v1/live/");
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
            <div className="w-full flex flex-col px-4">
                {error && <p>Error fetching data</p>}
                {isLoading && <p>Loading...</p>}
                {games && games.map((g) => <LiveGame key={g.id} game={g} />)}
            </div>
        </PageTemplate>
    );
}

export default Home;
