function GameCard({ game }) {
  return (
    <div className="flex flex-col w-full p-5 bg-[#333D4D] rounded-lg drop-shadow-lg">
      <div className="text-md font-bold text-neutral-100 mb-2">Your Team</div>
      <div className="w-full text-center text-xs text-neutral-300">
        {game.schedule}
      </div>
      <div className="flex flex-row w-full text-neutral-300 items-center justify-between px-10 mb-3">
        <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
          {game.team1.image ? (
            <img
              className="w-full h-full object-contain"
              src={game.team1.image}
              alt={game.team1.name}
            />
          ) : (
            <span className="text-sm text-gray-500">{team1.name}</span>
          )}
        </div>
        <div className="text-white font-bold text-lg">VS</div>
        <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
          {game.team2.image ? (
            <img
              className="w-full h-full object-contain"
              src={game.team2.image}
              alt={game.team2.name}
            />
          ) : (
            <span className="text-sm text-gray-500">{team2.name}</span>
          )}
        </div>
      </div>
    </div>
  );
}
export default GameCard;
