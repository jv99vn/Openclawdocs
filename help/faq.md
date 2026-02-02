# Câu hỏi thường gặp (FAQ)

## Quick Start & Installation

### OpenClaw là gì?

OpenClaw là một **local-first control plane** cho phép bạn vận hành AI assistant trên phần cứng cá nhân với truy cập qua các ứng dụng nhắn tin hiện có (WhatsApp, Telegram, Slack, Discord, Signal, iMessage).

Hệ thống hỗ trợ:
- Nhiều agents
- Persistent memory
- Tool orchestration

### Tôi cần những gì để bắt đầu?

| Yêu cầu | Chi tiết |
|---------|----------|
| Node.js | >= 22 |
| Hệ điều hành | macOS, Linux, Windows (WSL2) |
| LLM Provider | Anthropic, OpenAI, hoặc khác |

### Cách cài đặt nhanh nhất?

```bash
# Cài đặt
curl -fsSL https://openclaw.ai/install.sh | bash

# Onboarding
openclaw onboard --install-daemon
```

### OpenClaw có miễn phí không?

OpenClaw là **mã nguồn mở**. Tuy nhiên, bạn sẽ cần trả phí cho:
- API của LLM providers (Anthropic, OpenAI, etc.)
- Các dịch vụ bên thứ ba (nếu sử dụng)

## Model Configuration

### Làm sao để cấu hình model?

Model mặc định được khuyến nghị:
```json5
{
  "agents": {
    "defaults": {
      "model": "anthropic/claude-opus-4-5"
    }
  }
}
```

### Tôi có thể dùng providers nào?

Providers được hỗ trợ:
- Anthropic
- OpenAI
- Venice AI (khuyến nghị cho privacy)
- OpenRouter
- Qwen
- MiniMax
- Ollama (local models)
- Và nhiều hơn...

### Làm sao để chuyển model giữa sessions?

Sử dụng lệnh `/model`:
```
/model anthropic/claude-sonnet-4
```

### Làm sao để cấu hình fallbacks?

```json5
{
  "agents": {
    "defaults": {
      "model": "anthropic/claude-opus-4-5",
      "fallbacks": [
        "openai/gpt-4o",
        "venice/llama-3.3-70b"
      ]
    }
  }
}
```

## Remote Deployment

### Gateway có thể chạy ở đâu?

- VPS
- Home servers
- Cloud providers
- Local machine

### Làm sao để kết nối remote?

Sử dụng **Tailscale** (khuyến nghị) hoặc SSH tunneling:

```bash
# SSH tunnel
ssh -N -L 18789:127.0.0.1:18789 user@host
```

### Nodes là gì?

Nodes là thiết bị companion kết nối với Gateway:
- macOS/iOS/Android
- Headless servers
- Cung cấp capabilities như camera, screen, commands

## Data Storage

### Dữ liệu được lưu ở đâu?

| Loại | Vị trí |
|------|--------|
| Configuration | `~/.openclaw/openclaw.json` |
| Workspace | `~/.openclaw/workspace` |
| Credentials | `~/.openclaw/credentials/` |
| Sessions | `~/.openclaw/sessions/` |

### Định dạng config file?

**JSON5** - hỗ trợ comments và trailing commas:

```json5
{
  // This is a comment
  "gateway": {
    "port": 18789,
  }
}
```

### Dữ liệu có được gửi ra ngoài không?

Session history và credentials **ở local** trừ khi bạn liên hệ external services (LLM APIs, messaging platforms).

## Troubleshooting

### Bước đầu tiên khi gặp vấn đề?

```bash
# Kiểm tra trạng thái
openclaw status

# Kiểm tra models
openclaw models status

# Chạy doctor
openclaw doctor
```

### Làm sao xem logs?

```bash
# Live logs
openclaw logs --follow

# File logs
tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log
```

### Gateway không khởi động?

1. Kiểm tra port:
   ```bash
   lsof -i :18789
   ```

2. Restart service:
   ```bash
   openclaw gateway restart
   ```

3. Chạy doctor:
   ```bash
   openclaw doctor --fix
   ```

## Security

### Các model nhỏ có an toàn không?

::: danger Cảnh báo
Giữ smaller/quantized models **tránh xa tool access** do vulnerability với prompt injection.
:::

### Làm sao để secure public-facing deployments?

- Sử dụng **sandboxing**
- Cấu hình **allowlisting** cho channel access
- Enable **token authentication**

### Channel allowlisting hoạt động thế nào?

```json5
{
  "channels": {
    "discord": {
      "allowlist": ["guild-id-1"],
      "denylist": ["guild-id-2"]
    }
  }
}
```

## Miscellaneous

### Tôi có thể tự host không?

**Có!** OpenClaw được thiết kế để tự host. Bạn có toàn quyền kiểm soát:
- Dữ liệu
- Model selection
- Channel configuration

### Hỗ trợ những channels nào?

| Category | Channels |
|----------|----------|
| Popular | WhatsApp, Telegram, Discord, Slack |
| Enterprise | Microsoft Teams, Google Chat |
| Privacy | Signal |
| Self-hosted | Mattermost, Matrix |
| Other | iMessage, Nostr, Twitch |

### Làm sao để contribute?

1. Fork repository
2. Tạo feature branch
3. Submit pull request

Chi tiết tại: [GitHub](https://github.com/openclaw/openclaw)

## Xem thêm

- [Khắc phục sự cố](/help/troubleshooting)
- [Bắt đầu nhanh](/start-here/getting-started)
- [Cấu hình](/cli/configure)
