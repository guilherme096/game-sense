import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function GameCard({ game }) {
    return (
        <div className="flex flex-col w-full p-5 py-6 bg-[#333D4D] rounded-lg drop-shadow-lg justify-center items-center">
            <div className="w-full text-center text-xs text-neutral-300">
                {game.schedule}
            </div>
            <div className="flex flex-row w-full text-neutral-300 items-center justify-between px-10">
                <div className="w-20 h-fit  flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                        {game.homeTeam.image ? (
                            <img
                                className="w-full h-full object-contain"
                                src={game.homeTeam.image}
                                alt={game.homeTeam.name}
                            />
                        ) : (
                            <span className="text-sm text-gray-500">{homeTeam.name}</span>
                        )}
                    </div>
                    <div className="font-bold mt-2 text-xl text-gray-400">
                        {game.homeTeam.score}
                    </div>
                    {game.events.map((event, index) => {
                        if (event.team === "home" && event.type === "goal") {
                            return (
                                <div className="flex flex-row">
                                    <div className="text-green-200">
                                        <FontAwesomeIcon icon={faFutbol} className="h-5" />
                                    </div>
                                    <span className="font-bold text-sm">{event.minute}'</span>{" "}
                                    {event.player}
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="flex flex-col mt-4">
                    <div className="text-white font-bold text-lg">VS</div>
                    <div className="text-green-500 font-bold text-lg mt-2">
                        {game.minutePlayed}'
                    </div>
                </div>
                <div className="w-20 h-fit  flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                        {game.awayTeam.image ? (
                            <img
                                className="w-full h-full object-contain"
                                src={game.awayTeam.image}
                                alt={game.awayTeam.name}
                            />
                        ) : (
                            <span className="text-sm text-gray-500">{awayTeam.name}</span>
                        )}
                    </div>
                    <div className="font-bold mt-2 text-xl text-gray-400">
                        {game.awayTeam.score}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GameCard;
