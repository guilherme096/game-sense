import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'players', 'clubs'
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const fetchData = useCallback(
    debounce(async (term) => {
      if (term.length < 3) {
        setPlayers([]);
        setClubs([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.allSettled([
          axios.get('/api/v1/player/search', {
            params: { name: term }, 
          }),
          axios.get('/api/v1/player/search', {
            params: { surname: term },
          }),
          axios.get('/api/v1/club/search', {
            params: { name: term },
          }),
        ]);

        const [playerNameResult, playerSurnameResult, clubResult] = results;

        let combinedPlayers = [];
        let clubsData = [];

        if (playerNameResult.status === 'fulfilled') {
          const playersByName = Array.isArray(playerNameResult.value.data)
            ? playerNameResult.value.data
            : [];
          combinedPlayers = [...combinedPlayers, ...playersByName];
        } else {
          // Optionally, handle the error or notify the user
          console.error('Error fetching players by name:', playerNameResult.reason);
        }

        if (playerSurnameResult.status === 'fulfilled') {
          const playersBySurname = Array.isArray(playerSurnameResult.value.data)
            ? playerSurnameResult.value.data
            : [];
          combinedPlayers = [...combinedPlayers, ...playersBySurname];
        } else {
          // Optionally, handle the error or notify the user
          console.error('Error fetching players by surname:', playerSurnameResult.reason);
        }

        if (clubResult.status === 'fulfilled') {
          clubsData = Array.isArray(clubResult.value.data) ? clubResult.value.data : [];
        } else {
          // Optionally, handle the error or notify the user
          console.error('Error fetching clubs:', clubResult.reason);
        }

        const uniquePlayers = Array.from(
          new Map(combinedPlayers.map((player) => [player.id, player])).values()
        );

        setPlayers(uniquePlayers);
        setClubs(clubsData);
      } catch (error) {
        console.error('Unexpected error fetching search results:', error);
        setPlayers([]);
        setClubs([]);
      } finally {
        setLoading(false);
      }
    }, 300), 
    []
  );

  useEffect(() => {
    if (isOpen) {
      fetchData(searchTerm);
    } else {
      fetchData.cancel();
      setSearchTerm(''); // Optionally clear the search term when closing
    }

    return () => {
      fetchData.cancel();
    };
  }, [searchTerm, isOpen, fetchData]);

  const getFilteredResults = () => {
    switch (filter) {
      case 'players':
        return players.map(player => ({
          id: player.id,
          name: `${player.name} ${player.surname}`, // Assuming player has surname
          type: 'player',
          link: `/player/${player.id}`
        }));
      case 'clubs':
        return clubs.map(club => ({
          id: club.id,
          name: club.name,
          type: 'club',
          link: `/club/${club.id}`
        }));
      default:
        return [
          ...players.map(player => ({
            id: player.id,
            name: `${player.name} ${player.surname}`, 
            type: 'player',
            link: `/player/${player.id}`
          })),
          ...clubs.map(club => ({
            id: club.id,
            name: club.name,
            type: 'club',
            link: `/club/${club.id}`
          }))
        ];
    }
  };

  return (
    <div
      ref={searchRef}
      className={`absolute right-0 top-full -mt-11 mr-1 transition-all duration-300 ease-in-out z-80 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="w-64 bg-white rounded-lg shadow-lg overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search players or clubs..."
          className="w-full px-4 py-2 border-b focus:outline-none rounded-t-lg"
          autoFocus={isOpen}
        />
        
        <div className="flex border-b space-x-2 p-2">
          <button
            onClick={() => setFilter('all')}
            className={`btn-sm flex justify-center items-center flex-1 px-4 py-2 text-sm rounded-full ${
              filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('players')}
            className={`btn-sm flex justify-center items-center flex-1 px-4 py-2 text-sm rounded-full ${
              filter === 'players' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Players
          </button>
          <button
            onClick={() => setFilter('clubs')}
            className={`btn-sm flex justify-center items-center flex-1 px-4 py-2 text-sm rounded-full ${
              filter === 'clubs' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Clubs
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : searchTerm.length < 3 ? (
            <div className="p-4 text-center text-gray-500">Type 3 letters to search</div>
          ) : getFilteredResults().length === 0 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : (
            <div className="py-2">
              {getFilteredResults().map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  to={result.link}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <div className="flex items-center">
                    <span className="flex-grow">{result.name}</span>
                    <span className="text-xs text-gray-500 capitalize">{result.type}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
