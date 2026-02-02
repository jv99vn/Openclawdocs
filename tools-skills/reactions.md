# Phản hồi Emoji (Reactions)

Reactions cho phép agent phản hồi bằng emoji thay vì hoặc bổ sung cho text responses.

## Tổng quan

- **Phản hồi không lời** - React mà không cần gõ chữ
- **Xác nhận nhanh** - Nhanh chóng confirm nhận tin
- **Hỗ trợ đa kênh** - Hoạt động trên nhiều platforms
- **Tùy chỉnh được** - Cấu hình reaction behavior

## Các kênh hỗ trợ

| Kênh | Reactions |
|------|-----------|
| Discord | ✅ Đầy đủ emoji |
| Slack | ✅ Đầy đủ emoji |
| Telegram | ✅ Giới hạn |
| WhatsApp | ✅ Giới hạn |
| iMessage | ✅ Tapbacks |
| Signal | ✅ Giới hạn |

## Cách hoạt động

### Tự động React

Agent tự động react dựa trên ngữ cảnh:

```json5
{
  reactions: {
    auto: {
      enabled: true,
      rules: [
        { trigger: "thanks", reaction: "👍" },
        { trigger: "good job", reaction: "🎉" },
        { trigger: "?", reaction: "🤔" },
      ],
    },
  },
}
```

### Dựa trên Tool

Agent sử dụng tool để react:

```json
{
  "tool": "react",
  "params": {
    "messageId": "msg123",
    "emoji": "👍"
  }
}
```

## Cấu hình

### Cơ bản

```json5
{
  reactions: {
    enabled: true,
    defaultReaction: "👍",
  },
}
```

### Cấu hình đầy đủ

```json5
{
  reactions: {
    enabled: true,

    // Auto reactions
    auto: {
      enabled: true,
      onAcknowledge: "👍",
      onThinking: "🤔",
      onComplete: "✅",
      onError: "❌",
    },

    // Channel-specific
    channels: {
      discord: {
        useCustomEmoji: true,
        customEmojis: {
          acknowledge: "<:ok:123456>",
        },
      },
      whatsapp: {
        enabled: true,
        // WhatsApp has limited reactions
      },
    },

    // Rules
    rules: [
      {
        trigger: "thanks",
        reaction: "❤️",
        probability: 0.8,
      },
    ],
  },
}
```

## Trường hợp sử dụng

### Xác nhận

User: Nhắc tôi về cuộc họp
Agent: [React 👍]
Agent: Tôi sẽ nhắc bạn về cuộc họp lúc 3pm

### Chỉ báo đang xử lý

User: Phân tích dữ liệu này...
Agent: [React 🤔] (đang suy nghĩ)
Agent: [Xóa 🤔, thêm ✅] (xong)
Agent: Đây là phân tích của tôi...

### Phản hồi

User: Làm tốt lắm!
Agent: [React 🎉]

### Chỉ báo lỗi

User: Chạy tác vụ bất khả thi
Agent: [React ❌]
Agent: Xin lỗi, tôi không thể làm điều đó vì...

## Đặc thù từng nền tảng

### Discord

Hỗ trợ đầy đủ custom emoji:

```json5
{
  channels: {
    discord: {
      reactions: {
        useCustomEmoji: true,
        guildEmojis: {
          thinking: "<:thinking:123>",
          done: "<:done:456>",
        },
      },
    },
  },
}
```

### Slack

Hỗ trợ workspace emoji:

```json5
{
  channels: {
    slack: {
      reactions: {
        workspaceEmoji: true,
      },
    },
  },
}
```

### iMessage

Các reaction Tapback:

| Tapback | Ý nghĩa |
|---------|---------|
| ❤️ | Yêu thích |
| 👍 | Thích |
| 👎 | Không thích |
| 😂 | Hài hước |
| ‼️ | Nhấn mạnh |
| ❓ | Thắc mắc |

### WhatsApp

Giới hạn các reaction tiêu chuẩn:
- 👍 👎 ❤️ 😂 😮 😢 🙏

## Tool: react

### Thêm Reaction

```json
{
  "tool": "react",
  "params": {
    "messageId": "msg123",
    "emoji": "👍"
  }
}
```

### Xóa Reaction

```json
{
  "tool": "react",
  "params": {
    "messageId": "msg123",
    "emoji": "👍",
    "remove": true
  }
}
```

## Quy tắc Reaction

### Khớp mẫu (Pattern)

```json5
{
  reactions: {
    rules: [
      {
        pattern: "thank",
        reaction: "❤️",
      },
      {
        pattern: "\\?$",  // Ends with ?
        reaction: "🤔",
      },
    ],
  },
}
```

### Xác suất

```json5
{
  reactions: {
    rules: [
      {
        trigger: "thanks",
        reaction: "❤️",
        probability: 0.5,  // 50% chance
      },
    ],
  },
}
```

### Điều kiện

```json5
{
  reactions: {
    rules: [
      {
        trigger: "thanks",
        reaction: "❤️",
        conditions: {
          channel: ["discord", "slack"],
          time: "9:00-17:00",
        },
      },
    ],
  },
}
```

## Thực hành tốt nhất

### Sử dụng phù hợp

- Dùng reactions để xác nhận nhanh
- Không lạm dụng - có thể gây phiền
- Phù hợp với văn hóa từng kênh

### Chỉ báo xử lý

- React với 🤔 khi đang suy nghĩ
- Xóa và thêm ✅ khi xong
- Cung cấp phản hồi trực quan

## Khắc phục sự cố

### Reactions không xuất hiện

1. Kiểm tra kênh có hỗ trợ không
2. Xác nhận emoji hợp lệ
3. Kiểm tra quyền của bot

### Sai emoji

1. Xác nhận định dạng emoji
2. Kiểm tra định dạng riêng của kênh
3. Sử dụng Unicode emoji

### Bị giới hạn tốc độ

1. Giảm tần suất reaction
2. Kiểm tra giới hạn của nền tảng
3. Thêm delay giữa các reactions

## Xem thêm

- [Channels Overview](/channels/overview)
- [Tools Overview](/tools-skills/tools)
- [Discord](/channels/discord)
- [Slack](/channels/slack)
