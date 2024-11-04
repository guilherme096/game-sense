# These are the base *makefile* commands to run the project

| Command           | Description                                                              |
|-------------------|--------------------------------------------------------------------------|
| `make` or `make all`  | Builds projects and starts Docker Compose (`make run`).               |
| `make build`      | Builds all projects (without starting Docker).                          |
| `make docker-up`  | Starts Docker Compose in detached mode (`-d`).                          |
| `make docker-down`| Stops Docker Compose and removes containers, networks, etc.             |
| `make run`        | Builds projects and starts Docker Compose in one step.                  |
| `make rebuild`    | Rebuilds projects, stops Docker, and restarts everything fresh.         |
| `make clean`      | Cleans up build artifacts in each service by running `mvnw clean`.      |
