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
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>
    }

    console.log(league);

    if (!Array.isArray(league.standings)) {
        console.error("Standings is not an array:", league.standings);
        return <div>Error: Invalid standings data</div>;
    }

    console.log(league.standings);

    const name = league.name;
    const image = league.logo;

    const sortedStandings = league.standings
        .map((team, index) => ({
            ...team,
            points: team.wins * 3 + team.draws,
        }))
        .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalsScored - b.goalsConceded !== a.goalsScored - a.goalsConceded)
                return (b.goalsScored - b.goalsConceded) - (a.goalsScored - a.goalsConceded);
        })
        .map((team, index) => ({
            ...team,
            position: index + 1,
        }));    

        console.log(sortedStandings);

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
