# Discord

Tích hợp Discord Bot API cho servers và direct messages.

## Quick Setup

### Bước 1: Tạo Discord Application

1. Truy cập [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Đặt tên cho application
4. Vào Bot section và click "Add Bot"
5. Copy Bot Token

### Bước 2: Cấu hình Intents

Trong Bot settings, enable các intents cần thiết:
- **Message Content Intent** (bắt buộc)
- Server Members Intent (optional)
- Presence Intent (optional)

### Bước 3: Invite Bot

1. Vào OAuth2 → URL Generator
2. Chọn scopes: `bot`, `applications.commands`
3. Chọn permissions: Send Messages, Read Message History, Add Reactions
4. Copy invite URL và add bot vào server

### Bước 4: Cấu hình OpenClaw

```json5
{
  channels: {
    discord: {
      enabled: true,
      botToken: "YOUR_BOT_TOKEN",
      dm: {
        policy: "pairing",
      },
    },
  },
}
```

## Core Features

### Guild (Server) Management

| Setting | Mô tả |
|---------|-------|
| `groupPolicy` | `allowlist` (default), `open`, `disabled` |
| `guilds` | Per-guild configuration |
| `requireMention` | Yêu cầu mention để trigger |

### DM Policy

| Policy | Mô tả |
|--------|-------|
| `pairing` | Unknown users nhận pairing code |
| `allowlist` | Chỉ allowed user IDs |
| `open` | Tất cả users |
| `disabled` | Không có DMs |

## Cấu hình Guild

### Allowlist Guild

```json5
{
  channels: {
    discord: {
      groupPolicy: "allowlist",
      guilds: {
        "1234567890": {
          enabled: true,
          requireMention: true,
        },
      },
    },
  },
}
```

### Open Guild (không cần mention)

```json5
{
  channels: {
    discord: {
      guilds: {
        "1234567890": {
          requireMention: false,
        },
      },
    },
  },
}
```

### Channel Filtering

Chỉ cho phép specific channels:

```json5
{
  channels: {
    discord: {
      guilds: {
        "1234567890": {
          channels: ["9876543210", "1122334455"],
        },
      },
    },
  },
}
```

## Threading

Discord threads được support với isolated sessions:

```json5
{
  channels: {
    discord: {
      guilds: {
        "1234567890": {
          threads: {
            enabled: true,
            autoCreate: false,
          },
        },
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
    discord: {
      ackReaction: {
        emoji: "👀",
        dm: true,
        guild: "mentions",
      },
    },
  },
}
```

### Processing Reactions

Bot reactions cho processing status:

| Emoji | Mô tả |
|-------|-------|
| 👀 | Message received |
| 🔄 | Processing |
| ✅ | Completed |

## Slash Commands

Discord slash commands được auto-registered:

| Command | Mô tả |
|---------|-------|
| `/new` | Start new session |
| `/reset` | Reset session |
| `/model` | Switch model |
| `/status` | Check status |

### Register Commands

```bash
openclaw channels discord commands sync
```

## Embeds và Formatting

### Rich Embeds

Agents có thể gửi rich embeds:

```json
{
  "embeds": [{
    "title": "Result",
    "description": "Here's the output",
    "color": 5814783,
    "fields": [
      {"name": "Field 1", "value": "Value 1"}
    ]
  }]
}
```

### Code Blocks

Markdown code blocks được preserved:

````
```python
print("Hello World")
```
````

## Troubleshooting

### Bot không reply trong server

**Check 1:** Guild có được allowlist không?

```json5
{
  channels: {
    discord: {
      groupPolicy: "allowlist",
      guilds: {
        "YOUR_GUILD_ID": {
          enabled: true,
        },
      },
    },
  },
}
```

**Check 2:** Message Content Intent đã enabled?

Vào Discord Developer Portal → Your App → Bot → Enable "Message Content Intent"

**Check 3:** Bot có permissions?

Ensure bot có:
- Read Messages
- Send Messages
- Read Message History

### requireMention: false không work

`requireMention` chỉ control mention-gating SAU KHI channel passes allowlists.

**Fix checklist:**

1. Set `groupPolicy: "open"` HOẶC add guild allowlist entry
2. Sử dụng numeric channel IDs trong `channels`
3. Đặt `requireMention: false` dưới `guilds` (global hoặc per-channel)
4. Ensure bot có Message Content Intent và channel permissions
5. Chạy `openclaw channels status --probe` cho audit hints

## Config Reference đầy đủ

```json5
{
  channels: {
    discord: {
      enabled: true,
      botToken: "YOUR_BOT_TOKEN",

      // DM settings
      dm: {
        policy: "pairing",
        allowFrom: ["123456789"],
      },

      // Guild settings
      groupPolicy: "allowlist",
      guilds: {
        "1234567890": {
          enabled: true,
          requireMention: true,
          channels: ["9876543210"],
          threads: {
            enabled: true,
          },
          allowFrom: ["123456789"],
        },
      },

      // Reactions
      ackReaction: {
        emoji: "👀",
        dm: true,
        guild: "mentions",
      },

      // Streaming
      streamMode: "off",

      // History
      historyLimit: 10,
    },
  },
}
```

## Xem thêm

- [Channels Overview](/channels/overview)
- [WhatsApp](/channels/whatsapp)
- [Telegram](/channels/telegram)
- [Troubleshooting](/gateway-ops/troubleshooting)
