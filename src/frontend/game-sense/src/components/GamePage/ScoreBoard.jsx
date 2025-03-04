import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import Timer from "../Timer.jsx";
import { useNavigate } from "react-router-dom";
import shareIcon from "../../../public/icons8-share-256 1.png";

const fetchGame = async (id) => {
    const response = await axios.get("/api/v1/live/" + id + "/basicInfo", {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
        },
    });
    console.log(response.data);
    return response.data;
};

export default function ScoreBoard({ id }) {
    const [team1Stared, setTeam1Stared] = useState(false); // State for Team 1 star
    const [team2Stared, setTeam2Stared] = useState(false); // State for Team 2 star

    const navigate = useNavigate();

    const {
        data: game,
        error,
        isLoading,
    } = useQuery("game", () => fetchGame(id), {
        refetchInterval: (data) => {
            return data?.ended ? false : 10000;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const name1 = game.home_team;
    const name2 = game.away_team;
    const minute = game.minute;
    const score1 = game.home_score;
    const score2 = game.away_score;
    const logo1 = game.home_team_image;
    const logo2 = game.away_team_image;

    return (
        <div className="scoreboard-container">
            {/* Game State */}
            <div className="w-full text-center font-semibold">
                {minute <= 45
                    ? "1st Half"
                    : minute >= 46 && minute < 90
                        ? "2nd Half"
                        : "Full Time"}
            </div>

            <div className="w-full h-fit flex flex-row justify-between align-middle items-center">
                {/* Team 1 Section */}
                <div className="flex flex-row items-center">
                    <div className="flex items-center ml-2 mb-6">
                        <button onClick={() => setTeam1Stared(!team1Stared)}>
                            <FontAwesomeIcon
                                icon={faStar}
                                style={{
                                    color: team1Stared ? "#FFD43B" : "#D1D5DB",
                                }}
                                className="w-6 h-6 mr-2"
                            />
                        </button>
                    </div>
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => navigate(`/club/${game.home_team_id}`)}
                    >
                        <div
                            className="w-24 h-24 bg-base-200 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
                            onClick={() => navigate(`/club/${game.home_team_id}`)}
                        >
                            {logo1 ? (
                                <img
                                    className="w-full h-full object-contain p-2"
                                    src={logo1}
                                    alt={`${name1}'s logo`}
                                />
                            ) : (
                                <span className="text-sm text-gray-500 flex items-center justify-center h-full">
                                    {name1}'s logo
                                </span>
                            )}
                        </div>
                        <div className="text-center mt-2">{name1}</div>
                    </div>
                </div>
                <div className="h-fit flex flex-col align-middle items-center">
                    <div className="h-24 flex-col items-center align-middle flex justify-center">
                        <div className="w-fit h-fit text-4xl">
                            {score1} - {score2}
                        </div>
                        <div className="w-fit h-fit text-sm text-center">
                            <Timer initialTime={game.minute} gameId={game.match_id} />'
                        </div>
                    </div>
                    <button className="text-center text-sm flex justify-center font-extralight items-center">
                        <img src={shareIcon} alt="Share Icon" />
                    </button>
                </div>

                <div className="flex flex-row items-center">
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => navigate(`/club/${game.away_team_id}`)}
                    >
                        <div className="w-24 h-24 bg-base-200 text-center rounded-lg flex items-center justify-center overflow-hidden">
                            {logo2 ? (
                                <img
                                    className="w-full h-full object-contain p-2"
                                    src={logo2}
                                    alt={`${name2}'s logo`}
                                />
                            ) : (
                                <span className="text-sm text-gray-500 flex items-center justify-center h-full w-full">
                                    {name2}'s logo
                                </span>
                            )}
                        </div>
                        <div className="text-center mt-2">{name2}</div>
                    </div>
                    <div className="flex items-center ml-2 mb-6">
                        <button onClick={() => setTeam2Stared(!team2Stared)}>
                            <FontAwesomeIcon
                                icon={faStar}
                                style={{
                                    color: team2Stared ? "#FFD43B" : "#D1D5DB", // Toggle color
                                }}
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ScoreBoard.propTypes = {
    id: PropTypes.string.isRequired,
};
