# build 
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

# install dependencies
COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Serve
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/live_game_service-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "live_game_service-0.0.1-SNAPSHOT.jar"]