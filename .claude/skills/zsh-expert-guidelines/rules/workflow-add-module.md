# Adding New Modules

**Impact: MEDIUM**

Pour ajouter des fonctionnalités, créer un module dédié plutôt que de polluer un fichier existant.

## Workflow

1.  Créer le fichier du module :
    ```bash
    touch modules/mon-outil.zsh
    ```
2.  Ajouter le contenu (alias, fonctions) :
    ```bash
    # modules/mon-outil.zsh
    alias mo="mon-outil --verbose"
    ```
3.  Activer le module dans `config.zsh` :
    ```zsh
    ZSH_MODULES=(
        ...
        mon-outil  # Ajouter ici (sans .zsh)
    )
    ```
4.  Recharger :
    ```bash
    rld
    ```
