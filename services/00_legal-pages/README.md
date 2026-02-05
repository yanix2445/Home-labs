# Pages Légales - Black Rise

Site de documentation légale avec formulaires de contact, réclamation et suppression RGPD.

## 📋 Pages

| Route        | Description                   |
| ------------ | ----------------------------- |
| `/`          | Accueil                       |
| `/privacy`   | Politique de confidentialité  |
| `/terms`     | Conditions de service         |
| `/deletion`  | Suppression de données (RGPD) |
| `/contact`   | Formulaire de contact         |
| `/complaint` | Réclamation                   |

## 🚀 Développement

```bash
cd legal-app
pnpm install
pnpm dev
```

## 🐳 Docker

```bash
# Configuration
cp legal-app/.env.example .env
# Éditer .env avec votre clé Resend

# Build et démarrage
docker compose up -d --build
```

## ⚙️ Variables d'environnement

| Variable         | Description                            |
| ---------------- | -------------------------------------- |
| `RESEND_API_KEY` | Clé API Resend                         |
| `ADMIN_EMAIL`    | Email admin pour notifications         |
| `FROM_EMAIL`     | Email d'envoi (domaine vérifié Resend) |

## 🔧 Stack

- Next.js 16 + React 19
- Tailwind CSS 4 + shadcn/ui
- Resend (emails)
- Docker (node:22-alpine)
