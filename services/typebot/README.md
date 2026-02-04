# Typebot - Constructeur de Chatbots No-Code

Typebot est une plateforme open-source de création de chatbots conversationnels avec une interface visuelle drag-and-drop.

## Architecture

Ce service déploie une stack complète Typebot comprenant :

- **typebot-builder** : Interface de construction des chatbots (https://typebot.yanis-harrat.com)
- **typebot-viewer** : Moteur d'exécution et affichage des bots (https://bot.yanis-harrat.com)
- **typebot-db** : Base de données PostgreSQL 16
- **typebot-minio** : Stockage S3-compatible pour les fichiers uploadés
- **typebot-createbuckets** : Conteneur d'initialisation du bucket S3 (s'arrête après exécution)

## Configuration

### 1. Créer le fichier .env

```bash
cp .env.example .env
```

### 2. Générer les secrets de sécurité

```bash
# Générer ENCRYPTION_SECRET (requis)
openssl rand -base64 24

# Générer NEXTAUTH_SECRET (requis)
openssl rand -base64 24
```

Copiez ces valeurs dans votre fichier `.env`.

### 3. Configurer l'authentification

Typebot nécessite **au moins une méthode d'authentification OAuth**. Voici les étapes pour chaque provider :

#### GitHub OAuth (Recommandé)

1. Allez sur https://github.com/settings/developers
2. Cliquez sur "New OAuth App"
3. Configurez :
   - **Application name** : Typebot
   - **Homepage URL** : https://typebot.yanis-harrat.com
   - **Authorization callback URL** : https://typebot.yanis-harrat.com/api/auth/callback/github
4. Copiez le Client ID et générez un Client Secret
5. Ajoutez-les dans `.env` :
   ```
   GITHUB_CLIENT_ID=votre_client_id
   GITHUB_CLIENT_SECRET=votre_client_secret
   ```

#### Google OAuth

1. Allez sur https://console.cloud.google.com/apis/credentials
2. Créez un nouveau projet ou sélectionnez-en un
3. Créez des identifiants OAuth 2.0
4. Ajoutez l'URI de redirection : https://typebot.yanis-harrat.com/api/auth/callback/google
5. Copiez les identifiants dans `.env`

#### GitLab OAuth

1. Allez sur https://gitlab.com/-/profile/applications
2. Créez une nouvelle application avec les scopes `read_user` et `openid`
3. Redirect URI : https://typebot.yanis-harrat.com/api/auth/callback/gitlab
4. Copiez les identifiants dans `.env`

### 4. Configurer les URLs

Vérifiez que les URLs dans `.env` correspondent à vos sous-domaines :

```bash
NEXTAUTH_URL=https://typebot.yanis-harrat.com
NEXT_PUBLIC_VIEWER_URL=https://bot.yanis-harrat.com
```

### 5. (Optionnel) Configurer SMTP

Pour l'envoi d'emails (réinitialisation de mot de passe, notifications) :

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=votre@email.com
SMTP_PASSWORD=votre_mot_de_passe
SMTP_SECURE=false
SMTP_FROM=noreply@yanis-harrat.com
```

## Démarrage

### Méthode 1 : Avec le script global

```bash
# Depuis la racine du projet
./scripts/start-all.sh
```

### Méthode 2 : Démarrage manuel

```bash
# Démarrer Typebot
cd services/typebot
docker compose up -d

# Vérifier les logs
docker compose logs -f

# Vérifier que tous les conteneurs sont en cours d'exécution
docker compose ps
```

### Vérifier le déploiement

```bash
# Vérifier les conteneurs
docker compose ps

# Suivre les logs
docker compose logs -f typebot-builder typebot-viewer

# Vérifier la base de données
docker exec -it typebot-db psql -U typebot -d typebot -c "\dt"

# Vérifier MinIO
docker compose logs typebot-minio
```

## Accès

Une fois démarré, accédez à :

- **Builder (Construction)** : https://typebot.yanis-harrat.com
- **Viewer (Exécution)** : https://bot.yanis-harrat.com

Lors de la première connexion, vous devrez vous authentifier avec le provider OAuth configuré.

## Mise à jour

```bash
# Télécharger les nouvelles images
docker compose pull

# Redémarrer avec les nouvelles versions
docker compose up -d
```

## Dépannage

### Les conteneurs ne démarrent pas

```bash
# Vérifier les logs d'erreur
docker compose logs

# Vérifier que le réseau existe
docker network inspect home-labs

# Recréer les conteneurs
docker compose down
docker compose up -d
```

### Erreur d'authentification

- Vérifiez que les URLs de callback OAuth correspondent exactement
- Vérifiez que `NEXTAUTH_URL` et `NEXT_PUBLIC_VIEWER_URL` sont correctement configurés
- Vérifiez que les secrets OAuth sont valides

### Problèmes de stockage S3

```bash
# Vérifier les logs de MinIO
docker compose logs typebot-minio

# Vérifier l'initialisation du bucket
docker compose logs typebot-createbuckets

# Recréer le bucket manuellement si nécessaire
docker compose restart typebot-createbuckets
```

### Base de données corrompue

```bash
# Sauvegarder d'abord
docker exec typebot-db pg_dump -U typebot typebot > backup.sql

# Arrêter et supprimer les données
docker compose down
rm -rf data/db

# Redémarrer (crée une nouvelle DB)
docker compose up -d
```

## Données et volumes

Les données persistantes sont stockées dans :

- `./data/db/` : Base de données PostgreSQL
- `./data/s3/` : Fichiers uploadés (MinIO)

## Sécurité

- Tous les conteneurs utilisent `no-new-privileges:true`
- Limites de ressources appliquées (CPU et RAM)
- Pas d'exposition de ports publics (accès via Cloudflare Tunnel uniquement)
- Secrets stockés dans `.env` (non versionné)

## Ressources

- [Documentation officielle Typebot](https://docs.typebot.io/)
- [GitHub Typebot](https://github.com/baptisteArno/typebot.io)
- [Communauté Discord](https://typebot.io/discord)
