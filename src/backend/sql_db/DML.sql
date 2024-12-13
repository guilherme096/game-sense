-- Club Table
INSERT INTO club (name, country, starred, image)
VALUES
('Manchester United', 'England', TRUE, 'man_utd_logo.png'),
('Liverpool', 'England', TRUE, 'liverpool_logo.png'),
('Chelsea', 'England', FALSE, 'chelsea_logo.png');

-- League Table
INSERT INTO league (name, logo)
VALUES 
('Premier League', 'premier_league_logo.png');

-- League_Club Table
INSERT INTO league_club (
    league_id, club_id, matches_played, points, wins, draws, losses, goals_scored, goals_conceded, goal_difference, place
)
VALUES
(1, 1, 38, 75, 23, 6, 9, 65, 40, 25, 1), 
(1, 2, 38, 72, 21, 9, 8, 70, 45, 25, 2), 
(1, 3, 38, 68, 20, 8, 10, 60, 38, 22, 3);
