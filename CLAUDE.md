# CLAUDE.md

Ce fichier fournit des directives à Claude Code (claude.ai/code) pour travailler avec le code de ce dépôt.

## Vue d'ensemble du projet

Ceci est un dépôt d'infrastructure home lab gérant des services auto-hébergés via Docker Compose. Les services sont exposés à internet via une passerelle Cloudflare Tunnel.

## Architecture

### Structure du projet
```
home-labs/
├── infrastructure/     # Infrastructure de base
│   ├── gateway/       # Cloudflare Tunnel (anciennement gatway/)
│   └── network/       # Configuration réseau
├── services/          # Services applicatifs auto-hébergés
│   ├── excalidraw/
│   └── _template/     # Template pour nouveaux services
├── docs/             # Documentation détaillée
├── scripts/          # Scripts utilitaires (start-all, stop-all, etc.)
└── README.md         # Documentation principale
```

### Architecture réseau
- Tous les services se connectent à un réseau Docker externe nommé `home-labs`
- Le répertoire `infrastructure/gateway/` contient un Cloudflare Tunnel (cloudflared) qui route le trafic externe vers les services internes
- Les services sont référencés par leur nom de conteneur dans le réseau Docker (ex: `http://excalidraw:80`)

### Configuration de la passerelle
- **Service gateway**: `infrastructure/gateway/docker-compose.yml` exécute cloudflared avec authentification par token de tunnel
- **Routage**: `infrastructure/gateway/config.yml` définit les règles d'ingress mappant les noms d'hôtes externes aux services conteneurs internes
- **Token**: Stocké dans `infrastructure/gateway/.env` sous `CF_TUNNEL_TOKEN` (sensible, non versionné)
- **Template**: `infrastructure/gateway/.env.example` sert de modèle

### Structure des services
Chaque service dans `services/` contient :
- `docker-compose.yml` - Définition du service qui doit inclure `networks: home-labs: external: true`
- Template disponible dans `services/_template/`

## Commandes courantes

### Gestion globale (scripts)
```bash
# Démarrer tous les services (gateway + services)
./scripts/start-all.sh

# Arrêter tous les services
./scripts/stop-all.sh

# Créer un nouveau service depuis le template
./scripts/create-service.sh nom-du-service
```

### Gestion du réseau
```bash
# Créer le réseau partagé (requis avant le premier démarrage)
docker network create home-labs

# Inspecter le réseau et voir les conteneurs connectés
docker network inspect home-labs
```

### Gestion des services
```bash
# Démarrer un service spécifique
cd services/<nom-du-service>
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
cd infrastructure/gateway
docker compose up -d

# Vérifier le statut du tunnel
docker exec home-labs-cloudflared cloudflared tunnel info

# Voir les logs du tunnel
docker compose logs -f
```

## Ajouter de nouveaux services

### Méthode rapide (recommandée)
```bash
# Utiliser le script de création
./scripts/create-service.sh mon-service

# Éditer la configuration
nano services/mon-service/docker-compose.yml

# Si accès externe requis, ajouter à infrastructure/gateway/config.yml
# Puis redémarrer le gateway
cd infrastructure/gateway && docker compose restart

# Démarrer le service
cd services/mon-service
docker compose up -d
```

### Méthode manuelle
1. Copier le template : `cp -r services/_template services/mon-service`
2. Renommer : `mv services/mon-service/docker-compose.yml.example services/mon-service/docker-compose.yml`
3. Éditer `docker-compose.yml` avec la configuration du service (inclure `networks: home-labs: external: true`)
4. Si accès externe requis, ajouter une règle d'ingress dans `infrastructure/gateway/config.yml` :
   ```yaml
   - hostname: <sous-domaine>.yanis-harrat.com
     service: http://<nom_du_conteneur>:<port>
   ```
5. Redémarrer la passerelle : `cd infrastructure/gateway && docker compose restart`
6. Démarrer le service : `cd services/mon-service && docker compose up -d`

Documentation complète : `docs/adding-services.md`

## Notes de sécurité

- Le conteneur gateway s'exécute avec des paramètres de sécurité renforcés (no-new-privileges, capabilities supprimées, système de fichiers en lecture seule)
- Les limites de ressources empêchent les conteneurs incontrôlés (256MB RAM, 0.50 CPU pour la passerelle)
- Ne jamais commit le fichier `infrastructure/gateway/.env` avec de vrais tokens de tunnel
- Un template `.env.example` est fourni dans `infrastructure/gateway/.env.example`
- Tous les fichiers `.env` sont exclus via `.gitignore`
