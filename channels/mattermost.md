# Mattermost

Mattermost là nền tảng nhắn tin team tự host được. OpenClaw tích hợp qua plugin với hỗ trợ channels, groups và direct messages sử dụng bot tokens và WebSocket events.

## Cài đặt Plugin

Plugin Mattermost yêu cầu cài đặt riêng:

```bash
# NPM
openclaw plugins install @openclaw/mattermost

# Từ local checkout
openclaw plugins install ./extensions/mattermost
```

## Thiết lập

### Tạo Bot Account

1. Mở Mattermost System Console
2. Vào **Integrations** → **Bot Accounts**
3. Tạo bot mới với permissions phù hợp
4. Copy **Bot Token**

### Cấu hình cơ bản

```json5
{
  channels: {
    mattermost: {
      enabled: true,
      botToken: "${MATTERMOST_BOT_TOKEN}",
      url: "https://your-mattermost.example.com",
      dmPolicy: "pairing",
    },
  },
}
```

### Environment Variables

```bash
export MATTERMOST_BOT_TOKEN="your-bot-token"
export MATTERMOST_URL="https://your-mattermost.example.com"
```

## Chế độ Chat

### oncall (Mặc định)

Chỉ phản hồi khi được @mention:

```json5
{
  channels: {
    mattermost: {
      chatMode: "oncall",  // default
    },
  },
}
```

### onmessage

Phản hồi tất cả messages trong channel:

```json5
{
  channels: {
    mattermost: {
      chatMode: "onmessage",
    },
  },
}
```

### onchar

Kích hoạt với trigger prefix:

```json5
{
  channels: {
    mattermost: {
      chatMode: "onchar",
      triggerPrefix: ">",  // hoặc "!"
    },
  },
}
```

## Kiểm soát truy cập

### DM Policy

```json5
{
  channels: {
    mattermost: {
      dmPolicy: "pairing",  // Mặc định: yêu cầu pairing code
      // dmPolicy: "open",     // Cho phép mọi người
      // dmPolicy: "allowlist", // Chỉ users trong danh sách
    },
  },
}
```

### Pairing Mode

Khi nhận DM từ người lạ, bot gửi pairing code:

```bash
# Approve pairing code
openclaw pairing approve mattermost <CODE>

# List pending
openclaw pairing list

# Deny
openclaw pairing deny mattermost <CODE>
```

### Allowlist

```json5
{
  channels: {
    mattermost: {
      dmPolicy: "allowlist",
      allowFrom: ["user-id-1", "user-id-2"],
    },
  },
}
```

### Group Policy

```json5
{
  channels: {
    mattermost: {
      groupPolicy: "allowlist",
      allowGroups: ["channel-id-1", "channel-id-2"],
    },
  },
}
```

## Multi-Account

Cấu hình nhiều Mattermost instances:

```json5
{
  channels: {
    mattermost: {
      enabled: true,
      accounts: {
        work: {
          botToken: "${MATTERMOST_WORK_TOKEN}",
          url: "https://work.example.com",
          dmPolicy: "pairing",
        },
        personal: {
          botToken: "${MATTERMOST_PERSONAL_TOKEN}",
          url: "https://personal.example.com",
          dmPolicy: "open",
        },
      },
    },
  },
}
```

## Gửi tin nhắn

### Target Formats

| Format | Mô tả |
|--------|-------|
| `channel:<id>` | Gửi đến channel |
| `user:<id>` | Gửi DM đến user |
| `@username` | Gửi DM theo username |
| `<bare-id>` | Mặc định là channel |

### Ví dụ

```typescript
// Gửi đến channel
await agent.send({
  target: "channel:abc123",
  content: "Hello channel!",
});

// Gửi DM
await agent.send({
  target: "user:xyz789",
  content: "Hello user!",
});

// Gửi theo username
await agent.send({
  target: "@john.doe",
  content: "Hi John!",
});
```

## Tính năng

### Hỗ trợ

| Tính năng | Trạng thái |
|-----------|------------|
| Direct Messages | ✅ |
| Channels | ✅ |
| Private Channels | ✅ |
| Threads | ✅ |
| Reactions | ✅ |
| File Attachments | ✅ |
| Images | ✅ |
| Markdown | ✅ |
| Streaming | ✅ |

### Giới hạn

- Message length: 16,383 characters (tự động chunk)
- File size: Tùy thuộc cấu hình server

## Cấu hình đầy đủ

```json5
{
  channels: {
    mattermost: {
      enabled: true,

      // Credentials
      botToken: "${MATTERMOST_BOT_TOKEN}",
      url: "https://your-mattermost.example.com",

      // Chat mode
      chatMode: "oncall",       // oncall | onmessage | onchar
      triggerPrefix: ">",       // Cho onchar mode

      // Access control
      dmPolicy: "pairing",
      groupPolicy: "allowlist",
      allowFrom: [],
      allowGroups: [],

      // Features
      threadReplies: "inbound", // off | inbound | always
      reactions: true,

      // Limits
      mediaMaxMb: 10,
    },
  },
}
```

## Troubleshooting

### Bot không nhận messages

1. Kiểm tra bot token hợp lệ
2. Verify bot được invite vào channels
3. Kiểm tra permissions trong System Console

### Connection issues

```bash
# Test connection
curl -H "Authorization: Bearer $MATTERMOST_BOT_TOKEN" \
  https://your-mattermost.example.com/api/v4/users/me
```

### WebSocket disconnects

- Kiểm tra firewall rules
- Verify WebSocket được enable trên server
- Check server logs

## Xem thêm

- [Channels Overview](/channels/overview)
- [Slack](/channels/slack)
- [Discord](/channels/discord)
