# openclaw channels

Lệnh `openclaw channels` quản lý chat channel accounts và operational status trên Gateway.

## Cú pháp

```bash
openclaw channels <command> [options]
```

## Commands

### List channels

```bash
openclaw channels list
```

### Add channel

```bash
openclaw channels add <platform>
openclaw channels add --help  # Xem flags cho mỗi platform
```

### Remove channel

```bash
openclaw channels remove <platform>
```

## Status & Diagnostics

### Comprehensive probing

```bash
openclaw status --deep
```

### Guided troubleshooting

```bash
openclaw doctor
```

## Channel Capabilities

Probe provider-specific hints:

```bash
openclaw channels capabilities
```

Kiểm tra:
- **Discord**: Intents + optional channel permissions
- **Slack**: Bot + user scopes
- **Telegram**: Bot flags + webhook
- **Signal**: Daemon version

## Resolution

Convert names thành platform IDs:

```bash
openclaw channels resolve --channel slack user:john
openclaw channels resolve --channel discord channel:general
```

### Tùy chọn resolve

| Flag | Mô tả |
|------|-------|
| `--channel <platform>` | Platform cần resolve |
| `--type <type>` | user, group, hoặc auto |

## Adding Channels

### WhatsApp

```bash
openclaw channels add whatsapp
# Quét QR code
```

### Telegram

```bash
openclaw channels add telegram --token <bot-token>
```

### Discord

```bash
openclaw channels add discord --token <bot-token>
```

### Slack

```bash
openclaw channels add slack
# Follows OAuth flow
```

## Channel Status

```bash
openclaw channels status
```

Output:
```
Channels
========

Platform  | Status    | Account        | Features
----------|-----------|----------------|----------
telegram  | connected | @mybot         | messages, media
discord   | connected | MyBot#1234     | messages, reactions
whatsapp  | connected | +1234567890    | messages, media
slack     | warning   | workspace-bot  | token expiring
```

## Xem thêm

- [Kênh trò chuyện](/concepts/channels)
- [Ghép nối](/start-here/pairing)
- [Message](/cli/message)
