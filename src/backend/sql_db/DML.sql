-- Club Table
INSERT INTO club (name, logo, country, country_flag, starred)
VALUES
    ('Chelsea', 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', 'England', 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg', 1),
    ('Arsenal', 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', 'England', 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg', 1);

SELECT id, name FROM club WHERE name IN ('Chelsea', 'Arsenal');

-- League Table
INSERT INTO league (name, logo)
VALUES 
('Premier League', 'https://img.chelseafc.com/image/upload/f_auto,w_1440,c_fill,g_faces,q_90/club-chelsea/football-competition-logos/Premier_League_logo_transparent.png');

SELECT id, name FROM league;

-- League_Club Table
INSERT INTO league_club (league_id, club_id, matches_played, points, wins, draws, losses, goals_scored, goals_conceded, goal_difference, place)
VALUES
(1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0);

SELECT * FROM league_club;