import TeamTable from './TeamTable';
import GeneralCard from '../cards/GeneralCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from "prop-types";

export default function Standings({ showHeader = true }) {
    // Fetch league data
    const fetchGame = async () => {
        try {
            const response = await axios.get(`/api/v1/league/1`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "application/json",
                },
            });
            return response.data;
        }
        catch (error) {
            console.log("Error in fetching league data", error);
            return error;
        }
    };

    // Use React Query for fetching
    const { data: league, isLoading, isError,error } = useQuery('league', fetchGame,
        {
            retry: 2,
            staleTime: 10,
        })
    ;
    console.log("standings component");
    console.log(league);

    // Handle loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin mb-4">⚽</div>
                    <p className="text-gray-600">Loading league standings...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 p-4 rounded">
                <h2 className="text-red-600 font-bold mb-2">Standings Unavailable</h2>
                <p className="text-red-500">
                    {error?.message || 'Unable to fetch league standings. Please try again later.'}
                </p>
            </div>
        );
    }

    // Validate and sort standings by getting league.leagueClubs
    const standings = league?.leagueClubs || [];
    standings.sort((a, b) => a.position - b.position);

    // Handle empty standings
    if (standings.length === 0) {
        return (
            <div className="text-center text-gray-500 p-4">
                No standings data available at this time.
            </div>
        );
    }

    // Define the change team button
    const changeTeam = (
        <button className="text-gray-400 font-medium text-base">
            Change Favorite Team
        </button>
    );

    // Render the component
    return (
        <div className="container mx-auto px-4">
            {showHeader ? (
                <GeneralCard title="Standings" button={changeTeam}>
                    <TeamTable standings={standings} />
                </GeneralCard>
            ) : (
                <TeamTable standings={standings} />
            )}
        </div>
    );
}

Standings.propTypes = {
    showHeader: PropTypes.bool,
};
