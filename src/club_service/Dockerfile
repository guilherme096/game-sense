FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/club_service-0.0.1-SNAPSHOT.jar /app/club_service.jar
EXPOSE 8080
CMD ["java", "-jar", "club_service.jar"]