# Pages légales

Pages obligatoires pour WhatsApp Business et conformité RGPD.

## 📋 Pages disponibles

### 1. Politique de confidentialité (Privacy Policy)
**URL** : https://legal.yanis-harrat.com/privacy.html

Décrit comment les données personnelles sont collectées, utilisées et protégées.
Conforme au RGPD (Règlement Général sur la Protection des Données).

### 2. Conditions de service (Terms of Service)
**URL** : https://legal.yanis-harrat.com/terms.html

Définit les règles d'utilisation des services (chatbots, WhatsApp, applications).

### 3. Suppression des données (Data Deletion)
**URL** : https://legal.yanis-harrat.com/deletion.html

Instructions pour que les utilisateurs puissent demander la suppression de leurs données.
Obligatoire pour WhatsApp Business API.

---

## 🔗 URLs à copier dans Meta/Facebook

Pour configurer ton app WhatsApp Business dans Meta for Developers :

```
URL de la Politique de confidentialité:
https://legal.yanis-harrat.com/privacy.html

URL des conditions de service:
https://legal.yanis-harrat.com/terms.html

URL d'instructions pour la suppression des données:
https://legal.yanis-harrat.com/deletion.html
```

---

## 🚀 Utilisation

### Démarrer le service
```bash
docker compose up -d
```

### Arrêter le service
```bash
docker compose down
```

### Voir les logs
```bash
docker compose logs -f
```

---

## 📝 Modification des pages

Les pages HTML sont dans le dossier `html/` :
- `html/index.html` - Page d'accueil
- `html/privacy.html` - Politique de confidentialité
- `html/terms.html` - Conditions de service
- `html/deletion.html` - Suppression des données

Après modification, redémarrer le service :
```bash
docker compose restart
```

---

## 🌐 Accès public

- **Homepage** : https://legal.yanis-harrat.com/
- **Privacy** : https://legal.yanis-harrat.com/privacy.html
- **Terms** : https://legal.yanis-harrat.com/terms.html
- **Deletion** : https://legal.yanis-harrat.com/deletion.html

Accessible via Cloudflare Tunnel (voir `infrastructure/gateway/config.yml`).

---

## ⚙️ Configuration

Le service utilise :
- **Image** : nginx:alpine (léger, 64MB RAM max)
- **Port interne** : 80
- **Réseau** : home-labs (externe)
- **Domaine** : legal.yanis-harrat.com

---

## 📧 Contact pour suppression de données

Les utilisateurs doivent envoyer un email à :
- **Email** : yanis.amine.harrat@gmail.com
- **Objet** : "Demande de suppression de données - RGPD"

Délai de traitement : 30 jours maximum.
