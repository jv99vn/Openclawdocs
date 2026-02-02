# Nền tảng (Platforms)

## Core Technology Stack

| Component | Technology |
|-----------|------------|
| Language | TypeScript |
| Runtime | Node.js (khuyến nghị) |

::: warning Bun không được khuyến nghị
Bun không được khuyến nghị cho Gateway do WhatsApp/Telegram bugs.
:::

## Platform Options

### Desktop & Mobile Companions

| Platform | Status |
|----------|--------|
| macOS menu bar app | ✅ Available |
| iOS mobile node | ✅ Available |
| Android mobile node | ✅ Available |
| Windows companion | 🚧 In development |
| Linux companion | 🚧 In development |

**Gateway functionality** hoàn toàn operational trên tất cả platforms.

### Operating System Support

| OS | Guide |
|----|-------|
| macOS | Native app + CLI |
| iOS | Mobile node app |
| Android | Mobile node app |
| Windows | WSL2 + CLI |
| Linux | CLI + systemd |

## Hosting & Infrastructure

### Deployment Options

| Platform | Mô tả |
|----------|-------|
| Fly.io | Easy deployment |
| Hetzner | Docker-based |
| GCP Compute Engine | Google Cloud |
| exe.dev | VM + HTTPS proxy |
| Self-hosted | VPS, home server |

## Quick Access

### Installation

Xem [Bắt đầu nhanh](/start-here/getting-started).

### Gateway Operations

```bash
# Check status
openclaw gateway status

# Start
openclaw gateway

# Stop
openclaw gateway stop

# Restart
openclaw gateway restart
```

## Gateway Service Installation

### Recommended: Wizard

```bash
openclaw onboard --install-daemon
```

### Direct Installation

```bash
openclaw gateway install
```

### Service Registration

| OS | Method |
|----|--------|
| macOS | LaunchAgent |
| Linux/WSL2 | systemd user services |

## macOS Setup

### App Installation

1. Download từ website
2. Move to Applications
3. Launch và complete onboarding

### CLI Installation

```bash
# npm
npm install -g openclaw

# pnpm
pnpm add -g openclaw
```

### Service Locations

- LaunchAgent: `~/Library/LaunchAgents/bot.molt.gateway.plist`
- Logs: `~/Library/Logs/openclaw/`
- Config: `~/.openclaw/openclaw.json`

## Linux Setup

### Prerequisites

- Node.js 22+
- systemd (cho service management)

### Installation

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### Service Management

```bash
# Enable lingering (một lần)
sudo loginctl enable-linger $USER

# Install service
openclaw gateway install

# Check status
systemctl --user status openclaw-gateway

# View logs
journalctl --user -u openclaw-gateway -f
```

## Windows Setup

### WSL2 (Bắt buộc)

Windows native không được hỗ trợ. Sử dụng WSL2 với Ubuntu:

```powershell
# Install WSL2
wsl --install -d Ubuntu

# Enter WSL
wsl
```

### Trong WSL

```bash
# Install OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# Complete onboarding
openclaw onboard --install-daemon
```

## iOS/Android Nodes

### Setup

1. Install app từ store
2. Launch và scan QR code từ Gateway
3. Approve pairing từ CLI

```bash
openclaw devices approve <requestId>
```

### Capabilities

| Feature | iOS | Android |
|---------|-----|---------|
| Camera | ✅ | ✅ |
| Location | ✅ | ✅ |
| Notifications | ✅ | ✅ |
| SMS | ❌ | ✅ |
| Screen recording | ❌ | ✅ |

## Xem thêm

- [Bắt đầu nhanh](/start-here/getting-started)
- [Gateway](/concepts/gateway)
- [Nodes](/concepts/nodes)
- [Cài đặt](/install/install)
