import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "../Timer";
function GameCard({ game }) {
    return (
        <div className="flex flex-col w-full p-5 py-6 bg-[#333D4D] rounded-lg drop-shadow-lg justify-center items-center">
            <div className="w-full text-center text-xs text-neutral-300">
                {game.match_start_time}
            </div>
            <div className="flex flex-row w-full text-neutral-300 items-center justify-between px-10">
                <div className="w-20 h-fit  flex flex-col items-center justify-center overflow-show">
                    <div className="w-18 h-18 rounded-lg flex items-center justify-center overflow-hidden">
                        {game.home_team.image ? (
                            <img
                                className="w-full h-full object-contain"
                                src={game.home_team.image}
                                alt={game.home_team.name}
                            />
                        ) : (
                            <span className="text-sm text-gray-500">
                                {game.home_team.name}
                            </span>
                        )}
                    </div>
                    <div className="text-md font-bold mt-2 text-white text-nowrap">
                        {game.home_team.name}
                    </div>
                </div>
                <div className="flex flex-col mt-4 items-center">
                    <div className="row flex">
                        <div className="text-white font-bold text-3xl pr-3">
                            {game.home_team.score}
                        </div>

                        <div className="text-white font-bold text-3xl">:</div>

                        <div className="text-white font-bold text-3xl pl-3">
                            {game.away_team.score}
                        </div>
                    </div>
                    <div className="text-green-500 font-bold text-md mt-2">
                        <Timer gameId={game.match_id} initialTime={game.minute}>
                            '
                        </Timer>
                    </div>
                </div>
                <div className="w-20 h-fit  flex flex-col items-center justify-center overflow-show">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                        {game.away_team.image ? (
                            <img
                                className="w-full h-full object-contain"
                                src={game.away_team.image}
                                alt={game.away_team.name}
                            />
                        ) : (
                            <span className="text-sm text-gray-500">{away_team.name}</span>
                        )}
                    </div>
                    <div className="text-md font-bold mt-2 text-white text-nowrap">
                        {game.away_team.name}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GameCard;
