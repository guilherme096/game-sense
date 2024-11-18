function LiveGame({ game }) {
  return (
    <div className="flex flex-row w-full p-5 bg-neutral-300 rounded-lg drop-shadow-lg my-4 items-center">
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full text-neutral-300 mb-3">
          <div className="w-full flex-row flex items-center align-middle">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              {game.team1.image ? (
                <img
                  className="w-full h-full object-contain"
                  src={game.team1.image}
                  alt={game.team1.name}
                />
              ) : (
                <div className="text-xs font-semibold text-black">
                  {team1.name}
                </div>
              )}
            </div>
            <div className="text-xs font-bold ml-3 text-black">
              {game.team1.name}
            </div>
            <div className="font-extrabold text-black ml-auto">1</div>
          </div>
        </div>
        <div className="flex flex-col w-full text-neutral-300">
          <div className="w-full flex-row flex items-center align-middle">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              {game.team2.image ? (
                <img
                  className="w-full h-full object-contain"
                  src={game.team2.image}
                  alt={game.team2.name}
                />
              ) : (
                <div className="text-xs font-semibold text-black">
                  {game.team2.name}
                </div>
              )}
            </div>
            <div className="text-xs font-bold ml-3 text-black">
              {game.team2.name}
            </div>
            <div className="font-extrabold text-black ml-auto">1</div>
          </div>
        </div>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="text-lg text-green-600 font-bold">82'</div>
    </div>
  );
}

export default LiveGame;
