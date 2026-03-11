<!-- i18readme -->
<!-- src-hash:af6278dc0c4c -->
[English](../README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [中文](README.zh.md) | **日本語**
<!-- i18readme -->

# i18readme

1つのコマンドで`README.md`を任意の言語に翻訳します。ClaudeまたはGPT-4oを使用。

言語バーは自動的にすべてのファイルに挿入されます。READMEが変更されると、古い翻訳のみが再生成されます。

---

## インストール

```bash
npm install -g i18readme
```

Node.js 18以上が必要です。

---

## クイックスタート

```bash
# 1. プロジェクトに移動
cd my-project

# 2. セットアップ — 言語、フォルダ、AIプロバイダ、モデル、APIキーを聞かれます
i18r init

# 3. 翻訳を実行
i18r sync
```

これで完了です。翻訳は`i18readme/README.ru.md`、`i18readme/README.de.md`などに表示されます。

---

## コマンド

```
i18r init                          プロジェクトをセットアップします（対話形式）
i18r sync                          不足している翻訳と古い翻訳を更新
i18r sync --force                  すべてを再翻訳
i18r sync --force ru,de            特定の言語のみを再翻訳
i18r sync --provider <p>           このrun でプロバイダを上書き
i18r sync --model <m>              このrun でモデルを上書き
i18r status                        最新の状態と古い状態を表示
i18r config                        プロバイダ、モデル、APIキーを更新
i18r config show                   保存された設定を表示
i18r config set --provider <p> --key <k>   対話形式を使わずにAPIキーを保存
```

---

## 仕組み

**`i18r init`** プロジェクトのREADMEファイルをスキャンし、どの言語に翻訳するか、どのAIプロバイダとモデルを使用するか、APIキーを聞いて保存します。`.i18readme.json`を作成します：

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** は`README.md`のコンテンツハッシュと各翻訳に保存されているハッシュを比較します。コンテンツが変更されていなければ、git checkoutやファイルコピーでタイムスタンプがリセットされた場合でも、翻訳はスキップされます。

**各翻訳ファイル**の上部には、他のすべての言語へのリンクを含む言語切り替えバーが表示されます。

---

## AIプロバイダ

| プロバイダ        | デフォルトモデル           | キーの取得方法                                         |
| --------------- | ----------------------- | ---------------------------------------------------- |
| Claude（デフォルト） | claude-haiku-4-5（高速）  | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI          | gpt-4o-mini（高速）      | [platform.openai.com](https://platform.openai.com)     |

`i18r init`または`i18r config`でより高性能なモデル（Sonnet、Opus、GPT-4o）を選択できます。また、`--model`で単一run の設定を上書きできます。

APIキーはあなたのマシンの`~/.i18readmerc`に保存されます。プロジェクト内には保存されません。

---

## ライセンス

MIT