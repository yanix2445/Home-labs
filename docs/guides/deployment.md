# 📦 Déploiement Production

> Guide complet pour déployer Home Labs en production.

## Checklist Pré-Déploiement

- [ ] Serveur avec Docker et Docker Compose
- [ ] Domaine configuré avec Cloudflare
- [ ] Tunnel Cloudflare créé
- [ ] Secrets générés

---

## 1. Préparation du Serveur

### Installer Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Reloguer pour appliquer les permissions
```

### Configurer les Limites Système

```bash
# /etc/sysctl.conf
vm.max_map_count=262144
net.core.somaxconn=65535
```

---

## 2. Configuration Cloudflare

### Créer un Tunnel

1. Accédez au [Dashboard Zero Trust](https://one.dash.cloudflare.com/)
2. **Networks** → **Tunnels** → **Create a tunnel**
3. Donnez un nom (ex: `home-labs`)
4. Copiez le token généré

### Configurer les DNS

Pour chaque service, créez un enregistrement CNAME :

| Sous-domaine | Cible | Proxy |
|--------------|-------|-------|
| `excalidraw` | `<tunnel-id>.cfargotunnel.com` | ✅ |
| `typebot` | `<tunnel-id>.cfargotunnel.com` | ✅ |
| `bot` | `<tunnel-id>.cfargotunnel.com` | ✅ |
| `legal` | `<tunnel-id>.cfargotunnel.com` | ✅ |

---

## 3. Déploiement

### Cloner et Configurer

```bash
git clone https://github.com/yanix2445/Home-labs.git
cd Home-labs
```

### Créer le Réseau

```bash
docker network create home-labs
```

### Configurer le Gateway

```bash
cd infrastructure/gateway
cp .env.example .env
# Éditer .env avec votre CF_TUNNEL_TOKEN
```

### Configurer les Services

Pour chaque service nécessitant une configuration :

```bash
# Legal Pages
cd services/00_legal-pages
cp legal-app/.env.example .env
# Éditer .env

# Typebot
cd ../02_typebot
cp .env.example .env
# Éditer .env
```

### Démarrer

```bash
cd ../..
./scripts/start-all.sh
```

---

## 4. Vérification

```bash
# Status des conteneurs
docker ps --filter "network=home-labs" --format "table {{.Names}}\t{{.Status}}"

# Logs du gateway
docker logs home-labs-cloudflared -f

# Tester les URLs
curl -I https://excalidraw.yanis-harrat.com
```

---

## 5. Maintenance

### Mises à Jour

```bash
# Mettre à jour les images
cd services/<service>
docker compose pull
docker compose up -d
```

### Sauvegardes

```bash
# Sauvegarder Typebot
docker exec typebot-db pg_dump -U typebot typebot > backup-$(date +%Y%m%d).sql
```

### Monitoring

```bash
# Voir l'utilisation des ressources
docker stats

# Voir les logs de tous les services
./scripts/start-all.sh && docker compose logs -f
```

---

## Sécurité Production

### Checklist

- [ ] Tous les `.env` sont configurés et exclus de git
- [ ] Secrets générés avec `openssl rand -base64 24`
- [ ] Limites de ressources définies dans docker-compose
- [ ] `no-new-privileges` activé sur tous les conteneurs
- [ ] Cloudflare WAF configuré

---

<div align="center">

**[⬅️ Retour à l'index](../README.md)**

</div>
