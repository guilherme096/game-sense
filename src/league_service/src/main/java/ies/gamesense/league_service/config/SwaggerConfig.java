package ies.gamesense.league_service.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI api() {
        return new OpenAPI()
                .info(new Info()
                        .title("League Service API")
                        .description("This API provides the league service for the GameSense application")
                        .version("1.0"));
    }
}
