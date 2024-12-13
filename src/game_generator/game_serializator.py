import json
from datetime import datetime, timedelta
from typing import List
import uuid
from models import Game, Event, Goal, YellowCard, RedCard, Substitution

GAMES_DIR = "./games/"
GAME_REAL_DURATION = 1.5


def serialize_game_for_kafka(
    game: Game, events: List[Event], start_time: datetime = None
) -> dict:
    match_id = str(uuid.uuid4())

    if start_time is None:
        start_time = datetime.now() + timedelta(minutes=0)

    match_info = {
        "match_id": match_id,
        "home_team": {
            "name": game.home_team.name,
            "id": game.home_team.id,
            "starting_squad": [player.name for player in game.home_team.starting_squad],
            "subs_squad": [player.name for player in game.home_team.subs_squad],
            "image": game.home_team.image,
        },
        "away_team": {
            "name": game.away_team.name,
            "id": game.away_team.id,
            "starting_squad": [player.name for player in game.away_team.starting_squad],
            "subs_squad": [player.name for player in game.away_team.subs_squad],
            "image": game.away_team.image,
        },
        "match_result": {
            "winner": game.winner.name,
            "home_score": game.home_score,
            "away_score": game.away_score,
        },
        "match_stats": {
            "home_team_stats": [stat.__dict__() for stat in game.home_team.stats],
            "away_team_stats": [stat.__dict__() for stat in game.away_team.stats],
        },
        "match_start_time": start_time.isoformat(),
        "events": [],
    }

    sorted_events = sorted(events, key=lambda x: x.minute)

    event_time = start_time + timedelta(minutes=0)
    start_event = {
        "game_id": match_id,
        "event_type": "START",
        "minute": 0,
        "publish_timestamp": event_time.isoformat(),
        "id": 0,
    }

    match_info["events"].append(start_event)

    id = 1
    for event in sorted_events:
        event_time = start_time + timedelta(
            minutes=(event.minute - 1) * GAME_REAL_DURATION / 90
        )

        team_name = event.team.name
        event_team = "home" if game.home_team.name == team_name else "away"
        if isinstance(event, Goal):
            event_data = {
                "game_id": match_id,
                "event_type": "GOAL",
                "minute": str(event.minute),
                "team": event_team,
                "scorer": event.scorer.name,
                "assist": event.assist.name,
                "publish_timestamp": str(event_time.isoformat()),
                "id": str(id),
            }
        elif isinstance(event, YellowCard):
            event_data = {
                "game_id": str(match_id),
                "event_type": "YELLOW_CARD",
                "minute": str(event.minute),
                "team": event_team,
                "player": event.player.name,
                "publish_timestamp": str(event_time.isoformat()),
                "id": str(id),
            }
        elif isinstance(event, RedCard):
            event_data = {
                "game_id": str(match_id),
                "event_type": "RED_CARD",
                "minute": str(event.minute),
                "team": event_team,
                "player": event.player.name,
                "publish_timestamp": str(event_time.isoformat()),
                "id": str(id),
            }
        elif isinstance(event, Substitution):
            event_data = {
                "game_id": str(match_id),
                "event_type": "SUBSTITUTION",
                "minute": str(event.minute),
                "team": event_team,
                "player_out": event.player_out.name,
                "player_in": event.player_in.name,
                "publish_timestamp": str(event_time.isoformat()),
                "id": str(id),
            }
        else:
            continue
        id += 1
        match_info["events"].append(event_data)
    end_event = {
        "game_id": match_id,
        "event_type": "END",
        "minute": 90,
        "publish_timestamp": event_time.isoformat(),
        "id": str(int(match_info["events"][-1]["id"]) + 1),
    }
    match_info["events"].append(end_event)

    return match_info


def serialize_game(
    game: Game, events: List[Event], filename: str = None, start_time: datetime = None
):
    # if filename is None:
    #    filename = f"match_{game.home_team.name}_vs_{game.away_team.name}_{
    #        datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

    # filename = GAMES_DIR + filename

    match_info = serialize_game_for_kafka(game, events, start_time)

    # with open(filename, "w") as f:
    #    json.dump(match_info, f, indent=2)

    return match_info
