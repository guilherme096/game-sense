import PropTypes from "prop-types";

function LiveGame({ game }) {
    return (
        <div className="flex flex-row w-full p-5 bg-neutral-100 rounded-lg drop-shadow-lg my-4 items-center">
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full text-neutral-300 mb-3">
                    <div className="w-full flex-row flex items-center align-middle">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                            {game.home_team.image ? (
                                <img
                                    className="w-full h-full object-contain"
                                    src={game.home_team.image}
                                    alt={game.home_team.name}
                                />
                            ) : (
                                <div className="text-xs font-semibold text-black">
                                    {game.home_team.name}
                                </div>
                            )}
                        </div>
                        <div className="text-s font-bold ml-3 text-black">
                            {game.home_team.name}
                        </div>
                        <div className="font-extrabold text-black ml-auto">
                            {game.home_team.score}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full text-neutral-300">
                    <div className="w-full flex-row flex items-center align-middle">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                            {game.away_team.image ? (
                                <img
                                    className="w-full h-full object-contain"
                                    src={game.away_team.image}
                                    alt={game.away_team.name}
                                />
                            ) : (
                                <div className="text-xs font-semibold text-black">
                                    {game.away_team.name}
                                </div>
                            )}
                        </div>
                        <div className="text-s font-bold ml-3 text-black">
                            {game.away_team.name}
                        </div>
                        <div className="font-extrabold  text-black ml-auto">
                            {game.away_team.score}
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="text-lg text-green-600 font-bold">{game.minute}'</div>
        </div>
    );
}

LiveGame.propTypes = {
    game: PropTypes.object.isRequired,
}

export default LiveGame;
