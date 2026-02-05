# 📦 Services

> Services applicatifs auto-hébergés.

## Catalogue

| Service | Type | URL |
|---------|------|-----|
| [00_legal-pages](00_legal-pages/) | Built | [legal.yanis-harrat.com](https://legal.yanis-harrat.com) |
| [01_excalidraw](01_excalidraw/) | Image | [excalidraw.yanis-harrat.com](https://excalidraw.yanis-harrat.com) |
| [02_typebot](02_typebot/) | Stack | [typebot.yanis-harrat.com](https://typebot.yanis-harrat.com) |
| [_template](_template/) | Template | - |

## Types de Services

| Type | Description |
|------|-------------|
| **Image** | Image Docker pré-construite |
| **Built** | Application avec Dockerfile |
| **Stack** | Multi-conteneurs orchestrés |

## Ajouter un Service

```bash
./scripts/create-service.sh mon-service
```

## 📚 Documentation

➡️ [Catalogue complet](../docs/services/README.md)
➡️ [Guide d'ajout](../docs/adding-services.md)
