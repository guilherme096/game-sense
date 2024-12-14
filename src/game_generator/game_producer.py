import json
import time
import game_generator
from kafka import KafkaProducer
from datetime import datetime
import pytz
import os
from time import sleep
from game_generator import *
from models import Team

# Kafka configuration
KAFKA_BROKER = "kafka:9092"  # Adjust to your Kafka broker
EVENTS_TOPIC = "events"  # Topic to publish to
GAMES_TOPIC = "games"  # Topic to publish to
STATS_TOPIC = "stats"  # Topic to publish to

# Initialize Kafka producer
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BROKER,
    value_serializer=lambda v: json.dumps(v).encode(
        "utf-8"
    ),  # Serialize messages as JSON
    api_version="0.10.2",
)


# Function to handle publishing of game events
def publish_game_event(event):
    try:
        # Send the event to Kafka
        producer.send(EVENTS_TOPIC, value=event)
        producer.flush()  # Ensure all messages are sent
        print(f"Published event: {event}")
    except Exception as e:
        print(f"Failed to publish event: {e}")


def publish_game_stat(stat):
    try:
        # Send the event to Kafka
        producer.send(STATS_TOPIC, value=stat)
        producer.flush()  # Ensure all messages are sent
        print(f"Published stat: {stat}")
    except Exception as e:
        print(f"Failed to publish stat: {e}")


# Function to read game data from a JSON file
def read_game_from_file(file_path):
    with open(file_path, "r") as file:
        game_data = json.load(file)
    return game_data


# Function to simulate the timing for event publishing
def process_events(events, stats):
    # Current time in UTC (or adjust if needed)
    current_time = datetime.now(pytz.utc)
    stats_publish_time = [
        15,
        50,
        60,
    ]
    stats_published = 0

    # Sort events by their publish_timestamp
    events.sort(key=lambda e: e["publish_timestamp"])

    for event in events:
        # Parse the publish_timestamp from the event
        publish_timestamp = datetime.fromisoformat(
            event["publish_timestamp"]
        ).astimezone(pytz.utc)

        wait_time = (publish_timestamp - current_time).total_seconds()

        if wait_time > 0:
            print(f"Waiting for {wait_time} event at {publish_timestamp}")
            time.sleep(wait_time)

        if (
            stats_published < 3
            and int(event["minute"]) >= stats_publish_time[stats_published]
        ):
            print(stats_publish_time[stats_published])
            print(event["minute"])
            mathc_stats = {
                "match_id": event["game_id"],
                "half": stats_published,
                "home_team_stats": stats["home_team_stats"][stats_published],
                "away_team_stats": stats["away_team_stats"][stats_published],
            }

            stats_published += 1
            publish_game_stat(mathc_stats)

        # Publish the event
        print(f"Publishing event: {event}")
        publish_game_event(event)
        current_time = datetime.now(pytz.utc)  # Update current time


def publish_game_info(game, stats):
    try:
        # Send the event to Kafka
        producer.send(GAMES_TOPIC, value=game)
        producer.flush()  # Ensure all messages are sent
        producer.send(STATS_TOPIC, value=stats)
        producer.flush()  # Ensure all messages are sent
        print(f"Published event: {game}")
    except Exception as e:
        print(f"Failed to publish event: {e}")


def main():
    # game_file_path = os.path.join("games", "match_SCP_vs_SLB_20241212_215821.json")
    home_team = os.environ.get("HOME_TEAM")
    away_team = os.environ.get("AWAY_TEAM")

    game_data = game_generator.main(
        home_team=Team.from_dict(json.loads(home_team)),
        away_team=Team.from_dict(json.loads(away_team)),
    )

    print("Game data generated successfully.")

    events = game_data.get("events", [])
    match_info = {
        "match_id": game_data.get("match_id"),
        "home_team": game_data.get("home_team"),
        "away_team": game_data.get("away_team"),
        "match_start_time": game_data.get("match_start_time"),
    }
    mathc_stats = {
        "match_id": game_data.get("match_id"),
        "half": 0,
        "home_team_stats": {
            "Possession": 0,
            "Shots": 0,
            "Passes Acc": 0,
            "Tackles": 0,
            "Fouls": 0,
            "Corners": 0,
            "Offsides": 0,
            "Interceptions": 0,
        },
        "away_team_stats": {
            "Possession": 0,
            "Shots": 0,
            "Passes Acc": 0,
            "Tackles": 0,
            "Fouls": 0,
            "Corners": 0,
            "Offsides": 0,
            "Interceptions": 0,
        },
    }
    publish_game_info(match_info, mathc_stats)

    if events:
        process_events(events, game_data.get("match_stats"))
    else:
        print("No events found in the game data.")


if __name__ == "__main__":
    main()
