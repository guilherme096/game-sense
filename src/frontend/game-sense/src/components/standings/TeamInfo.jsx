import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


export default function TeamInfo({ team }) {
    return (
        <tr className={`border-b ${team.position % 2 !== 0 ? 'bg-gray-50' : 'bg-white'} ${team.club.stared ? ' bg-yellow-300' : ''}`}>
            <td className="px-2 py-2 text-center">
                <div
                    className="flex justify-center items-center rounded-full mx-auto"
                    style={{
                        background:
                            team.position === 1
                                ? '#FFD700'
                                : team.position === 2
                                    ? '#C0C0C0'
                                    : team.position === 3
                                        ? '#cd7f32'
                                        : 'transparent',
                        color: team.position <= 3 ? 'white' : 'black',
                        width: 20,
                        height: 20,
                    }}
                >
                    {team.position}
                </div>
            </td>

            {/* Club Name */}
            <td className="px-2 mr-10 py-2 ">
                {team.club.name} {team.club.stared ? <FontAwesomeIcon icon={faStar} className=' text-white ml-2 ' /> : ''}
            </td>


            {/* Other Stats */}
            <td className="px-0 py-2 text-center">{team.played}</td>
            <td className="px-0 py-2 text-center">{team.points}</td>
            <td className="px-0 py-2 text-center">{team.gs - team.gc}</td>
            <td className="px-0 py-2 text-center">{team.won}</td>
            <td className="px-0 py-2 text-center">{team.drawn}</td>
            <td className="px-0 py-2 text-center">{team.lost}</td>
        </tr>
    );
}
