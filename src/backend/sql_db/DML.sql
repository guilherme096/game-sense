use gamesense_db;

-- League Table
INSERT INTO league (name, logo)
VALUES 
('Premier League', 'premier_league_logo.png');

-- Club Table
INSERT INTO club (name, country, starred, logo, country_flag)
VALUES
    ('Man United', 'England', FALSE, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/640px-Manchester_United_FC_crest.svg.png', ''),
    ('Liverpool', 'England', FALSE, 'https://en.wikipedia.org/wiki/Liverpool_F.C.', ''),
    ('Chelsea', 'England', FALSE, 'https://en.wikipedia.org/wiki/Chelsea_F.C.', ''),
    ('Aston Villa', 'England', FALSE, 'https://worldvectorlogo.com/pt/logo/aston-villa', ''),
    ('Lixa', 'Portugal', TRUE, 'https://static.wikia.nocookie.net/logopedia/images/b/b0/FC_Lixa_%282014-2020%29.png/revision/latest?cb=20220922040330', ''),
    ('Vitória de Santarém', 'Portugal', FALSE, 'https://www.zerozero.pt/equipa/vc-santarem/108742', ''),
    ('Vizela', 'Portugal', FALSE, 'http://escudosfutebolbotao.blogspot.com/2021/04/vizela.html', ''),
    ('Uniao de Leiria', 'Portugal', FALSE, 'https://pt.wikipedia.org/wiki/Ficheiro:Uni%C3%A3o_Leiria.png', ''),
    ('Real Madrid', 'Spain', FALSE, 'https://logodownload.org/wp-content/uploads/2016/03/real-madrid-logo-1-1.png', 'spain_flag.png'),
    ('Al Nassr', 'Saudi Arabia', FALSE, 'https://en.wikipedia.org/wiki/Al_Nassr_FC', ''),
    ('Barcelona', 'Spain', FALSE, 'https://en.wikipedia.org/wiki/FC_Barcelona', 'spain_flag.png'),
    ('Wolves', 'England', FALSE, 'https://seeklogo.com/vector-logo/236301/wolves', ''),
    ('Man. City', 'England', FALSE, 'https://en.wikipedia.org/wiki/Manchester_City_F.C.', ''),
    ('Porto', 'Portugal', FALSE, 'https://logos-world.net/porto-logo/', ''),
    ('Benfica', 'Portugal', FALSE, 'https://seeklogo.com/free-vector-logos/benfica', ''),
    ('Sporting', 'Portugal', FALSE, 'https://logodownload.org/wp-content/uploads/2019/03/sporting-clube-de-portugal-logo-escudo.png', ''),
    ('Juventus', 'Italy', FALSE, 'https://seeklogo.com/images/F/fc-juventus-logo-A48B34A764-seeklogo.com.png', ''),
    ('Ath. Madrid', 'Spain', FALSE, 'https://cdn.worldvectorlogo.com/logos/atletico-madrid-1.svg', 'spain_flag.png');

-- League_Club Table
INSERT INTO league_club (league_id, club_id, matches_played, points, wins, draws, losses, goals_scored, goals_conceded, goal_difference, place)
VALUES
    (1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1),
    (1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2),
    (1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3),
    (1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4),
    (1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5),
    (1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6),
    (1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7),
    (1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 8),
    (1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9),
    (1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10),
    (1, 11, 0, 0, 0, 0, 0, 0, 0, 0, 11),
    (1, 12, 0, 0, 0, 0, 0, 0, 0, 0, 12),
    (1, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13),
    (1, 14, 0, 0, 0, 0, 0, 0, 0, 0, 14),
    (1, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15),
    (1, 16, 0, 0, 0, 0, 0, 0, 0, 0, 16),
    (1, 17, 0, 0, 0, 0, 0, 0, 0, 0, 17),
    (1, 18, 0, 0, 0, 0, 0, 0, 0, 0, 18);


-- Players Table for Atlético de Madrid
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(11, 'Jan', 'Oblak', 31, 1.88, 87, 1, 'Slovenia', 'slovenia_flag.png', 13, FALSE),
(11, 'Ivo', 'Grbić', 28, 1.95, 84, 1, 'Croatia', 'croatia_flag.png', 1, FALSE),

-- Defenders
(11, 'Nahuel', 'Molina', 26, 1.75, 70, 2, 'Argentina', 'argentina_flag.png', 16, FALSE),
(11, 'Reinildo', 'Mandava', 30, 1.80, 74, 3, 'Mozambique', 'mozambique_flag.png', 23, FALSE),
(11, 'José María', 'Giménez', 29, 1.85, 80, 4, 'Uruguay', 'uruguay_flag.png', 2, FALSE),
(11, 'Stefan', 'Savić', 33, 1.87, 81, 5, 'Montenegro', 'montenegro_flag.png', 15, FALSE),
(11, 'Mario', 'Hermoso', 29, 1.84, 73, 5, 'Spain', 'spain_flag.png', 22, FALSE),

-- Midfielders
(11, 'Koke', 'Resurrección', 32, 1.76, 74, 6, 'Spain', 'spain_flag.png', 6, FALSE),
(11, 'Rodrigo', 'De Paul', 30, 1.80, 70, 8, 'Argentina', 'argentina_flag.png', 5, FALSE),
(11, 'Marcos', 'Llorente', 29, 1.84, 74, 8, 'Spain', 'spain_flag.png', 14, FALSE),
(11, 'Saúl', 'Ñíguez', 29, 1.84, 76, 8, 'Spain', 'spain_flag.png', 8, FALSE),
(11, 'Thomas', 'Lemar', 29, 1.70, 62, 10, 'France', 'france_flag.png', 11, FALSE),

-- Forwards
(11, 'Antoine', 'Griezmann', 33, 1.76, 73, 7, 'France', 'france_flag.png', 7, FALSE),
(11, 'Ángel', 'Correa', 29, 1.71, 68, 7, 'Argentina', 'argentina_flag.png', 10, FALSE),
(11, 'Memphis', 'Depay', 30, 1.76, 78, 9, 'Netherlands', 'netherlands_flag.png', 9, FALSE),
(11, 'Álvaro', 'Morata', 32, 1.90, 85, 9, 'Spain', 'spain_flag.png', 19, FALSE),
(11, 'Yannick', 'Carrasco', 31, 1.81, 73, 11, 'Belgium', 'belgium_flag.png', 21, FALSE),
(11, 'Matheus', 'Cunha', 25, 1.84, 76, 11, 'Brazil', 'brazil_flag.png', 20, FALSE);


-- Players Table for Juventus FC
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(10, 'Mattia', 'Perin', 32, 1.88, 77, 1, 'Italy', 'italy_flag.png', 1, FALSE),
(10, 'Carlo', 'Pinsoglio', 34, 1.91, 80, 1, 'Italy', 'italy_flag.png', 23, FALSE),

-- Defenders
(10, 'Danilo', 'Luiz da Silva', 33, 1.84, 78, 2, 'Brazil', 'brazil_flag.png', 6, FALSE),
(10, 'Andrea', 'Cambiaso', 24, 1.81, 75, 3, 'Italy', 'italy_flag.png', 27, FALSE),
(10, 'Gleison', 'Bremer', 27, 1.88, 80, 4, 'Brazil', 'brazil_flag.png', 3, FALSE),
(10, 'Federico', 'Gatti', 26, 1.90, 82, 5, 'Italy', 'italy_flag.png', 4, FALSE),
(10, 'Pierre', 'Kalulu', 24, 1.82, 73, 2, 'France', 'france_flag.png', 15, FALSE),

-- Midfielders
(10, 'Manuel', 'Locatelli', 26, 1.85, 75, 6, 'Italy', 'italy_flag.png', 5, FALSE),
(10, 'Weston', 'McKennie', 26, 1.83, 84, 8, 'USA', 'usa_flag.png', 16, FALSE),
(10, 'Nicolò', 'Fagioli', 23, 1.78, 70, 8, 'Italy', 'italy_flag.png', 21, FALSE),
(10, 'Khéphren', 'Thuram', 23, 1.92, 80, 6, 'France', 'france_flag.png', 19, FALSE),
(10, 'Douglas', 'Luiz', 26, 1.75, 66, 8, 'Brazil', 'brazil_flag.png', 26, FALSE),

-- Forwards
(10, 'Dušan', 'Vlahović', 24, 1.90, 75, 9, 'Serbia', 'serbia_flag.png', 9, FALSE),
(10, 'Arkadiusz', 'Milik', 30, 1.86, 78, 9, 'Poland', 'poland_flag.png', 14, FALSE),
(10, 'Timothy', 'Weah', 24, 1.83, 66, 7, 'USA', 'usa_flag.png', 22, FALSE),
(10, 'Kenan', 'Yıldız', 19, 1.85, 75, 10, 'Turkey', 'turkey_flag.png', 10, FALSE),
(10, 'Nicolás', 'González', 26, 1.80, 72, 11, 'Argentina', 'argentina_flag.png', 11, FALSE),
(10, 'Francisco', 'Conceição', 22, 1.70, 63, 7, 'Portugal', 'portugal_flag.png', 7, FALSE),
(10, 'Samuel', 'Mbangula', 20, 1.78, 70, 11, 'Belgium', 'belgium_flag.png', 51, FALSE);


-- Players Table for Sporting CP
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(9, 'Franco', 'Israel', 24, 1.90, 80, 1, 'Uruguay', 'uruguay_flag.png', 1, FALSE),
(9, 'Vladan', 'Kovačević', 26, 1.91, 85, 1, 'Bosnia and Herzegovina', 'bosnia_flag.png', 13, FALSE),

-- Defenders
(9, 'Matheus', 'Reis', 29, 1.83, 78, 3, 'Brazil', 'brazil_flag.png', 2, FALSE),
(9, 'Iván', 'Fresneda', 20, 1.82, 78, 2, 'Spain', 'spain_flag.png', 22, FALSE),
(9, 'Gonçalo', 'Inácio', 23, 1.86, 81, 4, 'Portugal', 'portugal_flag.png', 25, FALSE),
(9, 'Ousmane', 'Diomande', 21, 1.90, 80, 5, 'Ivory Coast', 'ivory_coast_flag.png', 26, FALSE),
(9, 'Jeremiah', 'St. Juste', 28, 1.84, 76, 5, 'Netherlands', 'netherlands_flag.png', 3, FALSE),

-- Midfielders
(9, 'Morten', 'Hjulmand', 25, 1.85, 79, 6, 'Denmark', 'denmark_flag.png', 42, FALSE),
(9, 'Manuel', 'Ugarte', 23, 1.82, 77, 6, 'Uruguay', 'uruguay_flag.png', 15, FALSE),
(9, 'Pedro', 'Gonçalves', 26, 1.73, 65, 8, 'Portugal', 'portugal_flag.png', 28, FALSE),
(9, 'Hidemasa', 'Morita', 29, 1.77, 74, 8, 'Japan', 'japan_flag.png', 5, FALSE),
(9, 'Francisco', 'Trincão', 24, 1.84, 77, 10, 'Portugal', 'portugal_flag.png', 17, FALSE),

-- Forwards
(9, 'Marcus', 'Edwards', 26, 1.67, 59, 7, 'England', 'england_flag.png', 10, FALSE),
(9, 'Nuno', 'Santos', 29, 1.76, 70, 7, 'Portugal', 'portugal_flag.png', 11, FALSE),
(9, 'Viktor', 'Gyökeres', 26, 1.87, 88, 9, 'Sweden', 'sweden_flag.png', 9, FALSE),
(9, 'Paulinho', 'Teixeira', 32, 1.87, 75, 9, 'Portugal', 'portugal_flag.png', 21, FALSE),
(9, 'Youssef', 'Chermiti', 20, 1.92, 80, 11, 'Portugal', 'portugal_flag.png', 79, FALSE),
(9, 'Geny', 'Catamo', 23, 1.75, 68, 11, 'Mozambique', 'mozambique_flag.png', 57, FALSE);


-- Players Table for SL Benfica
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(8, 'Odysseas', 'Vlachodimos', 30, 1.88, 79, 1, 'Greece', 'greece_flag.png', 99, FALSE),
(8, 'Samuel', 'Soares', 22, 1.92, 84, 1, 'Portugal', 'portugal_flag.png', 24, FALSE),

-- Defenders
(8, 'Alexander', 'Bah', 26, 1.83, 76, 2, 'Denmark', 'denmark_flag.png', 6, FALSE),
(8, 'Juan', 'Bernat', 31, 1.70, 67, 3, 'Spain', 'spain_flag.png', 14, FALSE),
(8, 'Nicolás', 'Otamendi', 36, 1.83, 81, 4, 'Argentina', 'argentina_flag.png', 30, FALSE),
(8, 'António', 'Silva', 21, 1.87, 79, 5, 'Portugal', 'portugal_flag.png', 66, FALSE),
(8, 'David', 'Jurásek', 23, 1.83, 75, 3, 'Czech Republic', 'czech_republic_flag.png', 3, FALSE),

-- Midfielders
(8, 'Orkun', 'Kökçü', 23, 1.75, 70, 6, 'Turkey', 'turkey_flag.png', 10, FALSE),
(8, 'Florentino', 'Luís', 25, 1.84, 74, 6, 'Portugal', 'portugal_flag.png', 61, FALSE),
(8, 'Chiquinho', 'Ferreira', 29, 1.75, 68, 8, 'Portugal', 'portugal_flag.png', 22, FALSE),
(8, 'Fredrik', 'Aursnes', 28, 1.79, 70, 8, 'Norway', 'norway_flag.png', 8, FALSE),
(8, 'Ángel', 'Di María', 36, 1.80, 75, 10, 'Argentina', 'argentina_flag.png', 11, FALSE),

-- Forwards
(8, 'David', 'Neres', 27, 1.75, 66, 7, 'Brazil', 'brazil_flag.png', 7, FALSE),
(8, 'Rafa', 'Silva', 31, 1.70, 63, 7, 'Portugal', 'portugal_flag.png', 27, FALSE),
(8, 'Petar', 'Musa', 26, 1.90, 84, 9, 'Croatia', 'croatia_flag.png', 33, FALSE),
(8, 'Arthur', 'Cabral', 26, 1.86, 86, 9, 'Brazil', 'brazil_flag.png', 9, FALSE),
(8, 'Gonçalo', 'Ramos', 23, 1.85, 79, 9, 'Portugal', 'portugal_flag.png', 88, FALSE),
(8, 'Henrique', 'Araújo', 22, 1.82, 75, 11, 'Portugal', 'portugal_flag.png', 39, FALSE);


-- Players Table for FC Porto
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(7, 'Diogo', 'Costa', 25, 1.86, 82, 1, 'Portugal', 'portugal_flag.png', 99, FALSE),
(7, 'Cláudio', 'Ramos', 32, 1.83, 83, 1, 'Portugal', 'portugal_flag.png', 14, FALSE),

-- Defenders
(7, 'João', 'Mário', 24, 1.78, 66, 2, 'Portugal', 'portugal_flag.png', 23, FALSE),
(7, 'Francisco', 'Moura', 25, 1.81, 76, 3, 'Portugal', 'portugal_flag.png', 74, FALSE),
(7, 'Iván', 'Marcano', 37, 1.89, 77, 4, 'Spain', 'spain_flag.png', 5, FALSE),
(7, 'Zé', 'Pedro', 27, 1.87, 80, 5, 'Portugal', 'portugal_flag.png', 97, FALSE),
(7, 'Tiago', 'Djaló', 24, 1.90, 85, 5, 'Portugal', 'portugal_flag.png', 3, FALSE),

-- Midfielders
(7, 'Stephen', 'Eustáquio', 27, 1.75, 70, 6, 'Canada', 'canada_flag.png', 6, FALSE),
(7, 'Marko', 'Grujić', 28, 1.91, 78, 8, 'Serbia', 'serbia_flag.png', 8, FALSE),
(7, 'Fábio', 'Vieira', 24, 1.70, 58, 10, 'Portugal', 'portugal_flag.png', 10, FALSE),
(7, 'André', 'Franco', 26, 1.77, 73, 10, 'Portugal', 'portugal_flag.png', 20, FALSE),

-- Forwards
(7, 'Pepê', 'Azevedo', 27, 1.75, 69, 7, 'Brazil', 'brazil_flag.png', 11, FALSE),
(7, 'Wenderson', 'Galeno', 27, 1.79, 69, 7, 'Brazil', 'brazil_flag.png', 13, FALSE),
(7, 'Samu', 'Omorodion', 20, 1.93, 90, 9, 'Spain', 'spain_flag.png', 9, FALSE),
(7, 'Fran', 'Navarro', 26, 1.79, 74, 9, 'Spain', 'spain_flag.png', 21, FALSE),
(7, 'Gonçalo', 'Borges', 23, 1.84, 76, 11, 'Portugal', 'portugal_flag.png', 70, FALSE),
(7, 'Daniel', 'Loader', 24, 1.82, 77, 11, 'England', '', 19, FALSE);


-- Players Table for Manchester City FC
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(6, 'Ederson', 'Santana de Moraes', 31, 1.88, 86, 1, 'Brazil', 'brazil_flag.png', 31, FALSE),
(6, 'Stefan', 'Ortega Moreno', 32, 1.85, 85, 1, 'Germany', 'germany_flag.png', 18, FALSE),

-- Defenders
(6, 'Kyle', 'Walker', 34, 1.83, 83, 2, 'England', '', 2, FALSE),
(6, 'Rico', 'Lewis', 20, 1.69, 63, 2, 'England', '', 82, FALSE),
(6, 'Joško', 'Gvardiol', 22, 1.85, 80, 3, 'Croatia', 'croatia_flag.png', 24, FALSE),
(6, 'Nathan', 'Aké', 29, 1.80, 75, 3, 'Netherlands', 'netherlands_flag.png', 6, FALSE),
(6, 'Rúben', 'Dias', 27, 1.87, 82, 4, 'Portugal', 'portugal_flag.png', 3, FALSE),
(6, 'John', 'Stones', 30, 1.88, 76, 5, 'England', '', 5, FALSE),
(6, 'Manuel', 'Akanji', 29, 1.87, 91, 5, 'Switzerland', 'switzerland_flag.png', 25, FALSE),

-- Midfielders
(6, 'Rodrigo', 'Hernández Cascante', 28, 1.91, 82, 6, 'Spain', 'spain_flag.png', 16, FALSE),
(6, 'Mateo', 'Kovačić', 30, 1.77, 78, 8, 'Croatia', 'croatia_flag.png', 8, FALSE),
(6, 'Phil', 'Foden', 24, 1.71, 70, 8, 'England', '', 47, FALSE),
(6, 'Kevin', 'De Bruyne', 33, 1.81, 70, 10, 'Belgium', 'belgium_flag.png', 17, TRUE),
(6, 'Bernardo', 'Silva', 30, 1.73, 64, 10, 'Portugal', 'portugal_flag.png', 20, FALSE),

-- Forwards
(6, 'Jérémy', 'Doku', 22, 1.71, 66, 7, 'Belgium', 'belgium_flag.png', 11, FALSE),
(6, 'Jack', 'Grealish', 29, 1.75, 68, 7, 'England', '', 10, FALSE),
(6, 'Erling', 'Haaland', 24, 1.94, 88, 9, 'Norway', 'norway_flag.png', 9, FALSE),
(6, 'Julián', 'Álvarez', 24, 1.70, 71, 9, 'Argentina', 'argentina_flag.png', 19, FALSE),
(6, 'Oscar', 'Bobb', 21, 1.73, 65, 11, 'Norway', 'norway_flag.png', 52, FALSE);


-- Players Table for Wolverhampton Wanderers FC
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(5, 'José', 'Sá', 31, 1.92, 84, 1, 'Portugal', '', 1, FALSE),
(5, 'Daniel', 'Bentley', 31, 1.88, 73, 1, 'England', '', 25, FALSE),

-- Defenders
(5, 'Matt', 'Doherty', 32, 1.85, 80, 2, 'Ireland', 'ireland_flag.png', 2, FALSE),
(5, 'Nélson', 'Semedo', 30, 1.77, 69, 2, 'Portugal', '', 22, FALSE),
(5, 'Rayan', 'Aït-Nouri', 23, 1.80, 70, 3, 'Algeria', 'algeria_flag.png', 3, FALSE),
(5, 'Toti', 'Gomes', 25, 1.87, 72, 4, 'Portugal', '', 24, FALSE),
(5, 'Craig', 'Dawson', 34, 1.88, 82, 5, 'England', '', 15, FALSE),
(5, 'Santiago', 'Bueno', 26, 1.90, 76, 5, 'Uruguay', 'uruguay_flag.png', 4, FALSE),

-- Midfielders
(5, 'Mario', 'Lemina', 31, 1.84, 85, 6, 'Gabon', 'gabon_flag.png', 5, FALSE),
(5, 'Boubacar', 'Traoré', 23, 1.83, 67, 6, 'Mali', 'mali_flag.png', 6, FALSE),
(5, 'João', 'Gomes', 23, 1.76, 74, 8, 'Brazil', 'brazil_flag.png', 8, FALSE),
(5, 'Tommy', 'Doyle', 23, 1.72, 73, 8, 'England', '', 20, FALSE),
(5, 'Jean-Ricner', 'Bellegarde', 26, 1.72, 70, 10, 'France', 'france_flag.png', 27, FALSE),

-- Forwards
(5, 'Hwang', 'Hee-Chan', 28, 1.77, 77, 7, 'South Korea', 'south_korea_flag.png', 11, FALSE),
(5, 'Gonçalo', 'Guedes', 27, 1.79, 68, 7, 'Portugal', '', 29, FALSE),
(5, 'Matheus', 'Cunha', 25, 1.83, 76, 9, 'Brazil', 'brazil_flag.png', 10, FALSE),
(5, 'Saša', 'Kalajdžić', 27, 2.00, 90, 9, 'Austria', 'austria_flag.png', 18, FALSE),
(5, 'Jørgen', 'Strand Larsen', 24, 1.93, 79, 9, 'Norway', 'norway_flag.png', 9, FALSE),
(5, 'Carlos', 'Forbs', 20, 1.69, 62, 11, 'Portugal', '', 26, FALSE);


-- Players Table for Vitória Clube de Santarém
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(6, 'Miguel', 'Silva', 25, 1.87, 80, 1, 'Portugal', '', 1, FALSE),
(6, 'João', 'Costa', 28, 1.90, 83, 1, 'Portugal', '', 13, FALSE),

-- Defenders
(6, 'Rui', 'Almeida', 27, 1.81, 75, 2, 'Portugal', '', 2, FALSE),
(6, 'Filipe', 'Sousa', 24, 1.79, 72, 3, 'Portugal', '', 3, FALSE),
(6, 'Tiago', 'Pereira', 29, 1.85, 78, 4, 'Portugal', '', 4, FALSE),
(6, 'André', 'Fernandes', 30, 1.88, 80, 5, 'Portugal', '', 5, FALSE),
(6, 'Carlos', 'Vaz', 26, 1.82, 76, 5, 'Portugal', '', 14, FALSE),
(6, 'Pedro', 'Matos', 22, 1.83, 73, 2, 'Portugal', '', 21, FALSE),

-- Midfielders
(6, 'Diogo', 'Lopes', 28, 1.80, 74, 6, 'Portugal', '', 6, FALSE),
(6, 'João', 'Martins', 25, 1.75, 71, 8, 'Portugal', '', 8, FALSE),
(6, 'Gonçalo', 'Amaral', 23, 1.78, 70, 8, 'Portugal', '', 20, FALSE),
(6, 'Ricardo', 'Teixeira', 27, 1.79, 72, 10, 'Portugal', '', 10, FALSE),

-- Forwards
(6, 'Nuno', 'Silva', 24, 1.76, 70, 7, 'Portugal', '', 7, FALSE),
(6, 'Vasco', 'Costa', 29, 1.80, 73, 7, 'Portugal', '', 11, FALSE),
(6, 'Luís', 'Oliveira', 30, 1.85, 76, 9, 'Portugal', '', 9, FALSE),
(6, 'David', 'Barros', 22, 1.83, 75, 9, 'Portugal', '', 19, FALSE),
(6, 'Eduardo', 'Gomes', 28, 1.78, 72, 11, 'Portugal', '', 18, FALSE),
(6, 'Fernando', 'Ramos', 24, 1.79, 71, 11, 'Portugal', '', 17, FALSE),
(6, 'Jorge', 'Rodrigues', 26, 1.81, 75, 11, 'Portugal', '', 16, FALSE);



-- Players Table for Aston Villa FC
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(4, 'Emiliano', 'Martínez', 32, 1.95, 88, 1, 'Argentina', 'argentina_flag.png', 23, FALSE),
(4, 'Robin', 'Olsen', 34, 1.96, 89, 1, 'Sweden', 'sweden_flag.png', 25, FALSE),

-- Defenders
(4, 'Matty', 'Cash', 27, 1.85, 80, 2, 'Poland', 'poland_flag.png', 2, FALSE),
(4, 'Malo', 'Gusto', 21, 1.79, 70, 2, 'France', 'france_flag.png', 27, FALSE),
(4, 'Lucas', 'Digne', 31, 1.78, 74, 3, 'France', 'france_flag.png', 12, FALSE),
(4, 'Ian', 'Maatsen', 22, 1.67, 65, 3, 'Netherlands', 'netherlands_flag.png', 22, FALSE),
(4, 'Ezri', 'Konsa', 27, 1.83, 77, 4, 'England', '', 4, FALSE),
(4, 'Diego', 'Carlos', 31, 1.85, 79, 5, 'Brazil', 'brazil_flag.png', 3, FALSE),
(4, 'Pau', 'Torres', 27, 1.91, 80, 5, 'Spain', 'spain_flag.png', 14, FALSE),

-- Midfielders
(4, 'Boubacar', 'Kamara', 25, 1.84, 68, 6, 'France', 'france_flag.png', 44, FALSE),
(4, 'Amadou', 'Onana', 23, 1.92, 76, 6, 'Belgium', 'belgium_flag.png', 24, FALSE),
(4, 'John', 'McGinn', 30, 1.78, 68, 8, 'Scotland', 'scotland_flag.png', 7, FALSE),
(4, 'Youri', 'Tielemans', 27, 1.76, 72, 8, 'Belgium', 'belgium_flag.png', 8, FALSE),
(4, 'Emiliano', 'Buendía', 28, 1.72, 72, 10, 'Argentina', 'argentina_flag.png', 10, FALSE),

-- Forwards
(4, 'Leon', 'Bailey', 27, 1.78, 79, 7, 'Jamaica', 'jamaica_flag.png', 31, FALSE),
(4, 'Moussa', 'Diaby', 25, 1.70, 70, 7, 'France', 'france_flag.png', 19, FALSE),
(4, 'Ollie', 'Watkins', 28, 1.80, 70, 9, 'England', '', 11, FALSE),
(4, 'Jhon', 'Durán', 21, 1.85, 73, 9, 'Colombia', 'colombia_flag.png', 9, FALSE),
(4, 'Bertrand', 'Traoré', 29, 1.81, 73, 11, 'Burkina Faso', 'burkina_faso_flag.png', 15, FALSE);


-- Players Table for Chelsea FC
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(3, 'Robert', 'Sánchez', 27, 1.97, 90, 1, 'Spain', 'spain_flag.png', 1, FALSE),
(3, 'Marcus', 'Bettinelli', 32, 1.94, 90, 1, 'England', '', 13, FALSE),

-- Defenders
(3, 'Reece', 'James', 25, 1.82, 82, 2, 'England', '', 24, FALSE),
(3, 'Malo', 'Gusto', 21, 1.79, 70, 2, 'France', 'france_flag.png', 27, FALSE),
(3, 'Ben', 'Chilwell', 28, 1.81, 77, 3, 'England', '', 21, FALSE),
(3, 'Marc', 'Cucurella', 26, 1.72, 66, 3, 'Spain', 'spain_flag.png', 3, FALSE),
(3, 'Axel', 'Disasi', 26, 1.90, 86, 4, 'France', 'france_flag.png', 2, FALSE),
(3, 'Benoît', 'Badiashile', 23, 1.94, 75, 5, 'France', 'france_flag.png', 5, FALSE),
(3, 'Levi', 'Colwill', 21, 1.87, 83, 5, 'England', '', 6, FALSE),

-- Midfielders
(3, 'Moisés', 'Caicedo', 22, 1.78, 73, 6, 'Ecuador', 'ecuador_flag.png', 25, FALSE),
(3, 'Enzo', 'Fernández', 23, 1.78, 76, 8, 'Argentina', 'argentina_flag.png', 8, FALSE),
(3, 'Carney', 'Chukwuemeka', 20, 1.87, 70, 8, 'England', '', 17, FALSE),
(3, 'Cole', 'Palmer', 22, 1.89, 72, 10, 'England', '', 20, FALSE),

-- Forwards
(3, 'Noni', 'Madueke', 22, 1.82, 76, 7, 'England', '', 11, FALSE),
(3, 'Mykhailo', 'Mudryk', 23, 1.75, 61, 7, 'Ukraine', 'ukraine_flag.png', 10, FALSE),
(3, 'Christopher', 'Nkunku', 27, 1.75, 73, 9, 'France', 'france_flag.png', 18, FALSE),
(3, 'Nicolas', 'Jackson', 23, 1.86, 70, 9, 'Senegal', 'senegal_flag.png', 15, FALSE),
(3, 'Raheem', 'Sterling', 30, 1.70, 69, 11, 'England', '', 7, FALSE);


-- Players Table for FC Barcelona
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(10, 'Marc-André', 'ter Stegen', 32, 1.87, 85, 1, 'Germany', 'germany_flag.png', 1, FALSE),
(10, 'Iñaki', 'Peña', 25, 1.84, 77, 1, 'Spain', 'spain_flag.png', 13, FALSE),

-- Defenders
(10, 'Jules', 'Koundé', 26, 1.78, 70, 2, 'France', 'france_flag.png', 23, FALSE),
(10, 'Sergi', 'Roberto', 32, 1.78, 68, 2, 'Spain', 'spain_flag.png', 20, FALSE),
(10, 'Alejandro', 'Balde', 21, 1.75, 69, 3, 'Spain', 'spain_flag.png', 3, FALSE),
(10, 'Marcos', 'Alonso', 34, 1.89, 85, 3, 'Spain', 'spain_flag.png', 17, FALSE),
(10, 'Ronald', 'Araújo', 25, 1.88, 79, 4, 'Uruguay', 'uruguay_flag.png', 4, FALSE),
(10, 'Andreas', 'Christensen', 28, 1.87, 82, 5, 'Denmark', 'denmark_flag.png', 15, FALSE),
(10, 'Iñigo', 'Martínez', 33, 1.82, 81, 5, 'Spain', 'spain_flag.png', 5, FALSE),

-- Midfielders
(10, 'Oriol', 'Romeu', 33, 1.83, 83, 6, 'Spain', 'spain_flag.png', 18, FALSE),
(10, 'Frenkie', 'de Jong', 27, 1.80, 74, 8, 'Netherlands', 'netherlands_flag.png', 21, FALSE),
(10, 'Gavi', NULL, 20, 1.73, 70, 8, 'Spain', 'spain_flag.png', 6, FALSE),
(10, 'Pedri', NULL, 22, 1.74, 65, 10, 'Spain', 'spain_flag.png', 8, FALSE),
(10, 'İlkay', 'Gündoğan', 34, 1.80, 79, 10, 'Germany', 'germany_flag.png', 22, FALSE),

-- Forwards
(10, 'Raphinha', NULL, 28, 1.76, 68, 7, 'Brazil', 'brazil_flag.png', 11, FALSE),
(10, 'Ferran', 'Torres', 24, 1.84, 77, 7, 'Spain', 'spain_flag.png', 7, FALSE),
(10, 'Lamine', 'Yamal', 17, 1.80, 65, 7, 'Spain', 'spain_flag.png', 27, FALSE),
(10, 'Robert', 'Lewandowski', 36, 1.85, 81, 9, 'Poland', 'poland_flag.png', 9, FALSE),
(10, 'João', 'Félix', 25, 1.80, 70, 11, 'Portugal', '', 14, FALSE);


-- Players Table for Manchester United FC
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(1, 'André', 'Onana', 28, 1.90, 93, 1, 'Cameroon', 'cameroon_flag.png', 24, FALSE),
(1, 'Altay', 'Bayındır', 26, 1.98, 88, 1, 'Turkey', 'turkey_flag.png', 1, FALSE),

-- Defenders
(1, 'Diogo', 'Dalot', 25, 1.83, 76, 2, 'Portugal', '', 20, FALSE),
(1, 'Noussair', 'Mazraoui', 27, 1.83, 63, 2, 'Morocco', 'morocco_flag.png', 3, FALSE),
(1, 'Luke', 'Shaw', 29, 1.85, 75, 3, 'England', '', 23, FALSE),
(1, 'Tyrell', 'Malacia', 25, 1.69, 67, 3, 'Netherlands', 'netherlands_flag.png', 12, FALSE),
(1, 'Matthijs', 'de Ligt', 25, 1.89, 89, 4, 'Netherlands', 'netherlands_flag.png', 4, FALSE),
(1, 'Lisandro', 'Martínez', 26, 1.75, 77, 5, 'Argentina', 'argentina_flag.png', 6, FALSE),
(1, 'Harry', 'Maguire', 31, 1.94, 100, 5, 'England', '', 5, FALSE),

-- Midfielders
(1, 'Casemiro', 'miguel', 32, 1.85, 84, 6, 'Brazil', 'brazil_flag.png', 18, FALSE),
(1, 'Manuel', 'Ugarte', 23, 1.82, 83, 6, 'Uruguay', 'uruguay_flag.png', 25, FALSE),
(1, 'Bruno', 'Fernandes', 30, 1.79, 69, 8, 'Portugal', '', 8, FALSE),
(1, 'Mason', 'Mount', 25, 1.81, 70, 8, 'England', '', 7, FALSE),
(1, 'Christian', 'Eriksen', 32, 1.82, 76, 8, 'Denmark', 'denmark_flag.png', 14, FALSE),

-- Forwards
(1, 'Marcus', 'Rashford', 27, 1.85, 70, 7, 'England', '', 10, FALSE),
(1, 'Antony', 'goat', 24, 1.74, 63, 7, 'Brazil', 'brazil_flag.png', 21, FALSE),
(1, 'Rasmus', 'Højlund', 21, 1.91, 79, 9, 'Denmark', 'denmark_flag.png', 9, FALSE),
(1, 'Joshua', 'Zirkzee', 23, 1.93, 89, 9, 'Netherlands', 'netherlands_flag.png', 11, FALSE),
(1, 'Amad', 'Diallo', 22, 1.73, 72, 11, 'Ivory Coast', 'ivory_coast_flag.png', 16, FALSE);


-- Players Table for Al-Nassr FC
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(10, 'Nawaf', 'Al-Aqidi', 24, 1.88, 88, 1, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 44, FALSE),
(10, 'Raghed', 'Najjar', 28, 1.89, 94, 1, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 36, FALSE),

-- Defenders
(10, 'Sultan', 'Al-Ghannam', 30, 1.73, 67, 2, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 2, FALSE),
(10, 'Nawaf', 'Boushal', 25, 1.74, 64, 2, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 12, FALSE),
(10, 'Ali', 'Lajami', 28, 1.78, 76, 4, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 78, FALSE),
(10, 'Aymeric', 'Laporte', 30, 1.89, 86, 5, 'Spain', 'spain_flag.png', 27, FALSE),
(10, 'Mohammed', 'Al-Fatil', 32, 1.80, 71, 5, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 4, FALSE),
(10, 'Mohamed', 'Simakan', 24, 1.87, 82, 4, 'France', 'france_flag.png', 3, FALSE),

-- Midfielders
(10, 'Marcelo', 'Brozović', 32, 1.81, 68, 6, 'Croatia', 'croatia_flag.png', 11, FALSE),
(10, 'Abdullah', 'Al-Khaibari', 28, 1.75, 68, 6, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 17, FALSE),
(10, 'Otávio', NULL, 29, 1.72, 65, 8, 'Portugal', '', 25, FALSE),
(10, 'Sami', 'Al-Najei', 27, 1.76, 67, 10, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 14, FALSE),
(10, 'Anderson', 'Talisca', 30, 1.91, 80, 10, 'Brazil', 'brazil_flag.png', 94, FALSE),

-- Forwards
(10, 'Cristiano', 'Ronaldo', 39, 1.87, 83, 9, 'Portugal', '', 7, FALSE),
(10, 'Sadio', 'Mané', 32, 1.75, 69, 7, 'Senegal', 'senegal_flag.png', 10, FALSE),
(10, 'Ângelo', NULL, 19, 1.80, 78, 7, 'Brazil', 'brazil_flag.png', 20, FALSE),
(10, 'Abdulrahman', 'Ghareeb', 27, 1.65, 60, 11, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 29, FALSE),
(10, 'Mohammed', 'Maran', 23, 1.74, 67, 9, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 16, FALSE),
(10, 'Ayman', 'Yahya', 23, 1.73, 71, 11, 'Saudi Arabia', 'https://www.google.com/imgres?q=saudi%20arabia%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0d%2FFlag_of_Saudi_Arabia.svg%2F1280px-Flag_of_Saudi_Arabia.svg.png&imgrefurl=https%3A%2F%2Fpt.m.wikipedia.org%2Fwiki%2FFicheiro%3AFlag_of_Saudi_Arabia.svg&docid=28AYD-CgnqG8zM&tbnid=inBFH9e1aElxkM&vet=12ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA..i&w=1280&h=854&hcb=2&ved=2ahUKEwimgOXdta2KAxUyRfEDHVw6LAYQM3oECBwQAA', 23, FALSE);


-- Players Table for União Desportiva de Leiria
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(9, 'Fábio', 'Ferreira', 26, 1.88, 80, 1, 'Portugal', '', 29, FALSE),
(9, 'Pawel', 'Kieszek', 40, 1.88, 84, 1, 'Poland', 'poland_flag.png', 1, FALSE),

-- Defenders
(9, 'Tiago', 'Ferreira', 31, 1.83, 75, 4, 'Portugal', '', 23, FALSE),
(9, 'Marco', 'Baixinho', 35, 1.85, 78, 5, 'Portugal', '', 6, FALSE),
(9, 'Bura', 'Silva', 35, 1.90, 82, 5, 'Portugal', '', 4, FALSE),
(9, 'Victor', 'Rofino', 22, 1.85, 77, 4, 'Brazil', 'brazil_flag.png', 5, FALSE),
(9, 'Zé', 'Vitor', 22, 1.87, 79, 5, 'Portugal', '', 14, FALSE),
(9, 'João', 'Dias', 36, 1.80, 74, 2, 'Portugal', '', 2, FALSE),
(9, 'João', 'Gonçalves', 25, 1.78, 70, 3, 'Portugal', '', 3, FALSE),

-- Midfielders
(9, 'Diogo', 'Amado', 34, 1.80, 75, 6, 'Portugal', '', 8, FALSE),
(9, 'Afonso', 'Valente', 24, 1.76, 70, 8, 'Portugal', '', 20, FALSE),
(9, 'Jorge', 'Teixeira', 29, 1.82, 74, 8, 'Portugal', '', 21, FALSE),
(9, 'Vladyslav', 'Kobylianskyi', 25, 1.80, 72, 10, 'Ukraine', 'ukraine_flag.png', 10, FALSE),
(9, 'Sérgio', 'Ribeiro', 28, 1.75, 68, 7, 'Portugal', '', 7, FALSE),

-- Forwards
(9, 'João', 'Resende', 22, 1.83, 75, 9, 'Portugal', '', 9, FALSE),
(9, 'Brayan', 'Rochez', 31, 1.83, 80, 9, 'Honduras', 'honduras_flag.png', 11, FALSE),
(9, 'Lucho', 'Vega', 27, 1.78, 72, 11, 'Argentina', 'argentina_flag.png', 17, FALSE),
(9, 'João', 'Silva', 25, 1.80, 73, 11, 'Portugal', '', 19, FALSE),
(9, 'Rui', 'Gomes', 26, 1.77, 70, 7, 'Portugal', '', 22, FALSE);


-- Players Table
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Lixa Players
(5, 'Nico', 'Silva', 27, 1.80, 75, 1, 'Portugal', '', 1, FALSE),
(5, 'Tiago', 'Moreira', 36, 1.78, 72, 2, 'Portugal', '', 6, FALSE),
(5, 'Ivo', 'Magalhães', 24, 1.75, 70, 2, 'Portugal', '', 2, FALSE),
(5, 'Fábio', 'Teixeira', 26, 1.82, 74, 4, 'Portugal', '', 5, FALSE),
(5, 'Raul', 'Babo', 35, 1.85, 76, 5, 'Portugal', '', 15, FALSE),
(5, 'Matheus', 'Carioca', 28, 1.77, 73, 3, 'Brazil', 'brazil_flag.png', 63, FALSE),
(5, 'Tó', 'Jó', 34, 1.80, 75, 6, 'Portugal', '', 4, FALSE),
(5, 'Pedro', 'Pinto', 23, 1.78, 72, 8, 'Portugal', '', 8, FALSE),
(5, 'Dani', 'Pacheco', 20, 1.76, 70, 8, 'Portugal', '', 27, FALSE),
(5, 'Mauro', 'Silva', 36, 1.79, 74, 10, 'Portugal', '', 70, FALSE),
(5, 'John', 'Abraham', 27, 1.81, 75, 7, 'Nigeria', 'nigeria_flag.png', 7, FALSE),
(5, 'Ekene', 'Okoliugo', 28, 1.83, 77, 9, 'Nigeria', 'nigeria_flag.png', 11, FALSE),
(5, 'Simão', 'Ferreira', 21, 1.80, 74, 11, 'Portugal', '', 10, FALSE),
(5, 'Paulo', 'Lopes', 18, 1.75, 70, 11, 'Portugal', '', 77, FALSE),
(5, 'Leonardo', 'Silva', 19, 1.78, 72, 8, 'Portugal', '', 79, FALSE),
(5, 'David', 'Ribeiro', 19, 1.76, 71, 2, 'Portugal', '', 66, FALSE),
(5, 'Gil', 'Araújo', 19, 1.74, 70, 3, 'Portugal', '', 71, FALSE),
(5, 'Hugo', 'Queiroz', 18, 1.77, 72, 8, 'Portugal', '', 13, FALSE),
(5, 'Marco', 'Pereira', 23, 1.80, 75, 1, 'Portugal', '', 17, FALSE),

-- União de Leiria Players
(9, 'Fábio', 'Ferreira', 26, 1.85, 78, 1, 'Portugal', '', 29, FALSE),
(9, 'Pawel', 'Kieszek', 40, 1.88, 80, 1, 'Poland', 'poland_flag.png', 1, FALSE),
(9, 'Marcos', 'Vinicius', 21, 1.83, 77, 1, 'Brazil', 'brazil_flag.png', 12, FALSE),
(9, 'Víctor', 'Rofino', 22, 1.84, 76, 4, 'Guinea-Bissau', 'guinea_bissau_flag.png', 5, FALSE),
(9, 'Zé', 'Vitor', 22, 1.85, 77, 5, 'Brazil', 'brazil_flag.png', 14, FALSE),
(9, 'Tiago', 'Ferreira', 31, 1.86, 78, 4, 'Portugal', '', 23, FALSE),
(9, 'Marco', 'Baixinho', 35, 1.87, 79, 5, 'Portugal', '', 6, FALSE),
(9, 'Bura', 'Silva', 35, 1.88, 80, 4, 'Portugal', '', 4, FALSE),
(9, 'Marc', 'Baró', 25, 1.80, 74, 3, 'Spain', 'spain_flag.png', 3, FALSE),
(9, 'Káká', 'Silva', 32, 1.78, 72, 3, 'Portugal', '', 15, FALSE),
(9, 'Habib', 'Sylla', 25, 1.75, 70, 2, 'Ivory Coast', 'ivory_coast_flag.png', 52, FALSE),
(9, 'David', 'Monteiro', 20, 1.76, 71, 2, 'Portugal', '', 58, FALSE),
(9, 'Dje', 'Davilla', 21, 1.80, 75, 6, 'Ivory Coast', 'ivory_coast_flag.png', 42, FALSE),
(9, 'Diogo', 'Amado', 34, 1.78, 73, 6, 'Portugal', '', 25, FALSE),
(9, 'Lucho', 'Vega', 25, 1.82, 76, 8, 'Argentina', 'argentina_flag.png', 17, FALSE),
(9, 'Crystopher', 'Neto', 26, 1.80, 74, 9, 'Brazil', 'brazil, flag.png', 19, FALSE),
(9, 'Ricardo', 'Silva', 27, 1.81, 75, 10, 'Portugal', '', 21, FALSE),
(9, 'Ricardo', 'Ferreira', 28, 1.83, 77, 11, 'Portugal', '', 22, FALSE),
(9, 'Ricardo', 'Fernandes', 29, 1.85, 78, 7, 'Portugal', '', 24, FALSE);

INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
    (2, 'Alisson', 'Becker', 32, 1.91, 91, 1, 'Brazil', 'brazil_flag.png', 1, FALSE),
(2, 'Caoimhín', 'Kelleher', 26, 1.88, 85, 1, 'Ireland', 'ireland_flag.png', 62, FALSE),

-- Defenders
(2, 'Trent', 'Alexander-Arnold', 26, 1.75, 69, 2, 'England', '', 66, FALSE),
(2, 'Joe', 'Gomez', 27, 1.88, 77, 2, 'England', '', 2, FALSE),
(2, 'Andrew', 'Robertson', 30, 1.78, 64, 3, 'Scotland', 'scotland_flag.png', 26, TRUE),
(2, 'Kostas', 'Tsimikas', 28, 1.78, 70, 3, 'Greece', 'greece_flag.png', 21, FALSE),
(2, 'Virgil', 'van Dijk', 33, 1.93, 92, 4, 'Netherlands', 'netherlands_flag.png', 4, FALSE),
(2, 'Ibrahima', 'Konaté', 25, 1.94, 95, 5, 'France', 'france_flag.png', 5, FALSE),
(2, 'Jarell', 'Quansah', 21, 1.91, 83, 5, 'England', '', 78, FALSE),

-- Midfielders
(2, 'Wataru', 'Endo', 31, 1.78, 73, 6, 'Japan', 'japan_flag.png', 3, FALSE),
(2, 'Alexis', 'Mac Allister', 25, 1.74, 72, 8, 'Argentina', 'argentina_flag.png', 10, FALSE),
(2, 'Dominik', 'Szoboszlai', 24, 1.86, 74, 8, 'Hungary', 'hungary_flag.png', 8, FALSE),
(2, 'Curtis', 'Jones', 23, 1.85, 75, 8, 'England', '', 17, FALSE),
(2, 'Ryan', 'Gravenberch', 22, 1.90, 83, 8, 'Netherlands', 'netherlands_flag.png', 38, FALSE),

-- Forwards
(2, 'Mohamed', 'Salah', 32, 1.75, 71, 7, 'Egypt', 'egypt_flag.png', 11, FALSE),
(2, 'Luis', 'Díaz', 27, 1.80, 65, 7, 'Colombia', 'colombia_flag.png', 7, FALSE),
(2, 'Diogo', 'Jota', 28, 1.78, 70, 9, 'Portugal', '', 20, FALSE),
(2, 'Darwin', 'Núñez', 25, 1.87, 81, 9, 'Uruguay', 'uruguay_flag.png', 9, FALSE),
(2, 'Cody', 'Gakpo', 25, 1.93, 76, 11, 'Netherlands', 'netherlands_flag.png', 18, FALSE);


-- Players Table for Real Madrid CF
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(10, 'Thibaut', 'Courtois', 32, 2.00, 96, 1, 'Belgium', 'belgium_flag.png', 1, FALSE),
(10, 'Andriy', 'Lunin', 25, 1.91, 80, 1, 'Ukraine', 'ukraine_flag.png', 13, FALSE),

-- Defenders
(10, 'Dani', 'Carvajal', 32, 1.73, 73, 2, 'Spain', 'spain_flag.png', 2, FALSE),
(10, 'Lucas', 'Vázquez', 33, 1.73, 70, 2, 'Spain', 'spain_flag.png', 17, FALSE),
(10, 'Ferland', 'Mendy', 29, 1.80, 73, 3, 'France', 'france_flag.png', 23, FALSE),
(10, 'Fran', 'García', 25, 1.67, 69, 3, 'Spain', 'spain_flag.png', 20, FALSE),
(10, 'Éder', 'Militão', 26, 1.86, 78, 4, 'Brazil', 'brazil_flag.png', 3, TRUE),
(10, 'Antonio', 'Rüdiger', 31, 1.90, 85, 4, 'Germany', 'germany_flag.png', 22, FALSE),
(10, 'David', 'Alaba', 32, 1.80, 78, 5, 'Austria', 'austria_flag.png', 4, FALSE),

-- Midfielders
(10, 'Aurélien', 'Tchouaméni', 24, 1.87, 81, 6, 'France', 'france_flag.png', 14, FALSE),
(10, 'Eduardo', 'Camavinga', 22, 1.82, 68, 6, 'France', 'france_flag.png', 6, FALSE),
(10, 'Federico', 'Valverde', 26, 1.82, 78, 8, 'Uruguay', 'uruguay_flag.png', 8, FALSE),
(10, 'Luka', 'Modrić', 39, 1.72, 66, 8, 'Croatia', 'croatia_flag.png', 10, FALSE),
(10, 'Jude', 'Bellingham', 21, 1.86, 75, 10, 'England', '', 5, FALSE),
(10, 'Arda', 'Güler', 19, 1.76, 67, 10, 'Turkey', 'turkey_flag.png', 15, FALSE),

-- Forwards
(10, 'Vinícius', 'Júnior', 24, 1.76, 73, 7, 'Brazil', 'brazil_flag.png', 7, FALSE),
(10, 'Rodrygo', 'Goes', 23, 1.74, 64, 7, 'Brazil', 'brazil_flag.png', 11, FALSE),
(10, 'Kylian', 'Mbappé', 25, 1.78, 75, 9, 'France', 'france_flag.png', 9, FALSE),
(10, 'Endrick', 'Felipe', 18, 1.73, 66, 9, 'Brazil', 'brazil_flag.png', 16, FALSE);


-- Players Table for FC Vizela
INSERT INTO player (club_id, name, surname, age, height, weight, position, country, country_flag, jersey_number, is_injured)
VALUES
-- Goalkeepers
(8, 'Miguel', 'Morro', 24, 1.93, 82, 1, 'Spain', 'spain_flag.png', 13, FALSE),
(8, 'Francesco', 'Ruberto', 31, 1.84, 80, 1, 'Italy', 'https://www.google.com/imgres?q=italy%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F0%2F03%2FFlag_of_Italy.svg%2F220px-Flag_of_Italy.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFlag_of_Italy&docid=jux9eKOMuj3rJM&tbnid=vLyJ_1XzpG_F3M&vet=12ahUKEwjMudjHta2KAxWPSvEDHTAnHJUQM3oECBoQAA..i&w=220&h=147&hcb=2&ved=2ahUKEwjMudjHta2KAxWPSvEDHTAnHJUQM3oECBoQAA', 1, FALSE),

-- Defenders
(8, 'Anthony', 'Correia', 25, 1.85, 79, 2, 'Portugal', '', 41, FALSE),
(8, 'Jorge', 'Xavier', 23, 1.86, 76, 2, 'Portugal', '', 77, FALSE),
(8, 'Orest', 'Lebedenko', 26, 1.74, 63, 3, 'Ukraine', 'ukraine_flag.png', 19, FALSE),
(8, 'João', 'Reis', 32, 1.74, 66, 3, 'Portugal', '', 17, FALSE),
(8, 'Mamadou', 'Mbaye', 26, 1.92, NULL, 4, 'Senegal', 'senegal_flag.png', 5, FALSE),
(8, 'Jean-Pierre', 'Rhyner', 28, 1.86, 75, 5, 'Peru', 'peru_flag.png', 4, FALSE),
(8, 'Marco', 'Tol', 26, 1.89, 81, 5, 'Netherlands', 'netherlands_flag.png', 12, FALSE),

-- Midfielders
(8, 'Heinz', 'Mörschel', 27, 1.90, 75, 6, 'Dominican Republic', 'dominican_republic_flag.png', 24, FALSE),
(8, 'Aleksandar', 'Busnić', 26, 1.91, 76, 8, 'Serbia', 'serbia_flag.png', 22, FALSE),
(8, 'Ángel', 'Bastunov', 25, 1.83, 69, 8, 'Bulgaria', 'bulgaria_flag.png', 8, FALSE),
(8, 'Rodrigo', 'Ramos', 20, 1.81, NULL, 8, 'Portugal', '', 21, FALSE),
(8, 'Diogo', 'Nascimento', 22, 1.66, 61, 10, 'Portugal', '', 90, FALSE),

-- Forwards
(8, 'Vivaldo', 'Semedo', 19, 1.92, NULL, 9, 'Portugal', '', 18, FALSE),
(8, 'Nuno', 'Moreira', 25, 1.80, 70, 7, 'Portugal', '', 79, FALSE),
(8, 'Kiko', 'Bondoso', 28, 1.70, 65, 7, 'Portugal', '', 10, FALSE),
(8, 'Samu', 'Silva', 28, 1.78, 70, 11, 'Portugal', '', 20, FALSE),
(8, 'Alex', 'Méndez', 24, 1.78, 70, 11, 'United States', 'usa_flag.png', 19, FALSE);



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

