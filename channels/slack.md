# Slack

Tích hợp Slack Bot API cho workspaces và direct messages.

## Quick Setup

### Bước 1: Tạo Slack App

1. Truy cập [Slack API](https://api.slack.com/apps)
2. Click "Create New App" → "From scratch"
3. Đặt tên và chọn workspace

### Bước 2: Cấu hình Bot

1. Vào **OAuth & Permissions**
2. Thêm Bot Token Scopes:
   - `chat:write`
   - `channels:history`
   - `channels:read`
   - `groups:history`
   - `groups:read`
   - `im:history`
   - `im:read`
   - `im:write`
   - `users:read`

3. Install App to Workspace
4. Copy **Bot User OAuth Token**

### Bước 3: Enable Events

1. Vào **Event Subscriptions**
2. Enable Events
3. Add Bot Events:
   - `message.channels`
   - `message.groups`
   - `message.im`
   - `app_mention`

### Bước 4: Cấu hình OpenClaw

```json5
{
  channels: {
    slack: {
      enabled: true,
      botToken: "xoxb-...",
      appToken: "xapp-...",  // Cho Socket Mode
      signingSecret: "...",
    },
  },
}
```

## Socket Mode vs HTTP

### Socket Mode (Khuyến nghị)

Không cần public URL, sử dụng WebSocket:

```json5
{
  channels: {
    slack: {
      mode: "socket",
      appToken: "xapp-...",
    },
  },
}
```

### HTTP Mode

Yêu cầu public URL cho webhooks:

```json5
{
  channels: {
    slack: {
      mode: "http",
      signingSecret: "...",
    },
  },
}
```

## Access Control

### DM Policy

```json5
{
  channels: {
    slack: {
      dm: {
        policy: "pairing",  // pairing | allowlist | open | disabled
        allowFrom: ["U1234567890"],
      },
    },
  },
}
```

### Channel Policy

```json5
{
  channels: {
    slack: {
      channelPolicy: "allowlist",
      channels: {
        "C1234567890": {
          enabled: true,
          requireMention: true,
        },
      },
    },
  },
}
```

## Threading

Slack threads được support với isolated sessions:

```json5
{
  channels: {
    slack: {
      threading: {
        enabled: true,
        replyInThread: true,
      },
    },
  },
}
```

## Slash Commands

Đăng ký slash commands trong Slack App settings:

| Command | Mô tả |
|---------|-------|
| `/openclaw` | Main command |
| `/new` | New session |
| `/model` | Switch model |

## Reactions

```json5
{
  channels: {
    slack: {
      ackReaction: {
        emoji: "eyes",
        dm: true,
        channel: "mentions",
      },
    },
  },
}
```

## Block Kit

Agents có thể gửi rich messages với Block Kit:

```json
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Result:* Here's the output"
      }
    }
  ]
}
```

## Config Reference

```json5
{
  channels: {
    slack: {
      enabled: true,
      botToken: "xoxb-...",
      appToken: "xapp-...",
      signingSecret: "...",
      mode: "socket",

      dm: {
        policy: "pairing",
        allowFrom: [],
      },

      channelPolicy: "allowlist",
      channels: {
        "*": {
          requireMention: true,
        },
      },

      threading: {
        enabled: true,
        replyInThread: true,
      },

      ackReaction: {
        emoji: "eyes",
      },
    },
  },
}
```

## Xem thêm

- [Channels Overview](/channels/overview)
- [Discord](/channels/discord)
- [Microsoft Teams](/channels/teams)
