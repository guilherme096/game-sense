import React, { useState } from 'react';
import axios from 'axios';
import textLogo from '/text-logo.png';
import iconLogo from '/icon-logo.png';
import { useNavigate } from "react-router-dom";


export default function Register() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '',
        favouriteTeam: '',
        password: '',
        confirmPassword: '',
        isPremium: null,
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (name === "isPremium") {
            setFormData((prev) => ({
                ...prev,
                isPremium: checked, 
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value, 
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            console.log({
                username: formData.name,
                password: formData.password,
                favouriteTeam: formData.favouriteTeam,
                isPremium: formData.isPremium,
            });
            
            await axios.post('http://localhost/api/v1/management/register', {
                username: formData.name,
                password: formData.password,
                favouriteTeam: formData.favouriteTeam,
                isPremium: formData.isPremium,
            });

            setSuccessMessage("Registration successful!");
            navigate("/", { state: { successMessage: "Account created successfully!" } });
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during registration.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-10">
                    <img src={iconLogo} alt="icon-logo" className="w-60 h-auto" />
                    <img src={textLogo} alt="text-logo" className="w-64 h-auto mt-4" />
                </div>

                <div className="card w-full max-w-md shadow-2xl p-8 bg-[#333D4D] rounded-lg">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                        {/* Name Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="name"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                                required
                            />
                        </div>

                        {/* Favourite Team Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Favourite Team</label>
                            <input
                                type="text"
                                name="favouriteTeam"
                                value={formData.favouriteTeam}
                                onChange={handleInputChange}
                                placeholder="team"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="password"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                                required
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="password"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                                required
                            />
                        </div>

                        {/* Premium Checkbox */}
                        <div className="form-control">
                            <label className="cursor-pointer flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="isPremium"
                                    checked={formData.isPremium}
                                    onChange={handleInputChange}
                                    className="checkbox checkbox-md border-white border-1 checked:bg-white"
                                />
                                <span className="text-white">Premium Account</span>
                            </label>
                        </div>

                        {/* Register Button */}
                        <div className="flex items-center">
                            <button
                                type="submit"
                                className="btn w-full text-white py-2 px-4 rounded-md text-lg bg-[#21A179]"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
