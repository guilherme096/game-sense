import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

export default function TeamInfo({ team, index }) {
    return (
        <tr className={`border-b ${index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'} ${team.club.starred ? 'bg-yellow-300' : ''}`}>
            <td className="px-2 py-2 text-center">
                <div
                    className="flex justify-center items-center rounded-full mx-auto font-medium"
                    style={{
                        background: index === 0 ? '#FFD700': index === 1 ? '#C0C0C0' : index === 2 ? '#cd7f32' : 'transparent',
                        color: index <= 2 ? 'white' : 'black',
                        width: 20,
                        height: 20,
                    }}
                >
                    {team.position}
                </div>
            </td>

            {/* Club Name */}
            <td className="px-2 mr-10 py-2 font-medium">
                {team.club.name} {team.club.starred ? <FontAwesomeIcon icon={faStar} className="text-white ml-2" /> : ''}
            </td>

            {/* Other Stats */}
            <td className="px-0 py-2 text-center">{team.matchesPlayed}</td>
            <td className="px-0 py-2 text-center">{team.wins}</td>
            <td className="px-0 py-2 text-center">{team.draws}</td>
            <td className="px-0 py-2 text-center">{team.losses}</td>
            <td className="px-0 py-2 text-center">{team.goalsScored - team.goalsConceded}</td>
            <td className="px-0 py-2 text-center font-extrabold">{team.points}</td>
        </tr>
    );
}

TeamInfo.propTypes = {
    team: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};