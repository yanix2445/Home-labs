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

# Voir les logs d'un conteneur spécifique
docker compose logs -f <nom-du-conteneur>

# Arrêter un service
docker compose down

# Redémarrer un service (ne recharge PAS les .env)
docker compose restart

# Recréer les conteneurs (recharge les .env et la config)
docker compose up -d --force-recreate

# Voir l'état de tous les conteneurs d'un service
docker compose ps
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

### Bonnes pratiques pour les nouveaux services
- **Volumes** : Utiliser des volumes Docker nommés plutôt que des bind mounts
  ```yaml
  volumes:
    service-data:
      name: service-data  # Nom explicite plutôt que préfixe automatique
  ```
- **Healthchecks** : Inclure pour tous les services critiques
  ```yaml
  healthcheck:
    test: ["CMD-SHELL", "command-to-test"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s
  ```
- **Sécurité** : Appliquer les mêmes paramètres que le gateway
  ```yaml
  security_opt:
    - no-new-privileges:true
  cap_drop:
    - ALL
  tmpfs:
    - /tmp:rw,noexec,nosuid,size=128m
  ```
- **Ressources** : Définir des limites pour éviter les fuites
  ```yaml
  mem_limit: 512m
  cpus: "0.50"
  ```
- **Logs** : Configurer la rotation pour éviter de remplir le disque
  ```yaml
  logging:
    driver: json-file
    options:
      max-size: "10m"
      max-file: "3"
  ```
- **Dépendances** : Utiliser `condition: service_healthy` pour orchestrer le démarrage
  ```yaml
  depends_on:
    db:
      condition: service_healthy
  ```

Documentation complète : `docs/adding-services.md`

### Exemples de services

#### Service simple (Excalidraw)
Un seul conteneur sans dépendances :
```yaml
services:
  excalidraw:
    image: excalidraw/excalidraw:latest
    container_name: excalidraw
    restart: unless-stopped
    networks:
      - home-labs

networks:
  home-labs:
    external: true
```

#### Service multi-conteneurs (Typebot)
Stack complète avec base de données, application, stockage :
```yaml
name: typebot

services:
  typebot-db:
    image: postgres:16-alpine
    volumes:
      - typebot-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U typebot -d typebot"]
    networks:
      - home-labs

  typebot-builder:
    image: baptistearno/typebot-builder:latest
    depends_on:
      typebot-db:
        condition: service_healthy
    environment:
      - DATABASE_URL=postgresql://user:pass@typebot-db:5432/db
    networks:
      - home-labs

  typebot-minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    volumes:
      - typebot-s3-data:/data
    networks:
      - home-labs

volumes:
  typebot-db-data:
    name: typebot-db-data
  typebot-s3-data:
    name: typebot-s3-data

networks:
  home-labs:
    external: true
```

Points clés pour les stacks multi-conteneurs :
- Utiliser `name:` pour nommer le projet Docker Compose
- Les conteneurs se résolvent par leur nom de service sur le réseau (ex: `typebot-db`)
- Utiliser `depends_on` avec `condition: service_healthy` pour l'orchestration
- Créer des volumes nommés pour chaque composant persistant

## Dépannage des services

### Changements de configuration ne prennent pas effet
- **Problème** : `docker compose restart` ne recharge pas les variables d'environnement depuis `.env`
- **Solution** : Utiliser `docker compose up -d --force-recreate` pour recréer les conteneurs

### Service inaccessible via Cloudflare Tunnel
- **Vérifications** :
  1. Le service est sur le réseau `home-labs` : `docker network inspect home-labs`
  2. La règle d'ingress est dans `infrastructure/gateway/config.yml`
  3. Le gateway a été redémarré : `cd infrastructure/gateway && docker compose restart`
  4. Les logs du tunnel : `docker logs home-labs-cloudflared`

### Erreurs de connexion entre services (ECONNREFUSED)
- Vérifier que le service cible est démarré et healthy
- Utiliser le nom du conteneur comme hostname (ex: `http://typebot-minio:9000`)
- Ne pas oublier le protocole `http://` ou `https://` dans les URLs

### Configuration S3/MinIO
- **Endpoint** : Utiliser le domaine public via Cloudflare (ex: `storage.yanis-harrat.com`)
- **Port** : `443` pour HTTPS via Cloudflare, `9000` en local
- **SSL** : `true` pour HTTPS via Cloudflare
- **Public URL** : Inclure le nom du bucket (ex: `https://storage.yanis-harrat.com/bucket-name`)
- **CORS** : Ajouter `MINIO_API_CORS_ALLOW_ORIGIN=*` pour les uploads depuis le navigateur

### Permissions Docker
- Si `cap_drop: ALL` bloque des opérations, ajouter les capabilities nécessaires avec `cap_add`
- Pour l'écriture de fichiers : `cap_add: [CHOWN, SETUID, SETGID]`
- Pour tmpfs : Monter dans le conteneur : `tmpfs: - /path:rw,noexec,nosuid,size=128m`

## Notes de sécurité

- Le conteneur gateway s'exécute avec des paramètres de sécurité renforcés (no-new-privileges, capabilities supprimées, système de fichiers en lecture seule)
- Les limites de ressources empêchent les conteneurs incontrôlés (256MB RAM, 0.50 CPU pour la passerelle)
- Ne jamais commit le fichier `infrastructure/gateway/.env` avec de vrais tokens de tunnel
- Un template `.env.example` est fourni dans `infrastructure/gateway/.env.example`
- Tous les fichiers `.env` sont exclus via `.gitignore`
