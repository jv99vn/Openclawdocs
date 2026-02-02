# iOS

App iOS kết nối đến OpenClaw Gateway qua WebSocket và cung cấp device capabilities bao gồm canvas rendering, screen snapshots, camera access, location services, và voice features.

::: warning Internal Preview
App đang trong giai đoạn internal preview và chưa được phân phối công khai.
:::

## Tổng quan

- **Canvas rendering** - Vẽ và hiển thị nội dung
- **Screen snapshots** - Chụp màn hình
- **Camera access** - Truy cập camera
- **Location services** - Dịch vụ vị trí
- **Voice features** - Tính năng voice

## Kiến trúc

```
iOS App ⇄ WebSocket ⇄ Gateway
```

App hoạt động như một **node** kết nối đến Gateway chạy trên máy khác (macOS, Linux, Windows WSL2).

## Kết nối mạng

### 1. Bonjour (LAN)

Gateway advertise qua `_openclaw-gw._tcp` trên local network.

**Tự động discovery:**
1. Mở iOS Settings trong app
2. Gateway xuất hiện trong "Discovered Gateways"
3. Chọn và kết nối

### 2. Tailnet (Tailscale)

Cho môi trường mDNS bị block:

```bash
# Cấu hình split DNS trên Tailscale
# Unicast DNS-SD zones work với Tailscale
```

### 3. Manual Configuration

Nhập trực tiếp host và port:

1. Vào Settings → Advanced
2. Chọn "Manual Gateway"
3. Nhập host: `192.168.1.100`
4. Port: `18789` (default)

## Thiết lập

### 1. Start Gateway

Trên máy host (macOS/Linux):

```bash
openclaw gateway --port 18789 --verbose
```

### 2. Discovery

iOS app tự động discover Gateway qua Bonjour hoặc cấu hình manual.

### 3. Pairing

Khi iOS kết nối lần đầu:

```bash
# Trên host machine - list pending requests
openclaw nodes pending

# Approve pairing request
openclaw nodes approve <requestId>
```

### 4. Verify

```bash
# Check connected nodes
openclaw nodes list
```

## Canvas & Drawing

App render WKWebView canvas có thể điều khiển qua `node.invoke` commands.

### Navigate to URL

```bash
# Mở URL trên canvas
node.invoke canvas navigate "https://example.com"
```

### Evaluate JavaScript

```bash
# Vẽ trên canvas
node.invoke canvas eval "document.body.innerHTML = '<h1>Hello</h1>'"
```

### Capture Snapshot

```bash
# Chụp canvas
node.invoke canvas snapshot --format jpeg --width 1920 --height 1080
```

## Camera

Truy cập camera của iOS device:

```bash
# Capture photo
node.invoke camera capture --format jpeg

# Get camera info
node.invoke camera info
```

::: info Foreground Only
Camera chỉ hoạt động khi app ở foreground.
:::

## Location Services

```bash
# Get current location
node.invoke location current

# Watch location changes
node.invoke location watch
```

## Voice Features

Voice wake và talk mode available trong Settings.

::: warning Background Limitations
iOS có thể suspend background audio khi app không active. Voice features hoạt động best-effort.
:::

### Cấu hình Voice

1. Mở app Settings
2. Enable "Voice Wake"
3. Chọn wake word
4. Grant microphone permission

## Troubleshooting

### App không tìm thấy Gateway

1. Verify Gateway đang chạy: `openclaw gateway status`
2. Check cùng network (LAN)
3. Verify mDNS không bị block bởi firewall
4. Thử manual configuration

### Canvas không render

1. Check canvas host configuration
2. Verify URL accessible
3. Check JavaScript errors

### Pairing không hoạt động

1. Check pending requests: `openclaw nodes pending`
2. Verify authentication
3. Re-pair nếu cần: remove và add lại

### Token bị mất sau reinstall

Keychain token có thể mất khi reinstall app:

1. Remove device từ approved nodes: `openclaw nodes remove <id>`
2. Reconnect từ iOS app
3. Re-approve pairing request

### Background connection drops

iOS aggressive về background resource management:

1. App có thể bị suspend
2. WebSocket có thể disconnect
3. App auto-reconnect khi back to foreground

## Network Requirements

| Mode | Requirement |
|------|-------------|
| LAN | Same network, mDNS enabled |
| Tailscale | Tailscale app installed, connected to tailnet |
| Manual | Direct IP connectivity to Gateway |

## Supported iOS Versions

- iOS 15.0+
- iPadOS 15.0+

## Permissions Required

| Permission | Purpose |
|------------|---------|
| Local Network | Gateway discovery |
| Camera | Photo capture |
| Location | Location services |
| Microphone | Voice features |

## Xem thêm

- [Getting Started](/start-here/getting-started)
- [Platforms Overview](/platforms/overview)
- [Android](/platforms/android)
- [Nodes](/nodes-media/nodes)
