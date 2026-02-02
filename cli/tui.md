# TUI

Lệnh `openclaw tui` khởi chạy giao diện terminal user interface kết nối đến Gateway.

## Tổng quan

TUI (Terminal User Interface) cung cấp:

- Giao diện chat trong terminal
- Kết nối real-time với Gateway
- Quản lý sessions
- Hỗ trợ rich text và markdown

## Cú pháp

```bash
openclaw tui [options]
```

## Options

| Option | Mô tả |
|--------|-------|
| `--url <url>` | WebSocket URL của Gateway |
| `--token <token>` | Authentication token |
| `--session <name>` | Session name |
| `--deliver` | Deliver mode |
| `--help` | Hiển thị help |

## Ví dụ sử dụng

### Cơ bản

```bash
# Khởi chạy TUI với default settings
openclaw tui
```

### Custom Connection

```bash
# Kết nối đến specific Gateway
openclaw tui --url ws://127.0.0.1:18789 --token <token>
```

### Session Management

```bash
# Sử dụng specific session
openclaw tui --session main --deliver
```

### Remote Gateway

```bash
# Kết nối đến remote Gateway
openclaw tui --url ws://192.168.1.100:18789
```

## Tính năng TUI

### Chat Interface

- Real-time messaging
- Streaming responses
- Message history
- Multi-line input

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift+Enter` | New line |
| `Ctrl+C` | Cancel/Exit |
| `Ctrl+L` | Clear screen |
| `Up/Down` | History navigation |

### Rich Text

- Markdown rendering
- Code highlighting
- Links clickable
- Tables formatted

## Connection

### Default

TUI tự động kết nối đến local Gateway:
- URL: `ws://127.0.0.1:18789`
- Token từ config file

### Custom URL

```bash
# LAN Gateway
openclaw tui --url ws://192.168.1.50:18789

# Tailscale
openclaw tui --url ws://my-machine.tailnet.ts.net:18789
```

### Authentication

Token có thể được cung cấp qua:
1. `--token` flag
2. Environment variable
3. Config file

```bash
# Via flag
openclaw tui --token abc123

# Via env
export OPENCLAW_TOKEN=abc123
openclaw tui
```

## Sessions

### Default Session

Mặc định sử dụng session `main`:

```bash
openclaw tui  # Uses 'main' session
```

### Named Sessions

```bash
# Work session
openclaw tui --session work

# Personal session
openclaw tui --session personal
```

### Session Persistence

Messages được persist trong session, cho phép tiếp tục conversation sau khi restart.

## Deliver Mode

```bash
openclaw tui --session main --deliver
```

Deliver mode:
- Gửi message và exit
- Useful cho scripting
- Non-interactive

## Configuration

TUI sử dụng settings từ Gateway config:

```json5
{
  tui: {
    theme: "dark",
    timestamps: true,
    wordWrap: true,
  },
}
```

## Troubleshooting

### Connection Failed

1. Verify Gateway đang chạy: `openclaw gateway status`
2. Check URL và port
3. Verify token hợp lệ
4. Check network connectivity

### Slow Responses

1. Check Gateway logs
2. Verify model configuration
3. Check network latency

### Display Issues

1. Verify terminal supports UTF-8
2. Check terminal size (minimum 80x24)
3. Update terminal emulator

## So sánh với WebChat

| Feature | TUI | WebChat |
|---------|-----|---------|
| Platform | Terminal | Browser |
| Offline | ❌ | ❌ |
| Rich media | Limited | Full |
| Keyboard-first | ✅ | ❌ |
| Mouse support | Limited | Full |

## Resources

- [TUI Guide](/tui)
- [Gateway Configuration](/gateway-ops/configuration)
- [Web Interfaces](/web-interfaces/web)

## Xem thêm

- [CLI Overview](/cli/setup)
- [Chat Command](/cli/chat)
- [WebChat](/web-interfaces/web)
