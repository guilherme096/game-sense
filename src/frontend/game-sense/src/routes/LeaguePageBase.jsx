import EntityCard from "../components/cards/EntityCard.jsx"
import PageTemplate from "./PageTemplate.jsx";
import Standings from "../components/standings/Standings.jsx"
import HorizontalTab from "../components/HorizontalTab.jsx";
import {useQuery, useQueryClient} from 'react-query';
import axios from 'axios';


const fetchGame = async () => {
    const response = await axios.get("http://localhost:8084/api/v1/league/1", {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        }
    });
    return response.data;
}


function LeaguePageBase({ children }) {
    const {data: league, isLoading, error} = useQuery('league', fetchGame);
    console.log(league);
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>
    }

    const name = league.name;
    const image = league.logo;

    const sortedStandings = league.standings
    .map((team) => ({
        ...team,
        points: team.won * 3 + team.drawn,
    }))
    .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gs - b.gc !== a.gs - a.gc) return b.gs - b.gc - (a.gs - a.gc);
    });


    return (
        <>
            <PageTemplate>
                <EntityCard image={image} name={name} />
                <HorizontalTab color_back="bg-gray-700" categories={[ { name: 'Overview' , content: <Standings sortedStandings={sortedStandings}></Standings> }, {name:'Next Games'}, {name:'Results'}, {name:'Statistics'} ]} />
            </PageTemplate>
        </>
    );
}

export default LeaguePageBase;
