# ➕ Ajouter un Nouveau Service

> Guide complet pour créer et déployer un nouveau service dans l'infrastructure Home Labs.

## Prérequis

Avant de commencer, assurez-vous que :

- [ ] Docker et Docker Compose sont installés
- [ ] Le réseau `home-labs` existe (`docker network create home-labs`)
- [ ] Le gateway est en cours d'exécution
- [ ] Vous avez accès au dashboard Cloudflare (si accès externe requis)

---

## 🚀 Méthode Rapide (Script)

La façon la plus simple de créer un nouveau service :

```bash
# Créer le service depuis le template
./scripts/create-service.sh mon-service

# Éditer la configuration
nano services/mon-service/docker-compose.yml

# Démarrer le service
cd services/mon-service
docker compose up -d
```

---

## 📋 Méthode Manuelle

### Étape 1 : Créer le répertoire

```bash
# Copier le template
cp -r services/_template services/03_mon-service

# Renommer le fichier exemple
mv services/03_mon-service/docker-compose.yml.example \
   services/03_mon-service/docker-compose.yml
```

### Étape 2 : Configurer docker-compose.yml

Éditez `services/03_mon-service/docker-compose.yml` :

```yaml
services:
  mon-service:
    image: mon-image:latest
    container_name: mon-service
    restart: unless-stopped

    # OBLIGATOIRE : Connexion au réseau home-labs
    networks:
      - home-labs

    # Recommandé : Limites de ressources
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M

    # Recommandé : Sécurité
    security_opt:
      - no-new-privileges:true

networks:
  home-labs:
    external: true
```

> **Important**: Le bloc `networks: home-labs` est **obligatoire** pour que le service soit accessible via le gateway.

### Étape 3 : Ajouter au Gateway (accès externe)

Si le service doit être accessible depuis internet :

1. **Éditez** `infrastructure/gateway/config.yml` :

```yaml
ingress:
  # ... règles existantes ...

  # Votre nouveau service
  - hostname: mon-service.yanis-harrat.com
    service: http://mon-service:80
```

2. **Redémarrez** le gateway :

```bash
cd infrastructure/gateway
docker compose restart
```

### Étape 4 : Démarrer le service

```bash
cd services/03_mon-service
docker compose up -d
```

### Étape 5 : Vérifier

```bash
# Vérifier que le conteneur tourne
docker ps | grep mon-service

# Vérifier la connexion au réseau
docker network inspect home-labs

# Voir les logs
docker compose logs -f
```

---

## 🔀 Choisir le Type de Service

L'infrastructure supporte 3 types de services :

```mermaid
flowchart TD
    START{Quel type<br/>de service ?}
    
    START -->|Image Docker existante| IMAGE[📦 Service Image-based]
    START -->|Application custom| BUILD[🔨 Service Built]
    START -->|Stack complexe| STACK[🏗️ Stack Multi-conteneurs]
    
    IMAGE --> IMAGE_EX["Exemple: Excalidraw<br/>Vaultwarden, Nginx"]
    BUILD --> BUILD_EX["Exemple: Legal Pages<br/>Next.js, React apps"]
    STACK --> STACK_EX["Exemple: Typebot<br/>App + DB + Storage"]
```

<details>
<summary><strong>📦 Service Image-based (Simple)</strong></summary>

Utilisez ce type quand une image Docker pré-construite existe.

**Structure :**
```
services/01_mon-service/
└── docker-compose.yml
```

**Exemple :**
```yaml
services:
  mon-service:
    image: mon-image:latest
    container_name: mon-service
    restart: unless-stopped
    networks:
      - home-labs

networks:
  home-labs:
    external: true
```

</details>

<details>
<summary><strong>🔨 Service Built (Application custom)</strong></summary>

Utilisez ce type pour des applications Next.js, React, ou custom.

**Structure :**
```
services/00_mon-app/
├── docker-compose.yml
├── .env
├── .env.example
└── mon-app/
    ├── Dockerfile
    ├── package.json
    ├── pnpm-lock.yaml
    └── app/
```

**docker-compose.yml :**
```yaml
services:
  mon-app:
    build:
      context: ./mon-app
      dockerfile: Dockerfile
    container_name: mon-app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - API_KEY=${API_KEY}
    networks:
      - home-labs

networks:
  home-labs:
    external: true
```

**Dockerfile (Next.js multi-stage) :**
```dockerfile
FROM node:22-alpine AS base
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

**Commandes :**
```bash
# Build initial
docker compose build

# Démarrer
docker compose up -d

# Rebuild après modifications
docker compose up -d --build
```

</details>

<details>
<summary><strong>🏗️ Stack Multi-conteneurs (Complexe)</strong></summary>

Utilisez ce type pour des applications nécessitant plusieurs composants.

**Structure :**
```
services/02_mon-stack/
├── docker-compose.yml
├── .env
└── .env.example
```

**docker-compose.yml :**
```yaml
name: mon-stack

services:
  mon-app:
    image: mon-image-app:latest
    container_name: mon-app
    depends_on:
      mon-db:
        condition: service_healthy
    environment:
      - DATABASE_URL=postgresql://user:pass@mon-db:5432/db
    networks:
      - home-labs

  mon-db:
    image: postgres:16-alpine
    container_name: mon-db
    volumes:
      - mon-db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d db"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - home-labs

volumes:
  mon-db-data:
    name: mon-db-data

networks:
  home-labs:
    external: true
```

</details>

---

## ⚙️ Configuration Recommandée

### Limites de Ressources

| Type de service | Mémoire | CPU | Usage |
|-----------------|---------|-----|-------|
| Léger | 256M | 0.25 | Nginx, proxies, services statiques |
| Moyen | 512M | 0.50 | Apps Node.js, Python, APIs |
| Lourd | 1G | 1.0 | Builders, apps volumineuses |
| Base de données | 512M-1G | 0.50-1.0 | PostgreSQL, MySQL, Redis |

```yaml
deploy:
  resources:
    limits:
      cpus: '0.50'
      memory: 512M
```

### Sécurité

```yaml
security_opt:
  - no-new-privileges:true

cap_drop:
  - ALL
```

### Health Checks

```yaml
healthcheck:
  test: ["CMD-SHELL", "wget -q --spider http://localhost:80 || exit 1"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Logging

```yaml
logging:
  driver: json-file
  options:
    max-size: "10m"
    max-file: "3"
```

---

## 📝 Exemple Complet : Vaultwarden

Un exemple de service complet avec toutes les bonnes pratiques :

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped

    volumes:
      - vaultwarden-data:/data

    environment:
      - DOMAIN=https://vault.yanis-harrat.com
      - SIGNUPS_ALLOWED=false
      - ADMIN_TOKEN=${ADMIN_TOKEN}

    networks:
      - home-labs

    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 256M

    security_opt:
      - no-new-privileges:true

    cap_drop:
      - ALL

    healthcheck:
      test: ["CMD-SHELL", "wget -q --spider http://localhost:80 || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3

    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  vaultwarden-data:
    name: vaultwarden-data

networks:
  home-labs:
    external: true
```

**Configuration gateway** (`infrastructure/gateway/config.yml`) :
```yaml
- hostname: vault.yanis-harrat.com
  service: http://vaultwarden:80
```

---

## ✅ Checklist

Avant de considérer le service comme prêt :

- [ ] Template copié et renommé
- [ ] `docker-compose.yml` configuré
- [ ] `networks: home-labs` ajouté
- [ ] Limites de ressources définies
- [ ] Options de sécurité configurées
- [ ] Règle d'ingress ajoutée (si accès externe)
- [ ] Gateway redémarré
- [ ] Service démarré et fonctionnel
- [ ] Logs vérifiés sans erreurs

---

## 🔗 Documentation Liée

- [Architecture](architecture.md) — Vue d'ensemble technique
- [Gateway](infrastructure/gateway.md) — Configuration du tunnel
- [Troubleshooting](guides/troubleshooting.md) — Résolution de problèmes
- [Scripts](scripts/README.md) — Utilitaires disponibles

---

<div align="center">

**[⬅️ Retour à l'index](README.md)**

</div>
