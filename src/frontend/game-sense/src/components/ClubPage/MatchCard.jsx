export default function MatchCard({ matchData }) {
  // Define the onButtonClick function
  const onButtonClick = () => {
    console.log("Button clicked!");
    // Add any logic for handling the button click here
  };

  return (
    <div className="shadow-lg rounded-lg m-5">
      {/* Card Header */}
      <div className="flex justify-between items-center p-4 bg-white">
        <div className="text-black font-bold text-lg">Next Match</div>
        <div className="text-gray-500 font-medium text-sm">{matchData.league}</div>
      </div>

      {/* Card Content */}
      <div className="flex justify-between items-center p-4 pl-12 pr-12 -mt-3">
        {/* Home Team */}
        <div className="flex flex-col items-center">
          <img
            src={matchData.homeTeamLogo}
            alt={matchData.homeTeam}
            className="w-16 h-16 object-contain"
          />
          <div className="text-black mt-2 text-lg">{matchData.homeTeam}</div>
        </div>

        {/* Match Time */}
        <div className="flex flex-col items-center">
          <div className="text-black font-bold text-lg">VS</div>
          <div className="text-gray-500 text-sm">{matchData.date}</div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center">
          <img
            src={matchData.awayTeamLogo}
            alt={matchData.awayTeam}
            className="w-16 h-16 object-contain"
          />
          <div className="text-black mt-2 text-lg">{matchData.awayTeam}</div>
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
