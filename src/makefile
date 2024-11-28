# Define paths to your projects
FRONTEND = ./frontend/game-sense
CLUB_SERVICE = ./backend/club_service
LIVE_GAME_SERVICE = ./backend/live_game_service
PLAYER_SERVICE = ./backend/player_service
LEAGUE_SERVICE = ./backend/league_service

# Default goal
.PHONY: all
all: run

# Build all services
.PHONY: build
build:
	@$(MAKE) build-club
	@$(MAKE) build-live-game
	@$(MAKE) build-player
	@$(MAKE) build-league
	@$(MAKE) build-frontend

# Build specific services
.PHONY: build-club build-live-game build-player build-league build-frontend
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
build-frontend:
	@echo "Building Frontend..."
	@cd $(FRONTEND) && npm install && npm run build

# Start Docker Compose without rebuilding
.PHONY: docker-up
docker-up:
	@echo "Starting all services..."
	@docker-compose up -d
	@echo "All services are up!"

# Stop Docker Compose
.PHONY: docker-down
docker-down:
	@echo "Stopping all services..."
	@docker-compose down
	@echo "All services stopped!"

# Restart all services
.PHONY: restart
restart:
	@echo "Restarting all services..."
	@docker-compose restart
	@echo "All services restarted!"

# Build and restart specific services
.PHONY: rebuild-club rebuild-live-game rebuild-player rebuild-league rebuild-frontend rebuild-databases
rebuild-club:
	$(MAKE) build-club
	@docker-compose up --build -d club-service
rebuild-live-game:
	$(MAKE) build-live-game
	@docker-compose up --build -d live-game-service
rebuild-player:
	$(MAKE) build-player
	@docker-compose up --build -d player-service
rebuild-league:
	$(MAKE) build-league
	@docker-compose up --build -d league-service
rebuild-frontend:
	$(MAKE) build-frontend
	@docker-compose up --build -d nginx
rebuild-databases:
	@echo "Rebuilding Databases (MySQL and Redis)..."
	@docker-compose up --build -d sql_db redis_db

# Restart database services
.PHONY: restart-sql restart-redis
restart-sql:
	@echo "Restarting MySQL..."
	@docker-compose restart sql_db
	@echo "MySQL restarted!"
restart-redis:
	@echo "Restarting Redis..."
	@docker-compose restart redis_db
	@echo "Redis restarted!"


# Build and restart all services
.PHONY: rebuild
rebuild:
	$(MAKE) build
	@docker-compose up --build -d
	@echo "Rebuilt and restarted all services."

# Clean target directories
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
	@echo "Cleaning Frontend..."
	@cd $(FRONTEND) && rm -rf node_modules dist || exit 1
	@echo "Stopping Docker Compose..."
	docker-compose down
	@echo "All services stopped."

# Run everything
.PHONY: run
run: build docker-up

