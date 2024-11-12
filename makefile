# Define the names of your services
SERVICES = ./src/backend/club_service live_game_service player_service league_service

# Define the default goal
.PHONY: all
all: run

# Rule to build each service
.PHONY: build
build:
	@for service in $(SERVICES); do \
		echo "Building $$service..."; \
		cd $$service && ./mvnw clean package -DskipTests && cd ..; \
	done

# Rule to start Docker Compose
.PHONY: docker-up
docker-up:
	docker-compose -f src/docker-compose.yml up --build -d

# Rule to stop Docker Compose
.PHONY: docker-down
docker-down:
	docker-compose -f src/docker-compose.yml down


# Rule to build and then start Docker Compose
.PHONY: run
run: build docker-up

# Rule to rebuild Docker images and restart services
.PHONY: rebuild
rebuild: build docker-down docker-up

# Rule to clean up the target directories
.PHONY: clean
clean:
	@for service in $(SERVICES); do \
		echo "Cleaning $$service..."; \
		cd $$service && ./mvnw clean && cd ..; \
	done
