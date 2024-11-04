package ies.gamesense.player_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPIConfig(){
        return new OpenAPI()
                .info(new Info()
                        .title("Player Service API")
                        .description("API for managing players")
                        .version("1.0.0"));
    }
}
