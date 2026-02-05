# 🔧 Scripts

> Scripts utilitaires pour gérer l'infrastructure Home Labs.

## Scripts Disponibles

| Script | Description |
|--------|-------------|
| [`start-all.sh`](#start-allsh) | Démarrer tous les services |
| [`stop-all.sh`](#stop-allsh) | Arrêter tous les services |
| [`create-service.sh`](#create-servicesh) | Créer un nouveau service |

---

## start-all.sh

Démarre l'infrastructure complète dans l'ordre correct.

```bash
./scripts/start-all.sh
```

**Ordre :**
1. Réseau `home-labs` (création si nécessaire)
2. Gateway Cloudflare
3. Tous les services

---

## stop-all.sh

Arrête tous les services proprement.

```bash
./scripts/stop-all.sh
```

---

## create-service.sh

Crée un nouveau service depuis le template.

```bash
./scripts/create-service.sh <nom-du-service>
```

**Exemple :**
```bash
./scripts/create-service.sh vaultwarden
```

---

## 📚 Documentation

➡️ [Documentation complète](../docs/scripts/README.md)
