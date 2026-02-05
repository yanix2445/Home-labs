# 🔗 Réseau Docker

> Configuration et gestion du réseau Docker partagé `home-labs`.

## Vue d'Ensemble

Tous les services Home Labs communiquent via un réseau Docker bridge externe nommé `home-labs`.

```mermaid
graph LR
    subgraph "Réseau Docker: home-labs"
        GW[🔒 Gateway]
        S1[📝 Excalidraw]
        S2[⚖️ Legal Pages]
        S3[🤖 Typebot Builder]
        S4[👁️ Typebot Viewer]
        DB[(🗄️ PostgreSQL)]
        S3 --> DB
        S4 --> DB
    end
    
    INTERNET[🌐 Internet] --> GW
    GW --> S1
    GW --> S2
    GW --> S3
    GW --> S4
```

---

## Création du Réseau

Le réseau doit être créé **une seule fois** avant le premier démarrage :

```bash
docker network create home-labs
```

> **Note**: Cette commande n'est nécessaire qu'une fois. Le script `start-all.sh` vérifie et crée le réseau automatiquement.

---

## Configuration des Services

Chaque service doit inclure le réseau dans son `docker-compose.yml` :

```yaml
services:
  mon-service:
    # ... configuration ...
    networks:
      - home-labs

networks:
  home-labs:
    external: true  # Important : réseau existant
```

| Propriété | Valeur | Description |
|-----------|--------|-------------|
| `networks` | `home-labs` | Nom du réseau partagé |
| `external` | `true` | Indique que le réseau existe déjà |

---

## Service Discovery

Les conteneurs peuvent se contacter par leur nom :

```mermaid
graph LR
    A[typebot-builder] -->|"http://typebot-db:5432"| B[(typebot-db)]
    A -->|"http://typebot-minio:9000"| C[typebot-minio]
```

### Exemples

| Source | Destination | URL |
|--------|-------------|-----|
| Typebot Builder | PostgreSQL | `postgresql://user:pass@typebot-db:5432/db` |
| Typebot Builder | MinIO | `http://typebot-minio:9000` |
| Gateway | Excalidraw | `http://excalidraw:80` |
| Gateway | Legal Pages | `http://legal-pages:3000` |

> **Important**: Utilisez toujours le `container_name` comme hostname, pas le nom du service Docker Compose.

---

## Commandes Utiles

### Inspecter le Réseau

```bash
# Voir tous les conteneurs connectés
docker network inspect home-labs

# Format simplifié
docker network inspect home-labs --format '{{range .Containers}}{{.Name}} {{end}}'
```

### Vérifier la Connectivité

```bash
# Depuis un conteneur, ping un autre
docker exec <source> ping <destination>

# Exemple
docker exec excalidraw ping typebot-builder
```

### Diagnostiquer

```bash
# Lister tous les réseaux
docker network ls

# Voir les détails du réseau
docker network inspect home-labs
```

---

## Troubleshooting

<details>
<summary><strong>❌ "network home-labs not found"</strong></summary>

Le réseau n'existe pas. Créez-le :

```bash
docker network create home-labs
```

</details>

<details>
<summary><strong>❌ Service inaccessible par nom</strong></summary>

**Vérifications :**

1. Les deux services sont-ils sur le même réseau ?
```bash
docker network inspect home-labs | grep -A2 "<service>"
```

2. Utilisez-vous le bon nom de conteneur ?
```bash
docker ps --format "{{.Names}}"
```

3. Le service cible est-il démarré ?
```bash
docker ps | grep <service>
```

</details>

<details>
<summary><strong>❌ ECONNREFUSED entre services</strong></summary>

**Causes possibles :**

1. **Service non démarré** : Vérifiez avec `docker compose ps`
2. **Port incorrect** : Vérifiez le port interne du service
3. **Protocole manquant** : Utilisez `http://` ou `https://`

**Solution :**
```bash
# Vérifier que le service écoute
docker exec <service> netstat -tlnp
```

</details>

---

## Architecture Réseau

```mermaid
flowchart TB
    subgraph "Hôte Docker"
        subgraph "Réseau: home-labs (bridge)"
            direction LR
            GW[Gateway<br/>172.18.0.2]
            S1[Service 1<br/>172.18.0.3]
            S2[Service 2<br/>172.18.0.4]
            S3[Service N<br/>172.18.0.X]
        end
    end
    
    INTERNET[Internet] --> GW
    GW <--> S1
    GW <--> S2
    GW <--> S3
    S1 <--> S2
```

Les conteneurs reçoivent des IPs dynamiques, mais la résolution DNS interne permet d'utiliser les noms de conteneurs.

---

## Best Practices

| Pratique | Description |
|----------|-------------|
| **Noms explicites** | Utilisez `container_name` pour des noms prévisibles |
| **Un réseau** | Gardez tous les services sur `home-labs` pour la simplicité |
| **Pas de ports exposés** | Utilisez le gateway, pas l'exposition directe |
| **Health checks** | Ajoutez des health checks pour `depends_on` |

---

<div align="center">

**[⬅️ Retour à Infrastructure](README.md)** · **[🏠 Index](../README.md)**

</div>
