# openclaw agents

Lệnh `openclaw agents` quản lý isolated agent workspaces, bao gồm authentication và routing capabilities.

## Cú pháp

```bash
openclaw agents <command> [options]
```

## Commands

### List agents

```bash
openclaw agents list
```

### Add agent

```bash
openclaw agents add --name ops --workspace ~/.openclaw/agents/ops
```

### Remove agent

```bash
openclaw agents remove ops
```

### Configure identity

```bash
openclaw agents set-identity ops --from-identity
# hoặc
openclaw agents set-identity ops --name "Ops Agent" --emoji "🔧"
```

## Identity Configuration

### File Structure

Agents sử dụng optional `IDENTITY.md` files tại workspace roots. Avatar references resolve relative to workspace directory.

### Identity Fields

| Field | Mô tả |
|-------|-------|
| `name` | Agent display name |
| `theme` | Visual theme identifier |
| `emoji` | Character representation |
| `avatar` | Image location (local path, URL, hoặc data URI) |

### Configuration Methods

**Từ IDENTITY.md:**
```bash
openclaw agents set-identity ops --from-identity
```

**Override fields:**
```bash
openclaw agents set-identity ops --name "Custom Name" --avatar /path/to/avatar.png
```

### Sample IDENTITY.md

```markdown
---
name: Research Agent
emoji: 🔬
theme: blue
avatar: avatar.png
---

# Research Agent

I help with research tasks.
```

## Configuration Example

```json5
{
  "agents": {
    "list": [
      {
        "id": "ops",
        "workspace": "~/.openclaw/agents/ops",
        "identity": {
          "name": "Ops Agent",
          "emoji": "🔧",
          "avatar": "avatar.png"
        }
      }
    ]
  }
}
```

## Multi-Agent Routing

Khi có nhiều agents, routing được thực hiện dựa trên:
- Channel configuration
- Agent allowlists
- Default agent setting

```json5
{
  "channels": {
    "telegram": {
      "routing": {
        "default": "main",
        "rules": [
          { "pattern": "/ops*", "agent": "ops" }
        ]
      }
    }
  }
}
```

## Xem thêm

- [Agent Command](/cli/agent)
- [Multi-Agent Routing](/concepts/concepts)
- [Agent Workspace Configuration](/guide/concepts)
