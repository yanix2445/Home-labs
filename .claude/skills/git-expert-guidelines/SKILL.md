---
name: git-expert-guidelines
description: Standard de référence pour la gestion de Git. Règles de sécurité, workflows atomiques, conventions de commit et bonnes pratiques de configuration.
metadata:
  author: yanis
  version: "2.0.0"
  argument-hint: <topic-or-command>
---

# Git Expert Guidelines

Standards de gestion de version pour Agents et Développeurs. Ce skill doit être utilisé pour toute opération Git (commit, push, checkout) ou demande d'aide sur Git.

## Priorités

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Sécurité | CRITICAL | `security-` |
| 2 | Workflow | HIGH | `workflow-` |
| 3 | Recovery | HIGH | `recovery-` |
| 4 | Configuration | MEDIUM | `config-` |

## Quick Reference

### 1. Sécurité (CRITICAL)

- `security-verify-before-add` - Vérifier `git status` avant `git add .`
- `security-no-force-push` - Jamais de `--force` sur main/master

### 2. Workflow (HIGH)

- `workflow-atomic-commits` - Un commit = un changement logique
- `workflow-conventional-commits` - Format `feat(scope): msg`
- `workflow-feature-branches` - Pas de dev direct sur main

### 3. Recovery (HIGH)

- `recovery-amend` - Utiliser `--amend` pour les corrections mineures pré-push
- `recovery-reset-restore` - Utiliser `restore` pour annuler proprement

### 4. Configuration (MEDIUM)

- `config-user-identity` - Vérifier user.name/email localement
- `config-gitignore` - Ignorer `.env`, `node_modules`

## Full Guide

Pour le guide complet combiné : `AGENTS.md`

## Usage

Consultez les règles individuelles dans `rules/*.md` pour des explications détaillées et des exemples Incorrect/Correct.
