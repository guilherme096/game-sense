export default function InjuryStatusCard({ injuredPlayers }) {
  if (!injuredPlayers.length) {
    return <div>No players are currently injured.</div>;
  }  
  return (
    <div className="bg-white shadow-lg rounded-lg m-5">
      {/* Card Header */}
      <div className="bg-gray-700 text-white font-bold text-lg pl-3 p-2 rounded-t-lg">
        Injury Status
      </div>

      {/* Injuries Table */}
      <table className="w-full text-left border-collapse">
        <tbody>
          {injuredPlayers.map((player, index) => {
            // Find the most recent injury for the player
            const mostRecentInjury = player.injury_history.reduce(
              (latest, current) =>
                new Date(current.date) > new Date(latest.date) ? current : latest,
              player.injury_history[0] // Start with the first injury
            );

            return (
              <tr
                key={player.id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                {/* Player Name */}
                <td className="py-3 pl-3 text-black text-sm">{player.name}</td>
                {/* Injury Description */}
                <td className="py-3 pl-2 text-gray-600 text-sm">
                  {mostRecentInjury.description}
                </td>
                {/* Injury Severity */}
                <td className="py-4 pr-2 flex items-center justify-center">
                  <span
                    className={`w-4 h-4 rounded-full ${
                      mostRecentInjury.severity === "low"
                        ? "bg-green-500"
                        : mostRecentInjury.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                </td>
                {/* Games Missed */}
                <td className="py-3 pr-3 text-gray-700 font-semibold text-sm">
                  {mostRecentInjury.gamesOut} Games
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
