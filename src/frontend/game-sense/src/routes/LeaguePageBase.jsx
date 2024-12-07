import EntityCard from "../components/cards/EntityCard.jsx"
import PageTemplate from "./PageTemplate.jsx";
import Standings from "../components/standings/Standings.jsx"
import HorizontalTab from "../components/HorizontalTab.jsx";
import {useQuery} from 'react-query';
import axios from 'axios';

function LeaguePageBase() {


    const fetchGame = async () => {
        try {
            const response = await axios.get("/api/v1/league/1", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Accept': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            console.log("Error in fetching league data", error);
            return error;
        }
    };

    const {data: league, isLoading,isError, error} = useQuery('league', fetchGame,
        {
            retry: 2,
            staleTime: 10,
        });
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin mb-4">⚽</div>
                    <p className="text-gray-600">Loading league data...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 p-4 rounded">
                <h2 className="text-red-600 font-bold mb-2">League Unavailable</h2>
                <p className="text-red-500">
                    {error?.message || 'Unable to fetch league data. Please try again later.'}
                </p>
            </div>
        );
    }

    const leagueName = league?.name ? league.name.split(' ') : ['Unknown', 'League'];

    console.log("league name");
    const name1 = leagueName[0]; // First part of the league name
    const name2 = leagueName[1] || ''; // Second part (may be undefined if there is no space in the name)
    const image = league?.logo || ''; // Safe access to logo with fallback

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
