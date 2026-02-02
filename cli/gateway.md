# openclaw gateway

Lệnh `openclaw gateway` quản lý Gateway daemon - core service của OpenClaw.

## Cú pháp

```bash
openclaw gateway <command> [options]
```

## Commands

### start

Khởi động Gateway:

```bash
openclaw gateway
openclaw gateway --verbose
```

### stop

Dừng Gateway:

```bash
openclaw gateway stop
```

### restart

Restart Gateway:

```bash
openclaw gateway restart
```

### status

Kiểm tra trạng thái:

```bash
openclaw gateway status
openclaw gateway status --deep
```

### install

Cài đặt service:

```bash
openclaw gateway install
openclaw gateway install --force
```

### uninstall

Gỡ service:

```bash
openclaw gateway uninstall
```

### probe

Probe gateway:

```bash
openclaw gateway probe
openclaw gateway probe --url ws://host:18789
```

## Options

| Flag | Mô tả |
|------|-------|
| `--verbose`, `-v` | Verbose output |
| `--port <port>` | Custom port (default: 18789) |
| `--url <url>` | Gateway URL |
| `--profile <name>` | Config profile |
| `--force` | Force operation |
| `--deep` | Deep checks |

## Gateway Modes

### Local Mode

```json5
{
  gateway: {
    mode: "local",
  },
}
```

### Remote Mode

```json5
{
  gateway: {
    mode: "remote",
    remote: {
      url: "wss://gateway.example.com",
      token: "...",
    },
  },
}
```

## Service Installation

### macOS (LaunchAgent)

```bash
openclaw gateway install
```

Service file: `~/Library/LaunchAgents/bot.molt.gateway.plist`

### Linux (systemd)

```bash
openclaw gateway install
```

Service file: `~/.config/systemd/user/openclaw-gateway.service`

### Manual Start

```bash
# Foreground
openclaw gateway

# Background (không khuyến nghị - dùng service)
openclaw gateway &
```

## Bind Configuration

### Loopback (default)

```json5
{
  gateway: {
    bind: "loopback",  // 127.0.0.1 only
  },
}
```

### LAN

```json5
{
  gateway: {
    bind: "lan",  // 0.0.0.0
    auth: {
      mode: "token",
      token: "${OPENCLAW_GATEWAY_TOKEN}",
    },
  },
}
```

### Tailscale

```json5
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "...",
    },
  },
}
```

## Authentication

Khi bind không phải loopback, yêu cầu auth:

```json5
{
  gateway: {
    bind: "lan",
    auth: {
      mode: "token",  // token | none
      token: "${OPENCLAW_GATEWAY_TOKEN}",
    },
  },
}
```

## Ports

| Port | Mục đích |
|------|----------|
| 18789 | Gateway WebSocket + HTTP |
| 18793 | Canvas host |
| 18800-18899 | Browser CDP |

### Custom Port

```json5
{
  gateway: {
    port: 19000,
  },
}
```

## Logging

### View Logs

```bash
openclaw logs --follow
```

### Log Locations

| OS | Location |
|----|----------|
| All | `/tmp/openclaw/openclaw-YYYY-MM-DD.log` |
| macOS | `~/.openclaw/logs/gateway.log` |
| Linux | `journalctl --user -u openclaw-gateway` |

## Troubleshooting

### Gateway không khởi động

```bash
# Check status
openclaw gateway status

# Check logs
openclaw logs --limit 50

# Run doctor
openclaw doctor
```

### Port already in use

```bash
# Find listener
lsof -nP -iTCP:18789 -sTCP:LISTEN

# Stop existing
openclaw gateway stop

# Or use different port
openclaw gateway --port 19000
```

### Service not starting

```bash
# Check service status
openclaw gateway status

# Reinstall service
openclaw gateway install --force

# Check service logs
# macOS:
cat ~/.openclaw/logs/gateway.log

# Linux:
journalctl --user -u openclaw-gateway -n 100
```

## Status Output Example

```
Gateway Status
==============

Mode: local
Bind: loopback
Port: 18789
URL: ws://127.0.0.1:18789

Service:
  Status: running
  PID: 12345
  Uptime: 2h 30m

Channels:
  WhatsApp: connected
  Telegram: connected
  Discord: connected

Agents:
  Active: 3
  Sessions: 15
```

## Xem thêm

- [Gateway Architecture](/core-concepts/gateway-architecture)
- [Configuration](/gateway-ops/configuration)
- [Troubleshooting](/gateway-ops/troubleshooting)
