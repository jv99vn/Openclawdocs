# Trợ giúp

Trang này là điểm khởi đầu cho người dùng cần hỗ trợ với hệ thống tài liệu OpenClaw.

## Khắc phục sự cố nhanh

Nếu bạn đang gặp vấn đề, hãy làm theo các bước sau:

### 1. Kiểm tra cài đặt

Xác minh Node/npm/PATH:

```bash
# Kiểm tra phiên bản Node
node --version  # Cần >= 22

# Kiểm tra npm
npm --version

# Kiểm tra OpenClaw
openclaw --version
```

### 2. Chạy Doctor

Công cụ Doctor giúp chẩn đoán các vấn đề:

```bash
openclaw doctor
```

### 3. Kiểm tra logs

Xem các logs để hiểu nguyên nhân:

```bash
# Logs của Gateway
tail -f ~/.openclaw/logs/gateway.log

# Logs lệnh
tail -f ~/.openclaw/logs/commands.log
```

## Vấn đề phổ biến

### Gateway không khởi động

1. Kiểm tra xem cổng 18789 có đang được sử dụng không:
   ```bash
   lsof -i :18789
   ```

2. Khởi động lại Gateway:
   ```bash
   openclaw gateway restart
   ```

### Kết nối WhatsApp thất bại

1. Xóa phiên cũ:
   ```bash
   rm -rf ~/.openclaw/baileys/
   ```

2. Quét lại QR code:
   ```bash
   openclaw channels add whatsapp
   ```

### Lệnh openclaw không tìm thấy

Thêm npm global bin vào PATH:

```bash
export PATH="$(npm config get prefix)/bin:$PATH"
```

## Câu hỏi thường gặp (FAQ)

### OpenClaw là gì?

OpenClaw là một cổng tin nhắn kết nối nhiều nền tảng giao tiếp với các AI coding agent. Nó cho phép bạn tương tác với AI qua WhatsApp, Telegram, Discord và nhiều nền tảng khác.

### Tôi cần những gì để bắt đầu?

- Node.js phiên bản 22 trở lên
- Tài khoản với một trong các nhà cung cấp LLM (Anthropic, OpenAI, etc.)
- Tài khoản trên nền tảng tin nhắn bạn muốn sử dụng

### OpenClaw có miễn phí không?

OpenClaw là mã nguồn mở. Tuy nhiên, bạn sẽ cần trả phí cho các dịch vụ LLM (API Anthropic, OpenAI, etc.) mà bạn sử dụng.

### Tôi có thể tự host được không?

Có! OpenClaw được thiết kế để tự host. Bạn có thể chạy nó trên máy local, VPS hoặc cloud provider.

## Tài nguyên bổ sung

- [Index tài liệu đầy đủ](https://docs.openclaw.ai/llms.txt)
- [Khắc phục sự cố chi tiết](/guide/help)
- [FAQ về khái niệm](/guide/concepts)

## Liên hệ hỗ trợ

Nếu bạn không thể tìm được giải pháp:

1. Tìm kiếm trong [GitHub Issues](https://github.com/openclaw/openclaw/issues)
2. Tạo issue mới với thông tin chi tiết về vấn đề
3. Tham gia cộng đồng Discord để được hỗ trợ trực tiếp
