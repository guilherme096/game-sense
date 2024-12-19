import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faFlagCheckered, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export const formatKickoff = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-GB'); // "dd/mm/yyyy"
        const formattedTime = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        }); // "hh:mm"
        return `${formattedDate.split('/').slice(0, 2).join('/')} ${formattedTime}`; // "dd/mm/yy hh:mm"
    };

const MatchInformationCard = ({ kickoff, referee, stadium }) => {
    


    return (
        <div className="card-compact rounded-xl bg-base-100 shadow-md">
            <div className="card-body">
                <h2 className="card-title text-gray-500">Information</h2>
                <div className="flex flex-col space-y-4 mt-1">
                    {/* Kickoff */}
                    <div className="flex items-center space-x-4">
                        <FontAwesomeIcon icon={faCircleInfo} className="text-gray-400 h-5" />
                        <div>
                            <p className="font-bold text-md">Kickoff</p>
                            <p className="text-lg">{formatKickoff(kickoff)}</p>
                        </div>
                    </div>

                    {/* Referee */}
                    <div className="flex items-center space-x-4">
                        <FontAwesomeIcon icon={faFlagCheckered} className="text-gray-400 h-5" />
                        <div>
                            <p className="font-bold text-md">Referee</p>
                            <p className="text-lg">{referee}</p>
                        </div>
                    </div>

                    {/* Stadium */}
                    <div className="flex items-center space-x-4">
                        <FontAwesomeIcon icon={faLocationDot} className="text-gray-400 h-5" />
                        <div>
                            <p className="font-bold text-md">Stadium</p>
                            <p className="text-lg">{stadium}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

MatchInformationCard.propTypes = {
    kickoff: PropTypes.string.isRequired,
    referee: PropTypes.string.isRequired,
    stadium: PropTypes.string.isRequired,
}

;

export default MatchInformationCard;
