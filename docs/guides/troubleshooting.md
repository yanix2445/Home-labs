# 🔧 Troubleshooting

> Solutions aux problèmes courants dans Home Labs.

## Diagnostic Rapide

```bash
# Vérifier les conteneurs
docker ps --filter "network=home-labs"

# Vérifier le réseau
docker network inspect home-labs

# Logs du gateway
docker logs home-labs-cloudflared --tail 50
```

---

## 🌐 Problèmes Réseau

<details>
<summary><strong>❌ "network home-labs not found"</strong></summary>

Le réseau Docker n'existe pas.

**Solution :**
```bash
docker network create home-labs
```

</details>

<details>
<summary><strong>❌ Service inaccessible via URL publique</strong></summary>

**Vérifications :**

1. Le service est-il démarré ?
```bash
docker ps | grep <service>
```

2. Le service est-il sur le réseau ?
```bash
docker network inspect home-labs | grep <service>
```

3. La règle d'ingress existe-t-elle ?
```bash
cat infrastructure/gateway/config.yml | grep <hostname>
```

4. Le gateway a-t-il été redémarré ?
```bash
cd infrastructure/gateway && docker compose restart
```

</details>

<details>
<summary><strong>❌ Erreur 502 Bad Gateway</strong></summary>

Le service cible ne répond pas.

**Solutions :**
1. Vérifier que le service est démarré
2. Vérifier le port dans `config.yml`
3. Vérifier le nom du conteneur

```bash
# Voir tous les noms de conteneurs
docker ps --format "{{.Names}}"
```

</details>

<details>
<summary><strong>❌ ECONNREFUSED entre services</strong></summary>

**Causes :**
- Service non démarré
- Port incorrect
- Protocole manquant (`http://`)

**Solution :**
```bash
# Tester la connectivité
docker exec <source> ping <destination>
docker exec <source> wget -qO- http://<destination>:<port>/
```

</details>

---

## 🐳 Problèmes Docker

<details>
<summary><strong>❌ Conteneur en restart loop</strong></summary>

**Diagnostic :**
```bash
docker compose logs -f <service>
```

**Causes courantes :**
- Variables d'environnement manquantes
- Port déjà utilisé
- Dépendance non disponible

</details>

<details>
<summary><strong>❌ Changements de .env non appliqués</strong></summary>

`docker compose restart` ne recharge pas les `.env`.

**Solution :**
```bash
docker compose up -d --force-recreate
```

</details>

<details>
<summary><strong>❌ Espace disque insuffisant</strong></summary>

**Nettoyage :**
```bash
# Images non utilisées
docker image prune -a

# Volumes orphelins
docker volume prune

# Nettoyage complet
docker system prune -a
```

</details>

---

## 🔨 Problèmes de Build

<details>
<summary><strong>❌ Build échoue</strong></summary>

**Solutions :**
```bash
# Rebuild sans cache
docker compose build --no-cache

# Pull images de base à jour
docker compose build --no-cache --pull
```

</details>

<details>
<summary><strong>❌ Dépendances npm/pnpm incorrectes</strong></summary>

**Solution :**
```bash
cd <app-directory>
rm -rf node_modules pnpm-lock.yaml
pnpm install
cd ..
docker compose build --no-cache
```

</details>

---

## 🔒 Problèmes Gateway

<details>
<summary><strong>❌ Tunnel ne démarre pas</strong></summary>

**Vérifications :**
1. Token valide dans `.env` ?
2. Format correct du token ?

**Logs :**
```bash
docker compose logs -f cloudflared
```

</details>

<details>
<summary><strong>❌ Connexion tunnel perdue</strong></summary>

**Solution :**
```bash
cd infrastructure/gateway
docker compose restart
```

</details>

---

## 📦 Problèmes par Service

### Typebot

<details>
<summary><strong>❌ Erreur d'authentification OAuth</strong></summary>

- Vérifier que `NEXTAUTH_URL` correspond à l'URL du builder
- Vérifier les URLs de callback dans la config OAuth
- Vérifier les secrets client

</details>

<details>
<summary><strong>❌ Upload de fichiers échoue</strong></summary>

**Vérifier MinIO :**
```bash
docker compose logs typebot-minio
docker compose logs typebot-createbuckets
```

</details>

### Legal Pages

<details>
<summary><strong>❌ Emails non envoyés</strong></summary>

- Vérifier `RESEND_API_KEY`
- Vérifier que le domaine est vérifié dans Resend
- Vérifier `FROM_EMAIL` utilise le domaine vérifié

</details>

---

## 🆘 Derniers Recours

### Tout Réinitialiser (Attention !)

```bash
# Arrêter tous les services
./scripts/stop-all.sh

# Supprimer tous les conteneurs
docker compose down --remove-orphans

# Nettoyer (ATTENTION: supprime les données non sauvegardées)
docker system prune -a --volumes
```

### Recréer le Réseau

```bash
docker network rm home-labs
docker network create home-labs
```

---

<div align="center">

**[⬅️ Retour à l'index](../README.md)**

</div>
