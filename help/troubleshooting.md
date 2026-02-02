# Khắc phục sự cố

## Chẩn đoán nhanh

Tiếp cận theo bậc từ cơ bản đến nâng cao:

```bash
# Kiểm tra cơ bản
openclaw status

# Chẩn đoán toàn diện
openclaw status --all

# Kiểm tra Gateway sâu
openclaw status --deep
```

## Lệnh khắc phục sự cố chính

| Mục đích | Lệnh |
|----------|------|
| Đánh giá ban đầu | `openclaw status` |
| Chẩn đoán đầy đủ | `openclaw status --all` |
| Kiểm tra Gateway sâu | `openclaw status --deep` |
| Trạng thái dịch vụ | `openclaw gateway status` |
| Giám sát live | `openclaw logs --follow` |

## Vấn đề phổ biến & Giải pháp

### Vấn đề xác thực

#### API keys bị thiếu

**Triệu chứng**: Không thể kết nối với model provider

**Giải pháp**:
```bash
# Chạy lại onboarding
openclaw onboard

# Hoặc sử dụng setup tokens
openclaw configure --section models
```

#### OAuth token refresh failures

**Triệu chứng**: Token hết hạn trên Claude subscriptions

**Giải pháp**: Sử dụng setup-token authentication thay vì OAuth.

#### Credential drift

**Triệu chứng**: Nhiều workspace directories gây ra credential không nhất quán

**Giải pháp**: Kiểm tra và thống nhất workspace:
```bash
openclaw status --all
# Xác minh chỉ có một workspace đang active
```

### Vấn đề mạng & Truy cập

#### HTTP dashboards fail

**Nguyên nhân**: WebCrypto restrictions

**Giải pháp**: Sử dụng HTTPS hoặc localhost

#### Non-loopback binds

**Yêu cầu**: Cấu hình authentication

```json5
{
  "gateway": {
    "auth": {
      "token": "your-secret-token"
    }
  }
}
```

#### Port conflicts

**Triệu chứng**: Gateway không thể bind

**Giải pháp**:
```bash
# Kiểm tra port đang sử dụng
lsof -i :18789

# Kill process nếu cần
kill -9 <PID>
```

### Vấn đề cấu hình dịch vụ

#### Invalid configurations

**Triệu chứng**: Startup bị chặn

**Giải pháp**:
```bash
openclaw doctor --fix
```

#### Mismatched CLI và service configs

**Nguyên nhân**: Chỉnh sửa config trong khi service đang chạy

**Giải pháp**:
```bash
openclaw gateway restart
```

#### Missing environment variables

**Ảnh hưởng**: Tool execution trong sandboxed environments

**Giải pháp**: Đảm bảo variables được set trong environment của service.

### Vấn đề theo Channel

#### WhatsApp mentions với image-only messages

**Triệu chứng**: Metadata bị mất

**Workaround**: Luôn kèm text với images khi mention.

#### Discord guild allowlisting

**Yêu cầu**: Explicit allowlisting dù có mention settings

```json5
{
  "channels": {
    "discord": {
      "allowlist": ["guild-id-1", "guild-id-2"]
    }
  }
}
```

#### Telegram block streaming

**Yêu cầu**: Cấu hình nesting đúng

### Session & Performance

#### Sessions không resume

**Nguyên nhân**:
- Reset windows quá ngắn
- Files bị thiếu

**Giải pháp**: Kiểm tra session files và điều chỉnh timeout.

#### Timeout mặc định

- Default: 30 phút
- Cho tasks dài: Tăng timeout

```json5
{
  "agents": {
    "defaults": {
      "timeout": 3600000  // 1 giờ
    }
  }
}
```

#### High memory usage

**Giải pháp**: Giới hạn conversation history

## System-Level Fixes

### macOS App Crashes

```bash
# Xóa cache
rm -rf ~/Library/Caches/bot.molt.openclaw

# Reset preferences
defaults delete bot.molt.openclaw
```

### Linux Browser Issues

```bash
# Cài đặt dependencies
sudo apt install chromium-browser

# Hoặc sử dụng puppeteer
npm install puppeteer
```

### Windows Service Management

Sử dụng WSL2 với systemd.

## Log Access Points

### Structured logs

```
/tmp/openclaw/openclaw-YYYY-MM-DD.log
```

### Supervisor logs

| Platform | Location |
|----------|----------|
| macOS (launchd) | `~/Library/Logs/openclaw/` |
| Linux (systemd) | `journalctl --user -u openclaw-gateway` |
| Windows (Task Scheduler) | Event Viewer |

## Công cụ chẩn đoán

### Doctor command

```bash
# Kiểm tra cơ bản
openclaw doctor

# Tự động sửa
openclaw doctor --fix

# Chẩn đoán sâu
openclaw doctor --deep
```

### Health check

```bash
# Kiểm tra health
openclaw health

# Với verbose output
openclaw health --verbose

# JSON output
openclaw health --json
```

## Xem thêm

- [FAQ](/help/faq)
- [Trợ giúp](/guide/help)
- [Doctor CLI](/cli/doctor)
