# Kênh trò chuyện

Tài liệu OpenClaw mô tả một hệ thống tin nhắn đa kênh tích hợp với nhiều nền tảng chat khác nhau thông qua kiến trúc Gateway.

## Tính năng chính

OpenClaw hỗ trợ text trên tất cả các nền tảng, với các mức độ hỗ trợ media và reaction khác nhau tùy thuộc vào kênh được chọn.

## Các nền tảng có sẵn

### Kênh tích hợp sẵn

| Kênh | Công nghệ | Ghi chú |
|------|-----------|---------|
| **WhatsApp** | Baileys với QR pairing | Yêu cầu quét QR |
| **Telegram** | grammY | Thiết lập đơn giản nhất |
| **Discord** | Bot API và Gateway | Hỗ trợ threads và reactions |
| **Slack** | Bolt SDK | Workspace integration |
| **Google Chat** | HTTP webhook | Chỉ outbound |
| **Mattermost** | Bot API + WebSocket | Self-hosted option |
| **Signal** | signal-cli | End-to-end encrypted |
| **BlueBubbles** | macOS server REST API | Khuyến nghị cho iMessage |
| **iMessage native** | imsg CLI | Chỉ macOS |
| **WebChat** | Gateway interface | Built-in web client |

### Kênh dựa trên Plugin

Các kênh sau yêu cầu cài đặt plugin bổ sung:

- Microsoft Teams
- LINE
- Nextcloud Talk
- Matrix
- Nostr
- Tlon
- Twitch
- Zalo
- Zalo Personal

## Cấu hình

### Thêm kênh mới

```bash
# WhatsApp
openclaw channels add whatsapp

# Telegram
openclaw channels add telegram

# Discord
openclaw channels add discord
```

### Quản lý kênh

```bash
# Liệt kê tất cả kênh
openclaw channels list

# Xem trạng thái
openclaw channels status

# Xóa kênh
openclaw channels remove <channel-id>
```

## Hướng dẫn cấu hình

::: tip Nhiều kênh đồng thời
Nhiều kênh hoạt động đồng thời với định tuyến tự động dựa trên context hội thoại.
:::

### Telegram - Nhanh nhất để bắt đầu

Telegram được xác định là tùy chọn triển khai nhanh nhất do yêu cầu thiết lập đơn giản:

1. Tạo bot qua [@BotFather](https://t.me/BotFather)
2. Lấy bot token
3. Cấu hình trong OpenClaw:

```bash
openclaw channels add telegram --token YOUR_BOT_TOKEN
```

### WhatsApp - Yêu cầu QR Pairing

WhatsApp yêu cầu quy trình QR pairing bổ sung:

```bash
openclaw channels add whatsapp
# Quét QR code hiển thị trong terminal
```

::: warning Lưu ý
Chỉ một phiên Baileys trên mỗi số điện thoại. Đăng xuất trên thiết bị khác trước khi ghép nối.
:::

### Discord - Bot Setup

1. Tạo Application trên Discord Developer Portal
2. Tạo Bot và lấy token
3. Cấu hình:

```bash
openclaw channels add discord --token YOUR_BOT_TOKEN
```

## Hỗ trợ tính năng theo kênh

| Tính năng | WhatsApp | Telegram | Discord | Slack |
|-----------|----------|----------|---------|-------|
| Text | ✅ | ✅ | ✅ | ✅ |
| Images | ✅ | ✅ | ✅ | ✅ |
| Audio | ✅ | ✅ | ✅ | ❌ |
| Files | ✅ | ✅ | ✅ | ✅ |
| Reactions | ✅ | ✅ | ✅ | ✅ |
| Threads | ❌ | ✅ | ✅ | ✅ |
| Groups | ✅ | ✅ | ✅ | ✅ |

## Group behavior

Trong group chats, OpenClaw sử dụng mention-based activation:

```
@OpenClaw hãy giúp tôi viết code
```

Cấu hình activation trong `openclaw.json`:

```json
{
  "channels": {
    "groupActivation": "mention",
    "mentionKeywords": ["@openclaw", "@bot"]
  }
}
```

## Tài liệu bổ sung

- [Hành vi group chi tiết](/guide/channels#groups)
- [Giao thức bảo mật](/guide/concepts#security)
- [Chi tiết triển khai Telegram](/guide/channels#telegram)
- [Quy trình khắc phục sự cố](/guide/help)
- [Cấu hình nhà cung cấp model](/guide/providers)
