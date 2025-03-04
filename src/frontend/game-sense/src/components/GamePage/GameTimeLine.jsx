import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faRightLeft,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchEvents = async (id, lastEventId) => {
  const res = await axios.get(
    "/api/v1/live/" + id + "/ping?" + new URLSearchParams({ lastEventId }),
  );
  return res.data;
};

const GameTimeline = ({ id }) => {
  const timelineRef = useRef(null);
  const [lineStyles, setLineStyles] = useState({ top: "100px", height: 0 });
  const [visibleEvents, setVisibleEvents] = useState([]); // Track which events are visible
  const [events, setEvents] = useState([]);
  const [lastEventId, setLastEventId] = useState(-1);

  const navigate = useNavigate();

  const {
    data: newEvents = [],
    isLoading,
    error,
  } = useQuery(
    ["events", id, lastEventId],
    () => fetchEvents(id, lastEventId),
    {
      refetchInterval: (data) => {
        return data?.minute == 90 ? false : 5000;
      },
      onSuccess: (fetchedEvents) => {
        if (fetchedEvents && fetchedEvents.length > 0) {
          setEvents((prevEvents) => {
            // Only add events we don't already have
            const newEventIds = new Set(
              fetchedEvents.map((e) => e.event_index),
            );
            const filteredPrevEvents = prevEvents.filter(
              (e) => !newEventIds.has(e.event_index),
            );
            // returne sorted events by event_index
            return [...filteredPrevEvents, ...fetchedEvents].sort(
              (a, b) => parseInt(a.event_index) - parseInt(b.event_index),
            );
          });
        }
      },
    },
  );

  useEffect(() => {
    if (newEvents.length > 0) {
      const newLastEventId = newEvents[newEvents.length - 1].event_index;
      setLastEventId(newLastEventId);
    }
  }, [newEvents]);

  useEffect(() => {
    if (timelineRef.current && events.length > 0) {
      const dots = timelineRef.current.querySelectorAll(".event-dot");
      if (dots.length > 0) {
        const firstDot = dots[0].getBoundingClientRect();
        const lastDot = dots[dots.length - 1].getBoundingClientRect();
        const containerTop = timelineRef.current.getBoundingClientRect().top;

        setLineStyles({
          top: firstDot.top - containerTop + firstDot.height / 2,
          height: lastDot.top - firstDot.top,
        });

        events.forEach((_, index) => {
          setTimeout(() => {
            setVisibleEvents((prev) => [...prev, index]);
          }, index * 300);
        });
      }
    }
  }, [events]);

  if (error) {
    return <p>Error fetching data</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const renderEventBlock = (event, team) => {
    const isLeft = team === "home";

    return (
      <div
        className={`flex items-center w-1/2 ${
          isLeft
            ? "pr-4 justify-end text-right"
            : "pl-4 justify-start text-left"
        }`}
      >
        {isLeft &&
          (event.event_type === "SUBSTITUTION" ? (
            <div className="ml-4 flex-1">
              <span
                className="font-bold break-words inline-block cursor-pointer"
                onClick={() => navigate(`/player/${event.player_in_id}`)}
              >
                {event.player_in}
              </span>
              <span
                className="break-words inline-block ml-1 cursor-pointer"
                onClick={() => navigate(`/player/${event.player_out_id}`)}
              >
                ({event.player_out})
              </span>
            </div>
          ) : event.event_type === "GOAL" ? (
            <div className="ml-4 flex-1">
              <span
                className="font-bold break-words inline-block cursor-pointer"
                onClick={() => navigate(`/player/${event.scorer_id}`)}
              >
                {event.scorer}
              </span>
              <span
                className="break-words inline-block ml-1 cursor-pointer"
                onClick={() => navigate(`/player/${event.assist_id}`)}
              >
                ({event.assist})
              </span>
            </div>
          ) : (
            <div className="ml-4 flex-1">
              <span
                className="break-words inline-block cursor-pointer"
                onClick={() => navigate(`/player/${event.player_id}`)}
              >
                {event.player}
              </span>
            </div>
          ))}

        <div
          className={`px-4 flex items-center justify-center ${
            event.event_type === "GOAL"
              ? "text-green-200"
              : event.event_type === "RED_CARD"
                ? "text-red-500"
                : event.event_type === "YELLOW_CARD"
                  ? "text-yellow-400"
                  : event.event_type === "SECOND_YELLOW_CARD"
                    ? "text-yellow-400"
                    : event.event_type === "SUBSTITUTION"
                      ? "text-blue-400"
                      : event.event_type === "auto-goal"
                        ? "text-red-300"
                        : ""
          }`}
        >
          {event.event_type === "GOAL" && (
            <FontAwesomeIcon icon={faFutbol} className="h-5" />
          )}
          {event.event_type === "SUBSTITUTION" && (
            <FontAwesomeIcon icon={faRightLeft} className="h-5" />
          )}
          {event.event_type === "RED_CARD" && (
            <FontAwesomeIcon icon={faSquare} className="h-5" />
          )}
          {event.event_type === "YELLOW_CARD" && (
            <FontAwesomeIcon icon={faSquare} className="h-5" />
          )}
          {event.event_type === "SECOND_YELLOW_CARD" && (
            <FontAwesomeIcon icon={faSquare} className="h-5" />
          )}
          {event.event_type === "AUTO-GOAL" && (
            <FontAwesomeIcon icon={faFutbol} className="h-5" />
          )}
        </div>

        {!isLeft &&
          (event.event_type === "SUBSTITUTION" ? (
            <div className="mr-4 flex-1">
              <span
                className="font-bold break-words inline-block cursor-pointer"
                onClick={() => navigate(`/player/${event.player_in_id}`)}
              >
                {event.player_in}
              </span>
              <span
                className="break-words inline-block ml-1 cursor-pointer"
                onClick={() => navigate(`/player/${event.player_out_id}`)}
              >
                ({event.player_out})
              </span>
            </div>
          ) : event.event_type === "GOAL" ? (
            <div className="mr-4 flex-1">
              <span
                className="font-bold break-words inline-block cursor-pointer"
                onClick={() => navigate(`/player/${event.scorer_id}`)}
              >
                {event.scorer}
              </span>
              <span
                className="break-words inline-block ml-1 cursor-pointer"
                onClick={() => navigate(`/player/${event.assist_id}`)}
              >
                ({event.assist})
              </span>
            </div>
          ) : (
            <div className="mr-4 flex-1">
              <span
                className="break-words inline-block cursor-pointer"
                onClick={() => navigate(`/player/${event.player_id}`)}
              >
                {event.player}
              </span>
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      {events && events.length > 0 ? (
        <div
          className={`relative w-full bg-[#196146] text-white p-4 text-sm rounded-md ${
            events.length > 0 ? "min-h-[100px]" : "min-h-[70px]"
          }`}
          ref={timelineRef}
        >
          {/* Vertical Line */}
          {events.length > 0 && (
            <div
              className="absolute left-1/2 w-1 bg-white transform -translate-x-1/2 rounded-lg transition-all duration-500"
              style={{
                top: `${lineStyles.top}px`,
                height: `${lineStyles.height}px`,
              }}
            ></div>
          )}

          {/* Events */}
          {events.length === 0 ? (
            <p className="text-center text-white">No events to display.</p>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                className={`relative flex w-full items-center my-8 transition-opacity duration-300 ease-in-out ${
                  visibleEvents.includes(index) ? "opacity-100" : "opacity-0"
                } ${event.team === "home" ? "justify-start" : "justify-end"}`}
              >
                {renderEventBlock(event, event.team)}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                  <div className="w-6 h-6 text-xs bg-white text-green-800 font-extrabold rounded-full event-dot flex items-center justify-center">
                    {event.minute}'
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <p className="text-center text-white">Waiting for match to start</p>
      )}
    </>
  );
};

export default GameTimeline;
