# build fase
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# install dependencies
COPY pom.xml .

#RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Serve
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/player_service-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "player_service-0.0.1-SNAPSHOT.jar"]
