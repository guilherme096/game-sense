import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'players', 'clubs'
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchTerm.length >= 2) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [playersRes, clubsRes] = await Promise.all([
            axios.get(`/api/v1/player/search?name=${searchTerm}`),
            axios.get(`/api/v1/club?name=${searchTerm}`)
          ]);
          setPlayers(playersRes.data || []);
          setClubs(clubsRes.data || []);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [searchTerm, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getFilteredResults = () => {
    switch (filter) {
      case 'players':
        return players.map(player => ({
          id: player.id,
          name: player.name,
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
            name: player.name,
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
      className={`absolute right-0 top-full mt-2 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="w-64 bg-white rounded-lg shadow-lg overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search players or clubs..."
          className="w-full px-4 py-2 border-b focus:outline-none"
          autoFocus
        />
        
        <div className="flex border-b">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-4 py-2 text-sm ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('players')}
            className={`flex-1 px-4 py-2 text-sm ${
              filter === 'players' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            Players
          </button>
          <button
            onClick={() => setFilter('clubs')}
            className={`flex-1 px-4 py-2 text-sm ${
              filter === 'clubs' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            Clubs
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : searchTerm.length < 2 ? (
            <div className="p-4 text-center text-gray-500">Type at least 2 characters to search</div>
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