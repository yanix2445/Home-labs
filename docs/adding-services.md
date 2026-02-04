# Ajouter un Nouveau Service

## Étape 1 : Créer le service depuis le template

```bash
# Copier le template
cp -r services/_template services/mon-service

# Renommer le fichier exemple
mv services/mon-service/docker-compose.yml.example services/mon-service/docker-compose.yml
```

## Étape 2 : Configurer docker-compose.yml

Éditez `services/mon-service/docker-compose.yml` :

```yaml
services:
  mon-service:
    image: mon-image:latest
    container_name: mon-service
    restart: unless-stopped

    # OBLIGATOIRE : Connexion au réseau home-labs
    networks:
      - home-labs

networks:
  home-labs:
    external: true
```

### Points importants :

- ✅ **container_name** : Utilisé pour le routage interne
- ✅ **networks: home-labs** : OBLIGATOIRE pour la communication
- ✅ **external: true** : Le réseau existe déjà
- ⚠️ **ports** : Optionnel si accès uniquement via gateway

## Étape 3 : Ajouter au Gateway (si accès externe)

Si le service doit être accessible depuis internet :

1. Éditez `infrastructure/gateway/config.yml`

2. Ajoutez une règle d'ingress :

```yaml
ingress:
  # ... règles existantes ...

  # Votre nouveau service
  - hostname: mon-service.yanis-harrat.com
    service: http://mon-service:80
```

**Format** : `http://<container_name>:<port_interne>`

3. Redémarrez le gateway :

```bash
cd infrastructure/gateway
docker compose restart
```

## Étape 4 : Démarrer le service

```bash
cd services/mon-service
docker compose up -d
```

## Étape 5 : Vérifier

```bash
# Vérifier que le conteneur tourne
docker ps | grep mon-service

# Vérifier qu'il est sur le réseau home-labs
docker network inspect home-labs

# Voir les logs
docker compose logs -f
```

## Exemple Complet

### Service Vaultwarden (Gestionnaire de mots de passe)

**services/vaultwarden/docker-compose.yml** :
```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped

    volumes:
      - ./data:/data

    environment:
      - DOMAIN=https://vault.yanis-harrat.com
      - SIGNUPS_ALLOWED=false

    networks:
      - home-labs

    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 256M

    security_opt:
      - no-new-privileges:true

networks:
  home-labs:
    external: true
```

**infrastructure/gateway/config.yml** (ajouter) :
```yaml
  - hostname: vault.yanis-harrat.com
    service: http://vaultwarden:80
```

## Checklist

- [ ] Template copié et renommé
- [ ] `docker-compose.yml` configuré
- [ ] `networks: home-labs` ajouté
- [ ] Règle d'ingress ajoutée (si accès externe)
- [ ] Gateway redémarré
- [ ] Service démarré
- [ ] Service accessible et fonctionnel
