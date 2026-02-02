# Zalo

Zalo là nền tảng nhắn tin phổ biến tại Việt Nam. Gateway tích hợp qua Bot API thử nghiệm cho direct messages; hỗ trợ group đang được phát triển theo roadmap của Zalo.

## Cài đặt Plugin

```bash
# CLI
openclaw plugins install @openclaw/zalo

# Hoặc chọn trong onboarding
openclaw onboard
```

## Thiết lập nhanh

### 1. Lấy Bot Token

1. Truy cập [Zalo Bot Platform](https://bot.zaloplatforms.com)
2. Tạo bot mới hoặc chọn bot có sẵn
3. Copy **Bot Token** (format: `12345689:abc-xyz`)

### 2. Cấu hình

```json5
{
  channels: {
    zalo: {
      enabled: true,
      botToken: "12345689:abc-xyz",
      dmPolicy: "pairing",
    },
  },
}
```

### 3. Environment Variable

```bash
export ZALO_BOT_TOKEN="12345689:abc-xyz"
```

### 4. Restart Gateway

```bash
openclaw gateway restart
```

## Kiểm soát truy cập

### Pairing Mode (Mặc định)

Người dùng mới nhận pairing code để admin approve:

```bash
# Approve user
openclaw pairing approve zalo <CODE>

# List pending codes
openclaw pairing list

# Deny
openclaw pairing deny zalo <CODE>
```

::: info Code Expiration
Pairing codes hết hạn sau 1 giờ.
:::

### Open Mode

```json5
{
  channels: {
    zalo: {
      dmPolicy: "open",  // Cho phép tất cả
    },
  },
}
```

### Allowlist

```json5
{
  channels: {
    zalo: {
      dmPolicy: "allowlist",
      allowFrom: ["123456789", "987654321"],  // Numeric user IDs
    },
  },
}
```

## Tính năng & Giới hạn

### Hỗ trợ

| Tính năng | Trạng thái | Ghi chú |
|-----------|------------|---------|
| Text Messages | ✅ | 2,000 chars/chunk |
| Images | ✅ | Max 5MB |
| Direct Messages | ✅ | |
| Groups | ❌ | Đang phát triển |
| Streaming | ❌ | Character limits |
| Reactions | ❌ | |
| Files | ❌ | |

### Giới hạn Messages

- **Text**: 2,000 characters per message
- Tin nhắn dài tự động được chunk
- **Media**: 5MB mặc định

```json5
{
  channels: {
    zalo: {
      mediaMaxMb: 5,  // Default
    },
  },
}
```

## Message Delivery

### Inbound

- Messages được normalize với media placeholders
- Metadata được extract từ Zalo events

### Outbound

- Replies tự động route về Zalo
- Deterministic routing dựa trên conversation context

## Webhook Mode

Mặc định sử dụng long-polling. Có thể chuyển sang webhook:

```json5
{
  channels: {
    zalo: {
      enabled: true,
      botToken: "${ZALO_BOT_TOKEN}",
      webhook: {
        enabled: true,
        url: "https://your-gateway/zalo/webhook",
        secret: "${ZALO_WEBHOOK_SECRET}",
      },
    },
  },
}
```

::: warning HTTPS Required
Webhook mode yêu cầu HTTPS với valid certificate.
:::

## Multi-Account

```json5
{
  channels: {
    zalo: {
      enabled: true,
      accounts: {
        main: {
          botToken: "${ZALO_MAIN_TOKEN}",
          dmPolicy: "pairing",
        },
        support: {
          botToken: "${ZALO_SUPPORT_TOKEN}",
          dmPolicy: "open",
        },
      },
    },
  },
}
```

## Proxy Support

```json5
{
  channels: {
    zalo: {
      enabled: true,
      botToken: "${ZALO_BOT_TOKEN}",
      proxy: "http://proxy.example.com:8080",
    },
  },
}
```

## Cấu hình đầy đủ

```json5
{
  channels: {
    zalo: {
      enabled: true,

      // Bot credentials
      botToken: "${ZALO_BOT_TOKEN}",

      // Access control
      dmPolicy: "pairing",    // pairing | open | allowlist
      allowFrom: [],          // User IDs cho allowlist mode

      // Webhook (optional)
      webhook: {
        enabled: false,
        url: "",
        secret: "",
      },

      // Limits
      mediaMaxMb: 5,

      // Network
      proxy: "",

      // Multi-account
      accounts: {},
    },
  },
}
```

## Troubleshooting

### Bot không nhận messages

1. Verify bot token đúng format
2. Kiểm tra bot đã được activate trên Zalo Platform
3. Test API:
   ```bash
   curl "https://openapi.zalo.me/v2.0/oa/getoa" \
     -H "access_token: $ZALO_BOT_TOKEN"
   ```

### Connection issues

1. Check network connectivity đến Zalo API
2. Nếu dùng proxy, verify proxy settings
3. Xem logs: `openclaw logs --follow`

### Pairing codes không được gửi

1. Verify `dmPolicy: "pairing"`
2. Restart gateway
3. Check bot có quyền gửi messages

### Media upload fails

1. Kiểm tra file size < 5MB
2. Verify format được hỗ trợ (JPG, PNG)
3. Check network connectivity

## API Reference

### Zalo Bot Platform

- Console: https://bot.zaloplatforms.com
- API Docs: https://developers.zalo.me/docs

### Rate Limits

Zalo áp dụng rate limits theo tài khoản. Xem documentation của Zalo để biết chi tiết.

## Xem thêm

- [Channels Overview](/channels/overview)
- [LINE](/channels/line)
- [Telegram](/channels/telegram)
