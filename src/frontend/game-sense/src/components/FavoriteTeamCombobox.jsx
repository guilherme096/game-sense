import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Combobox } from '@headlessui/react';
import { toast } from "react-toastify";

export default function FavoriteTeamCombobox({ selectedTeam, onTeamChange }) {
    const [clubs, setClubs] = useState([]);
    const [query, setQuery] = useState('');

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

    return (
        <div className="relative">
            <Combobox
                value={selectedTeam}
                onChange={onTeamChange}
            >
                <div className="relative">
                    <Combobox.Input
                        className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                        displayValue={(team) => team}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Select a team"
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
                                        active ? 'bg-[#333D4D] text-white' : 'text-gray-900'
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
    );
}
