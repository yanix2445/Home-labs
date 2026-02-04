# Conventional Commits Strict

**Impact: MEDIUM**

Utiliser la convention [Conventional Commits](https://www.conventionalcommits.org/) de manière stricte et complète. Un commit doit raconter une histoire claire et concise.

## Structure Obligatoire

```text
type(scope): description courte (max 50 chars)

[Body] Pourquoi ce changement ? Comment cela fonctionne ? (max 72 chars/ligne)

[Footer] Références (Issues, Breaking Changes)
```

1.  **Header**: `type(scope): description` (Obligatoire, max 50 caractères, **EN FRANÇAIS**).
2.  **Body**: Explication du *Pourquoi* et du *Comment*. Pas un roman, aller à l'essentiel. (Obligatoire, **EN FRANÇAIS**).
3.  **Footer**: Références tickets (ex: `Fixes #123`) ou `BREAKING CHANGE`. (Obligatoire).

## Langue

**FRANÇAIS UNIQUEMENT.**
L'anglais est interdit dans les messages de commit, sauf pour les termes techniques intraduisibles (e.g. "breaking change", "bug fix", "workflow").

## Types autorisés

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation uniquement
- `style`: Formatage (espaces, point-virgules)
- `refactor`: Modif sans chang. comport. ni fix bug
- `perf`: Amélioration perf
- `test`: Ajout tests
- `chore`: Build, deps, outils

## Incorrect

Pas de body, pas de footer, ou trop long.

```bash
git commit -m "fix login"
```

```text
fix(auth): fix login bug where user cannot sign in

I fixed the bug by changing the line 42 in auth.ts because it was undefined and now it works basically I just added a check.
```

## Correct

Concis, structuré, complet.

```text
fix(auth): handle null token in session refresh

The session refresh logic crashed when token was null.
Added a null check to prevent the 500 error loop.

Fixes #142
```
