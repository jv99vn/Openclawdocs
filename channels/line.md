# LINE

LINE plugin cho phép OpenClaw tích hợp với LINE Messaging API, hoạt động như webhook receiver trên gateway. Hỗ trợ direct messages, group chats, media, locations, Flex messages, template messages và quick replies.

## Cài đặt Plugin

```bash
# NPM
openclaw plugins install @openclaw/line

# Từ local git repository
openclaw plugins install ./extensions/line
```

## Thiết lập

### 1. Tạo LINE Developers Account

1. Truy cập [LINE Developers Console](https://developers.line.biz/console/)
2. Đăng nhập với LINE account
3. Tạo Provider mới (nếu chưa có)

### 2. Tạo Messaging API Channel

1. Trong Provider, click "Create a new channel"
2. Chọn "Messaging API"
3. Điền thông tin channel
4. Sau khi tạo, vào tab **Messaging API**:
   - Copy **Channel access token** (long-lived)
   - Copy **Channel secret**

### 3. Cấu hình Webhook

1. Trong LINE Console, vào **Messaging API** → **Webhook settings**
2. Enable webhooks
3. Set Webhook URL: `https://your-gateway-host/line/webhook`
4. Click "Verify" để test

::: warning HTTPS Required
LINE yêu cầu webhook URL phải là HTTPS với valid certificate.
:::

### 4. Cấu hình OpenClaw

```json5
{
  channels: {
    line: {
      enabled: true,
      channelAccessToken: "${LINE_CHANNEL_ACCESS_TOKEN}",
      channelSecret: "${LINE_CHANNEL_SECRET}",
      dmPolicy: "pairing",
    },
  },
}
```

### Environment Variables

```bash
export LINE_CHANNEL_ACCESS_TOKEN="your-channel-access-token"
export LINE_CHANNEL_SECRET="your-channel-secret"
```

## Kiểm soát truy cập

### DM Policy

```json5
{
  channels: {
    line: {
      dmPolicy: "pairing",  // Mặc định
      // dmPolicy: "open",
      // dmPolicy: "allowlist",
    },
  },
}
```

### Pairing Mode

Người dùng mới nhận pairing code để admin approve:

```bash
openclaw pairing approve line <CODE>
openclaw pairing list
openclaw pairing deny line <CODE>
```

### Allowlist

LINE IDs có format case-sensitive:
- User: `U` + 32 hex characters
- Group: `C` + 32 hex characters
- Room: `R` + 32 hex characters

```json5
{
  channels: {
    line: {
      dmPolicy: "allowlist",
      allowFrom: ["U1234567890abcdef1234567890abcdef"],

      groupPolicy: "allowlist",
      allowGroups: ["C1234567890abcdef1234567890abcdef"],
    },
  },
}
```

## Tính năng Messages

### Text

- Giới hạn: 5,000 characters per message
- Tự động chunk tin nhắn dài
- Markdown bị strip; code blocks chuyển thành Flex cards

### Streaming

- Responses được buffer với loading animations
- Không streaming character-by-character

### Media

| Loại | Hỗ trợ | Giới hạn |
|------|--------|----------|
| Images | ✅ | 10MB mặc định |
| Videos | ✅ | 10MB mặc định |
| Audio | ✅ | 10MB mặc định |
| Files | ❌ | Không hỗ trợ |

```json5
{
  channels: {
    line: {
      mediaMaxMb: 10,  // Giới hạn download
    },
  },
}
```

## Rich Messages

### Quick Replies

```typescript
await agent.send({
  content: "Bạn muốn làm gì?",
  channelData: {
    line: {
      quickReply: {
        items: [
          {
            type: "action",
            action: { type: "message", label: "Tùy chọn 1", text: "1" },
          },
          {
            type: "action",
            action: { type: "message", label: "Tùy chọn 2", text: "2" },
          },
        ],
      },
    },
  },
});
```

### Flex Messages

```typescript
await agent.send({
  channelData: {
    line: {
      type: "flex",
      altText: "Card message",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "Hello Flex!",
              weight: "bold",
              size: "xl",
            },
          ],
        },
      },
    },
  },
});
```

### Location

```typescript
await agent.send({
  channelData: {
    line: {
      type: "location",
      title: "My Location",
      address: "123 Street, City",
      latitude: 35.6812,
      longitude: 139.7671,
    },
  },
});
```

### Template Messages

```typescript
await agent.send({
  channelData: {
    line: {
      type: "template",
      altText: "Buttons template",
      template: {
        type: "buttons",
        text: "Choose an option",
        actions: [
          { type: "message", label: "Option A", text: "A" },
          { type: "message", label: "Option B", text: "B" },
        ],
      },
    },
  },
});
```

### Card Command

Sử dụng `/card` command để tạo Flex message presets:

```
/card product "Sản phẩm A" 100000
```

## Multi-Account

```json5
{
  channels: {
    line: {
      enabled: true,
      accounts: {
        main: {
          channelAccessToken: "${LINE_MAIN_TOKEN}",
          channelSecret: "${LINE_MAIN_SECRET}",
          dmPolicy: "pairing",
        },
        support: {
          channelAccessToken: "${LINE_SUPPORT_TOKEN}",
          channelSecret: "${LINE_SUPPORT_SECRET}",
          dmPolicy: "open",
        },
      },
    },
  },
}
```

## Tính năng

| Tính năng | Trạng thái |
|-----------|------------|
| Direct Messages | ✅ |
| Group Chats | ✅ |
| Room Chats | ✅ |
| Images | ✅ |
| Videos | ✅ |
| Audio | ✅ |
| Location | ✅ |
| Quick Replies | ✅ |
| Flex Messages | ✅ |
| Template Messages | ✅ |
| Stickers | ⚠️ Nhận được, không gửi được |
| Reactions | ❌ |
| Threads | ❌ |

## Cấu hình đầy đủ

```json5
{
  channels: {
    line: {
      enabled: true,

      // Credentials
      channelAccessToken: "${LINE_CHANNEL_ACCESS_TOKEN}",
      channelSecret: "${LINE_CHANNEL_SECRET}",

      // Webhook (nếu dùng custom path)
      webhookPath: "/line/webhook",

      // Access control
      dmPolicy: "pairing",
      groupPolicy: "allowlist",
      allowFrom: [],
      allowGroups: [],

      // Features
      mediaMaxMb: 10,

      // Multi-account
      accounts: {},
    },
  },
}
```

## Troubleshooting

### Webhook verification fails

1. Kiểm tra URL đúng format HTTPS
2. Verify certificate hợp lệ
3. Kiểm tra path: `/line/webhook`
4. Ensure gateway đang chạy

### Media không tải được

1. Kiểm tra `mediaMaxMb` setting
2. Verify network connectivity
3. Check LINE API quotas

### Messages không nhận

1. Verify webhook enabled trong LINE Console
2. Check channel access token còn valid
3. Xem gateway logs: `openclaw logs --follow`

## Xem thêm

- [Channels Overview](/channels/overview)
- [Telegram](/channels/telegram)
- [Zalo](/channels/zalo)
