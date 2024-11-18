# build 
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

# install dependencies
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Serve
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/live_game_service-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "live_game_service-0.0.1-SNAPSHOT.jar"]