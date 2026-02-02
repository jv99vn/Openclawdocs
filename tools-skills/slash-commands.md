# Slash Commands

Slash Commands cho phép user control trực tiếp các tính năng của OpenClaw thông qua commands bắt đầu bằng `/`.

## Tổng quan

- **Direct control** - Bypass agent
- **Quick actions** - Nhanh chóng thực hiện actions
- **Configurable** - Custom commands
- **Universal** - Hoạt động trên tất cả channels

## Built-in Commands

### Session Management

| Command | Description |
|---------|-------------|
| `/new` | Start new session |
| `/clear` | Clear session history |
| `/session <name>` | Switch to session |
| `/sessions` | List sessions |

### Model Control

| Command | Description |
|---------|-------------|
| `/model <name>` | Switch model |
| `/models` | List available models |
| `/thinking <level>` | Set thinking level |

### Agent Control

| Command | Description |
|---------|-------------|
| `/agent <name>` | Switch agent |
| `/agents` | List agents |
| `/stop` | Stop current generation |

### Tools

| Command | Description |
|---------|-------------|
| `/tool <name>` | Invoke tool directly |
| `/tools` | List available tools |
| `/exec <cmd>` | Execute shell command |

### Memory

| Command | Description |
|---------|-------------|
| `/remember <text>` | Save to memory |
| `/forget <text>` | Remove from memory |
| `/recall <query>` | Search memory |

### System

| Command | Description |
|---------|-------------|
| `/status` | Show status |
| `/help` | Show help |
| `/version` | Show version |
| `/config` | Show config |

## Sử dụng

### Basic

```
/model anthropic/claude-sonnet-4
```

### With Arguments

```
/session work
/thinking high
/remember Important: meeting at 3pm
```

### Chained

```
/new /model anthropic/claude-opus-4
```

## Session Commands

### /new

Start fresh session:

```
/new
```

With name:

```
/new project-alpha
```

### /clear

Clear current session history:

```
/clear
```

### /session

Switch session:

```
/session main
/session work
```

## Model Commands

### /model

Switch model temporarily:

```
/model anthropic/claude-sonnet-4
/model openai/gpt-4o
/model venice/llama-3.3-70b
```

### /thinking

Set thinking/reasoning level:

```
/thinking off
/thinking low
/thinking medium
/thinking high
```

## Tool Commands

### /exec

Execute command directly:

```
/exec ls -la
/exec git status
```

### /tool

Invoke tool:

```
/tool web.search "OpenClaw docs"
/tool browser.goto "https://example.com"
```

## Memory Commands

### /remember

Save to long-term memory:

```
/remember My API key is stored in .env
/remember Prefer Vietnamese responses
```

### /recall

Search memory:

```
/recall API key
/recall preferences
```

### /forget

Remove from memory:

```
/forget API key
```

## Custom Commands

### Configuration

```json5
{
  commands: {
    custom: {
      "/morning": {
        action: "message",
        content: "Good morning! What's on my schedule today?",
      },
      "/standup": {
        action: "prompt",
        content: "Generate standup update based on yesterday's activity",
      },
      "/review": {
        action: "tool",
        tool: "git.diff",
        params: { staged: true },
      },
    },
  },
}
```

### Action Types

| Action | Description |
|--------|-------------|
| `message` | Send as user message |
| `prompt` | Send as system prompt |
| `tool` | Invoke tool |
| `exec` | Execute command |
| `switch` | Switch session/model |

## Channel-Specific

Một số commands có thể khác nhau theo channel:

```json5
{
  channels: {
    whatsapp: {
      commands: {
        "/pic": {
          action: "tool",
          tool: "camera.capture",
        },
      },
    },
  },
}
```

## Permissions

### Restrict Commands

```json5
{
  commands: {
    restricted: ["/exec", "/config"],
    adminOnly: ["/restart", "/shutdown"],
  },
}
```

## Aliases

```json5
{
  commands: {
    aliases: {
      "/m": "/model",
      "/s": "/session",
      "/t": "/thinking",
      "/r": "/remember",
    },
  },
}
```

## Help

### List All Commands

```
/help
```

### Command Help

```
/help model
/help session
```

## Troubleshooting

### Command không được nhận

1. Verify starts với `/`
2. Check no space trước `/`
3. Verify command exists

### Permission denied

1. Check user permissions
2. Verify command không restricted
3. Contact admin

### Custom command không hoạt động

1. Verify syntax trong config
2. Restart Gateway
3. Check logs

## Xem thêm

- [Tools Overview](/tools-skills/tools)
- [CLI Reference](/cli/setup)
- [Configuration](/gateway-ops/configuration)
