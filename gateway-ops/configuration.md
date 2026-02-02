# Configuration

OpenClaw sử dụng file cấu hình JSON5 tại `~/.openclaw/openclaw.json`.

## Config File Location

| OS | Default Path |
|----|--------------|
| All | `~/.openclaw/openclaw.json` |
| Custom | `$OPENCLAW_CONFIG_PATH` |

## JSON5 Format

Config file sử dụng JSON5 - hỗ trợ comments và trailing commas:

```json5
{
  // This is a comment
  gateway: {
    mode: "local",
    port: 18789,  // trailing comma OK
  },
}
```

## Cấu trúc Config

```json5
{
  // Gateway settings
  gateway: { ... },

  // Channel configurations
  channels: { ... },

  // Agent settings
  agents: { ... },

  // Provider credentials
  providers: { ... },

  // Tool settings
  tools: { ... },

  // Logging
  logging: { ... },

  // Session settings
  session: { ... },

  // Hook configurations
  hooks: { ... },
}
```

## Gateway Configuration

```json5
{
  gateway: {
    // Mode
    mode: "local",  // local | remote

    // Binding
    bind: "loopback",  // loopback | lan | tailnet | custom
    port: 18789,

    // Authentication (required for non-loopback)
    auth: {
      mode: "token",
      token: "${OPENCLAW_GATEWAY_TOKEN}",
    },

    // Remote gateway (when mode=remote)
    remote: {
      url: "wss://gateway.example.com",
      token: "...",
    },

    // Control UI
    controlUi: {
      enabled: true,
      allowInsecureAuth: false,
    },
  },
}
```

## Channels Configuration

```json5
{
  channels: {
    whatsapp: {
      enabled: true,
      dm: {
        policy: "allowlist",
        allowFrom: ["+84901234567"],
      },
      groupPolicy: "allowlist",
      groups: { ... },
    },

    telegram: {
      enabled: true,
      botToken: "${TELEGRAM_BOT_TOKEN}",
      dm: {
        policy: "pairing",
      },
    },

    discord: {
      enabled: true,
      botToken: "${DISCORD_BOT_TOKEN}",
      // ...
    },
  },
}
```

## Agents Configuration

```json5
{
  agents: {
    defaults: {
      // Model
      model: "anthropic/claude-opus-4-5",
      fallbacks: ["openai/gpt-4o"],
      maxTokens: 4096,

      // Workspace
      workspace: "~/.openclaw/workspace",

      // Sandbox
      sandbox: {
        mode: "off",  // off | docker | non-main
      },

      // Memory
      memory: {
        enabled: true,
      },

      // Skills
      skills: {
        autoLoad: [],
      },

      // Thinking level
      thinkingLevel: "medium",
    },

    // Per-agent overrides
    list: {
      "coding-agent": {
        model: "anthropic/claude-opus-4-5",
        workspace: "~/projects",
      },
    },
  },
}
```

## Providers Configuration

```json5
{
  providers: {
    anthropic: {
      apiKey: "${ANTHROPIC_API_KEY}",
    },
    openai: {
      apiKey: "${OPENAI_API_KEY}",
    },
    // ...
  },
}
```

## Logging Configuration

```json5
{
  logging: {
    level: "info",  // trace | debug | info | warn | error
    consoleLevel: "info",
    consoleStyle: "pretty",  // pretty | json
    file: "/tmp/openclaw/openclaw.log",
    maxSize: "10m",
    maxFiles: 5,
  },
}
```

## Session Configuration

```json5
{
  session: {
    reset: {
      mode: "daily",  // manual | daily | weekly | idle
      atHour: 4,
      timezone: "Asia/Ho_Chi_Minh",
    },
    historyLimit: 100,
  },
}
```

## Environment Variables

Config có thể reference env vars:

```json5
{
  providers: {
    anthropic: {
      apiKey: "${ANTHROPIC_API_KEY}",
    },
  },
}
```

### Supported Env Vars

| Variable | Mô tả |
|----------|-------|
| `OPENCLAW_CONFIG_PATH` | Custom config path |
| `OPENCLAW_STATE_DIR` | State directory |
| `OPENCLAW_GATEWAY_TOKEN` | Gateway auth token |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `OPENAI_API_KEY` | OpenAI API key |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `DISCORD_BOT_TOKEN` | Discord bot token |

### .env File

Tạo `~/.openclaw/.env`:

```bash
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
TELEGRAM_BOT_TOKEN=123456:ABC...
```

## CLI Config Commands

### Get Config

```bash
openclaw config get
openclaw config get gateway.mode
openclaw config get providers.anthropic
```

### Set Config

```bash
openclaw config set gateway.mode local
openclaw config set providers.anthropic.apiKey "sk-..."
```

### Edit Config

```bash
openclaw config edit  # Opens in $EDITOR
```

### Validate Config

```bash
openclaw doctor
```

## Config Profiles

Multiple config profiles:

```bash
# Use profile
OPENCLAW_STATE_DIR=~/.openclaw-work openclaw gateway

# Or
openclaw --profile work gateway
```

## Config Validation

OpenClaw validates config on startup:

```bash
# Check for errors
openclaw doctor

# Fix errors
openclaw doctor --fix
```

## Migration

When config schema changes:

```bash
# Auto-migrate
openclaw doctor --fix

# View changes
openclaw doctor --dry-run
```

## Example Full Config

```json5
{
  gateway: {
    mode: "local",
    bind: "loopback",
    port: 18789,
  },

  channels: {
    whatsapp: {
      enabled: true,
      dm: {
        policy: "allowlist",
        allowFrom: ["+84901234567"],
      },
    },
    telegram: {
      enabled: true,
      botToken: "${TELEGRAM_BOT_TOKEN}",
      dm: {
        policy: "pairing",
      },
    },
  },

  agents: {
    defaults: {
      model: "anthropic/claude-opus-4-5",
      fallbacks: ["openai/gpt-4o"],
      maxTokens: 4096,
      workspace: "~/.openclaw/workspace",
      memory: {
        enabled: true,
      },
    },
  },

  providers: {
    anthropic: {
      apiKey: "${ANTHROPIC_API_KEY}",
    },
    openai: {
      apiKey: "${OPENAI_API_KEY}",
    },
  },

  logging: {
    level: "info",
    consoleLevel: "info",
  },

  session: {
    reset: {
      mode: "daily",
      atHour: 4,
    },
    historyLimit: 100,
  },
}
```

## Xem thêm

- [Environment Variables](/gateway-ops/environment-variables)
- [Gateway](/cli/gateway)
- [Doctor](/cli/doctor)
