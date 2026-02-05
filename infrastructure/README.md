# 🌐 Infrastructure

> Composants d'infrastructure de base pour Home Labs.

## Composants

| Composant | Description | Documentation |
|-----------|-------------|---------------|
| 🔒 [Gateway](gateway/) | Cloudflare Tunnel | [README](gateway/README.md) |

## Architecture

```mermaid
graph LR
    INTERNET[🌐 Internet] --> CF[☁️ Cloudflare]
    CF --> GW[🔒 Gateway]
    GW --> NET[Réseau home-labs]
    NET --> SERVICES[📦 Services]
```

## Démarrage

```bash
# Créer le réseau
docker network create home-labs

# Démarrer le gateway
cd gateway
cp .env.example .env
# Éditer .env
docker compose up -d
```

## 📚 Documentation

➡️ [Documentation Infrastructure](../docs/infrastructure/README.md)
