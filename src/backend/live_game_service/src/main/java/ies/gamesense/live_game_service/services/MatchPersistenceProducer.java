package ies.gamesense.live_game_service.services;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import ies.gamesense.live_game_service.entities.Match;

@Service
public class MatchPersistenceProducer {

    private final KafkaTemplate<String, Match> kafkaTemplate;

    public MatchPersistenceProducer(KafkaTemplate<String, Match> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMatchForPersistence(Match match) {
        // Use the match ID as the key and the Match object as the value
        kafkaTemplate.send("persist-matches", match.getMatchId(), match);
        System.out.println("Match sent to Kafka for persistence: " + match);
    }
}
