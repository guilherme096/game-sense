import React from "react";

export default function LastMatchesCard({ matches = [] }) {
  if (!matches.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg m-5">
        <div className="bg-gray-700 text-white font-bold text-lg pl-3 p-2 rounded-t-lg">
          Last Matches
        </div>
        <div className="p-4 text-gray-500 text-center">No match data available.</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg m-5">
      {/* Card Header */}
      <div className="bg-gray-700 text-white font-bold text-lg pl-3 p-2 rounded-t-lg">
        Last Matches
      </div>
      {/* Matches List */}
      <div className="flex flex-row justify-around items-center p-4">
        {matches.map((match, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Match Result */}
            <div
              className={`text-white font-bold text-sm px-2 py-1 rounded-lg ${
                match.result.includes("W")
                  ? "bg-green-500"
                  : match.result.includes("L")
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            >
              {match.score}
            </div>
            {/* Opponent Logo */}
            <div className="w-[3rem] h-[3rem] flex items-center justify-center rounded-lg my-2 p-1">
              <img
                src={match.logo}
                alt={match.opponent}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* Opponent Name */}
            <div className="text-xs text-gray-700 font-medium">{match.opponent}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
