# build
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .
#RUN mvn dependency:go-offline

# install dependencies
COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Serve
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/live_game_service-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "live_game_service-0.0.1-SNAPSHOT.jar"]