# Giao diện Web

Gateway cung cấp một **Control UI trên trình duyệt** (được xây dựng với Vite + Lit) có thể truy cập qua WebSocket trên cổng 18789, với cấu hình đường dẫn tùy chọn qua `gateway.controlUi.basePath`.

## Tính năng chính

### Webhooks

Khi được bật, Gateway expose các webhook endpoints. Chi tiết cấu hình có trong phần `hooks` của gateway settings.

### Trạng thái Control UI

- **Được bật mặc định** khi assets có mặt (`dist/control-ui`)
- Có thể toggle qua cấu hình

## Phương thức truy cập

### Tích hợp Tailscale (Ba cách tiếp cận)

#### 1. Integrated Serve (khuyến nghị)

Giữ dịch vụ trên loopback trong khi Tailscale Serve xử lý proxying:

```bash
tailscale serve --bg 18789
```

Truy cập qua: `https://<magicdns>/`

#### 2. Tailnet Bind + Token

Bind trực tiếp đến tailnet với xác thực token:

```json
{
  "gateway": {
    "host": "100.x.x.x",
    "auth": {
      "token": "your-token"
    }
  }
}
```

Truy cập qua: `http://<tailscale-ip>:18789/`

#### 3. Public Internet (Funnel)

Expose qua Tailscale Funnel với bảo vệ password bắt buộc:

```bash
tailscale funnel 18789
```

::: warning Cảnh báo
Khi expose ra public internet, luôn bật password protection!
:::

## Cân nhắc bảo mật

### Xác thực mặc định

Gateway auth được yêu cầu mặc định (token/password hoặc Tailscale identity headers).

- Cấu hình non-loopback yêu cầu shared credentials
- Wizard tự động tạo gateway tokens
- Xác thực truyền qua `connect.params.auth.token` hoặc `connect.params.auth.password`

### Tailscale Identity Headers

Tailscale identity headers có thể thỏa mãn xác thực khi `gateway.auth.allowTailscale` được bật:

```json
{
  "gateway": {
    "auth": {
      "allowTailscale": true
    }
  }
}
```

Credentials rõ ràng có thể được enforce nếu cần.

## Build assets

Compile static assets với:

```bash
pnpm ui:build
```

Output sẽ được đặt trong `dist/control-ui`.

## Cấu hình Control UI

```json
{
  "gateway": {
    "controlUi": {
      "enabled": true,
      "basePath": "/ui"
    }
  }
}
```

## Giao diện người dùng

Control UI cung cấp:

- **Dashboard** - Tổng quan trạng thái hệ thống
- **Channels** - Quản lý các kênh tin nhắn
- **Agents** - Giám sát và điều khiển agents
- **Nodes** - Quản lý các thiết bị được ghép nối
- **Logs** - Xem logs real-time

## Tùy chỉnh theme

Control UI hỗ trợ tùy chỉnh theme qua CSS variables:

```css
:root {
  --oc-primary: #5f67ee;
  --oc-background: #0f0f0f;
  --oc-surface: #1a1a1a;
  --oc-text: #ffffff;
}
```
