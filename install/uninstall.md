# Gỡ cài đặt

Lệnh `openclaw uninstall` xóa gateway service và dữ liệu local liên quan trong khi giữ lại CLI tool.

## Cú pháp lệnh

### Gỡ cài đặt cơ bản

```bash
openclaw uninstall
```

Xóa gateway service + local data (CLI vẫn còn).

### Xóa hoàn toàn với xác nhận tự động

```bash
openclaw uninstall --all --yes
```

### Preview mode

Xem trước thay đổi mà không thực thi:

```bash
openclaw uninstall --dry-run
```

## Các tùy chọn

| Flag | Mô tả |
|------|-------|
| `--all` | Xóa tất cả dữ liệu bao gồm credentials |
| `--yes` | Bỏ qua xác nhận |
| `--dry-run` | Xem trước mà không thực thi |
| `--keep-config` | Giữ lại file cấu hình |

## Gỡ cài đặt theo thành phần

### Chỉ gỡ Gateway service

```bash
openclaw gateway uninstall
```

### Reset config/state

```bash
openclaw reset --scope config+creds+sessions --yes
```

## Gỡ cài đặt thủ công

### macOS

```bash
# Xóa LaunchAgent
launchctl unload ~/Library/LaunchAgents/bot.molt.gateway.plist
rm ~/Library/LaunchAgents/bot.molt.gateway.plist

# Xóa application
rm -rf /Applications/OpenClaw.app

# Xóa data
rm -rf ~/.openclaw
```

### Linux

```bash
# Xóa systemd service
systemctl --user stop openclaw-gateway
systemctl --user disable openclaw-gateway
rm ~/.config/systemd/user/openclaw-gateway.service

# Xóa data
rm -rf ~/.openclaw
```

### Gỡ CLI global

**npm:**
```bash
npm uninstall -g openclaw
```

**pnpm:**
```bash
pnpm remove -g openclaw
```

## Các thư mục cần xóa

| Thư mục | Mô tả |
|---------|-------|
| `~/.openclaw/` | Cấu hình, workspace, credentials |
| `~/Library/LaunchAgents/bot.molt.gateway.plist` | macOS service |
| `~/.config/systemd/user/openclaw-gateway.service` | Linux service |
| `/tmp/openclaw/` | Logs tạm thời |

## Lưu ý quan trọng

::: warning Backup trước khi gỡ
Đảm bảo backup dữ liệu quan trọng trước khi gỡ cài đặt:
```bash
cp -r ~/.openclaw ~/.openclaw.backup
```
:::

### Dữ liệu không thể khôi phục

Sau khi gỡ cài đặt với `--all`, các dữ liệu sau sẽ bị xóa vĩnh viễn:
- Session history
- Credentials
- Workspace files
- Custom skills

### Channel sessions

Một số channel sessions (WhatsApp, Telegram) có thể cần logout riêng:

```bash
# Trước khi gỡ cài đặt
openclaw channels logout whatsapp
openclaw channels logout telegram
```

## Xác minh gỡ cài đặt

Sau khi gỡ cài đặt, xác minh:

```bash
# Kiểm tra CLI còn không
which openclaw

# Kiểm tra service còn không
openclaw gateway status  # Nên báo lỗi

# Kiểm tra thư mục đã xóa
ls ~/.openclaw  # Nên không tồn tại
```

## Xem thêm

- [Cài đặt](/install/install)
- [Reset CLI](/cli/reset)
- [Khắc phục sự cố](/help/troubleshooting)
