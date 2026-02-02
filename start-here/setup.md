# Thiết lập

Hướng dẫn này bao gồm cài đặt và cấu hình cho OpenClaw, chi tiết cả quy trình stable và development.

## Vị trí lưu trữ chính

Giữ các tùy chỉnh tách biệt khỏi repository:

| Mục đích | Đường dẫn |
|----------|-----------|
| Cấu hình | `~/.openclaw/openclaw.json` |
| Workspace | `~/.openclaw/workspace` (skills, prompts, memories) |
| Credentials | `~/.openclaw/credentials/` |

## Quy trình cài đặt

### Stable Workflow (Khuyến nghị)

1. Cài đặt ứng dụng macOS (tự động quản lý Gateway bundled)
2. Hoàn thành onboarding
3. Xác minh quyền
4. Liên kết các kênh giao tiếp qua CLI

### Development Workflow

Cho contributors làm việc với TypeScript Gateway:

```bash
# Hot-reload development
pnpm gateway:watch

# Cấu hình macOS app thành chế độ "Local"
# Giữ app và CLI trên cùng WebSocket port (mặc định ws://127.0.0.1:18789)
```

## Yêu cầu hệ thống

| Yêu cầu | Phiên bản |
|---------|-----------|
| Node.js | 22+ |
| pnpm | Mới nhất |
| Docker | Tùy chọn |

## Lưu ý quan trọng

::: warning Các vấn đề phổ biến
- **Mismatched ports**: App và CLI phải dùng cùng port
- **Linux systemd**: Có thể cần enable lingering:
  ```bash
  sudo loginctl enable-linger $USER
  ```
:::

## Lưu trữ Credentials

### Đường dẫn theo nền tảng

| Platform | Đường dẫn |
|----------|-----------|
| WhatsApp | `~/.openclaw/credentials/whatsapp/` |
| Telegram | `~/.openclaw/credentials/telegram/` |
| Discord | `~/.openclaw/credentials/discord/` |
| Slack | `~/.openclaw/credentials/slack/` |

### Model Authentication

Profiles và OAuth imports được lưu trong thư mục credentials.

## Chiến lược bảo trì

```bash
# Cập nhật code
git pull

# Giữ cấu hình cá nhân không đổi
# Cấu hình nằm trong ~/.openclaw/ - không bị ảnh hưởng bởi git pull
```

## Xác minh cài đặt

```bash
# Kiểm tra phiên bản
openclaw --version

# Kiểm tra trạng thái
openclaw status

# Kiểm tra health
openclaw health
```

## Xem thêm

- [Cài đặt](/install/install)
- [Cấu hình](/cli/configure)
- [Gateway](/concepts/gateway)
