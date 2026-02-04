#!/bin/bash
# Arrêter tous les services home-labs

set -e

echo "🛑 Arrêt de l'infrastructure Home Labs..."

# Arrêter tous les services
echo "📦 Arrêt des services..."
for service in services/*/; do
    if [ -f "$service/docker-compose.yml" ]; then
        service_name=$(basename "$service")
        if [ "$service_name" != "_template" ]; then
            echo "  ⏹️  Arrêt de $service_name..."
            cd "$service"
            docker compose down
            cd ../..
        fi
    fi
done

# Arrêter le gateway
echo "🔒 Arrêt du gateway Cloudflare..."
cd infrastructure/gateway
docker compose down
cd ../..

echo "✅ Tous les services sont arrêtés !"
