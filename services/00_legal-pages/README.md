# ⚖️ Legal Pages

> Pages légales avec formulaires RGPD (contact, réclamation, suppression).

## Vue d'Ensemble

| Propriété | Valeur |
|-----------|--------|
| **URL** | [legal.yanis-harrat.com](https://legal.yanis-harrat.com) |
| **Stack** | Next.js 16 + React 19 + Tailwind 4 |
| **Type** | Built (Dockerfile) |

## 📋 Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/privacy` | Politique de confidentialité |
| `/terms` | Conditions de service |
| `/cookies` | Politique des cookies |
| `/deletion` | Suppression RGPD |
| `/contact` | Formulaire de contact |
| `/complaint` | Réclamation |

## 🚀 Démarrage

### Développement

```bash
cd legal-app
pnpm install
pnpm dev
```

### Production (Docker)

```bash
# Configuration
cp legal-app/.env.example .env
# Éditer .env

# Build et démarrage
docker compose up -d --build
```

## ⚙️ Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Clé API Resend |
| `ADMIN_EMAIL` | Email admin |
| `FROM_EMAIL` | Email d'envoi |

## 🔧 Commandes

```bash
# Build
docker compose build

# Démarrer
docker compose up -d

# Rebuild
docker compose up -d --build

# Logs
docker compose logs -f
```

## 📚 Documentation

➡️ [Documentation complète](../../docs/services/legal-pages.md)
