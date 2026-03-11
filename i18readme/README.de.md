<!-- i18readme -->
<!-- src-hash:af6278dc0c4c -->
[English](../README.md) | [Русский](README.ru.md) | **Deutsch** | [Français](README.fr.md) | [中文](README.zh.md) | [日本語](README.ja.md)
<!-- i18readme -->

# i18readme

Übersetze dein `README.md` mit einem einzigen Befehl in jede beliebige Sprache. Unterstützt von Claude oder GPT-4o.

Die Sprachliste oben wird automatisch in jede Datei eingefügt. Wenn sich dein README ändert, werden nur die veralteten Übersetzungen neu generiert.

---

## Installation

```bash
npm install -g i18readme
```

Benötigt Node.js 18+.

---

## Schnelleinstieg

```bash
# 1. Gehe zu deinem Projekt
cd my-project

# 2. Einrichtung — fragt nach Sprachen, Ordner, KI-Anbieter, Modell und API-Schlüssel
i18r init

# 3. Übersetzen
i18r sync
```

Fertig. Deine Übersetzungen erscheinen in `i18readme/README.ru.md`, `i18readme/README.de.md` usw.

---

## Befehle

```
i18r init                          Projekt einrichten (interaktiv)
i18r sync                          Fehlende und veraltete Dateien übersetzen
i18r sync --force                  Alles neu übersetzen
i18r sync --force ru,de            Nur bestimmte Sprachen neu übersetzen
i18r sync --provider <p>           Anbieter für diesen Durchlauf überschreiben
i18r sync --model <m>              Modell für diesen Durchlauf überschreiben
i18r status                        Zeige, was aktuell ist und was nicht
i18r config                        Anbieter, Modell und API-Schlüssel aktualisieren
i18r config show                   Gespeicherte Konfiguration anzeigen
i18r config set --provider <p> --key <k>   API-Schlüssel nicht interaktiv speichern
```

---

## Wie es funktioniert

**`i18r init`** scannt dein Projekt nach README-Dateien, fragt, in welche Sprachen übersetzt werden soll, welcher KI-Anbieter und welches Modell verwendet werden soll, und speichert deinen API-Schlüssel. Erstellt `.i18readme.json`:

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** vergleicht einen Content-Hash deiner `README.md` mit dem in jeder Übersetzung gespeicherten Hash. Wenn sich der Inhalt nicht geändert hat, wird die Übersetzung übersprungen — auch bei Git-Checkouts oder Dateikopien, die Zeitstempel zurücksetzen würden.

**Jede übersetzte Datei** erhält oben eine Sprachleiste, die auf alle anderen Sprachen verlinkt.

---

## KI-Anbieter

| Anbieter           | Standardmodell             | So erhältst du einen Schlüssel                         |
| ------------------ | -------------------------- | ------------------------------------------------------ |
| Claude _(Standard)_| claude-haiku-4-5 (schnell) | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI             | gpt-4o-mini (schnell)      | [platform.openai.com](https://platform.openai.com)     |

Du kannst während `i18r init` oder `i18r config` ein leistungsfähigeres Modell (Sonnet, Opus, GPT-4o) auswählen oder es für einen einzelnen Durchlauf mit `--model` überschreiben.

Der Schlüssel wird auf deinem Computer in `~/.i18readmerc` gespeichert — niemals im Projekt.

---

## Lizenz

MIT