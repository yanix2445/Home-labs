# No Force Push on Protected Branches

**Impact: CRITICAL**

Ne jamais utiliser `--force` sur `main`, `master`, ou `develop`. Risque de perte d'historique collaboratif.

## Incorrect

Écrasement brutal de l'historique partagé.

```bash
git push -f origin main
```

## Correct

Utiliser `--force-with-lease` uniquement sur sa propre branche de feature, pour s'assurer qu'on n'écrase pas le travail d'autrui qui aurait été pushé entre temps.

```bash
# Uniquement sur sa propre branche de feature
git push --force-with-lease origin feat/login-fix
```
