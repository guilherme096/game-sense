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
    const res = await axios.get(`/api/v1/game/${id}/events`);
    return res.data;
};

export default function GameTimelineNotLive({ id }) {
    const timelineRef = useRef(null);
    const [lineStyles, setLineStyles] = useState({ top: "100px", height: 0 });
    const [visibleEvents, setVisibleEvents] = useState([]); // Track which events are visible

    const { data: events = [], isLoading, error } = useQuery(
        ["events", id],
        () => fetchEvents(id)
    );

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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching events</div>;

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
                {/* Icon */}
                <div
                    className={`px-4 flex items-center justify-center ${
                        event.event_type === "Goal"
                            ? "text-green-200"
                            : event.event_type === "Red Card"
                            ? "text-red-500"
                            : event.event_type === "Yellow Card"
                            ? "text-yellow-400"
                            : event.event_type === "Substitution In"
                            ? "text-blue-400"
                            : event.event_type === "Substitution Out"
                            ? "text-blue-400"
                            : ""
                    }`}
                >
                    {event.event_type === "Goal" && (
                        <FontAwesomeIcon icon={faFutbol} className="h-5" />
                    )}
                    {event.event_type === "Substitution In" && (
                        <FontAwesomeIcon icon={faRightLeft} className="h-5" />
                    )}
                    {event.event_type === "Red Card" && (
                        <FontAwesomeIcon icon={faSquare} className="h-5" />
                    )}
                    {event.event_type === "Yellow Card" && (
                        <FontAwesomeIcon icon={faSquare} className="h-5" />
                    )}
                    {event.event_type === "Substitution Out" && (
                        <FontAwesomeIcon icon={faRightLeft} className="h-5" />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div
            className="relative w-full bg-[#196146] text-white p-4 text-sm rounded-md min-h-[100px]"
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
                <p className="text-center">No events to display.</p>
            ) : (
                events.map((event, index) => (
                    <div
                        key={index}
                        className={`relative flex w-full items-center my-8 transition-opacity duration-300 ease-in-out ${
                            visibleEvents.includes(index)
                                ? "opacity-100"
                                : "opacity-0"
                        } ${
                            event.team === "home"
                                ? "justify-start"
                                : "justify-end"
                        }`}
                    >
                    </div>
                ))
            )}
        </div>
    );
}
