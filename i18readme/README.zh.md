<!-- i18readme -->
<!-- src-hash:af6278dc0c4c -->
[English](../README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | **中文** | [日本語](README.ja.md)
<!-- i18readme -->

# i18readme

用一条命令将你的 `README.md` 翻译成任意语言。由 Claude 或 GPT-4o 驱动。

语言选择栏会自动注入到每个文件中。当你的 README 更新时，只有过期的翻译会被重新生成。

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

# 2. 初始化 — 会询问语言、文件夹、AI 服务商、模型和 API 密钥
i18r init

# 3. 翻译
i18r sync
```

就这么简单。你的翻译文件会出现在 `i18readme/README.ru.md`、`i18readme/README.de.md` 等目录下。

---

## 命令

```
i18r init                          初始化项目（交互式）
i18r sync                          翻译缺失和过期的文件
i18r sync --force                  重新翻译所有文件
i18r sync --force ru,de            仅重新翻译指定语言
i18r sync --provider <p>           为本次运行覆盖服务商设置
i18r sync --model <m>              为本次运行覆盖模型设置
i18r status                        显示哪些文件是最新的，哪些已过期
i18r config                        更新服务商、模型和 API 密钥
i18r config show                   显示已保存的配置
i18r config set --provider <p> --key <k>   非交互式保存 API 密钥
```

---

## 工作原理

**`i18r init`** 扫描你的项目来查找 README 文件，询问要翻译成哪些语言，使用哪个 AI 服务商和模型，并保存你的 API 密钥。生成 `.i18readme.json`：

```json
{
    "langs": ["ru", "de", "zh"],
    "dir": "i18readme",
    "readmes": ["README.md"]
}
```

**`i18r sync`** 比较你的 `README.md` 的内容哈希值与每个翻译文件中存储的哈希值。如果内容没有改变，翻译就会被跳过 — 即使在 git 检出或文件复制后时间戳被重置也不会重新翻译。

**每个翻译文件** 在顶部都有一个语言选择栏，可以链接到所有其他语言版本。

---

## AI 服务商

| 服务商             | 默认模型               | 获取密钥                                               |
| ------------------ | ---------------------- | ------------------------------------------------------ |
| Claude _（默认）_  | claude-haiku-4-5 (快)  | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI             | gpt-4o-mini (快)       | [platform.openai.com](https://platform.openai.com)     |

你可以在 `i18r init` 或 `i18r config` 过程中选择更强大的模型（Sonnet、Opus、GPT-4o），或通过 `--model` 参数为单次运行覆盖模型设置。

密钥保存在你的机器上的 `~/.i18readmerc` 中 — 永远不会保存在项目里。

---

## 许可证

MIT