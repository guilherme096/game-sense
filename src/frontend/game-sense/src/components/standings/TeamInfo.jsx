import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

export default function TeamInfo({ team, key }) {
    console.log("team info");
    console.log(team);
    return (
        <tr className={`border-b ${key % 2 !== 0 ? 'bg-gray-50' : 'bg-white'} `}>
            <td className="px-2 py-2 text-center">
                <div
                    className="flex justify-center items-center rounded-full mx-auto font-medium"
                    style={{
                        background: key === 0 ? '#FFD700': key === 1 ? '#C0C0C0' : key === 2 ? '#cd7f32' : 'transparent',
                        color: key <= 2 ? 'white' : 'black',
                        width: 20,
                        height: 20,
                    }}
                >
                    {team.place}
                </div>
            </td>

            {/* Club Name */}
            <td className="px-2 mr-10 py-2 font-medium">
                {team.club_id} {/* {team.club.starred ? <FontAwesomeIcon icon={faStar} className="text-white ml-2" /> : ''} */}
            </td>

            {/* Other Stats */}
            <td className="px-0 py-2 text-center">{team.matchesPlayed}</td>
            <td className="px-0 py-2 text-center">{team.wins}</td>
            <td className="px-0 py-2 text-center">{team.draws}</td>
            <td className="px-0 py-2 text-center">{team.losses}</td>
            <td className="px-0 py-2 text-center">{team.goal_difference}</td>
            <td className="px-0 py-2 text-center font-extrabold">{team.points}</td>
        </tr>
    );
}

TeamInfo.propTypes = {
    team: PropTypes.object.isRequired,
    key: PropTypes.number.isRequired,
    showHeader: PropTypes.bool,

};