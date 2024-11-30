CREATE TABLE IF NOT EXISTS league(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    logo VARCHAR(254) NOT NULL
);

CREATE TABLE IF NOT EXISTS club(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    starred BOOLEAN NOT NULL,
    image VARCHAR(254) NOT NULL
);

CREATE TABLE IF NOT EXISTS league_club (
    league_id INT NOT NULL,
    club_id INT NOT NULL,
    matches_played INT NOT NULL,
    points INT NOT NULL,
    wins INT NOT NULL,
    draws INT NOT NULL,
    losses INT NOT NULL,
    goals_scored INT NOT NULL,
    goals_conceded INT NOT NULL,
    goal_difference INT NOT NULL,
    place INT NOT NULL,
    PRIMARY KEY (league_id, club_id),
    FOREIGN KEY (league_id) REFERENCES league(id),
    FOREIGN KEY (club_id) REFERENCES club(id)
);

CREATE TABLE IF NOT EXISTS player (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    height FLOAT NOT NULL,
    weight FLOAT NOT NULL,
    position VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    goals INT NOT NULL,
    assists INT NOT NULL,
    minutes INT NOT NULL,
    fouls INT NOT NULL,
    yellow_cards INT NOT NULL,
    red_cards INT NOT NULL,
    saves INT NOT NULL,
    penalties INT NOT NULL,
    FOREIGN KEY (club_id) REFERENCES club(id)
);

CREATE TABLE IF NOT EXISTS game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referee VARCHAR(50) NOT NULL,
    kickoff_time TIMESTAMP NOT NULL,
    stadium VARCHAR(50) NOT NULL,
    minute_played INT NOT NULL,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    mvp VARCHAR(50) NOT NULL,
    FOREIGN KEY (away_team_id) REFERENCES club(id),
    FOREIGN KEY (home_team_id) REFERENCES club(id)
);


CREATE TABLE IF NOT EXISTS top_stats (
    game_id INT NOT NULL,
    player_id INT NOT NULL,
    stat VARCHAR(50) NOT NULL,
    value INT NOT NULL,
    PRIMARY KEY (game_id, stat),
    FOREIGN KEY (game_id) REFERENCES game(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS half (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    game_id INT NOT NULL,
    team_id INT NOT NULL,
    minute_played INT NOT NULL,
    possession INT NOT NULL,
    shots INT NOT NULL,
    passes_acc INT NOT NULL,
    tackles INT NOT NULL,
    fouls INT NOT NULL,
    corners INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (team_id) REFERENCES club(id)
);



CREATE TABLE IF NOT EXISTS injury (
    player_id INT NOT NULL,
    date DATE NOT NULL,
    name VARCHAR(50) NOT NULL,
    duration INT NOT NULL,
    PRIMARY KEY (player_id, date),
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS team_stats (
    game_id INT NOT NULL,
    half_id INT NOT NULL,
    club_id INT NOT NULL,
    possession INT NOT NULL,
    shots INT NOT NULL,
    passes_acc INT NOT NULL,
    tackles INT NOT NULL,
    fouls INT NOT NULL,
    corners INT NOT NULL,
    offsides INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (half_id) REFERENCES half(id),
    FOREIGN KEY (club_id) REFERENCES club(id)
);
