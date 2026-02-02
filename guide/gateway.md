# Gateway Runbook

Gateway là một dịch vụ persistent quản lý các kết nối Baileys/Telegram và control/event planes, thay thế lệnh gateway cũ qua `openclaw gateway`.

## Chức năng cốt lõi

Dịch vụ chạy liên tục cho đến khi bị dừng:

- **Thoát với mã lỗi khác 0** khi gặp lỗi fatal để supervisor khởi động lại
- **Bind WebSocket control plane** đến loopback tại cổng 18789 (mặc định)
- **Multiplex HTTP** trên cùng cổng cho chat completions, responses và tool invocation endpoints

## Thực thi local

Khởi chạy gateway với:

```bash
openclaw gateway --port 18789
```

### Hot-reload cấu hình

Cấu hình hot-reload từ `~/.openclaw/openclaw.json` với ba chế độ:

| Chế độ | Mô tả |
|--------|-------|
| `hybrid` | Mặc định, reload thông minh |
| `restart-only` | Chỉ reload khi restart |
| `disabled` | Tắt hot-reload |

## Truy cập từ xa

::: tip Khuyến nghị
Tailscale/VPN được ưu tiên; nếu không thì dùng SSH tunnel để thiết lập kết nối an toàn qua port forwarding thay vì expose trực tiếp.
:::

```bash
# SSH tunnel
ssh -L 18789:127.0.0.1:18789 user@remote-host

# Sau đó kết nối local
openclaw status
```

## Hỗ trợ đa instance

Chạy nhiều gateway trên một host yêu cầu:

- State được cô lập
- Cấu hình riêng biệt
- Các cổng duy nhất

Pattern dev profile cung cấp testing cô lập nhanh:

```bash
openclaw --dev gateway --allow-unconfigured
```

## Giao thức và Methods

### Handshake bắt buộc

Clients khởi tạo với frame connect bắt buộc:

```json
{
  "type": "connect",
  "params": {
    "auth": {
      "token": "your-token"
    }
  }
}
```

### Methods được hỗ trợ

| Method | Mô tả |
|--------|-------|
| `health` | Kiểm tra sức khỏe |
| `status` | Truy vấn trạng thái |
| `presence` | Quản lý presence |
| `message` | Gửi tin nhắn |
| `agent` | Thực thi agent |
| `node.pair` | Ghép nối node |
| `node.invoke` | Gọi lệnh node |
| `node.describe` | Mô tả node |

## Quản lý dịch vụ

### macOS

launchd giám sát dịch vụ qua:

```
~/Library/LaunchAgents/bot.molt.gateway.plist
```

Các lệnh quản lý:

```bash
# Cài đặt
openclaw gateway install

# Khởi động
openclaw gateway start

# Dừng
openclaw gateway stop

# Khởi động lại
openclaw gateway restart

# Trạng thái
openclaw gateway status
```

### Linux

systemd user/system units quản lý tiến trình:

```bash
# Cài đặt systemd unit
openclaw gateway install

# Quản lý với systemctl
systemctl --user start openclaw-gateway
systemctl --user stop openclaw-gateway
systemctl --user status openclaw-gateway
```

### Windows

Cài đặt Windows nên sử dụng WSL2 với cấu hình systemd.

## Đảm bảo hoạt động

::: warning Không có fallback
Không có fallback đến kết nối Baileys trực tiếp; nếu Gateway bị down, việc gửi tin thất bại nhanh chóng.
:::

Điều này đảm bảo các chế độ thất bại có thể dự đoán được mà không có suy giảm âm thầm.

## Endpoints HTTP

Gateway expose các endpoints sau:

| Endpoint | Mô tả |
|----------|-------|
| `/v1/chat/completions` | OpenAI-compatible completions |
| `/v1/responses` | Response streaming |
| `/v1/tools` | Tool invocation |

## Cấu hình mẫu

```json
{
  "gateway": {
    "port": 18789,
    "host": "127.0.0.1",
    "auth": {
      "token": "your-secure-token"
    },
    "hotReload": "hybrid"
  }
}
```
