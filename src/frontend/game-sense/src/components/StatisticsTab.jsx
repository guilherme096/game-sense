import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

const fetchGameStatistics = async (id) => {
  const response = await axios.get(`/api/v1/live/${id}/statistics`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};

const StatisticsTab = ({ id }) => {
  const [selectedTab, setSelectedTab] = useState("overall");

  const { data: gameStatistics, error, isLoading } = useQuery(
    "gameStatistics",
    () => fetchGameStatistics(id)
  );

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

      const teamAWidth = total > 0 ? (homeValue / total) * 50 : 0;
      const teamBWidth = total > 0 ? (awayValue / total) * 50 : 0;

      const isTeamAWinner = homeValue > awayValue;

      const teamABarColor = isTeamAWinner ? "#0C8557" : "#D9D9D9";
      const teamBBarColor = isTeamAWinner ? "#D9D9D9" : "#0C8557";

      const teamANumberColor = isTeamAWinner ? "#0C8557" : "#333D4D";
      const teamBNumberColor = isTeamAWinner ? "#333D4D" : "#0C8557";

      return (
        <div key={statName} className="mb-4">
          {/* Numbers and Stat Name */}
          <div className="flex justify-between items-center text-sm font-semibold mb-2">
            <span style={{ color: teamANumberColor }}>{homeValue}</span>
            <span className="text-[#0C8557]">{statName.replace(/([A-Z])/g, " $1")}</span>
            <span style={{ color: teamBNumberColor }}>{awayValue}</span>
          </div>

          {/* Bars */}
          <div className="relative w-full h-3 bg-[#333D4D] rounded-full">
            {/* Left Bar (Home Team) */}
            <div
              className="absolute left-1/2 h-full rounded-l-full"
              style={{
                width: `${teamAWidth}%`,
                transform: "translateX(-100%)",
                backgroundColor: teamABarColor,
              }}
            ></div>
            {/* Right Bar (Away Team) */}
            <div
              className="absolute left-1/2 h-full rounded-r-full"
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
      <div className="p-6 bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg">
        {/* Tab Navigation */}
        <div className="flex justify-center bg-[#333D4D] rounded-md mb-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-white py-2 px-4 text-sm font-bold ${
                selectedTab === tab ? "bg-[#0C8557] rounded-md" : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">{renderStatBars()}</div>
      </div>
    </div>
  );
}

StatisticsTab.propTypes = {
    id: PropTypes.string.isRequired,
}

;

export default StatisticsTab;
