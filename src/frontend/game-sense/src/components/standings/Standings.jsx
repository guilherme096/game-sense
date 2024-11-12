import TeamTable from './TeamTable';
import mockTeams from './mockTeams';
import GeneralCard from '../cards/GeneralCard';

export default function Standings() {
    const sortedStandings = mockTeams.sort((a, b) => a.position - b.position); // Sort by position

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
