CREATE TABLE IF NOT EXISTS league(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    logo VARCHAR(254) NOT NULL
);

CREATE TABLE IF NOT EXISTS club(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    logo VARCHAR(254) NOT NULL,
    country VARCHAR(50) NOT NULL,
    country_flag VARCHAR(254) NOT NULL,
    starred BOOLEAN NOT NULL
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
    age INT NOT NULL,
    height FLOAT NOT NULL,
    weight FLOAT NOT NULL,
    position VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    country_flag VARCHAR(254) NOT NULL,
    jersey_number INT NOT NULL,
    is_injured BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (club_id) REFERENCES club(id)
);

CREATE TABLE IF NOT EXISTS player_game_stats (
    player_id INT NOT NULL,
    game_id INT NOT NULL,
    rating INT NOT NULL,
    minutes_played INT NOT NULL,
    goals INT NOT NULL,
    assists INT NOT NULL,
    fouls INT NOT NULL,
    yellow_cards INT NOT NULL,
    red_cards INT NOT NULL,
    saves INT NOT NULL,
    PRIMARY KEY (player_id, game_id),
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS team_stats (
    team_stat_id INT NOT NULL,
    club_id INT NOT NULL,
    possession INT NOT NULL,
    shots INT NOT NULL,
    passes_acc INT NOT NULL,
    tackles INT NOT NULL,
    fouls INT NOT NULL,
    corners INT NOT NULL,
    offsides INT NOT NULL,
    interceptions INT NOT NULL,
    total_goals INT NOT NULL,
    PRIMARY KEY (team_stat_id),
    FOREIGN KEY (club_id) REFERENCES club(id)
);

CREATE TABLE IF NOT EXISTS half (
    half_id INT AUTO_INCREMENT PRIMARY KEY,
    home_club_stats INT NOT NULL,
    away_club_stats INT NOT NULL,
    FOREIGN KEY (home_club_stats) REFERENCES team_stats(team_stat_id),
    FOREIGN KEY (away_club_stats) REFERENCES team_stats(team_stat_id)
);

CREATE TABLE IF NOT EXISTS top_stats (
    stat_id INT NOT NULL,
    player_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    value INT NOT NULL,
    PRIMARY KEY (stat_id),
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referee VARCHAR(50) NOT NULL,
    kickoff_time TIMESTAMP NOT NULL,
    stadium VARCHAR(50) NOT NULL,
    minute_played INT NOT NULL,
    home_club_id INT NOT NULL,
    away_club_id INT NOT NULL,
    mvp INT NOT NULL,
    1st_half INT,
    2nd_half INT,
    top_stat INT,
    FOREIGN KEY (1st_half) REFERENCES half(half_id),
    FOREIGN KEY (2nd_half) REFERENCES half(half_id),
    FOREIGN KEY (top_stat) REFERENCES top_stats(stat_id),
    FOREIGN KEY (mvp) REFERENCES player(id),
    FOREIGN KEY (away_club_id) REFERENCES club(id),
    FOREIGN KEY (home_club_id) REFERENCES club(id)
);

CREATE TABLE IF NOT EXISTS injury (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    games_out INT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE
);


