<!-- i18readme -->

[English](../README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [中文](README.zh.md) | **日本語**

<!-- i18readme -->

# i18readme

`README.md` をたった1コマンドで任意の言語に翻訳。Claude または GPT-4o を活用。

上記の言語バーは、すべてのファイルに自動で挿入されます。README が更新されると、古くなった翻訳だけが再生成されます。

---

## インストール

```bash
npm install -g i18readme
```

Node.js 18 以上が必要です。

---

## クイックスタート

```bash
# 1. プロジェクトに移動
cd my-project

# 2. セットアップ（対話形式 — 言語・フォルダ・README ファイルを選択）
i18r init

# 3. API キーを設定（Claude または OpenAI）
i18r config

# 4. 翻訳を実行
i18r sync
```

これだけです。翻訳ファイルは `i18readme/README.ru.md`、`i18readme/README.de.md` などに生成されます。

---

## コマンド一覧

```
i18r init              プロジェクトのセットアップ（対話形式）
i18r sync              未翻訳・更新が必要なファイルを翻訳
i18r sync --force      すべてを強制的に再翻訳
i18r status            翻訳の最新/未更新状況を表示
i18r config            API キーの追加・変更（対話形式）
i18r config show       保存済みの設定を表示
```

---

## 仕組み

**`i18r init`** はプロジェクト内の README ファイルをスキャンし、`.i18readme.json` を作成します：

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** はファイルの更新日時をチェックし、前回の同期以降 `README.md` が変更されていなければ翻訳をスキップします。実際に古くなったものだけが再翻訳されます。

**各翻訳ファイル** の先頭には、他の言語へのリンクを含む言語切り替えバーが自動挿入されます。

---

## AI プロバイダー

| プロバイダー            | モデル          | キーの取得方法                                         |
| ----------------------- | --------------- | ------------------------------------------------------ |
| Claude _（デフォルト）_ | claude-opus-4-6 | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI                  | gpt-4o          | [platform.openai.com](https://platform.openai.com)     |

`i18r config` を実行してプロバイダーを選択し、キーを保存します。キーはローカルマシンの `~/.i18readmerc` に保存され、プロジェクト内には含まれません。

---

## ファイル構成

| ファイル          | 説明                            |
| ----------------- | ------------------------------- |
| `.i18readme.json` | プロジェクト設定 — コミット対象 |
| `~/.i18readmerc`  | API キー — コミットしないこと   |

---

## ライセンス

MIT
