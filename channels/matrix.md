# Matrix

Matrix là giao thức nhắn tin mở, phi tập trung. OpenClaw tích hợp như một user trên bất kỳ homeserver nào, hỗ trợ direct messages, rooms, threads, media, reactions, polls, location và E2EE.

## Cài đặt Plugin

```bash
# NPM
openclaw plugins install @openclaw/matrix

# Từ local checkout
openclaw plugins install ./extensions/matrix
```

## Thiết lập

### 1. Tạo Matrix Account

Tạo account trên bất kỳ homeserver nào:
- [matrix.org](https://matrix.org)
- Self-hosted Synapse/Dendrite
- Bất kỳ Matrix homeserver nào

### 2. Lấy Access Token

**Cách 1: Qua Element**

1. Đăng nhập Element
2. Settings → Help & About → Advanced
3. Copy "Access Token"

**Cách 2: Qua API**

```bash
curl -X POST "https://matrix.org/_matrix/client/r0/login" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "m.login.password",
    "user": "@your-bot:matrix.org",
    "password": "your-password"
  }'
```

### 3. Cấu hình cơ bản

```json5
{
  channels: {
    matrix: {
      enabled: true,
      homeserver: "https://matrix.org",
      accessToken: "${MATRIX_ACCESS_TOKEN}",
      dmPolicy: "pairing",
    },
  },
}
```

### Cấu hình với credentials

```json5
{
  channels: {
    matrix: {
      enabled: true,
      homeserver: "https://matrix.org",
      userId: "@bot:matrix.org",
      password: "${MATRIX_PASSWORD}",
      dmPolicy: "pairing",
    },
  },
}
```

## End-to-End Encryption (E2EE)

### Enable E2EE

```json5
{
  channels: {
    matrix: {
      enabled: true,
      homeserver: "https://matrix.org",
      accessToken: "${MATRIX_ACCESS_TOKEN}",
      encryption: true,  // Enable E2EE
    },
  },
}
```

### Device Verification

Khi kết nối lần đầu với E2EE enabled:

1. Bot request device verification
2. Mở Matrix client (Element) trên device khác
3. Verify device của bot
4. Sau khi verify, bot có thể đọc/gửi encrypted messages

::: info Rust Crypto SDK
E2EE được hỗ trợ qua Rust crypto SDK, đảm bảo tương thích với các Matrix clients khác.
:::

## Kiểm soát truy cập

### DM Policy

```json5
{
  channels: {
    matrix: {
      dmPolicy: "pairing",   // Mặc định: yêu cầu pairing code
      // dmPolicy: "open",      // Cho phép tất cả
      // dmPolicy: "allowlist", // Chỉ users trong danh sách
      // dmPolicy: "disabled",  // Tắt DMs
    },
  },
}
```

### Pairing Mode

```bash
# Approve user
openclaw pairing approve matrix <CODE>

# List pending
openclaw pairing list

# Deny
openclaw pairing deny matrix <CODE>
```

### Room Policy

```json5
{
  channels: {
    matrix: {
      groupPolicy: "allowlist",  // Mặc định
      // groupPolicy: "open",    // Cho phép tất cả rooms
      // groupPolicy: "mention", // Chỉ phản hồi khi mention

      allowGroups: [
        "!roomid1:matrix.org",
        "!roomid2:matrix.org",
      ],
    },
  },
}
```

### Allowlist Users

```json5
{
  channels: {
    matrix: {
      dmPolicy: "allowlist",
      allowFrom: [
        "@user1:matrix.org",
        "@user2:example.com",
      ],
    },
  },
}
```

## Threads

```json5
{
  channels: {
    matrix: {
      threadReplies: "inbound",  // Mặc định
      // threadReplies: "off",   // Không dùng threads
      // threadReplies: "always", // Luôn reply trong thread
    },
  },
}
```

## Auto Join

```json5
{
  channels: {
    matrix: {
      autoJoin: true,   // Tự động accept invites
      // autoJoin: false, // Chỉ join rooms trong allowlist
    },
  },
}
```

## Tính năng

| Tính năng | Trạng thái |
|-----------|------------|
| Direct Messages | ✅ |
| Rooms | ✅ |
| Threads | ✅ |
| E2EE | ✅ |
| Media Upload | ✅ |
| Reactions | ✅ |
| Location | ✅ |
| Polls | ⚠️ Gửi được, nhận chỉ text |
| Voice Messages | ⚠️ Nhận được, không gửi |
| Calls | ❌ |

## Media

```json5
{
  channels: {
    matrix: {
      mediaMaxMb: 50,  // Giới hạn upload/download
    },
  },
}
```

### Gửi media

```typescript
await agent.send({
  content: "Here's an image",
  attachments: [
    {
      type: "image",
      url: "https://example.com/image.png",
    },
  ],
});
```

## Native Commands

Matrix plugin hỗ trợ các commands:

| Command | Mô tả |
|---------|-------|
| `/help` | Hiển thị help |
| `/status` | Trạng thái bot |
| `/reset` | Reset session |

## Cấu hình đầy đủ

```json5
{
  channels: {
    matrix: {
      enabled: true,

      // Connection
      homeserver: "https://matrix.org",
      accessToken: "${MATRIX_ACCESS_TOKEN}",
      // Hoặc dùng credentials:
      // userId: "@bot:matrix.org",
      // password: "${MATRIX_PASSWORD}",

      // Encryption
      encryption: true,

      // Access control
      dmPolicy: "pairing",
      groupPolicy: "allowlist",
      allowFrom: [],
      allowGroups: [],

      // Features
      autoJoin: true,
      threadReplies: "inbound",

      // Limits
      mediaMaxMb: 50,
    },
  },
}
```

## Self-Hosted Homeserver

### Synapse

```json5
{
  channels: {
    matrix: {
      enabled: true,
      homeserver: "https://matrix.yourdomain.com",
      accessToken: "${MATRIX_ACCESS_TOKEN}",
    },
  },
}
```

### Dendrite

```json5
{
  channels: {
    matrix: {
      enabled: true,
      homeserver: "https://dendrite.yourdomain.com",
      accessToken: "${MATRIX_ACCESS_TOKEN}",
    },
  },
}
```

## Troubleshooting

### Connection fails

1. Verify homeserver URL đúng
2. Check access token còn valid
3. Test với curl:
   ```bash
   curl -H "Authorization: Bearer $MATRIX_ACCESS_TOKEN" \
     "https://matrix.org/_matrix/client/r0/account/whoami"
   ```

### E2EE không hoạt động

1. Ensure `encryption: true` trong config
2. Verify device đã được trusted
3. Restart gateway sau khi verify

### Bot không join rooms

1. Kiểm tra `autoJoin` setting
2. Verify room trong `allowGroups` nếu dùng allowlist
3. Ensure bot được invite đúng cách

### Messages bị miss

1. Check sync token không bị corrupt
2. Restart gateway
3. Xem logs: `openclaw logs --follow`

## Xem thêm

- [Channels Overview](/channels/overview)
- [Discord](/channels/discord)
- [Slack](/channels/slack)
