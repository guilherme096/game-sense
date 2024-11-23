export const clubData = {
    name: "Wolverhampton Wanderers",
    logo: "/wolves.png",
    league: "Premier League",
    rank: 3,
    countryFlag: "/england.png",
    isFollowed: true,
    nextMatch: {
      homeTeam: {
        name: "Wolves",
        logo: "/wolves.png",
      },
      awayTeam: {
        name: "Chelsea",
        logo: "/chelsea.png",
      },
      date: "in 2 days",
      league: "Premier League",
    },
    lastMatches: [
      { score: "0-4", logo: "/scbraga.png", opponent: "SC Braga", result: "L" },
      { score: "8-1", logo: "/fcporto.png", opponent: "FC Porto", result: "W" },
      { score: "2-2", logo: "/manunited.png", opponent: "Man United", result: "D" },
      { score: "1-8", logo: "/sporting.png", opponent: "Sporting CP", result: "W" },
      { score: "5-3", logo: "/brentford.png", opponent: "Brentford", result: "L" },
    ],
    injuries: [
      {
        player: "Yerson Mosquera",
        description: "Knee Injury",
        severity: "medium",
        missedGames: 20,
      },
      {
        player: "Sasa Kalajdzic",
        description: "Ligament Tear",
        severity: "high",
        missedGames: 50,
      },
      {
        player: "Enso Gonzalez",
        description: "Knee Injury",
        severity: "low",
        missedGames: 7,
      },
    ],
  };
  