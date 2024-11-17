# Makefile Commands for Running the Project

**Note:** You must be in the `./src` directory to run these commands.

| Command               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `make` or `make all`  | Builds all projects and starts Docker Compose (`make run`).                |
| `make build`          | Builds all projects (without starting Docker).                             |
| `make build-club`     | Builds only the `club_service` project.                                    |
| `make build-live-game`| Builds only the `live_game_service` project.                               |
| `make build-player`   | Builds only the `player_service` project.                                  |
| `make build-league`   | Builds only the `league_service` project.                                  |
| `make docker-up`      | Starts Docker Compose in detached mode (`-d`).                             |
| `make docker-down`    | Stops Docker Compose and removes containers, networks, etc.                |
| `make run`            | Builds all projects and starts Docker Compose in one step.                 |
| `make rebuild`        | Rebuilds all projects, stops Docker, and restarts everything fresh.         |
| `make rebuild-club`   | Rebuilds and restarts only the `club_service` project.                     |
| `make rebuild-live-game`| Rebuilds and restarts only the `live_game_service` project.              |
| `make rebuild-player` | Rebuilds and restarts only the `player_service` project.                   |
| `make rebuild-league` | Rebuilds and restarts only the `league_service` project.                   |
| `make clean`          | Cleans up build artifacts in each service by running `mvnw clean`.         |
