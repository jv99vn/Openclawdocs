# openclaw status

Lệnh `openclaw status` cung cấp thông tin diagnostic về channels và sessions.

## Cú pháp

```bash
openclaw status [options]
```

## Ví dụ sử dụng

### Status cơ bản

```bash
openclaw status
```

### Tất cả thông tin

```bash
openclaw status --all
```

### Deep diagnostics

```bash
openclaw status --deep
```

### Usage info

```bash
openclaw status --usage
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--all` | Hiển thị tất cả thông tin |
| `--deep` | Live probes trên các platforms |
| `--usage` | Hiển thị usage statistics |
| `--json` | Output JSON |

## Key Features

### Deep Diagnostics

Flag `--deep` thực hiện live probes trên:
- WhatsApp Web
- Telegram
- Discord
- Google Chat
- Slack
- Signal

### Multi-Agent Support

Khi có nhiều agents configured, output hiển thị session store information cho từng agent.

### Infrastructure Overview

Status có thể hiển thị Gateway và node host service installation/runtime details.

### Version Information

Kết quả bao gồm:
- Update channel information
- Git SHA references (cho source-based installations)

### Update Notifications

Nếu có phiên bản mới hơn, lệnh sẽ suggest:

```
A newer version is available. Run: openclaw update
```

## Output Example

```
OpenClaw Status
===============

Version: 0.10.0 (stable)
Gateway: Running on :18789

Channels:
  ✓ telegram: Connected
  ✓ discord: Connected (3 guilds)
  ✓ whatsapp: Connected
  ⚠ slack: Token expiring soon

Sessions:
  Active: 5
  Total: 127

Agents:
  main: 3 active sessions
  ops: 2 active sessions
```

## Xem thêm

- [Health](/cli/health)
- [Doctor](/cli/doctor)
- [Cập nhật](/install/updating)
