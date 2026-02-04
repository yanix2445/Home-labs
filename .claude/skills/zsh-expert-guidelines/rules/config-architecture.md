# Configuration Architecture

**Impact: HIGH**

L'architecture est modulaire. Ne jamais toucher au chargeur `.zshrc` directement.

## Incorrect

Modifier `.zshrc` pour ajouter des alias ou des variables d'environnement. Ce fichier est écrasé ou géré par le système de modules.

```bash
# NE PAS FAIRE CA DANS .zshrc
alias gst="git status"
export PATH=$PATH:/opt/bin
```

## Correct

1.  **Préférences générales** : Éditer `config.zsh`.
    *   Activer/Désactiver les modules (`ZSH_MODULES`).
    *   Changer le thème (`ZSH_THEME`).
    *   Gérer les plugins (`ZSH_PLUGINS`).

2.  **Nouveaux alias/fonctions** :
    *   Créer un fichier dédié dans `modules/` (ex: `modules/python.zsh`).
    *   L'ajouter à la liste `ZSH_MODULES` dans `config.zsh`.

3.  **Secrets/Local** :
    *   Utiliser `local/custom.zsh` (ignoré par git) pour les tokens et configs spécifiques à la machine.
