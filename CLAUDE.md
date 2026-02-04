# CLAUDE.md

Ce fichier fournit des directives à Claude Code (claude.ai/code) pour travailler avec le code de ce dépôt.

## Vue d'ensemble du projet

Ceci est un dépôt d'infrastructure home lab gérant des services auto-hébergés via Docker Compose. Les services sont exposés à internet via une passerelle Cloudflare Tunnel.

## Architecture

### Architecture réseau
- Tous les services se connectent à un réseau Docker externe nommé `home-labs`
- Le répertoire `gatway/` contient un Cloudflare Tunnel (cloudflared) qui route le trafic externe vers les services internes
- Les services sont référencés par leur nom de conteneur dans le réseau Docker (ex: `http://excalidraw:80`)

### Configuration de la passerelle
- **Service gateway**: `gatway/docker-compose.yml` exécute cloudflared avec authentification par token de tunnel
- **Routage**: `gatway/config.yml` définit les règles d'ingress mappant les noms d'hôtes externes aux services conteneurs internes
- **Token**: Stocké dans `gatway/.env` sous `CF_TUNNEL_TOKEN` (sensible)

### Structure des services
Chaque répertoire de service contient :
- `docker-compose.yml` - Définition du service qui doit inclure `networks: home-labs: external: true`

## Commandes courantes

### Gestion du réseau
```bash
# Créer le réseau partagé (requis avant le premier démarrage de service)
docker network create home-labs
```

### Gestion des services
```bash
# Démarrer un service spécifique
cd <répertoire-du-service>
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter un service
docker compose down

# Redémarrer un service
docker compose restart
```

### Gestion de la passerelle
```bash
# Démarrer le Cloudflare Tunnel
cd gatway
docker compose up -d

# Vérifier le statut du tunnel
docker exec home-labs-cloudflared cloudflared tunnel info

# Voir les logs du tunnel
docker compose logs -f
```

## Ajouter de nouveaux services

1. Créer un nouveau répertoire pour le service
2. Ajouter `docker-compose.yml` avec `networks: home-labs: external: true`
3. Si le service nécessite un accès externe, ajouter une règle d'ingress dans `gatway/config.yml` :
   ```yaml
   - hostname: <sous-domaine>.yanis-harrat.com
     service: http://<nom_du_conteneur>:<port>
   ```
4. Redémarrer la passerelle : `cd gatway && docker compose restart`

## Notes de sécurité

- Le conteneur gateway s'exécute avec des paramètres de sécurité renforcés (no-new-privileges, capabilities supprimées, système de fichiers en lecture seule)
- Les limites de ressources empêchent les conteneurs incontrôlés (256MB RAM, 0.50 CPU pour la passerelle)
- Ne jamais commit le fichier `gatway/.env` avec de vrais tokens de tunnel
