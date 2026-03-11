<!-- i18readme -->
<!-- src-hash:af6278dc0c4c -->
[English](../README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | **Français** | [中文](README.zh.md) | [日本語](README.ja.md)
<!-- i18readme -->

# i18readme

Traduisez votre `README.md` dans n'importe quelle langue avec une seule commande. Powered by Claude ou GPT-4o.

La barre de langues ci-dessus est injectée automatiquement dans chaque fichier. Quand votre README change, seules les traductions obsolètes sont régénérées.

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

# 2. Configuration — vous demande les langues, le dossier, le fournisseur IA, le modèle et la clé API
i18r init

# 3. Traduire
i18r sync
```

C'est tout. Vos traductions apparaîtront dans `i18readme/README.ru.md`, `i18readme/README.de.md`, etc.

---

## Commandes

```
i18r init                          Configurer le projet (interactif)
i18r sync                          Traduire les fichiers manquants et obsolètes
i18r sync --force                  Tout retraduite
i18r sync --force ru,de            Retraduire uniquement des langues spécifiques
i18r sync --provider <p>           Remplacer le fournisseur pour cette exécution
i18r sync --model <m>              Remplacer le modèle pour cette exécution
i18r status                        Afficher ce qui est à jour et ce qui ne l'est pas
i18r config                        Mettre à jour le fournisseur, le modèle et la clé API
i18r config show                   Afficher la configuration enregistrée
i18r config set --provider <p> --key <k>   Enregistrer la clé API sans interaction
```

---

## Comment ça marche

**`i18r init`** analyse votre projet à la recherche de fichiers README, vous demande dans quelles langues traduire, quel fournisseur IA et quel modèle utiliser, et enregistre votre clé API. Crée `.i18readme.json` :

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** compare un hash de contenu de votre `README.md` avec le hash enregistré dans chaque traduction. Si le contenu n'a pas changé, la traduction est ignorée — même après des checkouts git ou des copies de fichiers qui réinitialisent les horodatages.

**Chaque fichier traduit** reçoit une barre de sélection de langue en haut permettant de naviguer vers toutes les autres langues.

---

## Fournisseurs IA

| Fournisseur        | Modèle par défaut          | Comment obtenir une clé                                |
| ------------------ | -------------------------- | ------------------------------------------------------ |
| Claude _(défaut)_  | claude-haiku-4-5 (rapide)  | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI             | gpt-4o-mini (rapide)       | [platform.openai.com](https://platform.openai.com)     |

Vous pouvez sélectionner un modèle plus puissant (Sonnet, Opus, GPT-4o) lors de `i18r init` ou `i18r config`, ou le remplacer pour une seule exécution avec `--model`.

La clé est enregistrée dans `~/.i18readmerc` sur votre machine — jamais dans le projet.

---

## Licence

MIT