# Chat Channels

OpenClaw hỗ trợ nhiều nền tảng nhắn tin, cho phép bạn tương tác với AI qua các kênh quen thuộc.

## Channels được hỗ trợ

### Consumer Messaging

| Channel | Technology | Status |
|---------|------------|--------|
| [WhatsApp](/channels/whatsapp) | Baileys | ✅ Production |
| [Telegram](/channels/telegram) | grammY | ✅ Production |
| [Discord](/channels/discord) | discord.js | ✅ Production |
| [Signal](/channels/signal) | signal-cli | ✅ Beta |
| [iMessage](/channels/imessage) | imsg CLI | ✅ macOS only |

### Enterprise

| Channel | Technology | Status |
|---------|------------|--------|
| [Slack](/channels/slack) | Bolt | ✅ Production |
| [Microsoft Teams](/channels/teams) | Bot Framework | ✅ Production |
| [Google Chat](/channels/google-chat) | API | ✅ Production |
| [Mattermost](/channels/mattermost) | Plugin | ✅ Production |

### Other

| Channel | Technology | Status |
|---------|------------|--------|
| [LINE](/channels/line) | Messaging API | ✅ Beta |
| [Matrix](/channels/matrix) | matrix-js-sdk | ✅ Beta |
| [Zalo](/channels/zalo) | OA API | ✅ Beta |
| WebChat | Built-in | ✅ Production |

## Quick Start

### 1. Enable Channel

```json5
{
  channels: {
    whatsapp: {
      enabled: true,
    },
    telegram: {
      enabled: true,
      botToken: "...",
    },
  },
}
```

### 2. Configure Access

```json5
{
  channels: {
    whatsapp: {
      dm: {
        policy: "allowlist",
        allowFrom: ["+84901234567"],
      },
    },
  },
}
```

### 3. Login/Connect

```bash
openclaw channels login whatsapp
openclaw channels login telegram
```

## Access Control

### DM Policy Options

| Policy | Mô tả |
|--------|-------|
| `pairing` | Unknown senders nhận time-limited codes |
| `allowlist` | Chỉ allowed contacts |
| `open` | Tất cả users |
| `disabled` | Không có DM access |

### Group Policy Options

| Policy | Mô tả |
|--------|-------|
| `allowlist` | Chỉ allowed groups |
| `open` | Tất cả groups |
| `disabled` | Không có group access |

### Example Config

```json5
{
  channels: {
    whatsapp: {
      dm: {
        policy: "pairing",
      },
      groupPolicy: "allowlist",
      groups: {
        "120363xxx@g.us": {
          enabled: true,
          requireMention: true,
        },
      },
    },
  },
}
```

## Channel Commands

### CLI

```bash
# Status
openclaw channels status
openclaw channels status --probe

# Login
openclaw channels login <channel>
openclaw channels login whatsapp
openclaw channels login telegram

# Logout
openclaw channels logout <channel>

# List
openclaw channels list
```

### In-Chat

```
/channels       - List enabled channels
/channel status - Current channel status
```

## Multi-Channel Setup

### Example: Production Config

```json5
{
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
    discord: {
      enabled: true,
      botToken: "${DISCORD_BOT_TOKEN}",
      dm: {
        policy: "pairing",
      },
      groupPolicy: "allowlist",
      guilds: {
        "1234567890": {
          enabled: true,
        },
      },
    },
  },
}
```

## Channel Routing

Messages được route tới correct agent dựa trên:
- Channel type
- Sender identity
- Group membership
- Session state

### Multi-Agent Routing

```json5
{
  agents: {
    list: {
      "work-agent": {
        channels: ["slack", "teams"],
      },
      "personal-agent": {
        channels: ["whatsapp", "telegram"],
      },
    },
  },
}
```

## Media Handling

### Supported Media Types

| Type | WhatsApp | Telegram | Discord | Slack |
|------|----------|----------|---------|-------|
| Images | ✅ | ✅ | ✅ | ✅ |
| Audio | ✅ | ✅ | ✅ | ✅ |
| Video | ✅ | ✅ | ✅ | ✅ |
| Documents | ✅ | ✅ | ✅ | ✅ |
| Voice | ✅ | ✅ | ❌ | ❌ |
| Stickers | ✅ | ✅ | ✅ | ❌ |

### Media Limits

```json5
{
  channels: {
    whatsapp: {
      media: {
        maxInbound: "50mb",
        maxOutbound: "5mb",
      },
    },
  },
}
```

## Reactions

### Acknowledgment Reactions

```json5
{
  channels: {
    telegram: {
      ackReaction: {
        emoji: "👀",
        dm: true,
        group: "mentions",
      },
    },
  },
}
```

## Troubleshooting

### Channel not connecting

```bash
openclaw channels status --probe
openclaw doctor
```

### Messages not received

1. Check allowlist/policy
2. Verify credentials
3. Check logs:
   ```bash
   openclaw logs --follow | grep channels
   ```

## Xem thêm

- [WhatsApp](/channels/whatsapp)
- [Telegram](/channels/telegram)
- [Discord](/channels/discord)
- [Channel Troubleshooting](/channels/troubleshooting)
