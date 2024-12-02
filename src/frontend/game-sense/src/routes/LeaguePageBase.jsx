import EntityCard from "../components/cards/EntityCard.jsx"
import PageTemplate from "./PageTemplate.jsx";
import Standings from "../components/standings/Standings.jsx"
import HorizontalTab from "../components/HorizontalTab.jsx";
import {useQuery} from 'react-query';
import axios from 'axios';

function LeaguePageBase() {

    const fetchGame = async () => {
        const response = await axios.get("/api/v1/league/1", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json'
            }
        });
        return response.data;
    }

    const {data: league, isLoading, error} = useQuery('league', fetchGame);
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>
    }

    const name = league.name;
    const name1 = name.split(' ')[0];
    const name2 = name.split(' ')[1];
    const image = league.logo;

    return (
        <>
            <PageTemplate>
                <EntityCard image={image} name1={name1} name2={name2} />
                <HorizontalTab  categories={[ { name: 'Overview' , content: <Standings showHeader={true}/> }, {name:'Next Games'}, {name:'Results'}, {name:'Statistics'} ]} />
            </PageTemplate>
        </>
    );
}

export default LeaguePageBase;
