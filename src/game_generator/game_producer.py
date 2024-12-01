import json
import time
from kafka import KafkaProducer
from datetime import datetime
import pytz
import os

# Kafka configuration
KAFKA_BROKER = "kafka:9092"  # Adjust to your Kafka broker
EVENTS_TOPIC = "events"  # Topic to publish to
GAMES_TOPIC = "games"  # Topic to publish to

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


# Function to read game data from a JSON file
def read_game_from_file(file_path):
    with open(file_path, "r") as file:
        game_data = json.load(file)
    return game_data


# Function to simulate the timing for event publishing
def process_events(events):
    # Current time in UTC (or adjust if needed)
    current_time = datetime.now(pytz.utc)

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

        # Publish the event
        print(f"Publishing event: {event}")
        publish_game_event(event)
        current_time = datetime.now(pytz.utc)  # Update current time


def publish_game_info(game):
    try:
        # Send the event to Kafka
        producer.send(GAMES_TOPIC, value=game)
        producer.flush()  # Ensure all messages are sent
        print(f"Published event: {game}")
    except Exception as e:
        print(f"Failed to publish event: {e}")


def main():
    game_file_path = os.path.join(
        "games", "match_SCP_vs_SLB_20241201_193951.json")

    game_data = read_game_from_file(game_file_path)
    print(game_data)

    events = game_data.get("events", [])
    match_info = {
        "match_id": game_data.get("match_id"),
        "home_team": game_data.get("home_team"),
        "away_team": game_data.get("away_team"),
    }

    publish_game_info(match_info)

    if events:
        process_events(events)
    else:
        print("No events found in the game data.")


if __name__ == "__main__":
    main()
