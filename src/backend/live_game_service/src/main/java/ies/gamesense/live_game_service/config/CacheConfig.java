package ies.gamesense.live_game_service.config;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.lang.reflect.Method;
import java.util.Arrays;

@Configuration
public class CacheConfig {

    @Bean("customKeyGenerator")
    public KeyGenerator keyGenerator() {
        return (Object target, Method method, Object... params) -> {
            return method.getName() + "::" + Arrays.deepToString(params);
        };
    }
}
