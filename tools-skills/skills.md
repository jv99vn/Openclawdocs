# Skills

Skills là modular instruction sets mà agents có thể load on-demand để handle specific tasks.

## Tổng quan

Skills cho phép:
- Modular knowledge organization
- On-demand loading (không bloat base prompt)
- Shareable và reusable
- Domain-specific expertise

## Cấu trúc Skill

```
skills/
├── coding/
│   ├── SKILL.md
│   └── examples/
├── writing/
│   ├── SKILL.md
│   └── templates/
└── research/
    └── SKILL.md
```

### SKILL.md Format

```markdown
---
name: coding
description: Advanced coding assistance
version: 1.0.0
author: Your Name
tags: [programming, development]
---

# Coding Skill

## Instructions

When helping with code:
1. Always explain your approach
2. Write clean, documented code
3. Include error handling

## Examples

### Python Function

\`\`\`python
def hello(name: str) -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"
\`\`\`
```

## Sử dụng Skills

### Load Skill trong Chat

```
/skill load coding
/skill coding
```

### Auto-load Skills

```json5
{
  agents: {
    defaults: {
      skills: {
        autoLoad: ["coding", "writing"],
      },
    },
  },
}
```

### Per-Session Skills

```
/skills         - List available skills
/skill load X   - Load skill X
/skill unload X - Unload skill X
```

## Skill Discovery

### Bundled Skills

OpenClaw đi kèm với các skills built-in:

| Skill | Mô tả |
|-------|-------|
| `coding` | Programming assistance |
| `writing` | Writing và editing |
| `research` | Research và analysis |
| `data` | Data analysis |

### ClawHub

Discover community skills:

```bash
openclaw skills search "web scraping"
openclaw skills install clawhub/web-scraper
```

## Tạo Custom Skill

### Bước 1: Tạo Directory

```bash
mkdir -p ~/.openclaw/skills/my-skill
```

### Bước 2: Tạo SKILL.md

```markdown
---
name: my-skill
description: My custom skill
version: 1.0.0
---

# My Skill

Instructions for the agent...
```

### Bước 3: Register Skill

```json5
{
  skills: {
    paths: [
      "~/.openclaw/skills",
    ],
  },
}
```

## Skill Configuration

### Basic Config

```json5
{
  skills: {
    enabled: true,
    paths: [
      "~/.openclaw/skills",
      "./project-skills",
    ],
    autoLoad: [],
    maxLoaded: 5,
  },
}
```

### Per-Agent Skills

```json5
{
  agents: {
    list: {
      "coding-agent": {
        skills: {
          autoLoad: ["coding", "testing"],
        },
      },
      "writing-agent": {
        skills: {
          autoLoad: ["writing", "research"],
        },
      },
    },
  },
}
```

### Channel-specific Skills

```json5
{
  channels: {
    telegram: {
      forums: {
        "-1001234567890": {
          topics: {
            "123": {
              skills: ["coding"],
            },
          },
        },
      },
    },
  },
}
```

## Skill CLI

### List Skills

```bash
openclaw skills list
openclaw skills list --available
```

### Install Skill

```bash
# From ClawHub
openclaw skills install clawhub/skill-name

# From local path
openclaw skills install ./my-skill

# From git
openclaw skills install https://github.com/user/skill.git
```

### Uninstall Skill

```bash
openclaw skills uninstall skill-name
```

### Update Skills

```bash
openclaw skills update
openclaw skills update skill-name
```

## Skill Metadata

### Required Fields

| Field | Mô tả |
|-------|-------|
| `name` | Unique identifier |
| `description` | Short description |

### Optional Fields

| Field | Mô tả |
|-------|-------|
| `version` | Semantic version |
| `author` | Author name |
| `tags` | Searchable tags |
| `dependencies` | Other skills required |
| `tools` | Tools skill requires |
| `models` | Recommended models |

### Example Full Metadata

```yaml
---
name: web-scraper
description: Web scraping and data extraction
version: 2.1.0
author: Community
tags: [web, scraping, data, automation]
dependencies:
  - coding
tools:
  - browser
  - web_fetch
models:
  recommended: anthropic/claude-opus-4-5
  minimum: anthropic/claude-sonnet-4
---
```

## Skill Best Practices

### Keep Skills Focused

- Một skill = một domain
- Tránh skills quá lớn
- Modularize khi cần

### Clear Instructions

- Viết instructions rõ ràng
- Include examples
- Document edge cases

### Test Skills

```bash
openclaw skills test my-skill
```

## Troubleshooting

### Skill not loading

1. Check path:
   ```bash
   openclaw skills list --paths
   ```

2. Verify SKILL.md format:
   ```bash
   openclaw skills validate ./my-skill
   ```

### Skill conflicts

Skills có thể conflict nếu instructions contradict:

```json5
{
  skills: {
    conflictResolution: "last-loaded",  // first-loaded | last-loaded | manual
  },
}
```

## Xem thêm

- [Tools](/tools-skills/tools)
- [Plugins](/tools-skills/plugins)
- [System Prompt](/core-concepts/system-prompt)
