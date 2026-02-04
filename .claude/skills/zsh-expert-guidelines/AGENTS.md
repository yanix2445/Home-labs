# Zsh Expert Guidelines

**Version 1.0.0**
Standards de configuration et d'utilisation pour Zsh Boost.

---

## 1. Architecture & Configuration

**Impact: HIGH**

- **`config-architecture`** : NE JAMAIS éditer `.zshrc`. Utiliser `config.zsh` pour :
    - Activer/Désactiver les modules.
    - Changer le thème.
    - Configurer les plugins.

- **Secrets** : Les configurations locales/privées vont dans `local/custom.zsh`.

## 2. Workflow

**Impact: MEDIUM**

- **`workflow-reload`** : Utiliser `rld` pour recharger la config.
- **`workflow-add-module`** : Créer des fichiers dans `modules/` pour ajouter des fonctionnalités, puis les activer dans `config.zsh`.

## 3. Capabilités (Outils & Alias)

**Impact: LOW**

### Utilitaires
- `mkcd`, `bak`, `trash`, `extract`
- `myip`, `serve`, `ports`, `fkill`
- `up` (Update System)

### Alias Modernes
- `ls` → `eza`
- `cat` → `bat`
- `grep` → `rg`
- `z` (zoxide)

### Dev Stacks
- Git (`gst`, `gco`...)
- Docker (`d`, `dc`...)
- NPM/PNPM/Bun (`ni`, `p`, `b`...)
