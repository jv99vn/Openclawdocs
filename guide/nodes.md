# Nodes

Một **node** là thiết bị ngoại vi (macOS/iOS/Android/headless) kết nối đến Gateway WebSocket với `role: "node"`, expose các commands như `canvas.*`, `camera.*`, và `system.*` thông qua `node.invoke`.

## Ghép nối thiết bị và Trạng thái

Nodes sử dụng device pairing để bảo mật. Các lệnh chính:

```bash
# Xem các yêu cầu đang chờ
openclaw devices list

# Phê duyệt một node
openclaw devices approve <requestId>

# Kiểm tra trạng thái pairing
openclaw nodes status
```

## Thực thi Node Host từ xa

Khi Gateway của bạn chạy trên một máy, **node host** trên máy khác thực thi các lệnh `system.run`/`system.which`. Gateway chuyển tiếp calls khi `host=node` được chọn.

Phê duyệt được enforce theo từng node qua `~/.openclaw/exec-approvals.json`.

## Khởi động Node Hosts

### Chế độ Foreground

```bash
openclaw node run --host <gateway-host> --port 18789 --display-name "Build Node"
```

### Chế độ Service

```bash
openclaw node install --host <gateway-host> --port 18789
```

Sau đó quản lý qua systemd/launchd.

## Canvas Operations

### Screenshots

```bash
# Chụp ảnh màn hình
openclaw nodes canvas snapshot --node <id> --format png

# Lưu vào file
openclaw nodes canvas snapshot --node <id> --output screenshot.png
```

### Navigation

```bash
# Điều hướng đến URL
openclaw nodes canvas present --node <id> --target https://example.com
```

## Camera Operations

### Chụp ảnh

```bash
openclaw nodes camera snap --node <id>
```

### Quay video

```bash
# Quay clip 10 giây
openclaw nodes camera clip --node <id> --duration 10s
```

## Screen Recording

```bash
# Ghi màn hình 10 giây
openclaw nodes screen record --node <id> --duration 10s
```

::: warning Giới hạn
Screen recordings bị giới hạn tối đa **60 giây**.
:::

## Khả năng bổ sung

### Location

```bash
openclaw nodes location get --node <id>
```

### SMS (Android)

Gửi tin nhắn qua thiết bị có khả năng telephony:

```bash
openclaw nodes sms send --node <id> --to "+84123456789" --message "Hello"
```

### System Commands

macOS/headless nodes hỗ trợ `system.run` và notifications:

```bash
# Chạy lệnh hệ thống
openclaw nodes system run --node <id> --command "ls -la"

# Gửi notification
openclaw nodes notify --node <id> --title "Alert" --message "Task completed"
```

## Các ràng buộc quan trọng

::: danger Lưu ý
- Canvas và camera operations yêu cầu node được **foregrounded**
- Screen recordings bị giới hạn tối đa **60 giây**
- Android yêu cầu **explicit permission grants** cho camera và recording
:::

## Cấu hình Node

### exec-approvals.json

File cấu hình phê duyệt thực thi:

```json
{
  "nodes": {
    "node-id-1": {
      "allowedCommands": ["ls", "pwd", "git"],
      "deniedCommands": ["rm", "sudo"]
    }
  }
}
```

### Đăng ký Node

```json
{
  "nodes": {
    "enabled": true,
    "autoApprove": false,
    "allowedDevices": [
      "device-uuid-1",
      "device-uuid-2"
    ]
  }
}
```

## Luồng ghép nối

```
┌─────────────┐         ┌─────────────┐
│    Node     │         │   Gateway   │
│  (Device)   │         │             │
└──────┬──────┘         └──────┬──────┘
       │                       │
       │  1. Connect (role:node)
       │──────────────────────>│
       │                       │
       │  2. Pair Request      │
       │<──────────────────────│
       │                       │
       │  3. Challenge         │
       │──────────────────────>│
       │                       │
       │  4. Approve (manual)  │
       │       or auto-approve │
       │                       │
       │  5. Paired!           │
       │<──────────────────────│
       │                       │
```

## Troubleshooting

### Node không kết nối được

1. Kiểm tra kết nối mạng
2. Verify Gateway đang chạy: `openclaw gateway status`
3. Kiểm tra firewall rules

### Camera không hoạt động

1. Verify app có quyền camera
2. Đảm bảo app đang foreground
3. Kiểm tra logs: `openclaw nodes logs --node <id>`
