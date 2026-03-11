<!-- i18readme -->
<!-- src-hash:bd6dd8bd5f05 -->
[English](../README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | **中文** | [日本語](README.ja.md)
<!-- i18readme -->

# i18readme

用一条命令将你的 `README.md` 翻译成任何语言。由 Claude 或 GPT-4o 驱动。

语言栏会自动注入到每个文件中。当你的 README 更新时，只有过期的翻译会被重新生成。

---

## 安装

```bash
npm install -g i18readme
```

需要 Node.js 18+。

---

## 快速开始

```bash
# 1. 进入你的项目
cd my-project

# 2. 初始化设置（交互式 — 询问语言、文件夹、README 文件）
i18r init

# 3. 添加你的 API 密钥（Claude 或 OpenAI）
i18r config

# 4. 开始翻译
i18r sync
```

就这样。你的翻译文件会出现在 `i18readme/README.ru.md`、`i18readme/README.de.md` 等目录中。

---

## 命令

```
i18r init              初始化项目设置（交互式）
i18r sync              翻译缺失和过期的文件
i18r sync --force      重新翻译所有文件
i18r status            显示哪些文件是最新的，哪些是过期的
i18r config            添加或修改你的 API 密钥（交互式）
i18r config show       显示已保存的配置
```

---

## 工作原理

**`i18r init`** 扫描你的项目寻找 README 文件，并创建 `.i18readme.json`：

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** 检查修改时间 — 如果你的 `README.md` 自上次同步以来没有改变，翻译会被跳过。只有真正过期的内容会被重新翻译。

**每个翻译文件** 顶部都会获得一个语言切换栏，链接到所有其他语言版本。

---

## AI 服务商

| 服务商             | 模型            | 如何获取密钥                                           |
| ------------------ | --------------- | ------------------------------------------------------ |
| Claude _（默认）_  | claude-opus-4-6 | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI             | gpt-4o          | [platform.openai.com](https://platform.openai.com)     |

运行 `i18r config` 来选择服务商并保存你的密钥。密钥会被保存在你计算机上的 `~/.i18readmerc` — 永远不会保存在项目中。

---

## 许可证

MIT