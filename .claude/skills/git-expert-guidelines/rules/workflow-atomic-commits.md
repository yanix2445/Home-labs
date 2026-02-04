# Atomic Commits

**Impact: HIGH**

Un commit doit faire UNE seule chose. Ne pas mélanger du refactoring, du formatage et une nouvelle feature dans le même commit. Cela facilite le revert et la lecture.

## Incorrect

Message fourre-tout, impossible de revert juste le formatage sans casser le fix.

```bash
git commit -m "Fix login bug, reformat css and update readme"
```

## Correct

Séparation logique des changements.

```bash
git add src/auth/
git commit -m "fix(auth): resolve login timeout issue"

git add src/styles/
git commit -m "style: reformatted css files"

git add README.md
git commit -m "docs: update install instructions"
```
