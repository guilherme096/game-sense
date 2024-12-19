import React, { useState, useEffect } from "react";

export default function Timer({ gameId, initialTime = 0 }) {
    initialTime = parseInt(initialTime, 10);

    const getStoredTime = () => {
        const storedStartTime = localStorage.getItem(
            `timer-start-time-game-${gameId}`,
        );
        if (storedStartTime) {
            const elapsedSeconds = Math.floor(
                (Date.now() - parseInt(storedStartTime, 10)) / 1000,
            );
            return Math.min(initialTime + elapsedSeconds, 90);
        }
        return initialTime;
    };

    const [time, setTime] = useState(getStoredTime);

    useEffect(() => {
        const startTimeKey = `timer-start-time-game-${gameId}`;
        let interval;

        if (!localStorage.getItem(startTimeKey)) {
            localStorage.setItem(startTimeKey, Date.now());
        }

        interval = setInterval(() => {
            setTime((prevTime) => {
                const newTime = prevTime + 1;
                if (newTime >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gameId]);

    useEffect(() => {
        if (time >= 90) {
            localStorage.removeItem(`timer-start-time-game-${gameId}`);
        }
    }, [time, gameId]);

    return <>{time}</>;
}
