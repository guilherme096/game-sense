import React, { useRef, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faRightLeft,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

const GameTimeline = () => {
  const events = [];
  const timelineRef = useRef(null);
  const [lineStyles, setLineStyles] = useState({ top: 0, height: 0 });

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
      }
    }
  }, [events]);

  const renderEventBlock = (event, alignment) => {
    const isLeft = alignment === "left";

    return (
      <div
        className={`flex items-center w-1/2 ${
          isLeft
            ? "pr-7 justify-end text-right"
            : "pl-7 justify-start text-left"
        }`}
      >
        {isLeft && (
          <div className="mr-4">
            <span className="font-bold">{event.minute}'</span>{" "}
            {event.description}
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
            <span className="font-bold">{event.minute}'</span>{" "}
            {event.description}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`relative w-full bg-[#196146] text-white p-6 rounded-md ${
        events.length > 0 ? "min-h-[100px]" : "min-h-[70px]"
      }`}
      ref={timelineRef}
    >
      {/* Conditional rendering of vertical line */}
      {events.length > 0 && (
        <div
          className="absolute left-1/2 w-1 bg-white transform -translate-x-1/2 rounded-lg transition-all duration-300"
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

export default GameTimeline;
