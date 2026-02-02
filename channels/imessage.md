# iMessage

Tích hợp iMessage cho macOS sử dụng imsg CLI tool.

::: warning macOS Only
iMessage integration chỉ available trên macOS do yêu cầu Messages.app framework.
:::

## Prerequisites

- macOS 12+ (Monterey trở lên)
- Messages.app đã đăng nhập với Apple ID
- Full Disk Access permission cho OpenClaw

## Quick Setup

### Bước 1: Grant Permissions

1. System Preferences → Security & Privacy → Privacy
2. Full Disk Access → Add OpenClaw/Terminal
3. Automation → Allow OpenClaw to control Messages

### Bước 2: Cấu hình

```json5
{
  channels: {
    imessage: {
      enabled: true,
      dm: {
        policy: "allowlist",
        allowFrom: ["+84901234567", "email@icloud.com"],
      },
    },
  },
}
```

### Bước 3: Khởi động Gateway

```bash
openclaw gateway
```

## Cấu hình chi tiết

### DM Policy

```json5
{
  channels: {
    imessage: {
      dm: {
        policy: "pairing",  // pairing | allowlist | open | disabled
        allowFrom: [
          "+84901234567",
          "friend@icloud.com",
        ],
      },
    },
  },
}
```

### Group Policy

```json5
{
  channels: {
    imessage: {
      groupPolicy: "allowlist",
      groups: {
        "chat123456789": {
          enabled: true,
          requireMention: true,
        },
      },
    },
  },
}
```

## Features

### Supported

- ✅ Direct messages (SMS và iMessage)
- ✅ Group chats
- ✅ Image attachments
- ✅ Tapbacks (reactions)
- ✅ Read receipts
- ✅ Typing indicators

### Limitations

- ❌ Chỉ macOS
- ❌ Không có API chính thức (sử dụng AppleScript/SQLite)
- ❌ Video/audio messages (partial support)

## Message Types

### iMessage vs SMS

OpenClaw tự động detect message type:

| Type | Indicator |
|------|-----------|
| iMessage | Blue bubble, encrypted |
| SMS | Green bubble, qua carrier |

### Handling

```json5
{
  channels: {
    imessage: {
      // Chỉ respond iMessage, ignore SMS
      messageTypes: ["imessage"],

      // Hoặc cả hai
      messageTypes: ["imessage", "sms"],
    },
  },
}
```

## Tapbacks (Reactions)

iMessage tapbacks được support:

| Tapback | Emoji |
|---------|-------|
| Love | ❤️ |
| Like | 👍 |
| Dislike | 👎 |
| Laugh | 😂 |
| Emphasis | ‼️ |
| Question | ❓ |

### Cấu hình

```json5
{
  channels: {
    imessage: {
      ackReaction: {
        tapback: "like",  // love | like | dislike | laugh | emphasis | question
        dm: true,
        group: "mentions",
      },
    },
  },
}
```

## Media Handling

### Inbound

```json5
{
  channels: {
    imessage: {
      media: {
        maxSize: "100mb",
        downloadPath: "~/.openclaw/media/imessage",
      },
    },
  },
}
```

### Outbound

```json5
{
  channels: {
    imessage: {
      media: {
        outbound: {
          maxSize: "50mb",
          compress: true,
        },
      },
    },
  },
}
```

## Troubleshooting

### Permission Denied

```bash
# Reset permissions
tccutil reset All com.apple.Messages
```

Sau đó grant lại permissions trong System Preferences.

### Messages not received

1. Kiểm tra Messages.app đang chạy
2. Verify Apple ID đã đăng nhập
3. Check Full Disk Access permission

### Database locked

```bash
# Close Messages.app temporarily
osascript -e 'tell application "Messages" to quit'
# Restart gateway
openclaw gateway restart
```

## imsg CLI

OpenClaw sử dụng imsg CLI tool internally:

```bash
# Send message
imsg send "+84901234567" "Hello"

# List conversations
imsg list

# Read messages
imsg read "+84901234567"
```

## Config Reference

```json5
{
  channels: {
    imessage: {
      enabled: true,

      // Access control
      dm: {
        policy: "allowlist",
        allowFrom: [],
      },

      groupPolicy: "disabled",
      groups: {},

      // Message types
      messageTypes: ["imessage", "sms"],

      // Reactions
      ackReaction: {
        tapback: "like",
        dm: true,
        group: "mentions",
      },

      // Media
      media: {
        maxSize: "100mb",
        downloadPath: "~/.openclaw/media/imessage",
      },

      // Polling interval (ms)
      pollInterval: 1000,
    },
  },
}
```

## Xem thêm

- [Channels Overview](/channels/overview)
- [WhatsApp](/channels/whatsapp)
- [macOS App](/platforms/macos)
