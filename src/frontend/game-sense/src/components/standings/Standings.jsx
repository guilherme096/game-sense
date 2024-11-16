import TeamTable from './TeamTable';
import GeneralCard from '../cards/GeneralCard';

export default function Standings({sortedStandings}) {

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
