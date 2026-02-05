# Infrastructure

> Composants d'infrastructure pour Home Labs.

📚 **Documentation complète** → [docs/infrastructure/](../docs/infrastructure/)

## Composants

| Composant | Description |
|-----------|-------------|
| [gateway/](gateway/) | Cloudflare Tunnel |

## Démarrage Rapide

```bash
docker network create home-labs
cd gateway && docker compose up -d
```
