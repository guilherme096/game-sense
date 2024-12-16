use gamesense_db;

-- League Table
INSERT INTO league (name, logo)
VALUES 
('Premier League', 'premier_league_logo.png');

-- Club Table 
INSERT INTO club (name, country, starred, logo, country_flag)
VALUES
('Man United', 'England', TRUE, 'man_utd_logo.png', 'england_flag.png'),
('Liverpool', 'England', TRUE, 'liverpool_logo.png', 'england_flag.png'),
('Chelsea', 'England', FALSE, 'chelsea_logo.png', 'england_flag.png'),
('Aston Villa', 'England', FALSE, 'aston_villa_logo.png', 'england_flag.png');

-- League_Club Table
INSERT INTO league_club (league_id, club_id, matches_played, points, wins, draws, losses, goals_scored, goals_conceded, goal_difference, place)
VALUES

(1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1),
(1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2),
(1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3),
(1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4);

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
(3, 'Kepa', 'Arrizabalaga', 29, 1.86, 84, 'Goalkeeper', 'Spain', 'spain_flag.png', 1, TRUE),
(4, 'Jack', 'Grealish', 31, 1.75, 72, 'Forward', 'England', 'england_flag.png', 7, FALSE),
(4, 'Bernardo', 'Silva', 32, 1.93, 92, 'Defender', 'Portugal', 'portugal_flag.png', 6, FALSE);

-- Injuries Table
INSERT INTO injury (player_id, date, description, severity, games_out)
VALUES
(2, '2024-12-01', 'Ankle sprain', 'Medium', 5),  -- Harry Maguire
(6, '2024-11-15', 'Shoulder dislocation', 'High', 15),  -- Alisson
(9, '2024-10-10', 'Groin injury', 'Low', 2),  -- Kepa
(3, '2024-12-10', 'Knee injury', 'Medium', 6),  -- Thiago Silva
(5, '2024-12-11', 'Hamstring strain', 'High', 8);  -- Virgil van Dijk

-- Team Stats Table
INSERT INTO team_stats (club_id, possession, shots, passes_acc, tackles, fouls, corners, offsides, interceptions)
VALUES
(1, 60, 15, 85, 10, 8, 7, 3, 12),  -- 1st Man Utd
(2, 65, 18, 90, 9, 7, 8, 2, 10),  -- 1st Liverpool
(1, 58, 14, 83, 11, 9, 6, 4, 13),  -- 2nd Manchester United
(2, 66, 20, 92, 8, 6, 10, 3, 12),  -- 2nd Liverpool
(3, 48, 11, 80, 10, 10, 6, 5, 13),  -- 1st Chelsea
(1, 52, 11, 80, 10, 10, 6, 5, 13),  -- 1st Man United
(3, 60, 11, 80, 10, 10, 6, 5, 13),  -- 2nd Chelsea
(1, 40, 11, 80, 10, 10, 6, 5, 13);  -- 2nd Man United


-- Halves Table (creating halftime stats for games)
INSERT INTO half (home_club_stats, away_club_stats)
VALUES
(1, 2),  -- 1st Half: Man Utd vs Liverpool (Man Utd vs Liverpool)
(3, 4),  -- 2nd Half: Man Utd vs Liverpool (Man Utd vs Liverpool)
(5, 6),  -- 1nd Half: Chelsea vs Man Utd (Chelsea vs Man Utd)
(7, 8);  -- 2nd Half: Chelsea vs Man Utd (Chelsea vs Man Utd)


-- Game Table
INSERT INTO game (referee, kickoff_time, stadium, home_club_id, away_club_id, first_half, second_half)
VALUES
('Mike Dean', '2024-12-10 15:00:00', 'Old Trafford', 1, 2, 1, 2),  -- Man Utd vs Liverpool
('Paul Tierney', '2024-12-17 18:00:00', 'Stamford Bridge', 3, 1, 3, 4);  -- Chelsea vs Man Utd

-- Game Event Table
INSERT INTO game_events (game_id, type, minute, player_id, event_club_id)
VALUES
(1, 'Goal', 10, 1, 1),  -- Rashford in Man Utd vs Liverpool
(1, 'Goal', 20, 4, 2),  -- Salah in Man Utd vs Liverpool
(2, 'Yellow Card', 30, 8, 3),  -- Thiago Silva in Chelsea vs Man Utd
(1, 'Red Card', 60, 1, 1),  -- Rashford in Man Utd vs Chelsea
(1, 'Substitution Out', 70, 4, 3),  -- Salah in Liverpool vs Man Utd
(1, 'Substitution In', 70, 5, 3);  --  Van Dijk in Liverpool vs Man Utd


-- Player Game Stats Table
INSERT INTO player_game_stats (player_id, game_id, rating, minutes_played, goals, assists, fouls, yellow_cards, red_cards, saves)
VALUES
(1, 1, 8, 90, 1, 1, 2, 0, 0, 0),  -- Rashford in Man Utd vs Liverpool
(4, 1, 9, 90, 2, 0, 1, 1, 0, 0),  -- Salah in Man Utd vs Liverpool
(8, 2, 7, 90, 0, 0, 3, 0, 0, 0);  -- Thiago Silva in Chelsea vs Man Utd

