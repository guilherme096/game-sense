import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchGameStatistics = async () => {
  const response = await axios.get("http://localhost:8082/api/v1/live/0/statistics", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return response.data;
};

const StatisticsTab = () => {
  const [selectedTab, setSelectedTab] = useState("overall");

  const { data: gameStatistics, error, isLoading } = useQuery("gameStatistics", fetchGameStatistics);

  const tabs = ["Overall", "1st Half", "2nd Half"];

  if (isLoading) {
    return <div>Loading statistics...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Map the selected tab to the corresponding API field
  const selectedStats =
    selectedTab === "Overall"
      ? gameStatistics.overall
      : selectedTab === "1st Half"
      ? gameStatistics.first_half
      : gameStatistics.second_half;

  const renderStatBars = () =>
    Object.entries(selectedStats.home).map(([statName, homeValue]) => {
      const awayValue = selectedStats.away[statName] || 0;
      const total = homeValue + awayValue;

      const teamAWidth = (homeValue / total) * 50;
      const teamBWidth = (awayValue / total) * 50;

      const isTeamAWinner = homeValue > awayValue;

      const teamABarColor = isTeamAWinner ? "#0C8557" : "#D9D9D9";
      const teamBBarColor = isTeamAWinner ? "#D9D9D9" : "#0C8557";

      const teamANumberColor = isTeamAWinner ? "#0C8557" : "#333D4D";
      const teamBNumberColor = isTeamAWinner ? "#333D4D" : "#0C8557";

      return (
        <div key={statName} className="mb-3">
          {/* Numbers and Stat Name */}
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1">
            <span style={{ color: teamANumberColor }}>{homeValue}</span>
            <span className="text-[#0C8557]">{statName.replace(/([A-Z])/g, " $1")}</span>
            <span style={{ color: teamBNumberColor }}>{awayValue}</span>
          </div>

          {/* Bars */}
          <div className="relative w-full h-2 bg-[#333D4D] rounded-full shadow-sm">
            {/* Left Bar (Home Team) */}
            <div
              className="absolute left-1/2 h-full rounded-l-full transition-all duration-500"
              style={{
                width: `${teamAWidth}%`,
                transform: "translateX(-100%)",
                backgroundColor: teamABarColor,
              }}
            ></div>
            {/* Right Bar (Away Team) */}
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
