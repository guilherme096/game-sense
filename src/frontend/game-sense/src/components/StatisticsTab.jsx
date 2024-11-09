import React, { useState } from "react";

const StatisticsTab = () => {
  const [selectedTab, setSelectedTab] = useState("Overall");

  const tabs = ["Overall", "1st Half", "2nd Half"];

  const stats = {
    "1st Half": [
      { name: "Ball Possession", teamA: 46, teamB: 54 },
      { name: "Shots on Goal", teamA: 7, teamB: 4 },
      { name: "Pass Accuracy", teamA: 46, teamB: 51 },
      { name: "Tackles", teamA: 12, teamB: 38 },
      { name: "Fouls", teamA: 8, teamB: 18 },
      { name: "Corners", teamA: 15, teamB: 2 },
      { name: "Offsides", teamA: 8, teamB: 3 },
      { name: "Interceptions", teamA: 15, teamB: 25 },
    ],
    "2nd Half": [
      { name: "Ball Possession", teamA: 56, teamB: 44 },
      { name: "Shots on Goal", teamA: 5, teamB: 6 },
      { name: "Pass Accuracy", teamA: 56, teamB: 49 },
      { name: "Tackles", teamA: 18, teamB: 22 },
      { name: "Fouls", teamA: 12, teamB: 14 },
      { name: "Corners", teamA: 10, teamB: 5 },
      { name: "Offsides", teamA: 3, teamB: 6 },
      { name: "Interceptions", teamA: 20, teamB: 18 },
    ],
    Overall: [
      { name: "Ball Possession", teamA: 51, teamB: 49 },
      { name: "Shots on Goal", teamA: 12, teamB: 10 },
      { name: "Pass Accuracy", teamA: 51, teamB: 50 },
      { name: "Tackles", teamA: 30, teamB: 60 },
      { name: "Fouls", teamA: 20, teamB: 32 },
      { name: "Corners", teamA: 25, teamB: 7 },
      { name: "Offsides", teamA: 11, teamB: 9 },
      { name: "Interceptions", teamA: 35, teamB: 43 },
    ],
  };

  const renderStatBars = () =>
    stats[selectedTab].map((stat, index) => {
      const total = stat.teamA + stat.teamB; // Calculate the total for the stat
      const teamAWidth = (stat.teamA / total) * 50; // Team A's bar as a percentage of the left half
      const teamBWidth = (stat.teamB / total) * 50; // Team B's bar as a percentage of the right half

      const isTeamAWinner = stat.teamA > stat.teamB;

      const teamABarColor = isTeamAWinner ? "#0C8557" : "#D9D9D9"; // Green if Team A is winning
      const teamBBarColor = isTeamAWinner ? "#D9D9D9" : "#0C8557"; // Green if Team B is winning

      const teamANumberColor = isTeamAWinner ? "#0C8557" : "#333D4D";
      const teamBNumberColor = isTeamAWinner ? "#333D4D" : "#0C8557";

      return (
        <div key={index} className="mb-3">
          {/* Numbers and Stat Name */}
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1">
            <span style={{ color: teamANumberColor }}>{stat.teamA}</span>
            <span className="text-[#0C8557]">{stat.name}</span>
            <span style={{ color: teamBNumberColor }}>{stat.teamB}</span>
          </div>

          {/* Bars */}
          <div className="relative w-full h-2 bg-[#333D4D] rounded-full shadow-sm">
            {/* Left Bar (Team A) */}
            <div
              className="absolute left-1/2 h-full rounded-l-full transition-all duration-500"
              style={{
                width: `${teamAWidth}%`,
                transform: "translateX(-100%)",
                backgroundColor: teamABarColor,
              }}
            ></div>
            {/* Right Bar (Team B) */}
            <div
              className="absolute left-1/2 h-full rounded-r-full transition-all duration-500"
              style={{
                width: `${teamBWidth}%`,
                backgroundColor: teamBBarColor,
              }}
            ></div>
          </div>
        </div>
      );
    });

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div
        className="p-4 bg-white w-full max-w-[500px]" // Increased max-width here
        style={{
          height: "auto",
        }}
      >
        {/* Tab Navigation */}
        <div
          className="relative flex justify-center items-center bg-[#333D4D] rounded-md mb-3 shadow-sm"
          style={{
            width: "168px", // Unchanged selector width
            height: "24px",
            margin: "0 auto",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 h-full text-white text-[10px] font-semibold ${
                selectedTab === tab ? "bg-[#0C8557] rounded-md" : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className="mt-2"
          style={{
            width: "100%",
          }}
        >
          {renderStatBars()}
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
