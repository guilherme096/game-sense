import PageTemplate from "./PageTemplate.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import GeneralCard from "../components/cards/GeneralCard";
import profile from "../static/profile";
import { useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function Profile() {
    const navigate = useNavigate();
    const signOut = useSignOut();
    const [username, setUsername] = useState("");

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/v1/management/logout", {}, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                signOut();
                navigate("/");
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get("/api/v1/management/username", {
                    withCredentials: true
                });
                
                if (response.data && response.data.username) {
                    setUsername(response.data.username);
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };

        fetchUsername();
    }, []);

    return (
        <PageTemplate>
            <div className="p-5 space-y-4">
                {/* User Section */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        <img
                            src={profile.photoUrl}
                            alt={profile.name}
                            className="w-20 h-20 rounded-full"
                        />
                        <div className="ml-4">
                            <h2 className="text-xl font-bold">
                                {username}
                            </h2>
                            <button
                                onClick={handleLogout}
                                className="text-gray-500 underline text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <button className="ml-auto">
                        <FontAwesomeIcon icon={faPenToSquare} className="h-5 w-5 text-gray-700" />
                    </button>
                </div>

                {/* Plan Section */}
                {!profile.isPremium && (
                    <div className="rounded-lg flex justify-between items-center">
                        <div className="text-left">
                            <p className="text-sm text-gray-500">Current Plan</p>
                            <p className="text-xl font-bold">Free</p>
                        </div>
                        <button className="bg-yellow-400 text-white py-2 px-4 rounded-md font-bold">
                            Become Premium
                        </button>
                    </div>
                )}
                <br />
                {/* My Teams Section */}
                <GeneralCard
                    title="My Teams"
                    button={<span className="text-sm text-white">({profile.myTeams.length})</span>}
                >
                    <div className="p-4 grid grid-cols-4 gap-4">
                        {/* Teams */}
                        {profile.myTeams.map((team) => (
                            <div
                                key={team}
                                className={`relative flex flex-col items-center ${
                                    team === profile.favTeam 
                                }`}
                            >
                                {/* Star Icon for Favorite Team */}
                                {team === profile.favTeam && (
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="absolute -top-2 -right-1 text-yellow-400 text-lg"
                                    />
                                )}
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt={team}
                                    className="w-10 h-10"
                                />
                                <p className="text-sm mt-1 font-bold">{team}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full text-sm bg-gray-200 text-gray-600 py-2 font-bold rounded-b-lg">
                        Change Favorite Team
                    </button>
                </GeneralCard>
                <div className="pt-0"></div>
                {/* My Teams Last Results */}
                <GeneralCard title="My Teams Last Results">
                    <div className="divide-y divide-gray-200">
                        {/* Match Rows */}
                        {profile.lastResults.map((match, index) => (
                            <div key={index} className="grid grid-cols-3 items-center py-4 px-6">
                                {/* Team 1 */}
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt={match.team1}
                                        className="w-10 h-10"
                                    />
                                    <p className="text-sm font-bold">{match.team1}</p>
                                </div>

                                {/* Scores */}
                                <div className="flex justify-center space-x-4 font-bold text-lg">
                                    <p>{match.score1}</p>
                                    <p>-</p>
                                    <p>{match.score2}</p>
                                </div>

                                {/* Team 2 */}
                                <div className="flex items-center space-x-4 justify-end">
                                    <p className="text-sm font-bold">{match.team2}</p>
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt={match.team2}
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </GeneralCard>
            </div>
        </PageTemplate>
    );
}

export default Profile;
