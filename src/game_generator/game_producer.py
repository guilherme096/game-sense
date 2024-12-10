import json
import time
from kafka import KafkaProducer
from datetime import datetime
import pytz
import os
from time import sleep

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
        60,
        80,
    ]
    stats_published = 0

    # Sort events by their publish_timestamp
    events.sort(key=lambda e: e["publish_timestamp"])

    for event in events:
        # Parse the publish_timestamp from the event
        publish_timestamp = datetime.fromisoformat(
            event["publish_timestamp"]
        ).astimezone(pytz.utc)

        # Calculate the time difference to wait
        wait_time = (publish_timestamp - current_time).total_seconds()

        # If the event's publish time is in the future, wait until it
        if wait_time > 0:
            print(f"Waiting for {wait_time} event at {publish_timestamp}")
            time.sleep(wait_time)

        if stats_published == 0 and event["minute"] >= stats_publish_time[0]:
            publish_game_stat()
            stats_published += 1

        # Publish the event
        print(f"Publishing event: {event}")
        sleep(20)
        publish_game_event(event)
        current_time = datetime.now(pytz.utc)  # Update current time


def publish_game_info(game, stats):
    try:
        # Send the event to Kafka
        producer.send(GAMES_TOPIC, value=game)
        producer.flush()  # Ensure all messages are sent
        sleep(3)
        producer.send(STATS_TOPIC, value=stats)
        producer.flush()  # Ensure all messages are sent
        print(f"Published event: {game}")
    except Exception as e:
        print(f"Failed to publish event: {e}")


def main():
    game_file_path = os.path.join("games", "match_SCP_vs_SLB_20241202_234819.json")

    game_data = read_game_from_file(game_file_path)
    print(game_data)

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
    sleep(10)
    publish_game_info(match_info, mathc_stats)

    if events:
        process_events(events, game_data.get("match_stats"))
    else:
        print("No events found in the game data.")


if __name__ == "__main__":
    main()
