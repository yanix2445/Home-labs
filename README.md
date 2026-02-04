# 🏠 Home Labs

Infrastructure home lab auto-hébergée avec Docker Compose et Cloudflare Tunnel.

## 📋 Architecture

```
home-labs/
├── infrastructure/     # Infrastructure de base (gateway, réseau)
├── services/          # Services applicatifs auto-hébergés
├── docs/             # Documentation détaillée
└── scripts/          # Scripts utilitaires
```

### Réseau Docker

Tous les services se connectent à un réseau Docker externe nommé `home-labs`. Créez-le avec :

```bash
docker network create home-labs
```

### Gateway Cloudflare Tunnel

Le répertoire `infrastructure/gateway/` contient le Cloudflare Tunnel qui expose les services à internet de manière sécurisée.

## 🚀 Démarrage Rapide

### 1. Créer le réseau Docker

```bash
docker network create home-labs
```

### 2. Configurer le Gateway

```bash
cd infrastructure/gateway
cp .env.example .env
# Éditez .env et ajoutez votre CF_TUNNEL_TOKEN
docker compose up -d
```

### 3. Démarrer un service

```bash
cd services/excalidraw
docker compose up -d
```

## 📚 Services Disponibles

| Service | Description | Port | URL Publique |
|---------|-------------|------|--------------|
| Excalidraw | Tableau blanc collaboratif | 80 | [excalidraw.yanis-harrat.com](https://excalidraw.yanis-harrat.com) |

## ➕ Ajouter un Nouveau Service

1. Copiez le template :
   ```bash
   cp -r services/_template services/mon-service
   mv services/mon-service/docker-compose.yml.example services/mon-service/docker-compose.yml
   ```

2. Éditez `docker-compose.yml` avec votre configuration

3. Ajoutez une règle d'ingress dans `infrastructure/gateway/config.yml` :
   ```yaml
   - hostname: mon-service.yanis-harrat.com
     service: http://mon-service:80
   ```

4. Redémarrez le gateway :
   ```bash
   cd infrastructure/gateway
   docker compose restart
   ```

5. Démarrez votre service :
   ```bash
   cd services/mon-service
   docker compose up -d
   ```

## 🛠️ Commandes Utiles

```bash
# Voir les logs d'un service
cd services/excalidraw
docker compose logs -f

# Arrêter un service
docker compose down

# Redémarrer un service
docker compose restart

# Voir tous les conteneurs du réseau home-labs
docker network inspect home-labs
```

## 📖 Documentation

- [Architecture détaillée](docs/architecture.md)
- [Ajouter un service](docs/adding-services.md)
- [Instructions pour Claude](CLAUDE.md)

## 🔒 Sécurité

- Les fichiers `.env` ne sont jamais committés (vérifiez `.gitignore`)
- Les conteneurs ont des limites de ressources
- Paramètres de sécurité renforcés (no-new-privileges)
- Accès externe uniquement via Cloudflare Tunnel

## 🔗 Liens

- **Site Web** : [yanis-harrat.com](https://yanis-harrat.com)
- **Dépôt GitHub** : [Home-labs](https://github.com/yanix2445/Home-labs)

## 📝 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour les détails.

### ⚠️ Disclaimer

**Ce projet est fourni "TEL QUEL", sans aucune garantie.**

L'auteur n'est **PAS responsable** de :
- Tout dommage, perte ou problème résultant de l'utilisation
- Vulnérabilités de sécurité ou violations de données
- Interruptions ou défaillances de service
- Toute utilisation abusive ou malveillante
- Tout problème de conformité légale ou réglementaire

**En utilisant ce projet, vous assumez TOUS les risques et responsabilités.**

Utilisez-le pour apprendre, analyser le code, ou comme base pour vos propres projets.
