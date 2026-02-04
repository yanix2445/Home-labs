# Available Utilities

**Impact: LOW**

Utiliser les fonctions utilitaires intégrées pour gagner du temps.

## Système
- `mkcd <dir>` : Créer un dossier et entrer dedans.
- `bak <file>` : Créer une copie de sauvegarde `.bak` horodatée.
- `trash <file>` : Envoyer à la corbeille système (plus sûr que `rm`).
- `up` : Mise à jour globale (brew, omz, etc.).
- `fkill` : Tuer un processus via une interface fuzzy (fzf).

## Réseau
- `myip` : Affiche l'IP locale et publique.
- `serve [port]` : Lance un serveur HTTP statique dans le dossier courant.
- `ports` : Liste les ports ouverts et processus associés.

## Divers
- `extract <archive>` : Décompresse n'importe quel format (tar, zip, 7z...).
- `json` : Formate et colore du JSON (pipe ou fichier).
- `qr "texte"` : Génère un QR code dans le terminal.
