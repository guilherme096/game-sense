import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Combobox } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import textLogo from '/text-logo.png';
import iconLogo from '/icon-logo.png';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const navigate = useNavigate();
    const [clubs, setClubs] = useState([]);
    const [query, setQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        favouriteTeam: '',
        password: '',
        confirmPassword: '',
        isPremium: null,
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await axios.get('http://localhost/api/v1/club/');
                setClubs(response.data);
            } catch (error) {
                toast.error('Failed to fetch clubs');
            }
        };
        fetchClubs();
    }, []);

    const filteredClubs = query === ''
        ? clubs
        : clubs.filter(club => 
            club.name.toLowerCase().includes(query.toLowerCase())
        );

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (name === "isPremium") {
            setFormData(prev => ({
                ...prev,
                isPremium: checked,
            }));
        } else {
            setFormData(prev => ({
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
            toast.error("Passwords do not match");
            setFormData(prev => ({
                ...prev,
                password: '',
                confirmPassword: '',
            }));
            return;
        }

        try {
            await axios.post('http://localhost/api/v1/management/register', {
                username: formData.name,
                password: formData.password,
                favouriteTeam: formData.favouriteTeam,
                premium: formData.isPremium,
            });

            setSuccessMessage("Registration successful!");
            navigate("/", { state: { successMessage: "Account created successfully!" } });
        } catch (err) {
            if (err.response) {
                const message = err.response.data.message;
                if (message === "Username already exists") {
                    toast.error("Username already taken. Please choose another.");
                } else {
                    toast.error(message || "An error occurred during registration.");
                }
            } else if (err.request) {
                toast.error("No response from server. Please try again later.");
            } else {
                toast.error("An error occurred during registration.");
            }
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

                        {/* Favourite Team Combobox */}
                        <div className="relative">
                            <label className="text-sm text-gray-200 mb-1 block">Favourite Team</label>
                            <Combobox
                                value={formData.favouriteTeam}
                                onChange={value => setFormData(prev => ({ ...prev, favouriteTeam: value }))}
                            >
                                <div className="relative">
                                    <Combobox.Input
                                        className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                                        displayValue={(team) => team}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="select a team"
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <span className="text-gray-400">▼</span>
                                    </Combobox.Button>
                                </div>
                                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredClubs.length === 0 && query !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredClubs.map((club) => (
                                            <Combobox.Option
                                                key={club.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-[#21A179] text-white' : 'text-gray-900'
                                                    }`
                                                }
                                                value={club.name}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                            {club.name}
                                                        </span>
                                                        {selected && (
                                                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-[#21A179]'}`}>
                                                                ✓
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Combobox>
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