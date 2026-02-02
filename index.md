---
layout: home

hero:
  name: "OpenClaw"
  text: "Tài liệu Tiếng Việt"
  tagline: Cổng tin nhắn kết nối nhiều nền tảng giao tiếp với các AI coding agent
  actions:
    - theme: brand
      text: Bắt đầu
      link: /guide/install
    - theme: alt
      text: Xem trên GitHub
      link: https://github.com/openclaw

features:
  - icon: 🔗
    title: Đa nền tảng
    details: Kết nối WhatsApp, Telegram, Discord, iMessage, Slack và nhiều nền tảng khác thông qua một Gateway duy nhất.
  - icon: 🤖
    title: Tích hợp AI
    details: Hỗ trợ nhiều nhà cung cấp LLM như Anthropic, OpenAI, Venice AI, Google và nhiều hơn nữa.
  - icon: 🛠️
    title: Công cụ mạnh mẽ
    details: Tự động hóa trình duyệt, canvas rendering, quản lý node và tác vụ theo lịch.
  - icon: 🔐
    title: Bảo mật
    details: Xác thực dựa trên token, ghép nối thiết bị với quy trình phê duyệt, hỗ trợ Tailscale/VPN.
  - icon: 📱
    title: Ứng dụng đồng hành
    details: Ứng dụng native cho macOS, iOS và Android để quản lý và điều khiển.
  - icon: 🔌
    title: Mở rộng với Hooks
    details: Hệ thống hook dựa trên sự kiện để tự động hóa các hành động theo phản hồi của agent.
---

## Tổng quan

OpenClaw là một cổng tin nhắn (messaging gateway) kết nối nhiều nền tảng giao tiếp (WhatsApp, Telegram, Discord, iMessage) với các AI coding agent. Hệ thống sử dụng kiến trúc Gateway tập trung để quản lý các kết nối kênh và điều phối tương tác với agent.

## Tích hợp nền tảng chính

| Nền tảng | Công nghệ |
|----------|-----------|
| **WhatsApp** | Giao thức Baileys |
| **Telegram** | grammY Bot API |
| **Discord** | channels.discord.js |
| **iMessage** | imsg CLI (macOS) |
| **Mattermost** | Plugin với Bot API và WebSocket |

## Kiến trúc cốt lõi

Gateway hoạt động như một tiến trình duy nhất chạy liên tục, quản lý tất cả các kết nối kênh. Nó expose:

- **WebSocket control plane** tại `ws://127.0.0.1:18789` (mặc định loopback)
- **HTTP Canvas host** trên cổng `18793`
- **Giao diện Control UI** trên trình duyệt

## Yêu cầu cài đặt

- Node.js phiên bản **22** trở lên
- Khuyến nghị: cài đặt toàn cục npm/pnpm
- Tùy chọn: dịch vụ daemon qua systemd hoặc launchd

## Tính năng nổi bật

- ✅ Streaming message chunks
- ✅ Multi-agent routing với workspace isolation
- ✅ Xác thực subscription (Anthropic/OpenAI)
- ✅ Xử lý media bao gồm hình ảnh và âm thanh
- ✅ Group chat với kích hoạt dựa trên mention
- ✅ Ứng dụng đồng hành cho macOS, iOS và Android
