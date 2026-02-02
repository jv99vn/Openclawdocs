# Telegram

Tích hợp Telegram Bot API, production-ready cho direct messages và group conversations sử dụng grammY framework với long-polling theo mặc định.

## Quick Setup

### Bước 1: Tạo Bot Token

1. Mở Telegram và tìm @BotFather
2. Gửi `/newbot`
3. Làm theo hướng dẫn để tạo bot
4. Lưu token được cung cấp

### Bước 2: Cấu hình

Token có thể được cấu hình qua:
- Environment variable: `TELEGRAM_BOT_TOKEN`
- Config file: `channels.telegram.botToken`

### Bước 3: Khởi động Gateway

```bash
openclaw gateway
```

### Bước 4: Approve Pairing

First-time DM contacts cần approve pairing codes.

## Cấu hình tối thiểu

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "123456:ABC-DEF...",
      dm: {
        policy: "pairing",
      },
    },
  },
}
```

## Core Features

### Message Routing

Messages được normalize vào shared envelope format với reply context và media handling.

Group replies thường yêu cầu mentions theo mặc định, tuy nhiên có thể configurable per group.

### Draft Streaming

OpenClaw có thể stream partial replies trong Telegram DMs sử dụng `sendMessageDraft` khi:
- Threaded mode được bật
- Messages bao gồm thread IDs

```json5
{
  channels: {
    telegram: {
      streamMode: "draft",  // off | partial | draft | block
    },
  },
}
```

### Formatting

Outbound text sử dụng Telegram's HTML parse mode, chuyển đổi markdown-style input thành safe HTML tags.

Raw HTML được escape để ngăn parsing errors.

## Group Activation Modes

| Mode | Mô tả |
|------|-------|
| `mentions` (default) | Yêu cầu mentions |
| `always` | Luôn respond |
| `disabled` | Vô hiệu hóa hoàn toàn |

### Cấu hình per-group

```json5
{
  channels: {
    telegram: {
      groups: {
        "-1001234567890": {
          requireMention: false,  // always respond
          historyLimit: 20,
        },
      },
    },
  },
}
```

### Activation Commands

```
/activation always
/activation mentions
/activation off
```

## Access Control

### DM Policy Options

| Policy | Mô tả |
|--------|-------|
| `pairing` (default) | Unknown senders nhận time-limited codes để approval |
| `allowlist` | Numeric user IDs hoặc @usernames |
| `open` | Tất cả users được phép |
| `disabled` | Không có DM access |

### Group Controls

Hai settings độc lập:
1. **Group allowlist**: Groups nào được phép
2. **Sender filtering**: Ai có thể message trong allowed groups

```json5
{
  channels: {
    telegram: {
      groupPolicy: "allowlist",
      groupAllowFrom: ["-1001234567890"],
      groups: {
        "-1001234567890": {
          allowFrom: ["123456789", "@username"],
        },
      },
    },
  },
}
```

## Advanced Capabilities

### Inline Buttons

Agents có thể gửi keyboard buttons với configurable scopes:
- DMs only
- Groups only
- All
- Allowlist-restricted

```json5
{
  channels: {
    telegram: {
      buttons: {
        scope: "dm",  // dm | group | all | allowlist
      },
    },
  },
}
```

### Stickers

- Static stickers được xử lý thông qua vision với automatic caching
- System tìm kiếm cached descriptions để giảm redundant API calls

### Reactions

Telegram reactions đến dưới dạng separate `message_reaction` events, không phải properties trong message payloads.

Được xử lý như system notifications prepended vào context.

```json5
{
  channels: {
    telegram: {
      reactions: {
        notify: true,
        allowlist: ["👍", "❤️", "🔥"],
      },
    },
  },
}
```

### Threading & Forum Topics

- Forum topics nhận isolated session keys
- Per-topic configuration overrides cho mention requirements và allowed skills

```json5
{
  channels: {
    telegram: {
      forums: {
        "-1001234567890": {
          topics: {
            "123": {
              requireMention: false,
              skills: ["coding", "writing"],
            },
          },
        },
      },
    },
  },
}
```

## Troubleshooting

### Privacy Mode Blocking

Bot không nhận unmentioned group messages.

**Fix**: Disable privacy mode trong @BotFather hoặc chỉ sử dụng mention-based activation.

### IPv6 Routing Problems

Silent failures khi Telegram không thể reach bot.

**Fix**: Đảm bảo server có IPv6 connectivity hoặc configure IPv4-only.

### Node 22+ Incompatibility

Certain abort signal implementations có vấn đề.

**Fix**:
```bash
# Kiểm tra Node version
node --version

# Nếu cần, sử dụng version manager
nvm use 20
```

## Config Reference đầy đủ

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "123456:ABC-DEF...",

      // DM settings
      dm: {
        policy: "pairing",
        allowFrom: ["123456789"],
      },

      // Group settings
      groupPolicy: "allowlist",
      groupAllowFrom: ["-1001234567890"],
      groups: {
        "*": {
          requireMention: true,
          historyLimit: 10,
        },
      },

      // Streaming
      streamMode: "draft",

      // Buttons
      buttons: {
        scope: "dm",
      },

      // Reactions
      reactions: {
        notify: true,
      },

      // Link previews
      linkPreview: false,

      // Retry policy
      retry: {
        initialMs: 1000,
        maxMs: 30000,
        factor: 2,
        maxAttempts: 5,
      },
    },
  },
}
```

## Xem thêm

- [Channels Overview](/channels/overview)
- [WhatsApp](/channels/whatsapp)
- [Discord](/channels/discord)
- [grammY](/channels/grammy)
