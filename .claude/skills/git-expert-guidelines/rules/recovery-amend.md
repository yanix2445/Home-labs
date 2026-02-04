# Modify Last Commit (Amend)

**Impact: MEDIUM**

Utiliser `amend` pour nettoyer l'historique local *avant* de push.

## Incorrect

Faire un commit "oops" pour corriger une typo ou un oubli mineur.

```bash
git commit -m "feat: login"
# Oubli d'un fichier
git add forgotten-file.js
git commit -m "oops forgot this"
```

## Correct

Amender le dernier commit.

```bash
git add forgotten-file.js
git commit --amend --no-edit
# Le fichier est fusionné dans le commit précédent "feat: login"
```
