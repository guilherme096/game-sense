import React, { useState } from "react";

const ActionZones = () => {
  // Constants for teams and their respective maps
  const TEAMS = ["FC Porto", "SC Braga"];
  const MAPS = {
    "FC Porto": "https://via.placeholder.com/300x200?text=FC+Porto+Action+Zones", // Map for FC Porto
    "SC Braga": "https://via.placeholder.com/300x200?text=SC+Braga+Action+Zones", // Map for SC Braga
  };

  // State for selected team
  const [selectedTeam, setSelectedTeam] = useState(TEAMS[0]);

  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-4">
      {/* Title */}
      <h2 className="text-[#0C8557] text-xl font-bold mb-4">Action Zones</h2>

      {/* Team Selector Styled like StatisticsTab */}
      <div
        className="relative flex justify-center items-center bg-[#333D4D] rounded-md mb-4 shadow-sm"
        style={{
          width: "130px", // Reduced width from 168px to 140px
          height: "28px",
        }}
      >
        {TEAMS.map((team) => (
          <button
            key={team}
            onClick={() => setSelectedTeam(team)}
            className={`flex-1 h-full text-white text-[10px] font-semibold ${
              selectedTeam === team ? "bg-[#0C8557] rounded-md" : ""
            }`}
            style={{
              transition: "all 0.3s ease-in-out",
            }}
          >
            {team}
          </button>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="w-full max-w-[400px] rounded-md overflow-hidden shadow-md">
        <img
          src={MAPS[selectedTeam]} // Dynamically load the map for the selected team
          alt={`Action zones for ${selectedTeam}`}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ActionZones;
