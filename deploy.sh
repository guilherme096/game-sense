#!/bin/bash
set -e

REPO_DIR="/home/henriqueft04/ies-24-25-group-project-102"
DOCKER_COMPOSE_FILE="$REPO_DIR/docker-compose.yml"

echo "1. Atualizando o repositório..."
cd $REPO_DIR
git pull origin dev

echo "2. Parando containers antigos (se existirem)..."
docker-compose -f $DOCKER_COMPOSE_FILE down --remove-orphans

echo "3. Subindo novos containers..."
docker-compose -f $DOCKER_COMPOSE_FILE up -d --build

echo "Deploy finalizado com sucesso!"
