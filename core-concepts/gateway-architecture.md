# Kiến trúc Gateway

## Tổng quan

Một Gateway duy nhất, chạy liên tục quản lý tất cả các bề mặt nhắn tin bao gồm "WhatsApp thông qua Baileys, Telegram thông qua grammY, Slack, Discord, Signal, iMessage, WebChat." Các clients control-plane kết nối qua WebSocket trên `127.0.0.1:18789` (mặc định), trong khi các Nodes chuyên biệt khai báo vai trò và khả năng của chúng.

## Các thành phần chính

### Gateway daemon
- Duy trì các kết nối provider
- Expose typed WS API
- Validate frames theo JSON Schema
- Emit events (agent, chat, presence, health, heartbeat, cron)

### Clients
- Gửi requests và subscribe vào events qua single WS connection

### Nodes
- Kết nối với `role: node`
- Cung cấp device identity
- Expose commands như `canvas.*`, `camera.*`, `screen.record`, `location.get`

### WebChat
- Static UI tận dụng Gateway WS API

### Canvas host
- Port mặc định `18793` serve agent-editable HTML và A2UI

## Wire Protocol Summary

| Thành phần | Chi tiết |
|------------|----------|
| Transport | WebSocket với JSON text frames |
| First frame | Phải là `connect` |
| Requests | `{type:"req", id, method, params}` |
| Responses | `{type:"res", id, ok, payload\|error}` |
| Events | `{type:"event", event, payload, seq?, stateVersion?}` |

## Security & Trust

### Device Identity
- Kết nối yêu cầu device identity và pairing approval
- Local connects (loopback/gateway host's tailnet) có thể auto-approve
- Non-local yêu cầu nonce signing

### Authentication
- Optional auth token qua `OPENCLAW_GATEWAY_TOKEN` environment variable

## Remote Access

Hỗ trợ Tailscale, VPN, hoặc SSH tunneling:

```bash
ssh -N -L 18789:127.0.0.1:18789 user@host
```

## Kiến trúc chi tiết

```
┌─────────────────────────────────────────────────────────────┐
│                         Gateway                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   WebSocket Server                    │   │
│  │                  ws://127.0.0.1:18789                │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│  ┌─────────┬───────────┬───┴────┬──────────┬──────────┐    │
│  │WhatsApp │ Telegram  │ Discord│  Slack   │ iMessage │    │
│  │(Baileys)│ (grammY)  │        │          │  (imsg)  │    │
│  └─────────┴───────────┴────────┴──────────┴──────────┘    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Agent Runtime                      │   │
│  │  • Session management                                 │   │
│  │  • Tool orchestration                                 │   │
│  │  • Model routing                                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
    ┌────┴────┐          ┌────┴────┐         ┌────┴────┐
    │   CLI   │          │ Web UI  │         │  Nodes  │
    │(Operator)│          │(Operator)│         │(Device) │
    └─────────┘          └─────────┘         └─────────┘
```

## Ports mặc định

| Port | Mục đích |
|------|----------|
| 18789 | Gateway WebSocket + HTTP |
| 18793 | Canvas host |
| 18800-18899 | Browser CDP control |

## Xem thêm

- [Gateway Protocol](/core-concepts/gateway-protocol)
- [Pairing](/start-here/pairing)
- [Security](/gateway-ops/security)
