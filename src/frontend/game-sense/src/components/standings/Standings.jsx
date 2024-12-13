import TeamTable from './TeamTable';
import GeneralCard from '../cards/GeneralCard';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Standings({ showHeader = true }) {
    const fetchStandings = async () => {
        const response = await axios.get(`/api/v1/league/1/standings`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
            },
        });
        return response.data;
    };

    const { data: standings, isLoading, error } = useQuery('standings', fetchStandings);

    if (isLoading) {
        return <div>Loading standings...</div>;
    }

    if (error) {
        console.error("Error fetching standings:", error);
        return <div>An error has occurred: {error.message}</div>;
    }

    if (!Array.isArray(standings)) {
        console.error("Invalid standings data format:", standings);
        return <div>Error: Invalid standings data</div>;
    }

    const sortedStandings = standings
        .map((team) => ({
            ...team,
            points: team.wins * 3 + team.draws,
        }))
        .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return (b.goalsScored - b.goalsConceded) - (a.goalsScored - a.goalsConceded);
        })
        .map((team, index) => ({
            ...team,
            position: index + 1,
        }));

    const changeTeam = (
        <button className="text-gray-400 font-medium text-base">
            Change Favorite Team
        </button>
    );

    return (
        <div className="container mx-auto px-4">
            {showHeader ? (
                <GeneralCard title="Standings" button={changeTeam}>
                    <TeamTable standings={sortedStandings} />
                </GeneralCard>
            ) : (
                <TeamTable standings={sortedStandings} />
            )}
        </div>
    );
}
