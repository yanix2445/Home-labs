# Exaustive Gitignore

**Impact: HIGH**

Ne jamais committer de fichiers sensibles (`.env`), de dépendances (`node_modules`), ou d'artefacts de build (`dist/`, `.DS_Store`).

## Incorrect

Fichier `.env` présent dans le dépôt distant, ou `node_modules` tracké.

## Correct

Vérifier `.gitignore` à la racine :

```gitignore
node_modules/
dist/
.env
.DS_Store
.vscode/
coverage/
```
