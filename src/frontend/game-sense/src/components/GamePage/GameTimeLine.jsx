import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faRightLeft,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import axios from "axios";

const fetchEvents = async () => {
  const res = await axios.get(
    "http://localhost:8082/api/v1/live/0/ping?lastEventId=0",
  );
  return res.data;
};

const GameTimeline = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery("events", fetchEvents, {
    refetchInterval: 10000,
  });

  if (error) {
    return <p>Error fetching data</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={`relative w-full bg-[#196146] text-white p-6 rounded-md ${
        events.length > 0 ? "min-h-[100px]" : "min-h-[70px]"
      }`}
    >
      {/* Events */}
      {events.length === 0 ? (
        <p className="text-center text-white">No events to display.</p>
      ) : (
        events.map((event, index) => (
          <div
            key={index}
            className={`relative flex w-full items-center my-8 ${
              event.team === "left" ? "justify-start" : "justify-end"
            }`}
          >
            {renderEventBlock(event, event.team)}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
              <div className="w-4 h-4 bg-white rounded-full event-dot"></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const renderEventBlock = (event, team) => {
  const isLeft = team === "home";

  return (
    <div
      className={`flex items-center w-1/2 ${
        isLeft ? "pr-7 justify-end text-right" : "pl-7 justify-start text-left"
      }`}
    >
      {isLeft && (
        <div className="mr-4">
          <span className="font-bold">{event.minute}'</span> {event.player}
        </div>
      )}

      <div
        className={`flex items-center justify-center ${
          event.type === "goal"
            ? "text-green-200"
            : event.type === "red-card"
              ? "text-red-500"
              : event.type === "yellow-card"
                ? "text-yellow-400"
                : event.type === "substitution"
                  ? "text-blue-400"
                  : event.type === "auto-goal"
                    ? "text-red-300"
                    : ""
        }`}
      >
        {event.type === "goal" && (
          <FontAwesomeIcon icon={faFutbol} className="h-5" />
        )}
        {event.type === "substitution" && (
          <FontAwesomeIcon icon={faRightLeft} className="h-5" />
        )}
        {event.type === "red-card" && (
          <FontAwesomeIcon icon={faSquare} className="h-5" />
        )}
        {event.type === "yellow-card" && (
          <FontAwesomeIcon icon={faSquare} className="h-5" />
        )}
        {event.type === "auto-goal" && (
          <FontAwesomeIcon icon={faFutbol} className="h-5" />
        )}
      </div>

      {!isLeft && (
        <div className="ml-5">
          <span className="font-bold">{event.minute}'</span> {event.player}
        </div>
      )}
    </div>
  );
};

export default GameTimeline;
