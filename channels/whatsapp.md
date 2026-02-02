# WhatsApp

Tích hợp WhatsApp Web thông qua Baileys, trong đó gateway sở hữu các sessions.

## Quick Setup

1. Sử dụng số điện thoại riêng (khuyến nghị)
2. Cấu hình WhatsApp trong `~/.openclaw/openclaw.json`
3. Chạy `openclaw channels login` để quét QR code
4. Khởi động gateway

### Cấu hình tối thiểu

```json5
{
  channels: {
    whatsapp: {
      dmPolicy: "allowlist",
      allowFrom: ["+15551234567"],
    },
  },
}
```

## Mục tiêu chính

- Hỗ trợ nhiều tài khoản WhatsApp trong một gateway process
- Đảm bảo routing xác định nơi replies trả về WhatsApp
- Cung cấp đủ context cho model để hiểu quoted replies

## Hai chế độ hoạt động

### Dedicated Number (Khuyến nghị)

Số điện thoại riêng cho OpenClaw mang lại UX tối ưu và routing sạch. WhatsApp Business có thể chạy song song trên cùng thiết bị với số khác.

### Personal Number (Fallback)

Thay thế nhanh sử dụng số của bạn. Yêu cầu bật self-chat mode và nhắn tin cho chính mình để test mà không liên hệ người khác.

## Nguồn số điện thoại

| Nguồn | Trạng thái |
|-------|------------|
| Local eSIMs | ✅ Hỗ trợ |
| Prepaid SIMs | ✅ Hỗ trợ |
| TextNow | ❌ Bị WhatsApp chặn |
| Google Voice | ❌ Bị WhatsApp chặn |

Số chỉ cần nhận một SMS xác minh; WhatsApp Web sessions tồn tại sau đó qua `creds.json`.

## Tại sao Twilio bị ngừng hỗ trợ

"Meta áp dụng cửa sổ reply 24 giờ; nếu bạn chưa phản hồi trong 24 giờ qua, số business không thể khởi tạo tin nhắn mới."

## Quản lý Credentials

### Đăng nhập

```bash
# Đăng nhập cơ bản
openclaw channels login

# Multi-account
openclaw channels login --account <id>
```

### Vị trí lưu trữ

- Credentials: `~/.openclaw/credentials/whatsapp/<accountId>/creds.json`
- Backup: `creds.json.bak`

## Message Flow

### Inbound

- WhatsApp events bắt nguồn từ `messages.upsert` (Baileys)
- Status và broadcast chats bị ignore
- DM policy kiểm soát truy cập direct chat qua pairing, open, hoặc disabled modes

### Quoted Replies

Context được append với metadata bao gồm:
- `ReplyToId`
- `ReplyToBody`
- `ReplyToSender`

### Media

Inbound media-only messages sử dụng placeholders:
- `<media:image>`
- `<media:video>`
- `<media:audio>`
- `<media:document>`
- `<media:sticker>`

## Group Features

### Session Mapping

Groups map tới sessions với policy options:
- `open`
- `disabled`
- `allowlist`

### Activation

Mặc định mention mode nhưng hỗ trợ always-on.

### History Injection

Cung cấp recent unprocessed messages cho context, với metadata cached trong 5 phút.

## Read Receipts

Gateway đánh dấu messages là read theo mặc định.

Tắt globally hoặc per-account qua `channels.whatsapp.sendReadReceipts`.

## Acknowledgment Reactions

Auto-react với emoji khi nhận:

```json
{
  "whatsapp": {
    "ackReaction": {
      "emoji": "👀",
      "direct": true,
      "group": "mentions"
    }
  }
}
```

### Options

| Option | Mô tả |
|--------|-------|
| `emoji` | Emoji để react |
| `direct` | React trong direct chats |
| `group` | Chế độ group: `always`, `mentions`, `never` |

## Media và Limits

| Loại | Limit |
|------|-------|
| Outbound text chunks | 4000 characters (configurable) |
| Inbound media | 50 MB mặc định |
| Outbound media | 5 MB mặc định |

### Lưu ý

- Audio gửi dưới dạng PTT
- GIFs expect MP4 với `gifPlayback: true`

## Heartbeats và Reconnection

### Gateway heartbeat

Log connection health (mặc định 60s).

### Agent heartbeat

Hỗ trợ per-agent hoặc global configuration.

### Reconnect Policy

Sử dụng backoff policy với configurable:
- `initialMs`
- `maxMs`
- `factor`
- `jitter`
- `maxAttempts`

## Config Reference

### DM Settings

```json5
{
  channels: {
    whatsapp: {
      dmPolicy: "pairing",  // pairing | allowlist | open | disabled
      allowFrom: ["+15551234567"],
      selfChatMode: false,
    },
  },
}
```

### Group Settings

```json5
{
  channels: {
    whatsapp: {
      groups: {
        "*": {
          requireMention: true,
          historyLimit: 10,
        },
        "120363xxx@g.us": {
          requireMention: false,
        },
      },
    },
  },
}
```

### Multi-account

```json5
{
  channels: {
    whatsapp: {
      accounts: {
        main: {
          dmPolicy: "allowlist",
          allowFrom: ["+15551234567"],
        },
        work: {
          dmPolicy: "pairing",
        },
      },
    },
  },
}
```

## Troubleshooting

### Unlinked Status

```bash
openclaw channels login
```

### Disconnection

```bash
openclaw doctor
# hoặc relink
openclaw channels login --force
```

### Bun Runtime Problems

Sử dụng Node thay vì Bun:

```bash
# Kiểm tra runtime
node --version

# Đảm bảo dùng Node
which openclaw
```

## Self-Chat Mode

Để chat với chính mình:

```json5
{
  channels: {
    whatsapp: {
      selfChatMode: true,
      dmPolicy: "allowlist",
      allowFrom: ["+15555550123"],  // Số của bạn
    },
  },
}
```

## Xem thêm

- [Channels Overview](/channels/overview)
- [Telegram](/channels/telegram)
- [Discord](/channels/discord)
- [Troubleshooting](/gateway-ops/troubleshooting)
