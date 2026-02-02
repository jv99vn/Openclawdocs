# Platforms Overview

OpenClaw hoạt động trên nhiều nền tảng với các companion apps và deployment options.

## Core Technology

| Component | Technology |
|-----------|------------|
| Language | TypeScript |
| Runtime | Node.js (khuyến nghị) |

::: warning Bun không được khuyến nghị
Bun không được khuyến nghị cho Gateway do WhatsApp/Telegram bugs.
:::

## Desktop & Mobile

### Companion Apps

| Platform | Status | Mô tả |
|----------|--------|-------|
| [macOS](/platforms/macos) | ✅ Available | Menu bar app |
| [iOS](/platforms/ios) | ✅ Available | Mobile node |
| [Android](/platforms/android) | ✅ Available | Mobile node |
| [Windows](/platforms/windows) | 🚧 WSL2 | CLI qua WSL |
| [Linux](/platforms/linux) | ✅ Available | CLI + systemd |

### Gateway Support

Gateway hoàn toàn operational trên tất cả platforms.

## Hosting Options

### Cloud Providers

| Platform | Mô tả | Guide |
|----------|-------|-------|
| [Fly.io](/platforms/flyio) | Easy deployment | ✅ |
| [Hetzner](/platforms/hetzner) | Docker-based | ✅ |
| [GCP](/platforms/gcp) | Compute Engine | ✅ |
| exe.dev | VM + HTTPS proxy | ✅ |

### Self-hosted

| Option | Mô tả |
|--------|-------|
| VPS | Any Linux VPS |
| Home Server | Raspberry Pi, NAS, etc. |
| Local Machine | Development |

## Quick Start by Platform

### macOS

```bash
# Install
curl -fsSL https://openclaw.ai/install.sh | bash

# Onboard
openclaw onboard --install-daemon

# Or download macOS app
```

### Linux

```bash
# Install
curl -fsSL https://openclaw.ai/install.sh | bash

# Setup systemd service
openclaw gateway install

# Start
systemctl --user start openclaw-gateway
```

### Windows (WSL2)

```powershell
# Install WSL2
wsl --install -d Ubuntu

# Inside WSL
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard --install-daemon
```

### iOS/Android

1. Install app từ store
2. Launch và scan QR từ Gateway
3. Approve pairing

## System Requirements

### Minimum

| Component | Requirement |
|-----------|-------------|
| Node.js | >= 22 |
| RAM | 512 MB |
| Storage | 1 GB |

### Recommended

| Component | Requirement |
|-----------|-------------|
| Node.js | 22 LTS |
| RAM | 2 GB+ |
| Storage | 10 GB+ |
| Network | Stable internet |

## Service Management

### macOS (LaunchAgent)

```bash
# Install
openclaw gateway install

# Status
launchctl list | grep openclaw

# Stop
openclaw gateway stop

# Logs
cat ~/.openclaw/logs/gateway.log
```

### Linux (systemd)

```bash
# Enable lingering (một lần)
sudo loginctl enable-linger $USER

# Install
openclaw gateway install

# Status
systemctl --user status openclaw-gateway

# Logs
journalctl --user -u openclaw-gateway -f
```

### Docker

```dockerfile
FROM node:22-slim
RUN npm install -g openclaw
COPY openclaw.json /root/.openclaw/
CMD ["openclaw", "gateway"]
```

## Remote Access

### Tailscale (Khuyến nghị)

```json5
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "${OPENCLAW_GATEWAY_TOKEN}",
    },
  },
}
```

### SSH Tunnel

```bash
ssh -N -L 18789:127.0.0.1:18789 user@server
```

### VPN

Any VPN that provides LAN access to gateway host.

## Deployment Checklist

- [ ] Node.js 22+ installed
- [ ] OpenClaw installed
- [ ] Config created (`~/.openclaw/openclaw.json`)
- [ ] Credentials configured
- [ ] Channels logged in
- [ ] Service installed và running
- [ ] Remote access configured (nếu cần)

## Xem thêm

- [macOS App](/platforms/macos)
- [iOS App](/platforms/ios)
- [Android App](/platforms/android)
- [Fly.io Deployment](/platforms/flyio)
- [Gateway Architecture](/core-concepts/gateway-architecture)
