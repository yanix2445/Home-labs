# Verify Context Before Action

**Impact: CRITICAL**

Ne jamais ajouter "tout" aveuglément sans savoir ce qui traîne dans le dossier. Toujours vérifier l'état avant d'agir.

## Incorrect

Ajout aveugle : risque d'ajouter des fichiers temporaires, .env, ou build artifacts.

```bash
git add .
git commit -m "update"
```

## Correct

Vérification d'abord.

```bash
git status
# Analyser la sortie. Si ok :
git add .
# Ou mieux, ajouter sélectivement :
git add src/
```
