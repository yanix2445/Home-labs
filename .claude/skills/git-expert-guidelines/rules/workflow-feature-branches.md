# Feature Branches & No Direct Main Work

**Impact: HIGH**

La branche `main` (ou `master`) doit toujours être déployable. Tout développement se fait dans une branche dédiée. Utilisez des noms descriptifs pour trier les branches.

## Incorrect

Développement direct sur main ou noms de branches vagues.

```bash
git checkout main
# ... codage direct ...
git commit -m "breaking changes"

git checkout -b yannis-dev
```

## Correct

Feature branch avec nom structuré.

```bash
git checkout main
git pull origin main
git checkout -b feat/new-payment-flow
# ou
git checkout -b fix/auth-token-refresh
```
