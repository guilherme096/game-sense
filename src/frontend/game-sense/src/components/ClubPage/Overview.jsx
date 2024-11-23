import React from "react";
import MatchCard from "./MatchCard";
import LastMatchesCard from "./LastMatches";
import InjuryStatusCard from "./InjuryStatus";

export default function Overview() {


    // Data for LastMatchesCard
    const matches = [
        { score: "0-4", logo: "/scbraga.png", opponent: "SC Braga", result: "L" },
        { score: "8-1", logo: "/fcporto.png", opponent: "FC Porto", result: "W" },
        { score: "2-2", logo: "/manunited.png", opponent: "Man United", result: "D" },
        { score: "1-8", logo: "/sporting.png", opponent: "Sporting CP", result: "W" },
        { score: "5-3", logo: "/brentford.png", opponent: "Brentford", result: "L" },
    ];

    return (
        <>
            <MatchCard
                homeTeam={{
                    name: "Wolves",
                    logo: "/wolves.png", // Use the public path for assets in the public folder
                }}
                awayTeam={{
                    name: "Chelsea",
                    logo: "/chelsea.png", // Use the public path for assets in the public folder
                }}
                time="2:00 PM"
                date="30 October"
                league="Premier League"
                onButtonClick={() => console.log("All Matches Clicked!")}
            />
            <LastMatchesCard matches={matches} />
            <InjuryStatusCard />
            <br /><br /><br /><br />
        </>
    );
}
