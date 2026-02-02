# Android

App Android hoạt động như một companion node kết nối đến Gateway. Gateway phải chạy trên một máy khác (macOS, Linux, hoặc Windows WSL2).

## Kiến trúc

```
Android App ⇄ (mDNS/NSD + WebSocket) ⇄ Gateway
```

Android device kết nối trực tiếp đến Gateway WebSocket tại address mặc định `ws://<host>:18789`.

## Yêu cầu kết nối

- Gateway chạy trên máy khác
- Android device cần truy cập Gateway WebSocket qua:
  - **Same LAN** với mDNS/NSD
  - **Tailscale tailnet** với DNS-SD
  - **Manual** host/port configuration

## Thiết lập

### 1. Start Gateway

Trên host machine:

```bash
openclaw gateway --port 18789 --verbose
```

### 2. Verify Discovery (Optional)

```bash
# Check mDNS advertisement
dns-sd -B _openclaw-gw._tcp local.
```

### 3. Android Connection

1. Mở app, vào **Settings**
2. Chọn Gateway trong "Discovered Gateways"
3. Nhấn **Connect**

Nếu mDNS không hoạt động:
1. Vào **Advanced** → **Manual Gateway**
2. Nhập host và port

### 4. Pairing Approval

Trên host machine:

```bash
# List pending pairing requests
openclaw nodes pending

# Approve request
openclaw nodes approve <requestId>
```

### 5. Verify Connection

```bash
# Check connected nodes
openclaw nodes list
```

## Chat & History

App sử dụng primary session key (`main`) của Gateway. History được shared với WebChat và các clients khác.

```bash
# Tất cả clients dùng chung session 'main'
# Messages sync across devices
```

## Canvas

App hỗ trợ HTML/CSS/JS editing qua standalone canvas host trên port 18793.

### Commands

```bash
# Navigate to URL
node.invoke canvas navigate "https://example.com"

# Evaluate JavaScript
node.invoke canvas eval "document.body.style.background = 'red'"

# Capture snapshot
node.invoke canvas snapshot --format jpeg
```

### Canvas Host

Canvas host chạy trên port 18793:

```bash
# Verify canvas host
curl http://localhost:18793
```

## Camera

Truy cập camera của Android device:

```bash
# Capture photo
node.invoke camera capture

# Get camera info
node.invoke camera info
```

::: warning Foreground Only
Camera operations chỉ hoạt động khi app ở foreground.
:::

## Foreground Service

App maintain persistent connection với Gateway qua foreground service:

- **Persistent WebSocket** connection
- **Auto-reconnection** on launch
- **Notification** hiển thị khi service chạy

## Connection Modes

### mDNS/NSD (Recommended)

Automatic discovery trên local network:

1. Gateway advertise `_openclaw-gw._tcp`
2. Android NSD discover service
3. Automatic connection

### Tailscale

Cho remote access:

1. Install Tailscale trên cả Gateway host và Android
2. Connect cả hai đến cùng tailnet
3. Configure DNS-SD
4. Discovery hoạt động qua tailnet

### Manual

Khi automatic discovery không hoạt động:

1. Vào Settings → Advanced → Manual Gateway
2. Nhập host IP: `192.168.1.100`
3. Nhập port: `18789`
4. Connect

## Troubleshooting

### Không tìm thấy Gateway

1. Verify Gateway đang chạy:
   ```bash
   openclaw gateway status
   ```
2. Check cùng network
3. Verify mDNS/NSD không bị block
4. Check firewall rules
5. Thử manual configuration

### Connection bị drop

1. Check foreground service notification
2. Verify network stability
3. Check Gateway logs:
   ```bash
   openclaw logs --follow
   ```

### Pairing fails

1. List pending requests:
   ```bash
   openclaw nodes pending
   ```
2. Verify request ID
3. Check time synchronization

### Camera không hoạt động

1. Grant camera permission trong Android Settings
2. Verify app ở foreground
3. Check logs cho errors

## Network Requirements

| Mode | Requirement |
|------|-------------|
| LAN | Same network, NSD enabled |
| Tailscale | Tailscale app, connected tailnet |
| Manual | Direct IP connectivity |

## Supported Android Versions

- Android 8.0 (API 26)+
- Android TV support planned

## Permissions Required

| Permission | Purpose |
|------------|---------|
| Internet | Gateway connection |
| Foreground Service | Persistent connection |
| Camera | Photo capture |
| Location | Location services |
| Microphone | Voice features |

## Battery Optimization

Để maintain persistent connection:

1. Vào Settings → Apps → OpenClaw
2. Battery → Unrestricted
3. Disable battery optimization

## Xem thêm

- [Getting Started](/start-here/getting-started)
- [Platforms Overview](/platforms/overview)
- [iOS](/platforms/ios)
- [Nodes](/nodes-media/nodes)
