import random
from models import (
    EventType,
    Game,
    Goal,
    Injury,
    YellowCard,
    RedCard,
    Substitution,
)


def generate_events(game: Game):
    minutes_used: set[int] = set()
    in_players = set()
    out_players = set()
    events = {event_type: [] for event_type in EventType.__members__.values()}
    events_flat = []

    events[EventType.SUBSTITUTION] = generate_substitution_events(
        game, in_players, out_players
    )
    events[EventType.GOAL] = generate_goal_events(
        game, minutes_used, in_players, out_players
    )
    events[EventType.YELLOW_CARD] = generate_yellow_card_events(
        game, minutes_used, in_players, out_players
    )
    events[EventType.RED_CARD] = generate_red_card_events(
        game, minutes_used, in_players, out_players
    )

    for event_type, event_list in events.items():
        for event in event_list:
            events_flat.append(event)

    return events_flat


def generate_goal_events(
    game: Game, minutes_used: set[int], in_players, out_players
) -> list[Goal]:
    teams = [game.home_team, game.away_team]

    goals: list[Goal] = []
    for team in teams:
        for _ in range(game.home_score if team == game.home_team else game.away_score):
            while True:
                # TODO: take into account player quality
                scorer = team.starting_squad[random.randint(1, 10)]
                assist = team.starting_squad[random.randint(1, 10)]
                minute = random.randint(2, 90)

                if scorer == assist or minute in minutes_used or scorer in out_players:
                    continue

                goal = Goal(minute, team, scorer, assist)
                goals.append(goal)

                break

    return goals


def generate_yellow_card_events(
    game: Game, minutes_used: set[int], in_players, out_players
) -> list[YellowCard]:
    teams = [game.home_team, game.away_team]

    yellow_cards = []

    for team in teams:
        n_yellow_cards = random.randint(0, 6)
        for _ in range(n_yellow_cards):
            while True:
                player = team.starting_squad[random.randint(1, 10)]
                minute = random.randint(2, 90)

                if minute in minutes_used or player in out_players:
                    continue

                yellow_card = YellowCard(minute, team, player)
                yellow_cards.append(yellow_card)

                break

    return yellow_cards


def generate_red_card_events(
    game: Game, minutes_used: set[int], in_players, out_players
) -> list[RedCard]:
    teams = [game.home_team, game.away_team]

    red_cards = []
    sent_off = set()

    for team in teams:
        n_red_cards = random.randrange(0, 100)
        if n_red_cards > 4:
            continue
        else:
            n_red_cards = 1
        for _ in range(n_red_cards):
            while True:
                player = team.starting_squad[random.randint(1, 10)]
                if player in sent_off or player in out_players:
                    continue
                minute = random.randint(2, 90)

                if minute in minutes_used:
                    continue

                red_card = RedCard(minute, team, player)
                red_cards.append(red_card)
                sent_off.add(player)

                break

    return red_cards


def generate_substitution_events(
    game: Game, in_players, out_players
) -> list[Substitution]:
    teams = [game.home_team, game.away_team]

    substitutions = []
    subd_off = set()

    for team in teams:
        n_substitutions = random.randint(0, 3)
        for _ in range(n_substitutions):
            while True:
                player_in = team.subs_squad[random.randint(1, len(team.subs_squad) - 1)]
                if player_in in in_players or player_in in subd_off:
                    continue
                same_position_in_field = []
                for player in team.starting_squad:
                    for position in player.positions:
                        if position in player_in.positions:
                            same_position_in_field.append(player)

                if same_position_in_field == []:
                    continue
                player_out = same_position_in_field[
                    random.randint(0, len(same_position_in_field) - 1)
                ]

                if player_out in out_players:
                    continue
                minute = random.randint(2, 90)

                if player_in == player_out:
                    continue

                substitution = Substitution(minute, team, player_in, player_out)
                substitutions.append(substitution)
                subd_off.add(player_out)

                in_players.add(player_in)
                out_players.add(player_out)

                break

    return substitutions


def generate_injury_events(
    game: Game, minutes_used: set[int], in_players, out_players
) -> list[Injury]:
    pass
