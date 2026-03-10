<!-- i18readme -->

[English](../README.md) | [Русский](README.ru.md) | **Deutsch** | [Français](README.fr.md) | [中文](README.zh.md) | [日本語](README.ja.md)

<!-- i18readme -->

# i18readme

Übersetze deine `README.md` mit einem einzigen Befehl in jede beliebige Sprache. Angetrieben von Claude oder GPT-4o.

Die Sprachleiste oben wird automatisch in jede Datei eingefügt. Wenn sich deine README ändert, werden nur die veralteten Übersetzungen neu generiert.

---

## Installation

```bash
npm install -g i18readme
```

Erfordert Node.js 18+.

---

## Schnellstart

```bash
# 1. In dein Projekt wechseln
cd my-project

# 2. Einrichten (interaktiv — fragt nach Sprachen, Ordner, README-Dateien)
i18r init

# 3. API-Key hinterlegen (Claude oder OpenAI)
i18r config

# 4. Übersetzen
i18r sync
```

Das war's. Deine Übersetzungen erscheinen unter `i18readme/README.ru.md`, `i18readme/README.de.md` usw.

---

## Befehle

```
i18r init              Projekt einrichten (interaktiv)
i18r sync              Fehlende und veraltete Dateien übersetzen
i18r sync --force      Alles neu übersetzen
i18r status            Zeigt an, was aktuell ist und was nicht
i18r config            API-Key hinzufügen oder ändern (interaktiv)
i18r config show       Gespeicherte Konfiguration anzeigen
```

---

## So funktioniert's

**`i18r init`** durchsucht dein Projekt nach README-Dateien und erstellt `.i18readme.json`:

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** prüft die Änderungszeitpunkte — wenn sich deine `README.md` seit dem letzten Sync nicht geändert hat, wird die Übersetzung übersprungen. Nur tatsächlich veraltete Dateien werden neu übersetzt.

**Jede übersetzte Datei** bekommt oben eine Sprachleiste mit Links zu allen anderen Sprachen.

---

## KI-Anbieter

| Anbieter            | Modell          | Key beantragen                                         |
| ------------------- | --------------- | ------------------------------------------------------ |
| Claude _(Standard)_ | claude-opus-4-6 | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI              | gpt-4o          | [platform.openai.com](https://platform.openai.com)     |

Mit `i18r config` wählst du einen Anbieter und speicherst deinen Key. Der Key wird in `~/.i18readmerc` auf deinem Rechner gespeichert — niemals im Projekt.

---

## Dateien

| Datei             | Beschreibung                                 |
| ----------------- | -------------------------------------------- |
| `.i18readme.json` | Projekteinstellungen — gehört ins Repository |
| `~/.i18readmerc`  | Dein API-Key — niemals committen             |

---

## Lizenz

MIT
