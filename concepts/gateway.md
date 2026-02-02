# Gateway Runbook

## Mục đích cốt lõi

Gateway service là **process always-on** sở hữu single Baileys/Telegram connection và control/event plane.

Thay thế legacy gateway command bằng: `openclaw gateway`

## Thực thi Local

### Khởi động cơ bản

```bash
openclaw gateway --port 18789
```

### Development workflow

```bash
pnpm gateway:watch
```

Automatic reloading khi có thay đổi.

### Hot-reload

Service watches `~/.openclaw/openclaw.json` cho config changes.

Behavior được kiểm soát bởi `gateway.reload.mode` (mặc định: `"hybrid"`).

## Network Architecture

### WebSocket Control Plane

Bind mặc định: `127.0.0.1:18789`

### HTTP Endpoints (cùng port)

- OpenAI Chat Completions
- OpenResponses
- Tools Invoke

### Canvas File Server

Port riêng: `18793` (thường)

## Remote Access Strategy

### Ưu tiên

1. **Tailscale** hoặc **VPN**

### SSH Tunneling (Thay thế)

```bash
ssh -N -L 18789:127.0.0.1:18789 user@host
```

::: warning Token Authentication
Token authentication áp dụng ngay cả qua tunneled connections.
:::

## Multiple Gateway Instances

Chạy nhiều gateways trên một host yêu cầu isolate:
- State directories
- Configuration paths
- Ports

### Dev Profile

```bash
openclaw gateway --dev
```

Fully-isolated dev instance (config/state/workspace) không chạm primary setup.

## Service Management

### macOS

`openclaw gateway install` ghi LaunchAgent:

```
~/Library/LaunchAgents/bot.molt.gateway.plist
```

### Linux

Systemd user units:

```
~/.config/systemd/user/openclaw-gateway.service
```

### Windows

Sử dụng **WSL2 với systemd**.

## Protocol Fundamentals

### Connect Frame

Clients khởi tạo với mandatory connect frame:

```json
{
  "type": "req",
  "id": "1",
  "method": "connect",
  "params": {
    "protocol": { "min": 1, "max": 1 },
    "client": {
      "name": "openclaw-cli",
      "version": "0.10.0"
    },
    "capabilities": ["agent", "health"],
    "auth": {
      "token": "secret-token"
    }
  }
}
```

### Hello-OK Response

Gateway responds với:
- Snapshot of presence
- Health status
- Connection policy parameters

## Error Handling

### Standard Error Codes

| Code | Mô tả |
|------|-------|
| `NOT_LINKED` | WhatsApp chưa xác thực |
| `AGENT_TIMEOUT` | Missed deadlines |
| `UNAVAILABLE` | Dependencies failed |

### Error Structure

```json
{
  "type": "error",
  "id": "1",
  "error": {
    "code": "NOT_LINKED",
    "message": "WhatsApp not authenticated",
    "retry": true
  }
}
```

## Operational Monitoring

### Health Checks

WebSocket `health` method calls expecting `ok: true`:

```json
{
  "type": "req",
  "method": "health"
}
```

### Status Verification

- Channel linkage
- Authentication age

### Debug Subscriptions

Subscribe to `tick` và `presence` events cho visibility vào:
- Gateway liveness
- Client connections

## Các lệnh Gateway

```bash
# Khởi động
openclaw gateway

# Với options
openclaw gateway --port 18789 --verbose

# Status
openclaw gateway status

# Stop
openclaw gateway stop

# Restart
openclaw gateway restart

# Install service
openclaw gateway install

# Uninstall service
openclaw gateway uninstall
```

## Xem thêm

- [Kiến trúc](/concepts/architecture)
- [Web Interface](/concepts/web)
- [CLI Gateway](/cli/status)
