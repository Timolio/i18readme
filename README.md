<!-- i18readme -->

**English** | [Русский](i18readme/README.ru.md) | [Deutsch](i18readme/README.de.md) | [Français](i18readme/README.fr.md) | [中文](i18readme/README.zh.md) | [日本語](i18readme/README.ja.md)

<!-- i18readme -->

# i18readme

[![npm](https://img.shields.io/npm/v/i18readme)](https://www.npmjs.com/package/i18readme)
[![npm downloads](https://img.shields.io/npm/dm/i18readme)](https://www.npmjs.com/package/i18readme)
[![node](https://img.shields.io/node/v/i18readme)](https://www.npmjs.com/package/i18readme)

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

# 2. Set up — asks for languages, folder, AI provider, model, and API key
i18r init

# 3. Translate
i18r sync
```

That's it. Your translations will appear in `i18readme/README.ru.md`, `i18readme/README.de.md`, etc.

---

## Commands

```
i18r init                          Set up the project (interactive)
i18r sync                          Translate missing and outdated files
i18r sync --force                  Re-translate everything
i18r sync --force ru,de            Re-translate specific languages only
i18r sync --provider <p>           Override provider for this run
i18r sync --model <m>              Override model for this run
i18r status                        Show what's up to date and what's not
i18r config                        Update provider, model, and API key
i18r config show                   Show saved config
i18r config set --provider <p> --key <k>   Save API key non-interactively
```

---

## How it works

**`i18r init`** scans your project for README files, asks which languages to translate to, which AI provider and model to use, and saves your API key. Creates `.i18readme.json`:

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** compares a content hash of your `README.md` against the hash stored in each translation. If the content hasn't changed, the translation is skipped — even across git checkouts or file copies that would reset timestamps.

**Each translated file** gets a language switcher bar at the top linking to all other languages.

---

## AI providers

| Provider           | Default model           | How to get a key                                       |
| ------------------ | ----------------------- | ------------------------------------------------------ |
| Claude _(default)_ | claude-haiku-4-5 (fast) | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI             | gpt-4o-mini (fast)      | [platform.openai.com](https://platform.openai.com)     |

You can select a more powerful model (Sonnet, Opus, GPT-4o) during `i18r init` or `i18r config`, or override it for a single run with `--model`.

The key is stored in `~/.i18readmerc` on your machine — never in the project.

---

## License

MIT
