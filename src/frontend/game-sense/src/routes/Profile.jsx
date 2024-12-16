import React, { useState, useEffect } from 'react';
import PageTemplate from "./PageTemplate.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import GeneralCard from "../components/cards/GeneralCard";
import profile from "../static/profile";
import { useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import axios from 'axios';
import PremiumModal from "../components/PremiumModal.jsx";  
import { toast } from "react-toastify";
import LoadingLogo from '../components/LoadingLogo.jsx';
import FavoriteTeamCombobox from '../components/FavoriteTeamCombobox.jsx';
import { Dialog } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const navigate = useNavigate();
    const signOut = useSignOut();
    const [username, setUsername] = useState("");
    const [isPremium, setPremium] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [favoriteTeam, setFavoriteTeam] = useState(null);
    const [teamImage, setTeamImage] = useState(null);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchUserData = async () => {
        try {
            const userResponse = await axios.get("/api/v1/management/user-info", {
                withCredentials: true
            });

            if (userResponse.status === 200) {
                setUsername(userResponse.data.username);
                setPremium(userResponse.data.premium);
                setFavoriteTeam(userResponse.data.favouriteTeam);

                // If there's a favorite team, fetch its image
                if (userResponse.data.favouriteTeam) {
                    const clubResponse = await axios.get(`/api/v1/club`, {
                        params: { name: userResponse.data.favouriteTeam }
                    });                    

                    if (clubResponse.status === 200 && clubResponse.data.length > 0) {
                        setTeamImage(clubResponse.data[0].logo);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load user data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

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

    const handleTeamSelect = async (team) => {
        try {
            const response = await axios.put('/api/v1/management/update-favorite-team', 
                { team },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setFavoriteTeam(team);
                // Fetch new team image
                const clubResponse = await axios.get(`/api/v1/club`, {
                    params: { name: team }
                });
                
                if (clubResponse.status === 200 && clubResponse.data.length > 0) {
                    setTeamImage(clubResponse.data[0].logo);
                }
                setIsTeamModalOpen(false);
                toast.success("Favorite team updated successfully!");
            }
        } catch (error) {
            console.error("Error updating favorite team:", error);
            toast.error("Failed to update favorite team");
        }
    };
    
    const refreshPage = () => {
        window.location.reload();
    };

    const handleBecomePremium = async () => {
        try {
            const response = await axios.post('/api/v1/management/become-premium', {}, {
                withCredentials: true
            });
    
            if (response.status === 200) {
                setPremium(true);
                closeModal();
                toast.success("You are now a premium member!");
                refreshPage();
            } else {
                toast.error("Failed to become premium.");
            }
        } catch (error) {
            console.error('Error upgrading to premium:', error);
            toast.error("An error occurred while upgrading to premium.");
        }
    };

    if (loading) {
        return (
            <PageTemplate>
                <LoadingLogo />
            </PageTemplate>
        );
    }

    const userInitial = username.charAt(0).toUpperCase();

    return (
        <PageTemplate>
            <div className="p-5 space-y-4">
                {/* User Section */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-20 rounded-full">
                                <span className="text-3xl">{userInitial}</span>
                            </div>
                        </div>
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
                </div>

                {/* Plan Section */}
                <div className="rounded-lg flex justify-between items-center">
                    <div className="text-left">
                        <p className="text-sm text-gray-500">Current Plan</p>
                        <p className="text-xl font-bold">
                            {isPremium ? "Premium" : "Free"}
                        </p>
                    </div>
                    {!isPremium && (
                        <button
                            onClick={openModal}
                            className="bg-yellow-400 text-white py-2 px-4 rounded-md font-bold"
                        >
                            Become Premium
                        </button>
                    )}
                </div>

                {/* Favorite Team Section */}
                <GeneralCard title="My Team">
                    <div className="p-4 flex justify-center">
                        {favoriteTeam ? (
                            <div className="relative flex flex-col items-center">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="absolute -top-2 -right-1 text-yellow-400 text-lg"
                                />
                                <img
                                    src={teamImage || "https://via.placeholder.com/40"}
                                    alt={favoriteTeam}
                                    className="w-16 h-16 object-contain"
                                />
                                <p className="text-sm mt-2 font-bold">{favoriteTeam}</p>
                            </div>
                        ) : (
                            <p className="text-gray-500">No favorite team selected</p>
                        )}
                    </div>
                    <button 
                        className="w-full text-sm bg-gray-200 text-gray-600 py-2 font-bold rounded-b-lg"
                        onClick={() => setIsTeamModalOpen(true)}
                    >
                        {favoriteTeam ? 'Change Favorite Team' : 'Select Favorite Team'}
                    </button>
                </GeneralCard>

                
                {/* My Teams Last Results */}
                <GeneralCard title="My Team's Last Results">
                    <div className="divide-y divide-gray-200">
                        {profile.lastResults.map((match, index) => (
                            <div key={index} className="grid grid-cols-3 items-center py-4 px-6">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt={match.team1}
                                        className="w-10 h-10"
                                    />
                                    <p className="text-sm font-bold">{match.team1}</p>
                                </div>
                                <div className="flex justify-center space-x-4 font-bold text-lg">
                                    <p>{match.score1}</p>
                                    <p>-</p>
                                    <p>{match.score2}</p>
                                </div>
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

            <Dialog 
                open={isTeamModalOpen} 
                onClose={() => setIsTeamModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            Select Favorite Team
                        </Dialog.Title>
                        <FavoriteTeamCombobox 
                            selectedTeam={favoriteTeam} 
                            onTeamChange={handleTeamSelect}
                        />
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                                onClick={() => setIsTeamModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <PremiumModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                title="Become Premium"
                message="Are you sure you want to upgrade to the premium plan?"
                onConfirm={handleBecomePremium}
                confirmText="Yes, Upgrade"
                cancelText="Cancel"
            />
        </PageTemplate>
    );
}

export default Profile;