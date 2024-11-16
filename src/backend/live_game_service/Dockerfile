FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/live_game_service-0.0.1-SNAPSHOT.jar /app/live_game_service.jar
EXPOSE 8080
CMD ["java", "-jar", "live_game_service.jar"]