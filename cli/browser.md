# openclaw browser

Lệnh `openclaw browser` quản lý browser control server của OpenClaw, cho phép tab management, snapshots, screenshots, và UI automation.

## Cú pháp

```bash
openclaw browser <command> [options]
```

## Tính năng chính

### Common Flags

| Flag | Mô tả |
|------|-------|
| `--gateway <url>` | Gateway WebSocket URL |
| `--token <token>` | Authentication token |
| `--timeout <ms>` | Request timeout |
| `--profile <name>` | Browser profile |
| `--json` | JSON output |

## Browser Profiles

### Hai profiles chính

| Profile | Mô tả |
|---------|-------|
| `openclaw` | Dedicated Chrome instance với isolated user data |
| `chrome` | Control existing tabs qua Chrome extension relay |

### Quản lý profiles

```bash
# Liệt kê profiles
openclaw browser profiles list

# Tạo profile mới
openclaw browser profiles create my-profile

# Xóa profile
openclaw browser profiles delete my-profile
```

## Tab Management

```bash
# Liệt kê tabs
openclaw browser tabs list

# Mở URL
openclaw browser tabs open https://example.com

# Focus tab
openclaw browser tabs focus <tab-id>

# Đóng tab
openclaw browser tabs close <tab-id>
```

## UI Automation

### Snapshots

```bash
openclaw browser snapshot
```

### Screenshots

```bash
openclaw browser screenshot --output screenshot.png
```

### Navigation

```bash
openclaw browser navigate https://example.com
```

### Click

```bash
openclaw browser click --selector "#submit-button"
```

### Type

```bash
openclaw browser type --selector "#input-field" --text "Hello"
```

## Chrome Extension Integration

### Cài đặt

1. Enable Developer mode trong Chrome settings
2. Cài unpacked extension từ stable directory
3. Click toolbar button để attach

### Manual attachment

Sau khi cài extension, click toolbar button để attach.

## Remote Control

Khi Gateway và browser chạy trên các machines khác nhau:

```bash
# Trên browser machine
openclaw node run --host <gateway-host> --port 18789
```

Node host proxy cho phép Gateway route actions remotely.

## Ví dụ automation

### Screenshot workflow

```bash
# Mở trang
openclaw browser navigate https://example.com

# Chờ load
sleep 2

# Chụp screenshot
openclaw browser screenshot --output page.png
```

### Form filling

```bash
# Navigate
openclaw browser navigate https://example.com/form

# Fill form
openclaw browser type --selector "#name" --text "John"
openclaw browser type --selector "#email" --text "john@example.com"

# Submit
openclaw browser click --selector "#submit"
```

## Xem thêm

- [Browser Tool API](/concepts/tools)
- [Nodes](/concepts/nodes)
