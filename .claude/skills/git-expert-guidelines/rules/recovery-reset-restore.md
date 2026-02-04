# Local Recovery (Reset vs Restore)

**Impact: HIGH**

Savoir effacer ou annuler ses modifications locales proprement.

## Undo `git add`

Pour désindexer un fichier sans perdre les modifs :

```bash
git restore --staged <fichier>
```

## Undo modifications

Pour annuler les modifications d'un fichier (retour à l'état du dernier commit) - **Destructif** :

```bash
git restore <fichier>
```
