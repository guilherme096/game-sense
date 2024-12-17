import TeamTable from './TeamTable';
import GeneralCard from '../cards/GeneralCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';

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

    // sort by team.place
    const sortedStandings = standings.sort((a, b) => a.place - b.place);

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
                    <TeamTable standings={sortedStandings} />
                </GeneralCard>
            ) : (
                <TeamTable standings={sortedStandings} />
            )}
        </div>
    );
}

Standings.propTypes = {
    showHeader: PropTypes.bool,
    standings: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            logo: PropTypes.string.isRequired,
            wins: PropTypes.number.isRequired,
            draws: PropTypes.number.isRequired,
            losses: PropTypes.number.isRequired,
            goalsScored: PropTypes.number.isRequired,
            goalsConceded: PropTypes.number.isRequired,
            points: PropTypes.number.isRequired,
            position: PropTypes.number.isRequired,
        })
    ).isRequired,
};
