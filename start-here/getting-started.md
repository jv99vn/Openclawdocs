# Bắt đầu nhanh

Hướng dẫn này giúp bạn triển khai nhanh từ cài đặt ban đầu đến khả năng chat với các cấu hình mặc định hợp lý.

## Các lựa chọn khởi chạy

### Điểm vào nhanh nhất

Control UI dashboard có thể truy cập qua `openclaw dashboard` hoặc `http://127.0.0.1:18789/` - không cần cấu hình channel.

### Phương pháp được khuyến nghị

Chạy CLI onboarding wizard:

```bash
openclaw onboard
```

Wizard tự động hóa:
- Xác thực model và cấu hình OAuth
- Cài đặt tham số Gateway
- Tích hợp channel (WhatsApp, Telegram, Discord, Mattermost)
- Cấu hình mặc định cho tin nhắn trực tiếp an toàn
- Khởi tạo workspace với thiết lập skill
- Cài đặt dịch vụ daemon (tùy chọn)

## Yêu cầu hệ thống

| Yêu cầu | Chi tiết |
|---------|----------|
| Node.js | Phiên bản 22 trở lên |
| pnpm | Khuyến nghị cho source builds |
| Brave Search API | Khuyến nghị cho chức năng web |

### Lưu ý theo nền tảng

- **macOS**: Cài đặt Xcode
- **Windows**: Sử dụng WSL2 (Ubuntu được ưu tiên) thay vì Windows native

## Các bước cài đặt

### Cài đặt tiêu chuẩn

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### Windows PowerShell

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

## Quy trình cấu hình cốt lõi

Chạy lệnh sau để thiết lập:

```bash
openclaw onboard --install-daemon
```

Điều này sẽ thiết lập:
- Chế độ triển khai Gateway (local hoặc remote)
- Phương thức xác thực (OAuth hoặc API keys)
- Thông tin đăng nhập channel provider
- Background service runtime (Node được ưu tiên)

::: tip Khuyến nghị Anthropic
Anthropic khuyến nghị sử dụng phương pháp API key.
:::

## Kích hoạt Gateway

Sau khi cài đặt daemon, xác minh trạng thái:

```bash
openclaw gateway status
```

Chạy foreground thủ công:

```bash
openclaw gateway --port 18789 --verbose
```

## Xác minh & Kiểm tra bảo mật

```bash
# Kiểm tra trạng thái
openclaw status

# Kiểm tra health
openclaw health

# Audit bảo mật sâu
openclaw security audit --deep
```

## Tích hợp Channel & An toàn

### Kết nối các nền tảng

**WhatsApp:**
```bash
openclaw channels login
```

**Telegram/Discord:**
Cấu hình thủ công qua file config hoặc wizard.

### Xác minh DM

Tin nhắn trực tiếp từ người lạ sẽ nhận được mã pairing yêu cầu phê duyệt:

```bash
openclaw pairing approve <code>
```

## Thiết lập phát triển

Cho cài đặt từ source:

```bash
# Clone repository
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# Cài đặt dependencies
pnpm install

# Build
pnpm build

# Chạy onboarding
pnpm openclaw onboard
```

## Bước tiếp theo

Các triển khai nâng cao bao gồm:
- Ứng dụng macOS với kích hoạt bằng giọng nói
- iOS/Android Canvas nodes
- Truy cập SSH từ xa
- Triển khai VPN-integrated persistent

## Xem thêm

- [Cài đặt chi tiết](/install/install)
- [Cấu hình Gateway](/concepts/gateway)
- [Kênh trò chuyện](/concepts/channels)
