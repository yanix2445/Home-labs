# Git Expert Guidelines

**Version 2.0.0**
Standards de gestion de version pour Agents et Développeurs.

> **Note:**
> Ce document définit les règles strictes pour manipuler Git. L'agent doit suivre ces pratiques pour garantir l'intégrité du dépôt, la clarté de l'historique et la sécurité des données.

---

## 1. Sécurité et Intégrité

**Impact: CRITICAL**

La perte de code ou la corruption de l'historique est inacceptable. Ces règles sont des garde-fous absolus.

### 1.1 Vérification Contextuelle Avant Action

**Impact: CRITICAL (évite les commits accidentels de fichiers indésirables)**

Ne jamais ajouter "tout" aveuglément sans savoir ce qui traîne dans le dossier. Toujours vérifier l'état avant d'agir.

**Incorrect: ajout aveugle**

```bash
# Dangereux : risque d'ajouter des fichiers temporaires, .env, ou build artifacts
git add .
git commit -m "update"
```

**Correct: vérification d'abord**

```bash
git status
# Analyser la sortie. Si ok :
git add .
# Ou mieux, ajouter sélectivement :
git add src/
```

### 1.2 Push Force Interdit sur Branches Protégées

**Impact: CRITICAL (risque de perte d'historique collaboratif)**

Ne jamais utiliser `--force` sur `main`, `master`, ou `develop`. Utiliser `--force-with-lease` si absolument nécessaire sur une branche de feature personnelle.

**Incorrect: écrasement brutal**

```bash
git push -f origin main
```

**Correct: protection et bail**

```bash
# Uniquement sur sa propre branche de feature
git push --force-with-lease origin feat/login-fix
```

---

## 2. Workflow et Qualité des Commits

**Impact: HIGH**

Un historique propre facilite le debug, le revert et la revue de code.

### 2.1 Commits Atomiques

**Impact: HIGH (facilite le revert et la lecture)**

Un commit doit faire UNE seule chose. Ne pas mélanger du refactoring, du formatage et une nouvelle feature dans le même commit.

**Incorrect: commit fourre-tout**

```bash
# Le message avoue le crime
git commit -m "Fix login bug, reformat css and update readme"
```

**Correct: séparation logique**

```bash
git add src/auth/
git commit -m "fix(auth): resolve login timeout issue"

git add src/styles/
git commit -m "style: reformatted css files"

git add README.md
git commit -m "docs: update install instructions"
```

### 2.2 Convention Commit Conventional

**Impact: MEDIUM (automatisation et clarté)**

Utiliser la convention [Conventional Commits](https://www.conventionalcommits.org/) de manière stricte.

**Structure Obligatoire :**

```text
type(scope): description courte (max 50 chars, EN FRANÇAIS)

[Body] Pourquoi & Comment (max 72 chars/ligne, EN FRANÇAIS)

[Footer] Références (ex: Fixes #123)
```

**Langue :** FRANÇAIS EXCLUSIVEMENT (sauf termes techniques).

**Types autorisés :** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

**Incorrect: incomplet, vague ou en anglais**

```bash
git commit -m "fix login"
git commit -m "fix(auth): fixed the login bug"
```

**Correct: structure complète et en français**

```text
fix(auth): gestion du token null lors du refresh

La logique de rafraîchissement plantait quand le token était null.
Ajout d'une vérification pour éviter la boucle d'erreur 500.

Fixes #142
```

---

## 3. Gestion des Branches

**Impact: HIGH**

Structurez le travail pour éviter les conflits et garder `main` stable.

### 3.1 Pas de Travail Direct sur Main

**Impact: HIGH (stabilité)**

La branche `main` (ou `master`) doit toujours être déployable. Tout développement se fait dans une branche dédiée.

**Incorrect: développement sur main**

```bash
git checkout main
# ... codage direct ...
git commit -m "breaking changes"
```

**Correct: feature branch**

```bash
git checkout main
git pull origin main
git checkout -b feat/new-payment-flow
```

---

## 4. Configuration Optimale

**Impact: MEDIUM**

Une bonne configuration prévient les erreurs et améliore la productivité.

### 4.1 Identité Utilisateur Claire

**Impact: HIGH (attribution du code)**

S'assurer que `user.name` et `user.email` sont corrects **localement** si on travaille sur des projets personnels vs pro.

**Commande de vérification :**

```bash
git config user.name
git config user.email
```

**Configuration locale (pour ce repo uniquement) :**

```bash
git config user.name "Yanis"
git config user.email "yanis@pro.com"
```

### 4.2 Gitignore Exaustif

**Impact: HIGH (propreté du dépôt)**

Ne jamais committer de fichiers sensibles (`.env`), de dépendances (`node_modules`), ou d'artefacts de build (`dist/`, `.DS_Store`).

**Incorrect:**
Fichier `.env` présent dans le dépôt distant.

**Correct:**
Vérifier `.gitignore` à la racine :

```gitignore
node_modules/
dist/
.env
.DS_Store
.vscode/
coverage/
```

---

## 5. Récupération et Corrections

**Impact: HIGH**

Savoir réparer les erreurs sans tout casser.

### 5.1 Modifier le Dernier Commit (Amend)

**Impact: MEDIUM (nettoyer l'historique local)**

Si on a oublié un fichier ou fait une typo dans le message du *dernier* commit (et qu'on n'a pas encore pushé).

**Incorrect: faire un commit "oops"**

```bash
git commit -m "feat: login"
# Oubli d'un fichier
git add forgotten-file.js
git commit -m "oops forgot this"
```

**Correct: amender le commit**

```bash
git add forgotten-file.js
git commit --amend --no-edit
# Le fichier est fusionné dans le commit précédent "feat: login"
```

### 5.2 Annuler des Modifications Locales (Reset vs Restore)

**Impact: HIGH**

Savoir effacer ses brouillons.

**Pour désindexer un fichier (undo git add) :**
```bash
git restore --staged <fichier>
```

**Pour annuler les modifications d'un fichier (retour à l'état du dernier commit) :**
```bash
git restore <fichier>
# Attention : modifications perdues définitivement
```
