# 📁 Service Template

> Template de base pour créer un nouveau service.

## Utilisation

```bash
# Méthode rapide
./scripts/create-service.sh mon-service

# Méthode manuelle
cp -r services/_template services/mon-service
mv services/mon-service/docker-compose.yml.example \
   services/mon-service/docker-compose.yml
```

## Configuration

Éditez `docker-compose.yml` :

```yaml
services:
  mon-service:
    image: mon-image:latest
    container_name: mon-service
    restart: unless-stopped
    networks:
      - home-labs

networks:
  home-labs:
    external: true
```

## Checklist

- [ ] `docker-compose.yml` configuré
- [ ] `networks: home-labs` ajouté
- [ ] Gateway configuré (si accès externe)
- [ ] Service démarré

## 📚 Documentation

➡️ [Guide complet](../../docs/adding-services.md)
