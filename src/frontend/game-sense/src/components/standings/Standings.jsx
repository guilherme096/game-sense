import React from 'react';
import TeamTable from './TeamTable';
import mockTeams from './mockTeams';
import GeneralCard from '../cards/GeneralCard';

export default function Standings() {
    const sortedStandings = mockTeams.sort((a, b) => a.position - b.position); // Sort by position

    // Define the button as JSX
    const changeTeam = (
        <div
            style={{
                color: '#989898',
                fontSize: 18,
                fontWeight: '400',
                wordWrap: 'break-word',
                cursor: 'pointer', // Make it look clickable
            }}
        >
            Change Favorite Team
        </div>
    );

    return (
        <div className="container mx-auto px-4">
            <GeneralCard title="Standings" button={changeTeam}>
                <TeamTable standings={sortedStandings} />
            </GeneralCard>
        </div>
    );
}
