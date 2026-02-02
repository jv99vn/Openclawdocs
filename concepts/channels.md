# Kênh trò chuyện (Channels)

## Tổng quan

OpenClaw tích hợp với nhiều nền tảng nhắn tin qua hệ thống Gateway thống nhất. Hỗ trợ **20+ chat channels** với các mức độ feature support khác nhau.

## Các kênh chính

### Popular

| Channel | Mô tả | Setup |
|---------|-------|-------|
| **Telegram** | Simple bot token | Nhanh nhất để cấu hình |
| **WhatsApp** | Sử dụng Baileys, yêu cầu QR pairing | Phổ biến nhất |
| **Discord** | Servers, channels, DMs | Bot token |
| **Slack** | Workspace applications | Bolt SDK |

### Enterprise

| Channel | Mô tả |
|---------|-------|
| Microsoft Teams | Enterprise messaging |
| Google Chat | Google Workspace |

### Privacy-focused

| Channel | Mô tả |
|---------|-------|
| Signal | End-to-end encrypted |

### Self-hosted

| Channel | Mô tả |
|---------|-------|
| Mattermost | Self-hosted Slack alternative |
| Matrix | Decentralized communication |
| Nextcloud Talk | Nextcloud integration |

### Khác

| Channel | Mô tả |
|---------|-------|
| Nostr | Decentralized social |
| Twitch | Streaming platform |
| Zalo | Vietnam messaging |
| Tlon | Urbit messaging |

## iMessage với BlueBubbles

::: tip Khuyến nghị cho iMessage
**BlueBubbles** được khuyến nghị với full feature support:
- Edit, unsend, effects, reactions
- Group management
:::

::: warning macOS 26 Tahoe
Editing hiện tại bị broken trên macOS 26 Tahoe.
:::

## Operational Details

### Multiple Channels

Nhiều channels hoạt động đồng thời với automatic routing.

### Group Behavior

Varies theo platform - kiểm tra documentation của từng channel.

### Security

- DM pairing
- Allowlists
- Per-channel configuration

## Cấu hình Channel

### Telegram

```json5
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "BOT_TOKEN",
      "allowlist": ["@username1", "@username2"]
    }
  }
}
```

### WhatsApp

```json5
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "pairing": {
        "enabled": true
      }
    }
  }
}
```

### Discord

```json5
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "BOT_TOKEN",
      "guilds": ["guild-id-1", "guild-id-2"]
    }
  }
}
```

### Slack

```json5
{
  "channels": {
    "slack": {
      "enabled": true,
      "appToken": "xapp-...",
      "botToken": "xoxb-..."
    }
  }
}
```

## Thêm Channel

### CLI

```bash
# WhatsApp (QR pairing)
openclaw channels add whatsapp

# Telegram
openclaw channels add telegram --token <bot-token>

# Discord
openclaw channels add discord --token <bot-token>

# Slack
openclaw channels add slack
```

### Interactive

```bash
openclaw configure --section channels
```

## Channel Status

```bash
openclaw channels list
openclaw channels status
openclaw status --deep
```

## Troubleshooting

### WhatsApp không kết nối

```bash
# Xóa session cũ
rm -rf ~/.openclaw/credentials/whatsapp/

# Quét lại QR
openclaw channels add whatsapp
```

### Discord không nhận messages

- Kiểm tra bot permissions
- Xác minh guild allowlist

### Telegram không phản hồi

- Verify bot token
- Check webhook configuration

## Xem thêm

- [Ghép nối](/start-here/pairing)
- [Channels CLI](/cli/channels)
- [Message CLI](/cli/message)
- [Bảo mật](/help/faq)
