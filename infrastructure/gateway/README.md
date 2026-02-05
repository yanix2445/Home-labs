# 🔒 Cloudflare Tunnel Gateway

> Gateway sécurisée pour exposer les services Home Labs à internet.

## Vue d'Ensemble

| Propriété | Valeur |
|-----------|--------|
| **Image** | `cloudflare/cloudflared:latest` |
| **Container** | `home-labs-cloudflared` |
| **Réseau** | `home-labs` |

## 🚀 Installation

```bash
# Configurer
cp .env.example .env
# Éditer .env avec votre CF_TUNNEL_TOKEN

# Démarrer
docker compose up -d
```

## ⚙️ Configuration

### Variables d'Environnement

| Variable | Description |
|----------|-------------|
| `CF_TUNNEL_TOKEN` | Token d'authentification Cloudflare Tunnel |

### Fichiers

| Fichier | Description |
|---------|-------------|
| `docker-compose.yml` | Définition du service |
| `config.yml` | Règles de routage ingress |
| `.env` | Token (secret, non versionné) |

## 🔀 Routage (config.yml)

```yaml
ingress:
  - hostname: excalidraw.yanis-harrat.com
    service: http://excalidraw:80

  - hostname: typebot.yanis-harrat.com
    service: http://typebot-builder:3000

  - hostname: bot.yanis-harrat.com
    service: http://typebot-viewer:3000

  - hostname: legal.yanis-harrat.com
    service: http://legal-pages:3000

  # Route par défaut
  - service: http_status:404
```

### Ajouter un Service

1. Éditer `config.yml` :
```yaml
- hostname: mon-service.yanis-harrat.com
  service: http://mon-service:80
```

2. Redémarrer :
```bash
docker compose restart
```

## 🔧 Commandes

```bash
# Démarrer
docker compose up -d

# Voir les logs
docker compose logs -f

# Status
docker compose ps

# Redémarrer
docker compose restart
```

## 🛡️ Sécurité

| Mesure | Configuration |
|--------|---------------|
| **no-new-privileges** | ✅ Activé |
| **cap_drop** | ALL |
| **read_only** | ✅ Filesystem immutable |
| **Limites** | 256M RAM, 0.5 CPU |

## 🔍 Troubleshooting

<details>
<summary><strong>❌ Tunnel ne démarre pas</strong></summary>

Vérifier le token dans `.env` et les logs :
```bash
docker compose logs -f
```

</details>

<details>
<summary><strong>❌ Service inaccessible</strong></summary>

1. Vérifier que le service est sur le réseau `home-labs`
2. Vérifier la règle dans `config.yml`
3. Redémarrer le gateway

</details>

## 📚 Documentation

➡️ [Documentation complète du Gateway](../../docs/infrastructure/gateway.md)
