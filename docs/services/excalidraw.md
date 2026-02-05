# 📝 Excalidraw

> Tableau blanc collaboratif open-source pour le dessin et la création de diagrammes.

## Vue d'Ensemble

| Propriété | Valeur |
|-----------|--------|
| **URL** | [excalidraw.yanis-harrat.com](https://excalidraw.yanis-harrat.com) |
| **Type** | Image-based |
| **Image** | `excalidraw/excalidraw:latest` |
| **Emplacement** | `services/01_excalidraw/` |

---

## 🎨 Fonctionnalités

- ✏️ Dessin à main levée
- 📐 Formes géométriques
- 📝 Texte et annotations
- 🔗 Liaisons entre éléments
- 🎨 Styles et couleurs personnalisables
- 📤 Export PNG, SVG, JSON
- 🔄 Collaboration en temps réel (avec serveur)

---

## 📂 Structure

```
services/01_excalidraw/
└── docker-compose.yml
```

Ce service utilise l'image officielle Docker sans personnalisation.

---

## 🚀 Déploiement

```bash
cd services/01_excalidraw
docker compose up -d
```

C'est tout ! Le service est accessible via le gateway.

---

## 🐳 docker-compose.yml

```yaml
services:
  excalidraw:
    image: excalidraw/excalidraw:latest
    container_name: excalidraw
    restart: unless-stopped
    
    networks:
      - home-labs

networks:
  home-labs:
    external: true
```

---

## ⚙️ Configuration Gateway

Dans `infrastructure/gateway/config.yml` :

```yaml
ingress:
  - hostname: excalidraw.yanis-harrat.com
    service: http://excalidraw:80
```

---

## 🔧 Commandes

```bash
# Démarrer
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter
docker compose down

# Mettre à jour l'image
docker compose pull
docker compose up -d
```

---

## 📊 Ressources

Le service Excalidraw est léger et ne nécessite pas de configuration de ressources particulière.

| Ressource | Valeur typique |
|-----------|----------------|
| Mémoire | ~50-100 MB |
| CPU | < 0.1 |

---

## 🔗 Liens

- [Site officiel](https://excalidraw.com)
- [GitHub](https://github.com/excalidraw/excalidraw)
- [Docker Hub](https://hub.docker.com/r/excalidraw/excalidraw)

---

<div align="center">

**[⬅️ Retour aux Services](README.md)** · **[🏠 Index](../README.md)**

</div>
