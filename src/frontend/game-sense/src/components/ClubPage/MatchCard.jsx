import React from "react";

export default function MatchCard({ matchData }) {
  const { homeTeam, awayTeam, date, league, onButtonClick } = matchData;

  return (
    <div className="shadow-lg rounded-lg m-5">
      {/* Card Header */}
      <div className="flex justify-between items-center p-4 bg-white">
        <div className="text-black font-bold text-lg">Next Match</div>
        <div className="text-gray-500 font-medium text-sm">{league}</div>
      </div>

      {/* Card Content */}
      <div className="flex justify-between items-center p-4 pl-12 pr-12 -mt-3">
        {/* Home Team */}
        <div className="flex flex-col items-center">
          <img src={homeTeam.logo} alt={homeTeam.name} className="w-16 h-16 object-contain" />
          <div className="text-black mt-2 text-lg">{homeTeam.name}</div>
        </div>

        {/* Match Time */}
        <div className="flex flex-col items-center">
          <div className="text-black font-bold text-lg">VS</div>
          <div className="text-gray-500 text-sm">{date}</div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center">
          <img src={awayTeam.logo} alt={awayTeam.name} className="w-16 h-16 object-contain" />
          <div className="text-black mt-2 text-lg">{awayTeam.name}</div>
        </div>
      </div>

      {/* Card Footer */}
      <button
        onClick={onButtonClick}
        className="w-full text-gray-600 font-bold bg-gray-100 py-2 rounded-b-lg text-sm"
      >
        All Matches
      </button>
    </div>
  );
}
