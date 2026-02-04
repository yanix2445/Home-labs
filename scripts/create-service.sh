#!/bin/bash
# Script pour créer un nouveau service depuis le template

set -e

# Vérifier les arguments
if [ $# -ne 1 ]; then
    echo "Usage: $0 <nom-du-service>"
    echo "Exemple: $0 vaultwarden"
    exit 1
fi

SERVICE_NAME=$1
SERVICE_DIR="services/$SERVICE_NAME"

# Vérifier que le service n'existe pas déjà
if [ -d "$SERVICE_DIR" ]; then
    echo "❌ Le service '$SERVICE_NAME' existe déjà !"
    exit 1
fi

echo "📦 Création du service '$SERVICE_NAME'..."

# Copier le template
cp -r services/_template "$SERVICE_DIR"

# Renommer le fichier exemple
mv "$SERVICE_DIR/docker-compose.yml.example" "$SERVICE_DIR/docker-compose.yml"

# Remplacer le nom du service dans le fichier
sed -i '' "s/service-name/$SERVICE_NAME/g" "$SERVICE_DIR/docker-compose.yml"

echo "✅ Service '$SERVICE_NAME' créé dans $SERVICE_DIR"
echo ""
echo "📝 Prochaines étapes :"
echo "  1. Éditez $SERVICE_DIR/docker-compose.yml"
echo "  2. Ajoutez une règle dans infrastructure/gateway/config.yml (si accès externe)"
echo "  3. Démarrez le service : cd $SERVICE_DIR && docker compose up -d"
