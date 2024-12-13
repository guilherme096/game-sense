from kafka import KafkaConsumer
import json

# Configure the Kafka consumer
consumer = KafkaConsumer(
    "games",
    bootstrap_servers="localhost:29092",
    group_id="games",
    api_version="0.10.2",
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
)

# Read and print messages from the topic
for message in consumer:
    print(f"Received: {message.value}")
