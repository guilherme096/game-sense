# Define the paths to your backend services
CLUB_SERVICE = ./backend/club_service
LIVE_GAME_SERVICE = ./backend/live_game_service
PLAYER_SERVICE = ./backend/player_service
LEAGUE_SERVICE = ./backend/league_service

# Define the default goal
.PHONY: all
all: run

# Rule to build all services
.PHONY: build
build:
	@$(MAKE) build-club
	@$(MAKE) build-live-game
	@$(MAKE) build-player
	@$(MAKE) build-league

# Rule to build specific services
.PHONY: build-club build-live-game build-player build-league
build-club:
	@echo "Building Club Service..."
	@cd $(CLUB_SERVICE) && ./mvnw clean package -DskipTests
build-live-game:
	@echo "Building Live Game Service..."
	@cd $(LIVE_GAME_SERVICE) && ./mvnw clean package -DskipTests
build-player:
	@echo "Building Player Service..."
	@cd $(PLAYER_SERVICE) && ./mvnw clean package -DskipTests
build-league:
	@echo "Building League Service..."
	@cd $(LEAGUE_SERVICE) && ./mvnw clean package -DskipTests

# Rule to start Docker Compose
.PHONY: docker-up
docker-up:
	docker-compose -f docker-compose.yml up --build -d

# Rule to stop Docker Compose
.PHONY: docker-down
docker-down:
	docker-compose -f docker-compose.yml down

# Rule to build and start Docker Compose
.PHONY: run
run: build docker-up

# Rule to rebuild Docker images and restart services
.PHONY: rebuild
rebuild: build docker-down docker-up

# Rule to rebuild and restart a specific service
.PHONY: rebuild-club rebuild-live-game rebuild-player rebuild-league
rebuild-club:
	$(MAKE) build-club
	docker-compose -f docker-compose.yml up --build -d club_service
rebuild-live-game:
	$(MAKE) build-live-game
	docker-compose -f docker-compose.yml up --build -d live_game_service
rebuild-player:
	$(MAKE) build-player
	docker-compose -f docker-compose.yml up --build -d player_service
rebuild-league:
	$(MAKE) build-league
	docker-compose -f docker-compose.yml up --build -d league_service

# Rule to clean up the target directories
.PHONY: clean
clean:
	@echo "Cleaning Club Service..."
	@cd $(CLUB_SERVICE) && ./mvnw clean || exit 1
	@echo "Cleaning Live Game Service..."
	@cd $(LIVE_GAME_SERVICE) && ./mvnw clean || exit 1
	@echo "Cleaning Player Service..."
	@cd $(PLAYER_SERVICE) && ./mvnw clean || exit 1
	@echo "Cleaning League Service..."
	@cd $(LEAGUE_SERVICE) && ./mvnw clean || exit 1