import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeamInfo({ team, index }) {
  const navigate = useNavigate();

  const fetchClubInfo = async () => {
    const response = await axios.get(`/api/v1/club/${team.club_id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    return response.data;
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('/api/v1/management/user-info', {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const {
    data: clubInfo,
    isLoading: isClubInfoLoading,
    error: clubInfoError,
  } = useQuery(["clubInfo", team.club_id], fetchClubInfo, {
    enabled: !!team.club_id,
  });

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
  } = useQuery("userInfo", fetchUserInfo);

  if (isClubInfoLoading) {
    return (
      <tr>
        <td colSpan="8" className="text-center py-2">
          Loading club info...
        </td>
      </tr>
    );
  }

  if (clubInfoError) {
    console.error("Error fetching club info:", clubInfoError);
    return (
      <tr>
        <td colSpan="8" className="text-center py-2 text-red-500">
          Error fetching club info.
        </td>
      </tr>
    );
  }

  // Check if this club is the user's favourite team
  const isFavouriteTeam = clubInfo?.name === userInfo?.favouriteTeam;

  return (
    <tr
      className={`cursor-pointer border-b 
        ${index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'} 
        ${isFavouriteTeam ? 'bg-yellow-300' : ''}`}
      onClick={() => navigate(`/club/${team.club_id}`)}
    >
      {/* Position */}
      <td className="px-2 py-2 text-center">
        <div
          className="flex justify-center items-center rounded-full mx-auto font-medium"
          style={{
            background:
              index === 0
                ? '#FFD700'
                : index === 1
                ? '#C0C0C0'
                : index === 2
                ? '#cd7f32'
                : 'transparent',
            color: index <= 2 ? 'white' : 'black',
            width: 20,
            height: 20,
          }}
        >
          {team.place}
        </div>
      </td>

      {/* Club Name */}
      <td className="px-2 mr-10 py-2 font-medium">
        {clubInfo?.name || "Unknown Club"}{' '}
        {isFavouriteTeam && (
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 ml-2" />
        )}
      </td>

      {/* Other Stats */}
      <td className="px-0 py-2 text-center">{team.matchesPlayed}</td>
      <td className="px-0 py-2 text-center">{team.wins}</td>
      <td className="px-0 py-2 text-center">{team.draws}</td>
      <td className="px-0 py-2 text-center">{team.losses}</td>
      <td className="px-0 py-2 text-center">
        {team.goalsScored - team.goalsConceded}
      </td>
      <td className="px-0 py-2 text-center font-extrabold">{team.points}</td>
    </tr>
  );
}

TeamInfo.propTypes = {
  team: PropTypes.shape({
    club_id: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    matchesPlayed: PropTypes.number.isRequired,
    wins: PropTypes.number.isRequired,
    draws: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    goalsScored: PropTypes.number.isRequired,
    goalsConceded: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};