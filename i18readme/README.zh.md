<!-- i18readme -->

[English](../README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | **中文** | [日本語](README.ja.md)

<!-- i18readme -->

# i18readme

一条命令，将你的 `README.md` 翻译成任意语言。基于 Claude 或 GPT-4o 驱动。

上面的语言切换栏会自动注入到每个文件中。当你的 README 发生变更时，只有过时的翻译才会被重新生成。

---

## 安装

```bash
npm install -g i18readme
```

需要 Node.js 18+。

---

## 快速开始

```bash
# 1. 进入你的项目目录
cd my-project

# 2. 初始化（交互式 — 会询问语言、输出目录、README 文件等）
i18r init

# 3. 添加 API key（Claude 或 OpenAI）
i18r config

# 4. 翻译
i18r sync
```

搞定。翻译后的文件会出现在 `i18readme/README.ru.md`、`i18readme/README.de.md` 等位置。

---

## 命令一览

```
i18r init              初始化项目（交互式）
i18r sync              翻译缺失和过时的文件
i18r sync --force      强制重新翻译所有文件
i18r status            查看哪些是最新的，哪些需要更新
i18r config            添加或修改 API key（交互式）
i18r config show       显示已保存的配置
```

---

## 工作原理

**`i18r init`** 会扫描你的项目中的 README 文件，并创建 `.i18readme.json`：

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** 会检查文件的修改时间 — 如果你的 `README.md` 自上次同步后没有变动，翻译就会跳过。只有真正过时的内容才会被重新翻译。

**每个翻译文件** 的顶部都会自动添加语言切换栏，链接到所有其他语言版本。

---

## AI 服务商

| 服务商            | 模型            | 如何获取 key                                           |
| ----------------- | --------------- | ------------------------------------------------------ |
| Claude _（默认）_ | claude-opus-4-6 | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI            | gpt-4o          | [platform.openai.com](https://platform.openai.com)     |

运行 `i18r config` 来选择服务商并保存你的 key。key 存储在本机的 `~/.i18readmerc` 中，不会出现在项目里。

---

## 许可证

MIT
