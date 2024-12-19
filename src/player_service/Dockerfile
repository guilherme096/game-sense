FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/player_service-0.0.1-SNAPSHOT.jar /app/player_service.jar
EXPOSE 8080
CMD ["java", "-jar", "player_service.jar"]