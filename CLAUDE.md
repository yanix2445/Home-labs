# CLAUDE.md

Ce fichier fournit des directives à Claude Code (claude.ai/code) pour travailler avec le code de ce dépôt.

## Vue d'ensemble du projet

Ceci est un dépôt d'infrastructure home lab gérant des services auto-hébergés via Docker Compose. Les services sont exposés à internet via une passerelle Cloudflare Tunnel.

## Contexte métier

Black Rise est une entreprise mère (SIREN: 919 266 668) opérant dans 5 secteurs technologiques :
- **Développement web et logiciel** — Applications, sites web, APIs
- **Développement de jeux vidéo** — Games, engines, outils de création
- **Commerce digital** — E-commerce, marketplaces, systèmes de paiement
- **Marketing digital** — Campagnes, analytics, automation
- **Production vidéo et création de contenu** — Streaming, édition, plateformes de diffusion

Les services hébergés dans ce dépôt supportent ces activités multisectorielles.

## Architecture

### Convention de nommage des services

Les services utilisent des préfixes numériques pour indiquer leur catégorie ou priorité :
- `00_` — Services fondamentaux (légal, core business, infrastructure critique)
- `01_` — Outils de productivité et collaboration
- `02_` — Services métier principaux (chatbots, communication, CRM)
- `03+` — Services expérimentaux ou secondaires

### Structure du projet

```
home-labs/
├── infrastructure/     # Infrastructure de base
│   ├── gateway/       # Cloudflare Tunnel (anciennement gatway/)
│   └── network/       # Configuration réseau
├── services/          # Services applicatifs auto-hébergés
│   ├── 00_legal-pages/   # Pages légales avec Next.js 16
│   ├── 01_excalidraw/    # Whiteboard collaboratif
│   ├── 02_typebot/       # Plateforme de chatbots
│   └── _template/        # Template pour services image-based
├── docs/             # Documentation détaillée
├── scripts/          # Scripts utilitaires (start-all, stop-all, etc.)
└── README.md         # Documentation principale
```

### Architecture réseau

- Tous les services se connectent à un réseau Docker externe nommé `home-labs`
- Le répertoire `infrastructure/gateway/` contient un Cloudflare Tunnel (cloudflared) qui route le trafic externe vers les services internes
- Les services sont référencés par leur nom de conteneur dans le réseau Docker (ex: `http://excalidraw:80`)
- **Service discovery** : Les conteneurs utilisent leurs noms de service comme DNS (ex: `http://typebot-minio:9000`)

### Configuration de la passerelle

- **Service gateway**: `infrastructure/gateway/docker-compose.yml` exécute cloudflared avec authentification par token de tunnel
- **Routage**: `infrastructure/gateway/config.yml` définit les règles d'ingress mappant les noms d'hôtes externes aux services conteneurs internes
- **Token**: Stocké dans `infrastructure/gateway/.env` sous `CF_TUNNEL_TOKEN` (sensible, non versionné)
- **Template**: `infrastructure/gateway/.env.example` sert de modèle

### Structure des services

Chaque service dans `services/` contient :
- `docker-compose.yml` - Définition du service qui doit inclure `networks: home-labs: external: true`
- Template de base disponible dans `services/_template/`

### Trois modèles de services

Le dépôt supporte trois patterns de services distincts :

#### 1. Services image-based (Simple)
Exemple : `01_excalidraw/`
- Image Docker pré-construite (Docker Hub, ghcr.io)
- Configuration minimale via `docker-compose.yml`
- Aucun build requis
- Idéal pour : outils tiers, services standard

#### 2. Services construits (Built applications)
Exemple : `00_legal-pages/`
- Dockerfile custom pour construire l'application
- Application complète dans un sous-répertoire (`legal-app/`)
- Build lors du déploiement : `docker compose build`
- Idéal pour : applications Next.js, React, apps custom

Structure type :
```
services/00_legal-pages/
├── docker-compose.yml      # Avec section build:
├── legal-app/             # Application complète
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── lib/             # Utilities
│   ├── Dockerfile       # Multi-stage build
│   ├── package.json     # Dependencies
│   └── pnpm-lock.yaml   # Lock file
└── .env                 # Variables d'environnement
```

#### 3. Stacks multi-conteneurs (Orchestrated)
Exemple : `02_typebot/`
- Plusieurs conteneurs orchestrés ensemble
- Utilisation de `name:` pour le projet
- Health checks et dépendances (`depends_on` avec `condition: service_healthy`)
- Volumes nommés pour chaque composant
- Idéal pour : stacks complètes (app + DB + storage + cache)

## Commandes courantes

### Gestion globale (scripts)

**Ordre de démarrage recommandé** : Gateway → Services (pour garantir le routage)

```bash
# Démarrer tous les services (gateway + services)
./scripts/start-all.sh

# Arrêter tous les services
./scripts/stop-all.sh

# Créer un nouveau service depuis le template
./scripts/create-service.sh nom-du-service

# Démarrer sélectivement (gateway d'abord)
cd infrastructure/gateway && docker compose up -d
cd services/00_legal-pages && docker compose up -d
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

# Pour un service avec build
docker compose build          # Build initial
docker compose up -d         # Démarrer après build

# Rebuild complet (clear cache)
docker compose build --no-cache

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

# Rebuild et redémarrer (pour services built)
docker compose up -d --build

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

### Méthode rapide (recommandée pour services image-based)

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

1. Copier le template : `cp -r services/_template services/03_mon-service`
2. Renommer : `mv services/03_mon-service/docker-compose.yml.example services/03_mon-service/docker-compose.yml`
3. Éditer `docker-compose.yml` avec la configuration du service (inclure `networks: home-labs: external: true`)
4. Si accès externe requis, ajouter une règle d'ingress dans `infrastructure/gateway/config.yml` :
   ```yaml
   - hostname: <sous-domaine>.yanis-harrat.com
     service: http://<nom_du_conteneur>:<port>
   ```
5. Redémarrer la passerelle : `cd infrastructure/gateway && docker compose restart`
6. Démarrer le service : `cd services/03_mon-service && docker compose up -d`

**Note** : Le template `_template/` est minimal et adapté aux services image-based. Pour des applications construites (Next.js, React, etc.), référencer la structure de `00_legal-pages/` qui montre l'organisation complète d'une application moderne avec build.

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

- **Ressources** : Définir des limites adaptées au type de service

  | Type de service | Mémoire | CPU | Cas d'usage |
  |----------------|---------|-----|-------------|
  | **Légers** | 256m | 0.25 | nginx, services statiques, proxies |
  | **Moyens** | 512m | 0.50 | Apps Node.js, Python, DBs légères |
  | **Lourds** | 1g | 1.0 | Builders Next.js, apps volumineuses |
  | **Bases de données** | 512m-1g | 0.50-1.0 | PostgreSQL, MySQL, Redis |

  ```yaml
  # Exemple : Service moyen
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

### Services construits : Guide complet

Pour créer un service avec build custom (application Next.js, React, etc.) :

#### 1. Quand construire vs. utiliser une image

**Utiliser une image pré-construite** quand :
- Le service existe sur Docker Hub / ghcr.io
- Aucune personnalisation n'est nécessaire
- Simplicité de déploiement recherchée

**Construire localement** quand :
- Application custom (Next.js, React, Vue, etc.)
- Besoin de personnalisation du code
- Intégration avec des APIs spécifiques
- Stack moderne non disponible en image

#### 2. Structure recommandée

```
services/00_mon-app/
├── docker-compose.yml       # Avec section build
├── .env                     # Variables d'environnement (non versionné)
├── .env.example            # Template de .env
├── mon-app/                # Application complète
│   ├── Dockerfile          # Build multi-stage
│   ├── package.json        # Dependencies
│   ├── pnpm-lock.yaml      # Lock file (ou npm, yarn)
│   ├── next.config.js      # Config Next.js
│   ├── app/               # Next.js app router
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── api/          # API routes
│   ├── components/        # React components
│   ├── lib/              # Utilities, helpers
│   └── public/           # Static assets
└── README.md             # Documentation du service
```

#### 3. Configuration docker-compose.yml

```yaml
services:
  mon-app:
    build:
      context: ./mon-app          # Chemin vers le Dockerfile
      dockerfile: Dockerfile
    container_name: mon-app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - API_KEY=${API_KEY}        # Depuis .env
    mem_limit: 512m
    cpus: "0.50"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
    networks:
      - home-labs

networks:
  home-labs:
    external: true
```

#### 4. Dockerfile exemple (Next.js multi-stage)

Référence : `services/00_legal-pages/legal-app/Dockerfile`

```dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

#### 5. Commandes de build

```bash
# Build initial
cd services/00_mon-app
docker compose build

# Démarrer après build
docker compose up -d

# Rebuild avec modifications de code
docker compose build --no-cache
docker compose up -d --force-recreate

# Build et redémarrage en une commande
docker compose up -d --build
```

#### 6. Gestion du cache

```bash
# Clear tous les caches Docker
docker system prune -a

# Clear seulement les images non utilisées
docker image prune -a

# Rebuild complet sans cache
docker compose build --no-cache --pull
```

### Intégration d'APIs externes

#### Patterns d'intégration

##### 1. API Email (Resend)
Exemple : `services/00_legal-pages/`

```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  const { data, error } = await resend.emails.send({
    from: 'Black Rise <noreply@yanis-harrat.com>',
    to,
    subject,
    html,
  });

  if (error) throw error;
  return data;
}
```

Configuration `.env` :
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

##### 2. OAuth Google (Sheets, Gmail)
Exemple : `services/02_typebot/`

```yaml
# docker-compose.yml
environment:
  - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
  - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
```

Configuration `.env` :
```env
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxx
```

##### 3. WhatsApp Business API (Meta)
Exemple : `services/02_typebot/`

```yaml
# docker-compose.yml
environment:
  - META_SYSTEM_USER_TOKEN=${META_SYSTEM_USER_TOKEN}
  - WHATSAPP_PREVIEW_FROM_PHONE_NUMBER_ID=${WHATSAPP_PREVIEW_FROM_PHONE_NUMBER_ID}
```

Configuration `.env` :
```env
META_SYSTEM_USER_TOKEN=EAAxxxxxxxxxxxxxxxxxx
WHATSAPP_PREVIEW_FROM_PHONE_NUMBER_ID=123456789012345
```

#### Bonnes pratiques APIs

1. **Variables d'environnement** : Toujours utiliser `.env` pour les clés API
2. **Template .env.example** : Fournir un exemple sans valeurs sensibles
3. **Validation** : Vérifier la présence des variables au démarrage
4. **Error handling** : Wrapper les appels API avec try/catch
5. **Rate limiting** : Implémenter des retry avec backoff
6. **Logs** : Logger les erreurs API (sans exposer les tokens)

### Comparaison rapide des services

| Service | Type | Stack | RAM/CPU | APIs Externes | Routes exposées |
|---------|------|-------|---------|---------------|-----------------|
| **Legal-pages** | Built | Next.js 16 + React 19 | 256m / 0.25 | Resend (email) | legal.yanis-harrat.com |
| **Excalidraw** | Image | - | Default | - | excalidraw.yanis-harrat.com |
| **Typebot Builder** | Image | Node.js | 1g / 1.0 | Google, Meta, WhatsApp | typebot.yanis-harrat.com |
| **Typebot Viewer** | Image | Node.js | 1g / 1.0 | - | bot.yanis-harrat.com |
| **Typebot DB** | Image | PostgreSQL 16 | 512m / 0.50 | - | (interne) |
| **MinIO** | Image | S3-compatible | Default | - | storage.yanis-harrat.com |

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

- Vérifier que le service cible est démarré et healthy : `docker compose ps`
- Utiliser le nom du conteneur comme hostname (ex: `http://typebot-minio:9000`)
- Ne pas oublier le protocole `http://` ou `https://` dans les URLs
- Vérifier que les deux services sont sur le réseau `home-labs`

### Build failures et caching

- **Problème** : Le build échoue ou utilise des dépendances obsolètes
- **Solutions** :
  ```bash
  # Clear le cache et rebuild
  docker compose build --no-cache

  # Pull les images de base à jour
  docker compose build --no-cache --pull

  # Clear tous les caches Docker
  docker system prune -a

  # Rebuild un service spécifique
  docker compose build --no-cache mon-service
  ```

### Next.js / React issues

- **Port 3000 déjà utilisé** :
  ```bash
  # Trouver le processus
  lsof -i :3000

  # Ou changer le port dans docker-compose.yml
  ports:
    - "3001:3000"
  ```

- **Build output manquant** :
  - Vérifier `next.config.js` : `output: 'standalone'`
  - Vérifier que `.next/` est dans `.dockerignore`

- **Variables d'environnement non chargées** :
  - Préfixer avec `NEXT_PUBLIC_` pour accès client
  - Recréer le conteneur : `docker compose up -d --force-recreate`

### Configuration S3/MinIO

- **Endpoint** : Utiliser le domaine public via Cloudflare (ex: `storage.yanis-harrat.com`)
- **Port** : `443` pour HTTPS via Cloudflare, `9000` en local
- **SSL** : `true` pour HTTPS via Cloudflare
- **Public URL** : Inclure le nom du bucket (ex: `https://storage.yanis-harrat.com/bucket-name`)
- **CORS** : Ajouter `MINIO_API_CORS_ALLOW_ORIGIN=*` pour les uploads depuis le navigateur

### Form submission et API routes

- **CORS errors** :
  ```typescript
  // app/api/route.ts
  export async function POST(request: Request) {
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }
  ```

- **500 errors** :
  - Vérifier les logs : `docker compose logs -f`
  - Valider les variables d'environnement
  - Tester les API keys

### pnpm workspace issues

- **Lock file out of sync** :
  ```bash
  # Dans le conteneur ou localement
  pnpm install --frozen-lockfile

  # Rebuild le service
  docker compose build --no-cache
  ```

- **Dependencies manquantes** :
  ```bash
  # Vérifier package.json vs pnpm-lock.yaml
  pnpm install

  # Rebuild
  docker compose up -d --build
  ```

### Permissions Docker

- Si `cap_drop: ALL` bloque des opérations, ajouter les capabilities nécessaires avec `cap_add`
- Pour l'écriture de fichiers : `cap_add: [CHOWN, SETUID, SETGID]`
- Pour tmpfs : Monter dans le conteneur : `tmpfs: - /path:rw,noexec,nosuid,size=128m`

## Notes de sécurité

- Le conteneur gateway s'exécute avec deparamètres de sécurité renforcés (no-new-privileges, capabilities supprimées, système de fichiers en lecture seule)
- Les limites de ressources empêchent les conteneurs incontrôlés
- **Ne jamais commit** le fichier `infrastructure/gateway/.env` avec de vrais tokens de tunnel
- **Ne jamais commit** les fichiers `.env` des services avec des clés API
- Un template `.env.example` doit être fourni dans `infrastructure/gateway/.env.example` et pour chaque service
- Tous les fichiers `.env` sont exclus via `.gitignore`
- Toujours utiliser HTTPS via Cloudflare Tunnel pour les services publics
- Implémenter rate limiting pour les API routes exposées
