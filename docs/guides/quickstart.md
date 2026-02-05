# 🚀 Quickstart

> Démarrez avec Home Labs en moins de 5 minutes.

## Prérequis

- [ ] Docker installé ([Get Docker](https://docs.docker.com/get-docker/))
- [ ] Docker Compose installé
- [ ] Token de tunnel Cloudflare ([Zero Trust Dashboard](https://one.dash.cloudflare.com/))

---

## Installation en 4 Étapes

### 1. Cloner le Dépôt

```bash
git clone https://github.com/yanix2445/Home-labs.git
cd Home-labs
```

### 2. Créer le Réseau Docker

```bash
docker network create home-labs
```

### 3. Configurer le Gateway

```bash
cd infrastructure/gateway
cp .env.example .env
```

Éditez `.env` et ajoutez votre token :

```env
CF_TUNNEL_TOKEN=eyJhIjoixxxxxxxxxxxxxxxx...
```

### 4. Démarrer

```bash
# Retour à la racine
cd ../..

# Démarrer tous les services
./scripts/start-all.sh
```

---

## Vérification

```bash
# Voir les conteneurs en cours
docker ps --filter "network=home-labs"

# Tester les URLs
curl -I https://excalidraw.yanis-harrat.com
```

---

## Prochaines Étapes

- 📖 [Architecture](../architecture.md) — Comprendre la structure
- ➕ [Ajouter un service](../adding-services.md) — Créer un nouveau service
- 🔧 [Troubleshooting](troubleshooting.md) — Résoudre les problèmes

---

<div align="center">

**[⬅️ Retour à l'index](../README.md)**

</div>
