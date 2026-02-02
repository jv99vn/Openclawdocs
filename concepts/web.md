# Web (Gateway UI)

## Tổng quan

Gateway cung cấp browser-based **Control UI** (built với Vite + Lit) truy cập tại:

```
http://<host>:18789/
```

## Control UI Configuration

### Mặc định

UI được enable mặc định khi assets tồn tại trong `dist/control-ui`.

### Cấu hình

```json5
{
  "gateway": {
    "ui": {
      "enabled": true,
      "basePath": "/openclaw"  // Optional
    }
  }
}
```

## Webhook Support

Khi enabled, Gateway exposes webhook endpoints trên HTTP server:

```json5
{
  "gateway": {
    "webhooks": {
      "enabled": true
    }
  }
}
```

## Access Methods

### Tailscale Integration

#### Option 1: Integrated Serve (Khuyến nghị)

- Giữ Gateway trên loopback
- Tailscale Serve xử lý proxying

```
https://<magicdns>/
```

#### Option 2: Tailnet Bind + Token

- Bind tới tailnet với token authentication

```
http://<tailscale-ip>:18789/
```

#### Option 3: Public Internet (Funnel)

- Loopback với Funnel mode
- Password authentication cho internet-accessible deployment

## Security Considerations

### Authentication bắt buộc

Mặc định yêu cầu **token hoặc password**.

### Non-loopback bindings

Yêu cầu shared credentials.

### Supported auth methods

| Method | Mô tả |
|--------|-------|
| Token | `gateway.auth.token` |
| Password | `gateway.auth.password` |
| Tailscale | Identity headers (khi `allowTailscale: true`) |

## Configuration Example

```json5
{
  "gateway": {
    "host": "127.0.0.1",
    "port": 18789,
    "auth": {
      "token": "your-secret-token",
      // hoặc
      "password": "your-password"
    },
    "ui": {
      "enabled": true,
      "basePath": "/"
    },
    "tailscale": {
      "allowTailscale": true
    }
  }
}
```

## Building UI

Compile UI assets:

```bash
pnpm ui:build
```

## Features

| Feature | Mô tả |
|---------|-------|
| Chat | Giao diện chat trực tiếp |
| Sessions | Xem và quản lý sessions |
| Health | Monitor trạng thái |
| Settings | Cấu hình cơ bản |

## Quick Start

```bash
# Khởi động Gateway
openclaw gateway

# Mở dashboard
openclaw dashboard
# hoặc truy cập http://127.0.0.1:18789/
```

## Xem thêm

- [Gateway](/concepts/gateway)
- [Dashboard CLI](/cli/dashboard)
- [Bảo mật](/help/faq)
