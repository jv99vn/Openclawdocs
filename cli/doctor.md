# openclaw doctor

Lệnh `openclaw doctor` thực hiện health checks và áp dụng quick fixes cho gateway và channels infrastructure.

## Cú pháp

```bash
openclaw doctor [options]
```

## Ví dụ sử dụng

### Health checks cơ bản

```bash
openclaw doctor
```

### Với repairs

```bash
openclaw doctor --repair
# hoặc
openclaw doctor --fix
```

### Comprehensive diagnostics

```bash
openclaw doctor --deep
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--fix`, `--repair` | Thực hiện repairs với backups |
| `--deep` | Comprehensive diagnostics |
| `--non-interactive` | Bỏ qua interactive prompts |
| `--json` | Output JSON |

## Key Behaviors

### Interactive Mode

Tool prompts users cho fixes (keychain access, OAuth configuration) chỉ khi:
- Chạy trong terminal với stdin available
- `--non-interactive` không được enable

Automated environments (cron jobs, Telegram bots) bỏ qua interactive steps.

### Repair Function

Khi sử dụng `--fix` hoặc `--repair`:
1. Tạo backup tại `~/.openclaw/openclaw.json.bak`
2. Xóa unknown config keys, liệt kê mỗi removal

## Vấn đề macOS Configuration Override

Trên macOS, environment variables set qua `launchctl setenv` cho `OPENCLAW_GATEWAY_TOKEN` hoặc `OPENCLAW_GATEWAY_PASSWORD` **ưu tiên hơn** config files, có thể gây authentication failures.

### Resolution

```bash
# Kiểm tra overrides
launchctl getenv OPENCLAW_GATEWAY_TOKEN

# Xóa overrides
launchctl unsetenv OPENCLAW_GATEWAY_TOKEN
launchctl unsetenv OPENCLAW_GATEWAY_PASSWORD
```

## Các kiểm tra được thực hiện

| Kiểm tra | Mô tả |
|----------|-------|
| Config validation | Xác minh cấu hình hợp lệ |
| Credentials | Kiểm tra credentials có sẵn |
| Gateway connectivity | Kiểm tra kết nối Gateway |
| Channel status | Kiểm tra trạng thái các channels |
| Dependencies | Kiểm tra dependencies cần thiết |

## Output Example

```
✓ Configuration valid
✓ Credentials found
✓ Gateway reachable
⚠ WhatsApp session expired
✓ Telegram connected
✓ Discord connected

1 issue found. Run with --fix to repair.
```

## Xem thêm

- [Khắc phục sự cố](/help/troubleshooting)
- [Security Audit](/concepts/security)
