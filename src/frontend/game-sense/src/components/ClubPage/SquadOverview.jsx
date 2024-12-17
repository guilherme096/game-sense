import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {getPlayerString} from "../PlayerPage/PlayerOverview.jsx";

export default function SquadOverview({ clubData, id }) {
    const navigate = useNavigate();

    const fetchPlayersFromClub = async () => {
        console.log("Fetching players from club");
        const response = await axios.get(`/api/v1/player/club/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
            },
        });
        console.log("Players API Response:", response.data);
        return response.data;
    };

    const { data: playerFromClub, isLoading, error } = useQuery(
        ["playerFromClub", id],
        fetchPlayersFromClub
    );

    if (isLoading) {
        console.log("Players are loading...");
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching players:", error);
        return <div>An error has occurred: {error.message}</div>;
    }

    if (!Array.isArray(playerFromClub)) {
        console.error("Unexpected response format for players.");
        return <div>An error occurred while fetching players.</div>;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg m-5 mt-1">
            {/* Card Header */}
            <div className="bg-gray-700 text-white font-bold text-lg p-3 rounded-t-lg">
                Squad
            </div>

            {/* Squad Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-3 text-gray-700 font-semibold w-1/2">Name</th> {/* Larger width */}
                            <th className="py-2 px-3 text-gray-700 font-semibold w-1/10">Age</th>
                            <th className="py-2 px-3 text-gray-700 font-semibold w-1/3">Position</th>
                            <th className="py-2 px-3 text-gray-700 font-semibold w-1/10">Jersey</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerFromClub.map((player, index) => (
                            <tr
                                key={player.id}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } cursor-pointer`}
                                onClick={() => navigate(`/player/${player.id}`)} // Navigate to the player's page
                            >
                                {/* Player Name */}
                                <td className="py-3 px-4 text-black text-sm w-1/2">
                                    {player.surname ? `${player.name[0]}. ${player.surname}` : player.name}
                                </td>
                                {/* Player Age */}
                                <td className="py-3 px-4 text-gray-700 text-sm w-1/6">{player.age}</td>
                                {/* Player Position */}
                                <td className="py-3 px-4 text-gray-700 text-sm w-1/6">{getPlayerString(player.position)}</td>
                                {/* Player Jersey Number */}
                                <td className="py-3 px-4 text-gray-700 text-sm w-1/6">{player.jerseyNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

SquadOverview.propTypes = {
    clubData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        starred: PropTypes.bool.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    playerFromClub: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            surname: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            position: PropTypes.string.isRequired,
            jerseyNumber: PropTypes.number.isRequired,
            injured: PropTypes.bool.isRequired,
        })
    ),
};
