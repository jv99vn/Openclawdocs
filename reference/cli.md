# CLI Reference

Tài liệu tham khảo CLI toàn diện này document giao diện command-line của OpenClaw, bao gồm setup, configuration, messaging và gateway management. Hệ thống sử dụng "lobster palette" color scheme cho terminal output.

## Danh mục lệnh chính

### Setup & Configuration

| Lệnh | Mô tả |
|------|-------|
| `setup` | Thiết lập ban đầu |
| `onboard` | Wizard onboarding |
| `configure` | Cấu hình tương tác |
| `config` | Quản lý settings |

### Channel Management

Lệnh `channels` quản lý chat integrations trên nhiều nền tảng:

```bash
# Liệt kê kênh
openclaw channels list

# Thêm kênh mới
openclaw channels add <platform>

# Xem trạng thái
openclaw channels status

# Xóa kênh
openclaw channels remove <channel-id>
```

**Nền tảng được hỗ trợ**: WhatsApp, Telegram, Discord, Slack, và nhiều hơn nữa.

### Messaging & Agents

```bash
# Gửi tin nhắn
openclaw message <channel> <content>

# Quản lý agents
openclaw agent <subcommand>
openclaw agents list
```

Lệnh `message` cung cấp "unified outbound messaging plus channel actions", trong khi `agent` và `agents` quản lý các agent instances riêng lẻ với isolated workspaces.

### Gateway Control

```bash
# Chạy WebSocket server
openclaw gateway

# Cài đặt service
openclaw gateway install

# Khởi động
openclaw gateway start

# Dừng
openclaw gateway stop

# Khởi động lại
openclaw gateway restart

# Trạng thái
openclaw gateway status
```

### Model Management

```bash
# Quản lý authentication profiles
openclaw models profiles

# Cấu hình fallback
openclaw models fallback

# Capability scanning
openclaw models scan
```

## Global Features

### Output Styling

Hệ thống render ANSI colors và OSC-8 hyperlinks trong TTY sessions, với fallbacks cho plain text.

**Tắt styling**:

```bash
# JSON output
openclaw --json <command>

# Plain text
openclaw --plain <command>

# Không màu
openclaw --no-color <command>
```

### Profile Isolation

Flag `--profile <name>` cô lập state dưới các thư mục profile-specific:

```bash
# Sử dụng profile cụ thể
openclaw --profile work channels list

# Development profile
openclaw --dev gateway
```

`--dev` sử dụng một thư mục development riêng biệt.

## Các khả năng nổi bật

### Vector Memory Search

```bash
openclaw memory search "query"
```

### Cron Job Scheduling

```bash
# Liệt kê jobs
openclaw cron list

# Thêm job
openclaw cron add "0 9 * * *" "openclaw message telegram 'Good morning'"

# Xóa job
openclaw cron remove <job-id>
```

### Browser Automation

```bash
openclaw browser launch
openclaw browser navigate <url>
openclaw browser screenshot
```

### Node Management

```bash
# Liệt kê nodes
openclaw nodes list

# Trạng thái node
openclaw nodes status

# Ghép nối
openclaw devices approve <id>
```

### DNS Discovery

```bash
openclaw discover
```

### Terminal UI

TUI cung cấp interactive gateway access:

```bash
openclaw tui
```

## Danh sách lệnh đầy đủ

### Thiết lập

| Lệnh | Mô tả |
|------|-------|
| `openclaw setup` | Chạy thiết lập ban đầu |
| `openclaw onboard` | Wizard onboarding đầy đủ |
| `openclaw doctor` | Chẩn đoán và sửa lỗi |

### Cấu hình

| Lệnh | Mô tả |
|------|-------|
| `openclaw config get <key>` | Lấy giá trị cấu hình |
| `openclaw config set <key> <value>` | Đặt giá trị cấu hình |
| `openclaw config list` | Liệt kê tất cả cấu hình |
| `openclaw configure` | Cấu hình tương tác |

### Channels

| Lệnh | Mô tả |
|------|-------|
| `openclaw channels list` | Liệt kê tất cả kênh |
| `openclaw channels add <platform>` | Thêm kênh mới |
| `openclaw channels remove <id>` | Xóa kênh |
| `openclaw channels status` | Trạng thái kênh |

### Gateway

| Lệnh | Mô tả |
|------|-------|
| `openclaw gateway` | Chạy gateway |
| `openclaw gateway install` | Cài đặt service |
| `openclaw gateway start` | Khởi động service |
| `openclaw gateway stop` | Dừng service |
| `openclaw gateway restart` | Khởi động lại |
| `openclaw gateway status` | Kiểm tra trạng thái |

### Agents

| Lệnh | Mô tả |
|------|-------|
| `openclaw agents list` | Liệt kê agents |
| `openclaw agent <name>` | Chạy agent cụ thể |
| `openclaw agent stop <name>` | Dừng agent |

### Models

| Lệnh | Mô tả |
|------|-------|
| `openclaw models list` | Liệt kê models |
| `openclaw models profiles` | Quản lý profiles |
| `openclaw models auth add <provider>` | Thêm authentication |
| `openclaw models scan` | Scan capabilities |

### Nodes

| Lệnh | Mô tả |
|------|-------|
| `openclaw nodes list` | Liệt kê nodes |
| `openclaw nodes status` | Trạng thái nodes |
| `openclaw devices list` | Liệt kê devices |
| `openclaw devices approve <id>` | Phê duyệt device |

### Hooks

| Lệnh | Mô tả |
|------|-------|
| `openclaw hooks list` | Liệt kê hooks |
| `openclaw hooks enable <name>` | Bật hook |
| `openclaw hooks disable <name>` | Tắt hook |
| `openclaw hooks info <name>` | Thông tin hook |

### Tiện ích

| Lệnh | Mô tả |
|------|-------|
| `openclaw tui` | Terminal UI |
| `openclaw doctor` | Chẩn đoán |
| `openclaw version` | Hiển thị version |
| `openclaw help` | Trợ giúp |

## Environment Variables

| Biến | Mô tả |
|------|-------|
| `OPENCLAW_GATEWAY_TOKEN` | Token xác thực Gateway |
| `OPENCLAW_CONFIG_DIR` | Thư mục cấu hình |
| `OPENCLAW_PROFILE` | Profile mặc định |
| `OPENCLAW_LOG_LEVEL` | Mức log (debug, info, warn, error) |

## Ví dụ sử dụng

### Thiết lập nhanh

```bash
# Cài đặt
curl -fsSL https://openclaw.ai/install.sh | bash

# Onboarding
openclaw onboard --install-daemon

# Kiểm tra
openclaw doctor
```

### Gửi tin nhắn

```bash
# Gửi qua Telegram
openclaw message telegram "Hello world"

# Gửi qua WhatsApp
openclaw message whatsapp "+84123456789" "Hello"
```

### Quản lý Gateway

```bash
# Khởi động với port tùy chỉnh
openclaw gateway --port 8080

# Chạy ở chế độ dev
openclaw --dev gateway --allow-unconfigured
```
