import PropTypes from "prop-types";

function LiveGame({ game }) {
    return (
        <div className="flex flex-row w-full p-5 bg-neutral-100 rounded-lg drop-shadow-lg my-4 items-center">
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full text-neutral-300 mb-3">
                    <div className="w-full flex-row flex items-center align-middle">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                            {game.homeTeam.image ? (
                                <img
                                    className="w-full h-full object-contain"
                                    src={game.homeTeam.image}
                                    alt={game.homeTeam.name}
                                />
                            ) : (
                                <div className="text-xs font-semibold text-black">
                                    {game.homeTeam.name}
                                </div>
                            )}
                        </div>
                        <div className="text-s font-bold ml-3 text-black">
                            {game.homeTeam.name}
                        </div>
                        <div className="font-extrabold text-black ml-auto">
                            {game.homeTeam.score}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full text-neutral-300">
                    <div className="w-full flex-row flex items-center align-middle">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                            {game.awayTeam.image ? (
                                <img
                                    className="w-full h-full object-contain"
                                    src={game.awayTeam.image}
                                    alt={game.awayTeam.name}
                                />
                            ) : (
                                <div className="text-xs font-semibold text-black">
                                    {game.awayTeam.name}
                                </div>
                            )}
                        </div>
                        <div className="text-s font-bold ml-3 text-black">
                            {game.awayTeam.name}
                        </div>
                        <div className="font-extrabold  text-black ml-auto">
                            {game.awayTeam.score}
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="text-lg text-green-600 font-bold">
                {game.minutePlayed}'
            </div>
        </div>
    );
}

LiveGame.propTypes = {
    game: PropTypes.object.isRequired,
}

export default LiveGame;
