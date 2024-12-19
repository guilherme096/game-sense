import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function InjuryOverview({ playerData }) {
    const navigate = useNavigate();

    const fetchPlayerInjuries = async () => {
        console.log("Fetching player injuries");
        try {
            const response = await axios.get(`/api/v1/player/${playerData.id}/injuries`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/json",
                },
            });
            console.log("Player Injuries API Response:", response.data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Injuries not found for player:", playerData.id);
                return []; // Return an empty array if injuries are not found
            }
            throw error; // Rethrow the error if it’s not a 404
        }
    };

    const { data: playerInjuries = [], isLoadingInjuries, errorInjuries } = useQuery(
        ["playerInjuries", playerData.id],
        fetchPlayerInjuries,
        {
            retry: false, // Disable retries for 404 errors
        }
    );

    if (isLoadingInjuries) {
        console.log("Injuries data is loading...");
        return <div>Loading Injuries...</div>;
    }

    if (errorInjuries && errorInjuries.response?.status !== 404) {
        console.error("Error fetching injuries:", errorInjuries);
        return <div>An error has occurred: {errorInjuries?.message}</div>;
    }

    // If playerInjuries is empty, show "No available data"
    if (!playerInjuries || playerInjuries.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No available data
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg m-5">
            {/* Card Header */}
            <div className="bg-gray-700 text-white font-bold text-lg pl-3 p-2 rounded-t-lg text-center">
                Injury History
            </div>

            {/* Injuries Table */}
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-3 text-gray-700 font-semibold text-center">Injury</th>
                        <th className="py-2 px-3 text-gray-700 font-semibold text-center">Severity</th>
                        <th className="py-2 px-3 text-gray-700 font-semibold text-center">Games Missed</th>
                        <th className="py-2 px-3 text-gray-700 font-semibold text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {playerInjuries.map((injury, index) => {
                        // Determine if the injury is the current injury
                        const isCurrentInjury = playerData.injured && index === 0; // Assuming the first entry is the current injury

                        return (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } cursor-pointer`}
                                onClick={() => navigate(`/player/${playerData.id}`)} // Navigate to the player's page
                            >
                                {/* Injury Description */}
                                <td className="py-3 px-3 text-gray-800 text-center">{injury.description}</td>
                                {/* Injury Severity */}
                                <td className="py-3 px-3 flex items-center justify-center">
                                    <span
                                        className={`w-4 h-4 rounded-full ${
                                            injury.severity === "Low"
                                                ? "bg-green-500"
                                                : injury.severity === "Medium"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                        }`}
                                    ></span>
                                    <span className="ml-2 text-sm text-gray-700">{injury.severity}</span>
                                </td>
                                {/* Games Missed */}
                                <td className="py-3 px-3 text-center text-gray-700 font-semibold text-sm">
                                    {injury.gamesOut} Games
                                </td>
                                {/* Injury Status */}
                                <td className="py-3 px-3 text-center text-gray-700 font-semibold text-sm">
                                    {isCurrentInjury ? (
                                        <span className="text-red-500 font-bold">Current</span>
                                    ) : (
                                        <span className="text-gray-500">Past</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default InjuryOverview;

InjuryOverview.propTypes = {
    playerData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        injured: PropTypes.bool.isRequired,
    }).isRequired,
    playerInjuries: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            severity: PropTypes.string.isRequired,
            gamesOut: PropTypes.number.isRequired,
        })
    ).isRequired
};