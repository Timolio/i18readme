<!-- i18readme -->
<!-- src-hash:bd6dd8bd5f05 -->
[English](../README.md) | [Русский](README.ru.md) | **Deutsch** | [Français](README.fr.md) | [中文](README.zh.md) | [日本語](README.ja.md)
<!-- i18readme -->

# i18readme

Übersetze deine `README.md` mit einem einzigen Befehl in jede beliebige Sprache. Basierend auf Claude oder GPT-4o.

Die Sprachumschaltleiste oben wird automatisch in jede Datei eingefügt. Wenn sich deine README ändert, werden nur die veralteten Übersetzungen neu generiert.

---

## Installation

```bash
npm install -g i18readme
```

Benötigt Node.js 18+.

---

## Schnelleinstieg

```bash
# 1. Zum Projekt wechseln
cd my-project

# 2. Einrichtung durchführen (interaktiv — fragt nach Sprachen, Ordner und README-Dateien)
i18r init

# 3. API-Schlüssel hinzufügen (Claude oder OpenAI)
i18r config

# 4. Übersetzen
i18r sync
```

Fertig. Deine Übersetzungen erscheinen in `i18readme/README.ru.md`, `i18readme/README.de.md`, usw.

---

## Befehle

```
i18r init              Projekt einrichten (interaktiv)
i18r sync              Fehlende und veraltete Dateien übersetzen
i18r sync --force      Alles neu übersetzen
i18r status            Zeige, was aktuell und was veraltet ist
i18r config            API-Schlüssel hinzufügen oder ändern (interaktiv)
i18r config show       Gespeicherte Konfiguration anzeigen
```

---

## Funktionsweise

**`i18r init`** durchsucht dein Projekt nach README-Dateien und erstellt `.i18readme.json`:

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** prüft die Änderungszeiten — wenn sich deine `README.md` seit der letzten Synchronisierung nicht geändert hat, wird die Übersetzung übersprungen. Nur das wirklich Veraltete wird neu übersetzt.

**Jede übersetzte Datei** erhält eine Sprachumschaltleiste oben, die auf alle anderen Sprachen verlinkt.

---

## KI-Anbieter

| Anbieter           | Modell          | API-Schlüssel erhalten                                 |
| ------------------ | --------------- | ------------------------------------------------------ |
| Claude _(Standard)_ | claude-opus-4-6 | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI             | gpt-4o          | [platform.openai.com](https://platform.openai.com)     |

Führe `i18r config` aus, um einen Anbieter auszuwählen und deinen Schlüssel zu speichern. Der Schlüssel wird auf deinem Computer in `~/.i18readmerc` gespeichert — nie im Projekt.

---

## Lizenz

MIT