-- League Table
INSERT INTO league (name, logo)
VALUES 
('Premier League', 'premier_league_logo.png');

-- Club Table
INSERT INTO club (name, country, starred, logo, country_flag)
VALUES
('Manchester United', 'England', TRUE, 'man_utd_logo.png', 'england_flag.png'),
('Liverpool', 'England', TRUE, 'liverpool_logo.png', 'england_flag.png'),
('Chelsea', 'England', FALSE, 'chelsea_logo.png', 'england_flag.png');

-- League_Club Table
INSERT INTO league_club (league_id, club_id, matches_played, points, wins, draws, losses, goals_scored, goals_conceded, goal_difference, place)
VALUES
(1, 1, 38, 75, 23, 6, 9, 65, 40, 25, 1), 
(1, 2, 38, 72, 21, 9, 8, 70, 45, 25, 2), 
(1, 3, 38, 68, 20, 8, 10, 60, 38, 22, 3);

-- Players Table
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
(1, 'Marcus', 'Rashford', 25, 1.8, 70, 'Forward', 'England', 'england_flag.png', 10, FALSE),
(1, 'Harry', 'Maguire', 29, 1.94, 100, 'Defender', 'England', 'england_flag.png', 5, TRUE),
(1, 'David', 'de Gea', 32, 1.92, 76, 'Goalkeeper', 'Spain', 'spain_flag.png', 1, FALSE),
(2, 'Mohamed', 'Salah', 31, 1.75, 72, 'Forward', 'Egypt', 'egypt_flag.png', 11, FALSE),
(2, 'Virgil', 'van Dijk', 32, 1.93, 92, 'Defender', 'Netherlands', 'netherlands_flag.png', 4, FALSE),
(2, 'Alisson', 'Becker', 30, 1.91, 78, 'Goalkeeper', 'Brazil', 'brazil_flag.png', 1, TRUE),
(3, 'Raheem', 'Sterling', 28, 1.7, 69, 'Forward', 'England', 'england_flag.png', 7, FALSE),
(3, 'Thiago', 'Silva', 39, 1.83, 82, 'Defender', 'Brazil', 'brazil_flag.png', 6, FALSE),
(3, 'Kepa', 'Arrizabalaga', 29, 1.86, 84, 'Goalkeeper', 'Spain', 'spain_flag.png', 1, TRUE);

-- Injuries Table
INSERT INTO injury (player_id, date, description, severity, games_out)
VALUES
(2, '2024-12-01', 'Ankle sprain', 'Medium', 5), -- Harry Maguire
(6, '2024-11-15', 'Shoulder dislocation', 'High', 15), -- Alisson
(9, '2024-10-10', 'Groin injury', 'Low', 2); -- Kepa

-- Team Stats Table
INSERT INTO team_stats (club_id, possession, shots, passes_acc, tackles, fouls, corners, offsides, interceptions, total_goals)
VALUES
(1, 60, 15, 85, 10, 8, 7, 3, 12, 65),
(2, 65, 18, 90, 9, 7, 8, 2, 10, 70),
(3, 55, 12, 82, 12, 9, 5, 4, 15, 60);

-- Game Table
INSERT INTO game (referee, kickoff_time, stadium, minute_played, home_club_id, away_club_id, mvp)
VALUES
('Mike Dean', '2024-12-10 15:00:00', 'Old Trafford', 90, 1, 2, 1), -- Man Utd vs Liverpool
('Paul Tierney', '2024-12-17 18:00:00', 'Stamford Bridge', 90, 3, 1, 2); -- Chelsea vs Man Utd

-- Player Game Stats Table
INSERT INTO player_game_stats (player_id, game_id, rating, minutes_played, goals, assists, fouls, yellow_cards, red_cards, saves)
VALUES
(1, 1, 8, 90, 1, 1, 2, 0, 0, 0), -- Rashford
(4, 1, 9, 90, 2, 0, 1, 1, 0, 0), -- Salah
(8, 2, 7, 90, 0, 0, 3, 0, 0, 0); -- Thiago Silva

-- Top Stats Table
INSERT INTO top_stats (player_id, name, value)
VALUES
(1, 'Top scorer', 25), -- Rashford
(4, 'Most assists', 15), -- Salah
(8, 'Best defender', 10); -- Thiago Silva
