package ies.gamesense.live_game_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class LiveGameServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LiveGameServiceApplication.class, args);
	}

}
