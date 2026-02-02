# Linux

OpenClaw Gateway hoạt động hoàn toàn trên Linux. Node.js là runtime được recommend. Bun không được khuyến khích do compatibility issues với WhatsApp/Telegram.

## Tổng quan

- **Full CLI + Gateway support**
- **Node.js 22+** recommended
- **Systemd** integration
- Native Linux companion apps đang được phát triển

## Quick Start (VPS)

### 1. Install Node.js 22

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.org/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Fedora/RHEL
curl -fsSL https://rpm.nodesource.org/setup_22.x | sudo bash -
sudo dnf install -y nodejs

# Arch
sudo pacman -S nodejs npm
```

### 2. Install OpenClaw

```bash
npm install -g @anthropic/openclaw
```

### 3. Setup Daemon

```bash
openclaw onboard --install-daemon
```

### 4. Access Web UI (SSH Tunnel)

```bash
# Từ local machine
ssh -L 18790:localhost:18790 user@your-vps

# Mở browser: http://localhost:18790
```

## Installation Options

### Standard (npm)

```bash
npm install -g @anthropic/openclaw
openclaw onboard
```

### Experimental Bun

```bash
# Không recommend cho WhatsApp/Telegram
bun install -g @anthropic/openclaw
```

::: warning Bun Compatibility
Bun có issues với WhatsApp và Telegram channels. Dùng Node.js cho production.
:::

### Nix

```bash
# Flake
nix run github:anthropics/openclaw

# Profile
nix profile install github:anthropics/openclaw
```

### Docker

```bash
docker run -d \
  --name openclaw \
  -p 18789:18789 \
  -p 18790:18790 \
  -v openclaw-data:/data \
  ghcr.io/anthropics/openclaw
```

## Gateway Service

### Systemd User Service (Default)

OpenClaw deploy như **systemd user service** mặc định:

```bash
# Install
openclaw gateway install

# Start
systemctl --user start openclaw-gateway

# Enable auto-start
systemctl --user enable openclaw-gateway

# Status
systemctl --user status openclaw-gateway
```

### System-Level Service

Cho shared/persistent servers, dùng system-level service:

```bash
# Create service file
sudo nano /etc/systemd/system/openclaw-gateway.service
```

```ini
[Unit]
Description=OpenClaw Gateway
After=network.target

[Service]
Type=simple
User=openclaw
Group=openclaw
WorkingDirectory=/home/openclaw
ExecStart=/usr/bin/openclaw gateway
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Enable và start
sudo systemctl daemon-reload
sudo systemctl enable openclaw-gateway
sudo systemctl start openclaw-gateway
```

## Configuration

### Config File Location

```bash
# User config
~/.config/openclaw/config.json5

# System config
/etc/openclaw/config.json5
```

### Basic Config

```json5
{
  gateway: {
    port: 18789,
    host: "0.0.0.0",
  },
  models: {
    providers: {
      anthropic: {
        apiKey: "${ANTHROPIC_API_KEY}",
      },
    },
  },
}
```

## Diagnostics

```bash
# Run diagnostics
openclaw doctor

# Check status
openclaw gateway status

# View logs
openclaw logs --follow

# Journalctl logs
journalctl --user -u openclaw-gateway -f
```

## Firewall

### UFW

```bash
# Allow Gateway port
sudo ufw allow 18789/tcp

# Allow Web UI port
sudo ufw allow 18790/tcp

# Reload
sudo ufw reload
```

### Firewalld

```bash
# Allow ports
sudo firewall-cmd --permanent --add-port=18789/tcp
sudo firewall-cmd --permanent --add-port=18790/tcp
sudo firewall-cmd --reload
```

### iptables

```bash
# Allow ports
sudo iptables -A INPUT -p tcp --dport 18789 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 18790 -j ACCEPT
```

## Remote Access

### SSH Tunnel (Recommended)

```bash
# Forward Web UI
ssh -L 18790:localhost:18790 user@server

# Forward both Gateway và Web UI
ssh -L 18789:localhost:18789 -L 18790:localhost:18790 user@server
```

### Tailscale

```bash
# Install
curl -fsSL https://tailscale.com/install.sh | sh

# Start
sudo tailscale up

# Get IP
tailscale ip -4
```

Nodes có thể connect qua Tailscale address.

### Cloudflare Tunnel

```bash
# Install cloudflared
# Configure tunnel cho Web UI
cloudflared tunnel --url http://localhost:18790
```

## Performance Tuning

### Systemd Limits

```ini
# Trong service file
[Service]
LimitNOFILE=65535
LimitNPROC=65535
```

### Sysctl

```bash
# /etc/sysctl.d/99-openclaw.conf
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
fs.file-max = 2097152
```

```bash
sudo sysctl -p /etc/sysctl.d/99-openclaw.conf
```

## Troubleshooting

### Gateway không start

```bash
# Check logs
journalctl --user -u openclaw-gateway

# Manual start
openclaw gateway --verbose

# Check port in use
ss -tlnp | grep 18789
```

### Permission denied

```bash
# Check file permissions
ls -la ~/.config/openclaw/

# Fix permissions
chmod 700 ~/.config/openclaw/
chmod 600 ~/.config/openclaw/config.json5
```

### Network issues

```bash
# Check listening
ss -tlnp | grep openclaw

# Test locally
curl http://localhost:18789

# Check firewall
sudo ufw status
```

### Node.js version issues

```bash
# Check version
node --version

# Should be 22+
# If not, reinstall Node.js
```

## Distributions

| Distro | Status | Notes |
|--------|--------|-------|
| Ubuntu 22.04+ | ✅ | Full support |
| Debian 12+ | ✅ | Full support |
| Fedora 38+ | ✅ | Full support |
| Arch | ✅ | Full support |
| Alpine | ⚠️ | Some issues with native modules |
| RHEL/CentOS | ✅ | Full support |

## Xem thêm

- [Getting Started](/start-here/getting-started)
- [Windows (WSL2)](/platforms/windows)
- [Platforms Overview](/platforms/overview)
- [Configuration](/gateway-ops/configuration)
