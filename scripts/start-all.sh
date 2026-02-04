#!/bin/bash
# Démarrer tous les services home-labs

set -e

echo "🚀 Démarrage de l'infrastructure Home Labs..."

# Vérifier que le réseau existe
if ! docker network inspect home-labs &> /dev/null; then
    echo "📡 Création du réseau home-labs..."
    docker network create home-labs
fi

# Démarrer le gateway
echo "🔒 Démarrage du gateway Cloudflare..."
cd infrastructure/gateway
docker compose up -d
cd ../..

# Démarrer tous les services
echo "📦 Démarrage des services..."
for service in services/*/; do
    if [ -f "$service/docker-compose.yml" ]; then
        service_name=$(basename "$service")
        if [ "$service_name" != "_template" ]; then
            echo "  ▶️  Démarrage de $service_name..."
            cd "$service"
            docker compose up -d
            cd ../..
        fi
    fi
done

echo "✅ Tous les services sont démarrés !"
echo ""
echo "📊 Status :"
docker ps --filter "network=home-labs" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
