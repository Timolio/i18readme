<!-- i18readme -->

**English** | [Русский](i18readme/README.ru.md) | [Deutsch](i18readme/README.de.md) | [Français](i18readme/README.fr.md) | [中文](i18readme/README.zh.md) | [日本語](i18readme/README.ja.md)

<!-- i18readme -->

# i18readme

Translate your `README.md` into any language with one command. Powered by Claude or GPT-4o.

The language bar above is injected automatically into every file. When your README changes, only the outdated translations are re-generated.

---

## Install

```bash
npm install -g i18readme
```

Requires Node.js 18+.

---

## Quick start

```bash
# 1. Go to your project
cd my-project

# 2. Set up (interactive — asks for languages, folder, README files)
i18r init

# 3. Add your API key (Claude or OpenAI)
i18r config

# 4. Translate
i18r sync
```

That's it. Your translations will appear in `i18readme/README.ru.md`, `i18readme/README.de.md`, etc.

---

## Commands

```
i18r init              Set up the project (interactive)
i18r sync              Translate missing and outdated files
i18r sync --force      Re-translate everything
i18r status            Show what's up to date and what's not
i18r config            Add or change your API key (interactive)
i18r config show       Show saved config
```

---

## How it works

**`i18r init`** scans your project for README files and creates `.i18readme.json`:

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** checks modification times — if your `README.md` hasn't changed since the last sync, the translation is skipped. Only what's actually outdated gets re-translated.

**Each translated file** gets a language switcher bar at the top linking to all other languages.

---

## AI providers

| Provider           | Model           | How to get a key                                       |
| ------------------ | --------------- | ------------------------------------------------------ |
| Claude _(default)_ | claude-opus-4-6 | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI             | gpt-4o          | [platform.openai.com](https://platform.openai.com)     |

Run `i18r config` to pick a provider and save your key. The key is stored in `~/.i18readmerc` on your machine — never in the project.

---

## Files

| File              | What it is                     |
| ----------------- | ------------------------------ |
| `.i18readme.json` | Project settings — commit this |
| `~/.i18readmerc`  | Your API key — never commit    |

---

## License

MIT
