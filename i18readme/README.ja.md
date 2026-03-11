<!-- i18readme -->
<!-- src-hash:bd6dd8bd5f05 -->
[English](../README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [中文](README.zh.md) | **日本語**
<!-- i18readme -->

# i18readme

`README.md` を任意の言語に翻訳できるツールです。Claude または GPT-4o を使用しています。

言語切り替えバーが自動的に各ファイルに挿入されます。README が変更された場合、古くなった翻訳だけが再生成されます。

---

## インストール

```bash
npm install -g i18readme
```

Node.js 18 以上が必要です。

---

## クイックスタート

```bash
# 1. プロジェクトディレクトリに移動
cd my-project

# 2. セットアップ（対話形式 — 言語、フォルダ、README ファイルを選択）
i18r init

# 3. API キーを設定（Claude または OpenAI）
i18r config

# 4. 翻訳実行
i18r sync
```

これで完了です。翻訳ファイルが `i18readme/README.ru.md`、`i18readme/README.de.md` など に生成されます。

---

## コマンド

```
i18r init              プロジェクトをセットアップ（対話形式）
i18r sync              不足している翻訳と古い翻訳を更新
i18r sync --force      すべての翻訳を再生成
i18r status            最新と古い翻訳のステータスを表示
i18r config            API キーを追加または変更（対話形式）
i18r config show       保存済みの設定を表示
```

---

## 仕組み

**`i18r init`** はプロジェクトの README ファイルをスキャンし、`.i18readme.json` を作成します：

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** は更新時刻をチェックします — `README.md` が前回の同期以降に変更されていない場合、翻訳はスキップされます。実際に古くなった部分だけが再翻訳されます。

**各翻訳ファイル** の先頭に、他の言語へのリンクを含む言語切り替えバーが追加されます。

---

## AI プロバイダー

| プロバイダー | モデル | キーの取得方法 |
| ----------- | ------ | ------------ |
| Claude _(デフォルト)_ | claude-opus-4-6 | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI | gpt-4o | [platform.openai.com](https://platform.openai.com) |

`i18r config` を実行してプロバイダーを選択し、キーを保存します。キーはマシンの `~/.i18readmerc` に保存されます — プロジェクト内には保存されません。

---

## ライセンス

MIT