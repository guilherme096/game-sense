FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/league_service-0.0.1-SNAPSHOT.jar /app/league_service.jar
EXPOSE 8080
CMD ["java", "-jar", "league_service.jar"]