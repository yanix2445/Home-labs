# Reloading Configuration

**Impact: MEDIUM**

Après toute modification de configuration, recharger le shell pour appliquer les changements.

## Incorrect

Ouvrir un nouvel onglet ou taper `source ~/.zshrc` (peut causer des duplications de PATH ou des erreurs de plugins).

## Correct

Utiliser l'alias dédié `rld`.

```bash
# Après avoir modifié config.zsh
rld
```

Cet alias exécute `exec zsh`, ce qui remplace le processus actuel par une nouvelle instance propre.
