# Build springboot app and then serve multistage
FROM maven:3.9.9-eclipse-temurin-17-alpine AS build

WORKDIR /app

# install dependencies
COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Serve
FROM openjdk:17-jdk-alpine
WORKDIR /app

RUN apk add --no-cache curl
COPY --from=build /app/target/league_service-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "league_service-0.0.1-SNAPSHOT.jar"]