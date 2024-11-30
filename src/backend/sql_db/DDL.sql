CREATE TABLE IF NOT EXISTS league(

                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     name VARCHAR(254) NOT NULL,
    logo VARCHAR(254) NOT NULL,
    )

    GO

CREATE TABLE IF NOT EXISTS club(

                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                   name VARCHAR(254) NOT NULL,
    country VARCHAR(254) NOT NULL,
    starred BOOLEAN NOT NULL,
    image VARCHAR(254) NOT NULL
    )
    GO

CREATE TABLE IF NOT EXISTS league_club(

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
                                          points INT NOT NULL,
                                          place INT NOT NULL,
                                          PRIMARY KEY (league_id, club_id),
    FOREIGN KEY (league_id) REFERENCES league(id),
    FOREIGN KEY (club_id) REFERENCES club(id)
    )

    GO

CREATE TABLE IF NOT EXISTS player(

                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     club_id INT NOT NULL FOREIGN KEY REFERENCES club(id),
    name VARCHAR(254) NOT NULL,
    surname VARCHAR(254) NOT NULL,
    birth_date DATE NOT NULL,
    height FLOAT NOT NULL,
    weight FLOAT NOT NULL,
    position VARCHAR(254) NOT NULL,
    country VARCHAR(254) NOT NULL,
    goals INT NOT NULL,
    assists INT NOT NULL,
    minutes INT NOT NULL,
    fouls INT NOT NULL,
    yellow_cards INT NOT NULL,
    red_cards INT NOT NULL,
    saves INT NOT NULL,
    penalties INT NOT NULL
    )

    GO

CREATE TABLE IF NOT EXISTS live_game(

                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        referee VARCHAR(254) NOT NULL,
    kickoff_time TIMESTAMP NOT NULL,
    stadium VARCHAR(254) NOT NULL,
    minute_played INT NOT NULL,
    home_team_id INT NOT NULL FOREIGN KEY REFERENCES club(id),
    away_team_id INT NOT NULL FOREIGN KEY REFERENCES club(id),
    mvp VARCHAR(254) NOT NULL,
    )

    GO

CREATE TABLE IF NOT EXISTS top_stats(

                                        live_game_id INT NOT NULL FOREIGN KEY REFERENCES live_game(id),
    player_id INT NOT NULL FOREIGN KEY REFERENCES player(id),
    stat VARCHAR(254) NOT NULL,
    value INT NOT NULL,
    PRIMARY KEY (live_game_id, stat)
    )

    GO

CREATE TABLE IF NOT EXISTS half(

                                   live_game_id INT NOT NULL FOREIGN KEY REFERENCES live_game(id),
    team_id INT NOT NULL FOREIGN KEY REFERENCES club(id),
    minute_played INT NOT NULL,
    possession INT NOT NULL,
    shots INT NOT NULL,
    passes_acc INT NOT NULL,
    tackles INT NOT NULL,
    fouls INT NOT NULL,
    corners INT NOT NULL
    )
