# Signal

Tích hợp Signal Messenger cho private, encrypted messaging.

## Tổng quan

Signal integration sử dụng signal-cli hoặc signald để kết nối với Signal network. Đây là channel privacy-focused với end-to-end encryption.

## Prerequisites

### Option 1: signal-cli

```bash
# macOS
brew install signal-cli

# Linux
# Download từ GitHub releases
wget https://github.com/AsamK/signal-cli/releases/latest/download/signal-cli-*.tar.gz
```

### Option 2: signald

```bash
# Sử dụng Docker
docker run -v signald:/signald signald/signald
```

## Quick Setup

### Bước 1: Đăng ký số điện thoại

```bash
signal-cli -u +84901234567 register
```

### Bước 2: Verify với SMS code

```bash
signal-cli -u +84901234567 verify CODE
```

### Bước 3: Cấu hình OpenClaw

```json5
{
  channels: {
    signal: {
      enabled: true,
      phoneNumber: "+84901234567",
      backend: "signal-cli",  // signal-cli | signald
    },
  },
}
```

## Cấu hình

### signal-cli Backend

```json5
{
  channels: {
    signal: {
      backend: "signal-cli",
      configPath: "~/.local/share/signal-cli",
      phoneNumber: "+84901234567",
    },
  },
}
```

### signald Backend

```json5
{
  channels: {
    signal: {
      backend: "signald",
      socketPath: "/var/run/signald/signald.sock",
      phoneNumber: "+84901234567",
    },
  },
}
```

## Access Control

### DM Policy

```json5
{
  channels: {
    signal: {
      dm: {
        policy: "pairing",
        allowFrom: ["+84987654321"],
      },
    },
  },
}
```

### Group Policy

```json5
{
  channels: {
    signal: {
      groupPolicy: "allowlist",
      groups: {
        "group-id-here": {
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

- ✅ Direct messages
- ✅ Group messages
- ✅ Image attachments
- ✅ Voice messages
- ✅ Reactions
- ✅ Typing indicators

### Limitations

- ❌ Video calls
- ❌ Stories
- ❌ Disappearing messages (partial)

## Media Handling

### Inbound Media

```json5
{
  channels: {
    signal: {
      media: {
        maxSize: "50mb",
        allowedTypes: ["image/*", "audio/*", "video/*"],
      },
    },
  },
}
```

### Outbound Media

```json5
{
  channels: {
    signal: {
      media: {
        outbound: {
          maxSize: "10mb",
          compress: true,
        },
      },
    },
  },
}
```

## Reactions

```json5
{
  channels: {
    signal: {
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

### signal-cli không tìm thấy

```bash
# Kiểm tra installation
which signal-cli

# Verify registration
signal-cli -u +84901234567 receive
```

### Captcha required

Signal có thể yêu cầu captcha khi đăng ký:

```bash
signal-cli -u +84901234567 register --captcha "captcha-token"
```

### Rate limiting

Signal có rate limits nghiêm ngặt. Nếu bị rate limited:

1. Đợi 24-48 giờ
2. Sử dụng số điện thoại khác

## Config Reference đầy đủ

```json5
{
  channels: {
    signal: {
      enabled: true,
      phoneNumber: "+84901234567",
      backend: "signal-cli",

      // signal-cli specific
      configPath: "~/.local/share/signal-cli",

      // signald specific
      socketPath: "/var/run/signald/signald.sock",

      // Access control
      dm: {
        policy: "pairing",
        allowFrom: [],
      },

      groupPolicy: "allowlist",
      groups: {},

      // Media
      media: {
        maxSize: "50mb",
      },

      // Reactions
      ackReaction: {
        emoji: "👀",
      },

      // Retry
      retry: {
        maxAttempts: 3,
        initialMs: 1000,
      },
    },
  },
}
```

## Xem thêm

- [Channels Overview](/channels/overview)
- [WhatsApp](/channels/whatsapp)
- [Telegram](/channels/telegram)
