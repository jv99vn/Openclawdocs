# Onboarding macOS

Tài liệu này mô tả quy trình onboarding cho ứng dụng macOS của OpenClaw, được thiết kế để cung cấp trải nghiệm first-run mượt mà.

## Quy trình Onboarding (8 Bước)

```
Welcome → Gateway → Authentication → Wizard → Permissions → CLI → Chat → Ready
```

| Bước | Mô tả |
|------|-------|
| 1 | Màn hình chào mừng với thông báo bảo mật |
| 2 | Chọn gateway |
| 3 | Xác thực |
| 4 | Setup wizard |
| 5 | Yêu cầu quyền |
| 6 | Cài đặt CLI (tùy chọn) |
| 7 | Chat onboarding chuyên dụng |
| 8 | Trạng thái sẵn sàng |

## Các thành phần chính

### Cấu hình Gateway

Người dùng chọn giữa:
- **Local execution**: Chạy trên Mac của bạn
- **Remote access**: Qua SSH/Tailnet
- **Deferred setup**: Thiết lập sau

::: warning Token mới
Wizard hiện tại tạo một **token** ngay cả cho loopback, nên local WS clients phải xác thực.
:::

### Xác thực

Ứng dụng macOS hỗ trợ **Anthropic OAuth** thông qua PKCE flow:

```
Credentials được lưu tại: ~/.openclaw/credentials/oauth.json
```

Các provider thay thế yêu cầu environment variables hoặc config files.

### Quyền macOS

Ứng dụng yêu cầu các quyền sau:

| Quyền | Mục đích |
|-------|----------|
| Notifications | Thông báo hệ thống |
| Accessibility | Điều khiển UI |
| Screen Recording | Chụp màn hình |
| Microphone/Speech | Nhận dạng giọng nói |
| Automation | Tự động hóa hệ thống |

### Agent Bootstrap

Khi chạy lần đầu, hệ thống:
1. Khởi tạo workspace (thường `~/.openclaw/workspace`)
2. Seed các file tài liệu
3. Thực hiện identity Q&A ritual
4. Xóa bootstrap files sau khi hoàn thành

## Cài đặt CLI

Cài đặt CLI qua npm/pnpm là **tùy chọn**:

```bash
# npm
npm install -g openclaw

# pnpm
pnpm add -g openclaw
```

## Gmail Integration

Gmail integration yêu cầu thiết lập thủ công:

```bash
openclaw webhooks gmail setup
```

## Remote Deployments

Với triển khai remote:
- Credentials được lưu trên gateway host
- Workspace files nằm trên gateway host
- Local app kết nối qua WebSocket

## Khắc phục sự cố Onboarding

### Reset onboarding

```bash
openclaw reset --scope onboarding
```

### Chạy lại wizard

```bash
openclaw onboard --force
```

### Kiểm tra trạng thái

```bash
openclaw status --all
```

## Xem thêm

- [Bắt đầu nhanh](/start-here/getting-started)
- [Thiết lập](/start-here/setup)
- [CLI Onboard](/cli/onboard)
