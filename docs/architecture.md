# Architecture

## Vue d'ensemble

L'infrastructure Home Labs repose sur Docker Compose avec une architecture réseau partagée.

## Composants

### Infrastructure (`infrastructure/`)

#### Gateway
- **Rôle** : Expose les services internes à internet via Cloudflare Tunnel
- **Technologie** : cloudflared
- **Configuration** :
  - `config.yml` : Règles d'ingress (mapping hostname → service)
  - `.env` : Token de tunnel Cloudflare (sensible, non versionné)

#### Network
- **Réseau Docker** : `home-labs` (external)
- **Type** : Bridge network
- **Usage** : Communication inter-conteneurs par nom

### Services (`services/`)

Chaque service est un répertoire avec :
- `docker-compose.yml` : Définition du service
- Configuration spécifique au service (volumes, .env si nécessaire)

**Requis** : Tous les services doivent se connecter au réseau `home-labs`

## Flux de Trafic

```
Internet
    ↓
Cloudflare Tunnel (infrastructure/gateway)
    ↓
Réseau Docker home-labs
    ↓
Services (services/*)
```

## Sécurité

1. **Isolation réseau** : Réseau Docker dédié
2. **Pas d'exposition directe** : Aucun port exposé publiquement (sauf via tunnel)
3. **Tunnel chiffré** : Cloudflare Tunnel utilise TLS
4. **Limites de ressources** : CPU et RAM limitées par conteneur
5. **Sécurité renforcée** : `no-new-privileges`, capabilities réduites

## Scalabilité

- Ajout de services : Copier template → Configurer → Ajouter à gateway
- Séparation claire infrastructure/services
- Pas de limite théorique au nombre de services
