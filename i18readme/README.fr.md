<!-- i18readme -->

[English](../README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | **Français** | [中文](README.zh.md) | [日本語](README.ja.md)

<!-- i18readme -->

# i18readme

Traduisez votre `README.md` dans n'importe quelle langue en une seule commande. Propulsé par Claude ou GPT-4o.

La barre de langues ci-dessus est injectée automatiquement dans chaque fichier. Quand votre README change, seules les traductions obsolètes sont regénérées.

---

## Installation

```bash
npm install -g i18readme
```

Nécessite Node.js 18+.

---

## Démarrage rapide

```bash
# 1. Allez dans votre projet
cd my-project

# 2. Initialisez (interactif — demande les langues, le dossier, les fichiers README)
i18r init

# 3. Ajoutez votre clé API (Claude ou OpenAI)
i18r config

# 4. Traduisez
i18r sync
```

C'est tout. Vos traductions apparaîtront dans `i18readme/README.ru.md`, `i18readme/README.de.md`, etc.

---

## Commandes

```
i18r init              Initialiser le projet (interactif)
i18r sync              Traduire les fichiers manquants et obsolètes
i18r sync --force      Tout retraduire
i18r status            Afficher ce qui est à jour et ce qui ne l'est pas
i18r config            Ajouter ou modifier votre clé API (interactif)
i18r config show       Afficher la configuration enregistrée
```

---

## Comment ça marche

**`i18r init`** scanne votre projet à la recherche de fichiers README et crée `.i18readme.json` :

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** vérifie les dates de modification — si votre `README.md` n'a pas changé depuis la dernière synchronisation, la traduction est ignorée. Seuls les fichiers réellement obsolètes sont retraduits.

**Chaque fichier traduit** reçoit une barre de sélection de langue en haut, avec des liens vers toutes les autres langues.

---

## Fournisseurs IA

| Fournisseur           | Modèle          | Comment obtenir une clé                                |
| --------------------- | --------------- | ------------------------------------------------------ |
| Claude _(par défaut)_ | claude-opus-4-6 | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI                | gpt-4o          | [platform.openai.com](https://platform.openai.com)     |

Lancez `i18r config` pour choisir un fournisseur et enregistrer votre clé. La clé est stockée dans `~/.i18readmerc` sur votre machine — jamais dans le projet.

---

## Licence

MIT
