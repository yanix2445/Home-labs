# Gateway

> Cloudflare Tunnel pour exposer les services à internet.

📚 **Documentation complète** → [docs/infrastructure/gateway.md](../../docs/infrastructure/gateway.md)

## Démarrage Rapide

```bash
cp .env.example .env
# Éditer .env avec CF_TUNNEL_TOKEN
docker compose up -d
```

## Fichiers

| Fichier | Description |
|---------|-------------|
| `docker-compose.yml` | Service cloudflared |
| `config.yml` | Règles de routage |
| `.env` | Token (non versionné) |
