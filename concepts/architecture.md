# Kiến trúc Gateway

## Tổng quan

Hệ thống OpenClaw sử dụng một **Gateway daemon duy nhất, chạy liên tục** quản lý tất cả các nền tảng nhắn tin (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, WebChat).

> "Một Gateway duy nhất sở hữu tất cả messaging surfaces."

## Các thành phần chính

### Gateway (Daemon)

- Duy trì provider connections
- Exposes typed WebSocket API với validation theo JSON Schema
- Emits events: `agent`, `chat`, `presence`, `health`, `heartbeat`, `cron`

### Clients

macOS app, CLI, và web UI mỗi cái duy trì **một WebSocket connection**:
- Gửi requests (health checks, agent calls)
- Subscribe to events

### Nodes

Các thiết bị (macOS/iOS/Android/headless) kết nối với `role: node`:
- Declare explicit capabilities và commands
- **Pairing là device-based**
- Approval nằm trong device pairing store

### WebChat

Static UI sử dụng Gateway's WebSocket API cho:
- Chat operations
- History retrieval

## Connection Protocol

### Handshake bắt buộc

Frame đầu tiên **phải** là `connect` request.

### Cấu trúc payload

JSON payloads qua WebSocket text frames:

**Request:**
```json
{
  "type": "req",
  "id": "unique-id",
  "method": "health",
  "params": {}
}
```

**Response:**
```json
{
  "type": "res",
  "id": "unique-id",
  "result": { "ok": true }
}
```

## Security & Trust

### Device Identity

- **Bắt buộc** trên mọi connect
- Devices mới cần pairing approval
- Sau approval, Gateway cấp device token

### Local vs Remote

| Loại | Xử lý |
|------|-------|
| Local (loopback) | Có thể auto-approval |
| Remote | Phải sign challenge nonce, cần explicit approval |

## Remote Access

### Phương pháp được khuyến nghị

- **Tailscale** hoặc **VPN**

### SSH Tunneling

```bash
ssh -N -L 18789:127.0.0.1:18789 user@host
```

## Kiến trúc tổng thể

```
                    ┌─────────────┐
                    │   Clients   │
                    │ (App/CLI/UI)│
                    └──────┬──────┘
                           │
                    WebSocket API
                           │
                    ┌──────▼──────┐
                    │   Gateway   │
                    │   (Daemon)  │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │  WhatsApp   │ │  Telegram   │ │  Discord    │
    │  (Baileys)  │ │   (Bot)     │ │   (Bot)     │
    └─────────────┘ └─────────────┘ └─────────────┘
```

## Xem thêm

- [Gateway Runbook](/concepts/gateway)
- [Nodes](/concepts/nodes)
- [Web Interface](/concepts/web)
