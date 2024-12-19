import random
from models import (
    EventType,
    Game,
    Goal,
    Injury,
    YellowCard,
    RedCard,
    SecondYellowCard,
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
) -> list:
    teams = [game.home_team, game.away_team]

    yellow_cards = []
    second_yellow_cards = []
    player_yellow_count = {}  # Track yellow cards for players across all teams

    for team in teams:
        n_yellow_cards = random.randint(0, 5)
        for _ in range(n_yellow_cards):
            while True:
                player = team.starting_squad[random.randint(0, len(team.starting_squad) - 1)]
                minute = random.randint(2, 90)

                if minute in minutes_used or player in out_players:
                    continue

                # Increment yellow card count
                if player not in player_yellow_count:
                    player_yellow_count[player] = 1
                    yellow_card = YellowCard(minute, team, player)
                    yellow_cards.append(yellow_card)
                    minutes_used.add(minute)
                    break  # Yellow card issued
                elif player_yellow_count[player] == 1:
                    # Player receives a second yellow card
                    second_yellow_card = SecondYellowCard(minute, team, player)
                    red_card = RedCard(minute, team, player)
                    second_yellow_cards.append(second_yellow_card)
                    second_yellow_cards.append(red_card)

                    # Add player to out_players to exclude them from future events
                    out_players.add(player)
                    minutes_used.add(minute)
                    player_yellow_count[player] += 1
                    break

    return yellow_cards + second_yellow_cards


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

def generate_substitution_events(game: Game, in_players, out_players) -> list[Substitution]:
    teams = [game.home_team, game.away_team]

    substitutions = []
    subd_off = set()
    in_player_ids = set()
    out_player_ids = set()

    # Define the position compatibility map
    position_compatibility = {
        1:[1],
        2:[2,3],
        3:[2,3],
        4:[4,5],
        5:[4,5],
        6:[6,8,10],
        8:[6,8,10],
        10:[6,8,10],
        7:[7,9,11],
        9:[7,9,11],
        11:[7,9,11]
    }

    for team in teams:
        n_substitutions = random.randint(0, 3)

        # Copy lists to avoid modifying originals
        available_subs = team.subs_squad.copy()
        available_starters = team.starting_squad.copy()

        for _ in range(n_substitutions):
            if not available_subs or not available_starters:
                break

            # Try to find a valid substitution
            substitution_found = False
            attempts = 0
            max_attempts = len(available_subs) * len(available_starters)

            while not substitution_found and attempts < max_attempts:
                player_in = random.choice(available_subs)
                player_out = random.choice(available_starters)

                # Check conditions using player IDs
                if (player_in.id == player_out.id or
                        player_in.id in in_player_ids or
                        player_out.id in out_player_ids):
                    attempts += 1
                    continue

                # Check position compatibility using the position compatibility map
                positions_in = player_in.positions  # This can be a list for player_in
                positions_out = player_out.positions  # Can be a list for player_out

                # Iterate over the list of positions_out if there are multiple positions
                compatible = False
                for pos_out in positions_out:
                    compatible_positions = position_compatibility.get(pos_out, set())

                    # Check if any of the positions_in match the compatible positions
                    for pos_in in positions_in:
                        if pos_in in compatible_positions:
                            compatible = True
                            break
                    if compatible:
                        break

                if not compatible:
                    attempts += 1
                    continue

                # Create substitution
                minute = random.randint(2, 90)
                substitution = Substitution(minute, team, player_in, player_out)

                substitutions.append(substitution)

                # Update tracking sets using player IDs
                in_player_ids.add(player_in.id)
                out_player_ids.add(player_out.id)
                subd_off.add(player_out)

                # Remove used players
                available_subs.remove(player_in)
                available_starters.remove(player_out)

                substitution_found = True

            # If no valid substitution found after many attempts, skip
            if not substitution_found:
                break

    return substitutions


def generate_injury_events(
    game: Game, minutes_used: set[int], in_players, out_players
) -> list[Injury]:
    pass
