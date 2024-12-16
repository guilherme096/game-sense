import random
from event_generator import generate_events
from models import Game, Stats, Team, Winner, Player
from game_serializator import serialize_game
import logging
from math import log
import time


def generate_seed(home_team: Team, away_team: Team):
    return hash((home_team.id + away_team.id) * time.time())


def generate_winner(home_team: Team, away_team: Team, seed: int) -> Winner:
    random.seed(seed)

    home_activation = random.randrange(3, 8) * 0.1
    home_prob = (
        home_team.attack_strength * home_team.defense_strength * home_activation
        + home_team.bias * home_activation * 0.4
        + (home_team.squad_quality + home_team.form) * home_activation * 0.3
    )

    away_activation = random.randrange(3, 6) * 0.1
    away_prob = (
        (away_team.attack_strength * away_team.defense_strength) * away_activation
        + away_team.bias
        + (away_team.squad_quality + away_team.form) * away_activation * 0.3
    )

    logging.debug(f"Home team probability: {home_prob}")
    logging.debug(f"Away team probability: {away_prob}")

    # adjust probabilities
    home_prob = home_prob / (home_prob + away_prob)
    away_prob = 1 - home_prob

    logging.debug(f"Home team probability: {home_prob}")

    while True:
        home_win = random.random() < home_prob
        away_win = random.random() < away_prob

        logging.debug(f"Home win: {home_win}")
        logging.debug(f"Away win: {away_win}")
        if home_win and away_win:
            return Winner.TIE
        elif home_win:
            return Winner.HOME
        elif away_win:
            return Winner.AWAY


def generate_goals(home_team: Team, away_team: Team, seed: int, winner: Winner):
    random.seed(seed)
    winner_team = home_team if winner == Winner.HOME else away_team
    winner_idx = 0 if winner == Winner.HOME else 1

    teams = [home_team, away_team]
    activations = [random.randrange(3, 10) * 0.1, random.randrange(3, 9) * 0.1]
    goals = [0, 0]

    # generate activations
    logging.debug("Activations:")
    for i, team in enumerate(teams):
        attack_strength = (team.attack_strength / 10) * ((team.form / 5) * 0.5)

        winner_modifier = 0.4 if team == winner_team else 0.8
        activations[i] = (attack_strength * activations[i]) / winner_modifier
        logging.debug(f"    Team: {team.id}")
        logging.debug(f"    Activation: {activations[i]}")
        logging.debug("----------------")

    # generate winner goals

    delta = 1
    multiplier = 0.3
    index = 1
    logging.debug("Winner goals:")
    while True:
        rnd = random.randrange(0, 8) * 0.1
        logging.debug(f"    Random: {rnd}")
        if rnd < activations[winner_idx] * delta:
            goals[winner_idx] += 1
            delta = 1 - log(index) * multiplier
            index += 1
            logging.debug(f"    Goal: {goals[winner_idx]}")
            logging.debug(f"    Delta: {delta}")
            logging.debug(f"    Modifier: {multiplier}")
            logging.debug("----------------")
        else:
            break

    if goals[winner_idx] == 0:
        goals[winner_idx] = 1

    # generate loser goals
    loser_idx = 1 - winner_idx
    delta = 1
    multiplier = 0.3
    index = 1
    logging.debug(f"Loser goals:")
    while True:
        rnd = random.randrange(0, 8) * 0.1
        logging.debug(f"    Random: {rnd}")
        if rnd < activations[loser_idx] * delta:
            goals[loser_idx] += 1
            if goals[loser_idx] + 1 == goals[winner_idx]:
                break
            delta = 1 - log(index) * multiplier
            index += 1
            logging.debug(f"    Goal: {goals[loser_idx]}")
            logging.debug(f"    Delta: {delta}")
            logging.debug(f"    Modifier: {multiplier}")
            logging.debug(f"----------------")
        else:
            break

    logging.debug(f"Goals: {goals}")

    return goals


def generate_stats(
    winner: Team, loser: Team, winner_score: int, loser_score: int, seed: int
):
    random.seed(seed)
    activations = [random.randrange(5, 10) * 0.1, random.randrange(3, 8) * 0.1]

    w_attack_strength = (winner.attack_strength / 10) * ((winner.form / 5) * 0.5)

    l_attack_strength = (loser.attack_strength / 10) * ((loser.form / 5) * 0.5)

    activations[0] = (w_attack_strength * activations[0]) / 0.4
    activations[1] = (l_attack_strength * activations[1]) / 0.8

    w_activations = [max(random.randrange(4, 10) * activations[0], 1) for _ in range(8)]
    l_activations = [max(random.randrange(4, 10) * activations[1], 1) for _ in range(8)]

    w_possession = max(round(w_activations[0] * 10), 30)

    # overall 90min stats
    w_stats = Stats(
        w_possession,  # possession
        round(w_activations[1] + winner_score * 1.2),  # shots
        max(round(w_activations[2] * 10), 50),  # passes_acc
        round(w_activations[3]),  # tackles
        round(w_activations[4]),  # fouls
        round(w_activations[5]),  # corners
        round(w_activations[6]),  # offsides
        round(w_activations[7]),  # interceptions
    )
    l_stats = Stats(
        100 - w_possession,  # possession
        round(l_activations[1] + loser_score),  # shots
        max(round(l_activations[2] * 10), 50),  # passes_acc
        round(l_activations[3]),  # tackles
        round(l_activations[4]),  # fouls
        round(l_activations[5]),  # corners
        round(l_activations[6]),  # offsides
        round(l_activations[7]),  # interceptions
    )

    stat_sepration_activation = random.randrange(6, 9) * 0.1

    # first half stats
    w_stats_first_half = Stats(
        max(0, min(round(w_possession * stat_sepration_activation), 100)),  # possession
        max(0, round(w_stats.shots * stat_sepration_activation)),  # shots
        # passes_acc
        max(0, min(round(w_stats.passes_acc * stat_sepration_activation), 100)),
        max(0, round(w_stats.tackles * stat_sepration_activation)),  # tackles
        max(0, round(w_stats.fouls * stat_sepration_activation)),  # fouls
        max(0, round(w_stats.corners * stat_sepration_activation)),  # corners
        max(0, round(w_stats.offsides * stat_sepration_activation)),  # offsides
        # interceptions
        max(0, round(w_stats.interceptions * stat_sepration_activation)),
    )

    l_stats_first_half = Stats(
        max(0, 100 - w_stats_first_half.possession),  # possession
        max(0, round(l_stats.shots * stat_sepration_activation)),  # shots
        # passes_acc
        max(0, min(round(l_stats.passes_acc * stat_sepration_activation), 100)),
        max(0, round(l_stats.tackles * stat_sepration_activation)),  # tackles
        max(0, round(l_stats.fouls * stat_sepration_activation)),  # fouls
        max(0, round(l_stats.corners * stat_sepration_activation)),  # corners
        max(0, round(l_stats.offsides * stat_sepration_activation)),  # offsides
        # interceptions
        max(0, round(l_stats.interceptions * stat_sepration_activation)),
    )

    # second half stats
    w_stats_second_half = Stats(
        # possession
        max(0, round(w_possession * (1 + abs(1 - stat_sepration_activation)))),
        max(0, w_stats.shots - w_stats_first_half.shots),  # shots
        round(
            w_stats.passes_acc * (1 + abs(1 - stat_sepration_activation))
        ),  # passes_acc
        max(0, w_stats.tackles - w_stats_first_half.tackles),  # tackles
        max(0, w_stats.fouls - w_stats_first_half.fouls),  # fouls
        max(0, w_stats.corners - w_stats_first_half.corners),  # corners
        max(0, w_stats.offsides - w_stats_first_half.offsides),  # offsides
        max(
            0, w_stats.interceptions - w_stats_first_half.interceptions
        ),  # interceptions
    )

    l_stats_second_half = Stats(
        max(0, 100 - w_stats_second_half.possession),  # possession
        max(0, l_stats.shots - l_stats_first_half.shots),  # shots
        # passes_acc
        max(0, round(l_stats.passes_acc * abs(1 - stat_sepration_activation))),
        max(0, l_stats.tackles - l_stats_first_half.tackles),  # tackles
        max(0, l_stats.fouls - l_stats_first_half.fouls),  # fouls
        max(0, l_stats.corners - l_stats_first_half.corners),  # corners
        max(0, l_stats.offsides - l_stats_first_half.offsides),  # offsides
        max(
            0, l_stats.interceptions - l_stats_first_half.interceptions
        ),  # interceptions
    )

    return [w_stats, w_stats_first_half, w_stats_second_half], [
        l_stats,
        l_stats_first_half,
        l_stats_second_half,
    ]


def generate_game(home_team: Team, away_team: Team, seed: int):
    game = Game(seed, home_team, away_team)
    winner = generate_winner(home_team, away_team, seed)
    logging.debug(f"Winner: {winner}")

    game.winner = winner

    home_goals, away_goals = generate_goals(home_team, away_team, seed, winner)

    game.home_score = home_goals
    game.away_score = away_goals

    w_stats, l_stats = generate_stats(
        home_team, away_team, home_goals, away_goals, seed
    )

    home_team.set_stats(w_stats)
    away_team.set_stats(l_stats)

    game.home_team = home_team
    game.away_team = away_team

    logging.debug(f"Game: {game}")
    logging.debug(f"Home team: {home_team}")
    logging.debug(f"Away team: {away_team}")

    return game


def main(home_team: Team, away_team: Team):
    team1 = home_team
    team2 = away_team

    seed = generate_seed(team1, team2)
    game = generate_game(team1, team2, seed)
    events = generate_events(game)

    serialized_game = serialize_game(game, events)

    return serialized_game
