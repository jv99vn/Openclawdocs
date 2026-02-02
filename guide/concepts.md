# Khái niệm cốt lõi

Tài liệu này mô tả kiến trúc của **Gateway daemon** thống nhất, quản lý tất cả các nền tảng tin nhắn (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, WebChat) thông qua một dịch vụ duy nhất chạy lâu dài trên máy host.

## Thành phần chính

### Gateway (daemon)

Gateway là thành phần trung tâm:

- **Duy trì các kết nối provider** - Quản lý phiên làm việc với tất cả các nền tảng tin nhắn
- **Expose typed WS API** - Cung cấp API WebSocket với requests, responses và server-push events
- **Địa chỉ bind mặc định**: `127.0.0.1:18789`

### Clients

Các ứng dụng control-plane kết nối qua WebSocket:

- Ứng dụng macOS
- CLI
- Web UI

Clients gửi các requests như `health`, `status`, và `agent`.

### Nodes

Các thiết bị (macOS/iOS/Android/headless) kết nối đến cùng WebSocket server với vai trò `node` và expose các lệnh dành riêng cho thiết bị.

### Canvas host

Phục vụ trên cổng `18793` cho HTML có thể chỉnh sửa bởi agent và các thành phần UI.

## Giao thức kết nối

### Handshake bắt buộc

Frame đầu tiên **phải** là `connect`. Sau khi xác thực, clients trao đổi các JSON messages có kiểu:

- **Requests** nhận về responses
- **Server** push events bất đồng bộ

```json
{
  "type": "connect",
  "params": {
    "auth": {
      "token": "your-gateway-token"
    }
  }
}
```

## Tính năng bảo mật

### Xác thực dựa trên Token

- Sử dụng biến môi trường `OPENCLAW_GATEWAY_TOKEN`
- Token được tạo tự động bởi wizard

### Ghép nối thiết bị

- Quy trình phê duyệt với workflow approval
- Kết nối local có thể được auto-approve
- Kết nối remote yêu cầu challenge signatures

### Truy cập từ xa

Hỗ trợ Tailscale/VPN hoặc SSH tunneling cho truy cập từ xa an toàn.

## Các bất biến quan trọng

::: warning Lưu ý quan trọng
- **Đúng một Gateway** điều khiển một phiên Baileys duy nhất trên mỗi host
- **Events không được replay** - Clients phải refresh khi có gaps trong dữ liệu
:::

## Luồng dữ liệu

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   WhatsApp  │     │  Telegram   │     │   Discord   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Gateway   │
                    │  :18789     │
                    └──────┬──────┘
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐
│  macOS App  │     │     CLI     │     │   Web UI    │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Mô hình đa agent

OpenClaw hỗ trợ multi-agent routing với workspace isolation:

- Mỗi agent có workspace riêng biệt
- Tin nhắn được định tuyến dựa trên context hội thoại
- Hỗ trợ subscription authentication cho Anthropic/OpenAI
