# Nền tảng

OpenClaw được xây dựng bằng TypeScript với Node là runtime được khuyến nghị. Các ứng dụng đồng hành có sẵn cho macOS và mobile platforms, với Windows và Linux options đang được lên kế hoạch.

::: warning Lưu ý về Bun
Bun **không được khuyến nghị** cho Gateway (bugs với WhatsApp/Telegram).
:::

## Các tùy chọn nền tảng

### Hệ điều hành

| OS | Trạng thái | Ghi chú |
|----|------------|---------|
| **macOS** | ✅ Hỗ trợ đầy đủ | Companion app có sẵn |
| **iOS** | ✅ Hỗ trợ đầy đủ | App Store |
| **Android** | ✅ Hỗ trợ đầy đủ | Play Store |
| **Linux** | ✅ Hỗ trợ đầy đủ | CLI + systemd |
| **Windows** | ⚠️ Qua WSL2 | Yêu cầu WSL2 |

### Giải pháp Hosting

| Provider | Loại | Ghi chú |
|----------|------|---------|
| **Fly.io** | Container | Easy deployment |
| **Hetzner** | VPS + Docker | Cost effective |
| **GCP Compute Engine** | VM | Enterprise grade |
| **exe.dev** | VM + HTTPS proxy | Built-in proxy |

## Bắt đầu

### Kiểm tra trạng thái

```bash
openclaw gateway status
```

### Tài liệu tham khảo

- [Hướng dẫn bắt đầu](/guide/install)
- [Gateway runbook](/guide/gateway)
- [Hướng dẫn cấu hình](/guide/concepts)

## Phương pháp cài đặt

### 1. Wizard Installation (Khuyến nghị)

```bash
openclaw onboard
```

Wizard sẽ hướng dẫn bạn qua toàn bộ quá trình.

### 2. Direct Installation

```bash
npm install -g openclaw@latest
openclaw gateway install
```

### 3. Configuration Flow

```bash
openclaw configure
```

### 4. Repair/Migration

```bash
openclaw doctor --fix
```

## Đăng ký Service

### macOS - LaunchAgent

Service được đăng ký qua LaunchAgent:

```xml
<!-- ~/Library/LaunchAgents/bot.molt.gateway.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>bot.molt.gateway</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/openclaw</string>
        <string>gateway</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

### Linux/WSL2 - systemd

Service được đăng ký qua systemd user service:

```ini
# ~/.config/systemd/user/openclaw-gateway.service
[Unit]
Description=OpenClaw Gateway
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/openclaw gateway
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
```

Enable và start:

```bash
systemctl --user enable openclaw-gateway
systemctl --user start openclaw-gateway
```

## Triển khai Docker

### Dockerfile cơ bản

```dockerfile
FROM node:22-alpine

WORKDIR /app

RUN npm install -g openclaw@latest

COPY config/openclaw.json /root/.openclaw/openclaw.json

EXPOSE 18789

CMD ["openclaw", "gateway"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  openclaw:
    build: .
    ports:
      - "18789:18789"
    volumes:
      - openclaw-data:/root/.openclaw
    restart: unless-stopped
    environment:
      - OPENCLAW_GATEWAY_TOKEN=${GATEWAY_TOKEN}

volumes:
  openclaw-data:
```

## Triển khai Fly.io

### fly.toml

```toml
app = "my-openclaw"
primary_region = "sin"

[build]
  image = "node:22-alpine"

[env]
  NODE_ENV = "production"

[http_service]
  internal_port = 18789
  force_https = true

[[services]]
  internal_port = 18789
  protocol = "tcp"

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

### Deploy

```bash
fly deploy
fly secrets set OPENCLAW_GATEWAY_TOKEN=your-token
```

## Companion Apps

### macOS App

- Quản lý Gateway từ menu bar
- Notifications cho tin nhắn mới
- Quick actions cho các tác vụ phổ biến

### iOS/Android Apps

- Remote control Gateway
- Nhận notifications
- Trả lời tin nhắn on-the-go
