# Define paths to your projects
FRONTEND = ./frontend/game-sense
CLUB_SERVICE = ./backend/club_service
LIVE_GAME_SERVICE = ./backend/live_game_service
PLAYER_SERVICE = ./backend/player_service
LEAGUE_SERVICE = ./backend/league_service
MANAGEMENT_SERVICE = ./backend/management_service
GAME_GENERATOR = ./game_generator

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
	@$(MAKE) build-management
	@$(MAKE) build-game-generator
	@$(MAKE) build-databases
	@echo "All services built!"

# Build specific services
.PHONY: build-club build-live-game build-player build-league build-frontend build-management build-game-generator build-databases
build-club:
	@echo "Building Club Service..."
	@cd $(CLUB_SERVICE) && ./mvnw clean package -DskipTests
build-management:
	@echo "Building Management Service..."
	@cd $(MANAGEMENT_SERVICE) && ./mvnw clean package -DskipTests
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
build-game-generator:
	@echo "Building Game Generator..."
	@cd $(GAME_GENERATOR) && ./mvnw clean package -DskipTests
build-databases:
	@echo "Building Databases (MySQL, Redis, etc.)..."
	@docker-compose build sql_db redis_db users_db data-init
	@echo "Databases built!"

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
	@docker-compose down --remove-orphans
	@echo "All services stopped!"

# Restart all services
.PHONY: restart
restart:
	@echo "Restarting all services..."
	@docker-compose restart
	@echo "All services restarted!"

# Rebuild specific services
.PHONY: rebuild-club rebuild-live-game rebuild-player rebuild-management rebuild-league rebuild-frontend rebuild-game-generator rebuild-databases rebuild-sql rebuild-redis rebuild-users-db
rebuild-club:
	@docker-compose up --build -d club-service
rebuild-live-game:
	@docker-compose up --build -d live-game-service
rebuild-player:
	@docker-compose up --build -d player-service
rebuild-management:
	@docker-compose up --build -d management-service
rebuild-league:
	@docker-compose up --build -d league-service
rebuild-frontend:
	@docker-compose up --build -d nginx
rebuild-game-generator:
	@docker-compose up --build -d game-generator
rebuild-databases:
	@echo "Rebuilding Databases (MySQL, Redis, etc.)..."
	@docker-compose up --build -d sql_db redis_db users_db data-init
	@echo "Databases rebuilt!"
rebuild-sql:
	@echo "Restarting MySQL..."
	@docker-compose restart sql_db
	@echo "MySQL restarted!"
rebuild-redis:
	@echo "Restarting Redis..."
	@docker-compose restart redis_db
	@echo "Redis restarted!"
rebuild-users-db:
	@echo "Restarting Users Database..."
	@docker-compose restart users_db
	@echo "Users Database restarted!"

# Build and restart all services
.PHONY: rebuild
rebuild:
	$(MAKE) build
	@echo "Rebuilding and restarting all services..."
	@docker-compose down --remove-orphans
	@docker-compose up --build -d
	@echo "Rebuilt and restarted all services."

# Clean target directories
.PHONY: clean
clean:
	@echo "Cleaning Club Service..."
	@cd $(CLUB_SERVICE) && ./mvnw clean || echo "Failed to clean Club Service"
	@echo "Cleaning Management Service..."
	@cd $(MANAGEMENT_SERVICE) && ./mvnw clean || echo "Failed to clean Management Service"
	@echo "Cleaning Live Game Service..."
	@cd $(LIVE_GAME_SERVICE) && ./mvnw clean || echo "Failed to clean Live Game Service"
	@echo "Cleaning Player Service..."
	@cd $(PLAYER_SERVICE) && ./mvnw clean || echo "Failed to clean Player Service"
	@echo "Cleaning League Service..."
	@cd $(LEAGUE_SERVICE) && ./mvnw clean || echo "Failed to clean League Service"
	@echo "Cleaning Game Generator..."
	@cd $(GAME_GENERATOR) && ./mvnw clean || echo "Failed to clean Game Generator"
	@echo "Cleaning Frontend..."
	@cd $(FRONTEND) && rm -rf node_modules dist || echo "Failed to clean Frontend"
	@echo "Stopping Docker Compose..."
	@docker-compose down --remove-orphans
	@echo "All services stopped."

# Run everything
.PHONY: run
run:
	@docker-compose up --build -d
	@echo "All services are up!"
