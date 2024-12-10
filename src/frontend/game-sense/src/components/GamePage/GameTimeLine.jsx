import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFutbol,
    faRightLeft,
    faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import axios from "axios";

const fetchEvents = async (id) => {
    const res = await axios.get("/api/v1/live/" + id + "/ping?lastEventId=0");
    return res.data;
};

const GameTimeline = ({ id }) => {
    const timelineRef = useRef(null);
    const [lineStyles, setLineStyles] = useState({ top: "100px", height: 0 });
    const [visibleEvents, setVisibleEvents] = useState([]); // Track which events are visible

    const {
        data: events = [],
        isLoading,
        error,
    } = useQuery("events", () => fetchEvents(id), {
        refetchInterval: 10000,
    });

    useEffect(() => {
        if (timelineRef.current && events.length > 0) {
            const dots = timelineRef.current.querySelectorAll(".event-dot");
            if (dots.length > 0) {
                const firstDot = dots[0].getBoundingClientRect();
                const lastDot = dots[dots.length - 1].getBoundingClientRect();
                const containerTop = timelineRef.current.getBoundingClientRect().top;

                // Update vertical line styles
                setLineStyles({
                    top: firstDot.top - containerTop + firstDot.height / 2,
                    height: lastDot.top - firstDot.top,
                });

                // Animate event visibility
                events.forEach((_, index) => {
                    setTimeout(() => {
                        setVisibleEvents((prev) => [...prev, index]);
                    }, index * 300); // Delay each event rendering
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
        if (event.event_type === "START") {
            return <></>;
        }
        const isLeft = team === "home";

        return (
            <div
                className={`flex items-center w-1/2 ${isLeft
                        ? "pr-7 justify-end text-right"
                        : "pl-7 justify-start text-left"
                    }`}
            >
                <>
                    {isLeft &&
                        (event.event_type === "SUBSTITUTION" ? (
                            <div className="mr-4">
                                <span className="font-bold">{event.minute}'</span>{" "}
                                {event.player_out} - {event.player_in}
                            </div>
                        ) : (
                            <div className="mr-4">
                                <span className="font-bold">{event.minute}'</span>{" "}
                                {event.player}
                            </div>
                        ))}
                </>

                <div
                    className={`flex items-center justify-center ${event.event_type === "GOAL"
                            ? "text-green-200"
                            : event.event_type === "RED_CARD"
                                ? "text-red-500"
                                : event.event_type === "YELLOW_CARD"
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
                    {event.event_type === "AUTO-GOAL" && (
                        <FontAwesomeIcon icon={faFutbol} className="h-5" />
                    )}
                </div>

                {!isLeft &&
                    (event.event_type === "SUBSTITUTION" ? (
                        <div className="mr-4">
                            <span className="font-bold">{event.minute}'</span>{" "}
                            {event.player_out} - {event.player_in}
                        </div>
                    ) : (
                        <div className="mr-4">
                            <span className="font-bold">{event.minute}'</span> {event.player}
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <>
            {events.length > 0 ? (
                <div
                    className={`relative w-full bg-[#196146] text-white p-6 rounded-md ${events.length > 0 ? "min-h-[100px]" : "min-h-[70px]"
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
                        events.map((event, index) => {
                            if (event.event_type === "START") {
                                return <></>;
                            }
                            <div
                                key={index}
                                className={`relative flex w-full items-center my-8 transition-opacity duration-300 ease-in-out ${visibleEvents.includes(index) ? "opacity-100" : "opacity-0"
                                    } ${event.team === "home" ? "justify-start" : "justify-end"}`}
                            >
                                {renderEventBlock(event, event.team)}
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                                    <div className="w-4 h-4 bg-white rounded-full event-dot"></div>
                                </div>
                            </div>;
                        })
                    )}
                </div>
            ) : (
                <p className="text-center text-white">Waiting for match to start</p>
            )}
        </>
    );
};

export default GameTimeline;
