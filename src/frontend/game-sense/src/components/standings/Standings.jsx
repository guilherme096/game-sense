import TeamTable from './TeamTable';
import GeneralCard from '../cards/GeneralCard';
import {useQuery, useQueryClient} from 'react-query';
import axios from 'axios';

export default function Standings() {
    
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


    // Define the button as JSX
    const changeTeam = (
        <button className='text-gray-400 font-medium text-base'>
            Change Favorite Team
        </button>
    );

    return (
        <div className="container mx-auto px-4">
            <GeneralCard title="Standings" button={changeTeam}>
                <TeamTable standings={sortedStandings} />
            </GeneralCard>
        </div>
    );
}
