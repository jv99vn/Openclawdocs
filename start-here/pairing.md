# Ghép nối (Pairing)

"Pairing" là cơ chế phê duyệt chủ sở hữu rõ ràng của OpenClaw trong hai ngữ cảnh: **DM pairing** cho truy cập chat và **node pairing** cho tích hợp mạng thiết bị.

## DM Pairing (Truy cập Chat Inbound)

Khi các channel sử dụng chính sách pairing, người gửi chưa được phê duyệt sẽ nhận được một mã ngắn trong khi tin nhắn của họ vẫn chưa được xử lý cho đến khi chủ sở hữu phê duyệt.

### Đặc điểm mã

| Thuộc tính | Chi tiết |
|------------|----------|
| Độ dài | 8 ký tự |
| Định dạng | Chữ in hoa |
| Loại trừ | Ký tự mơ hồ (0, O, 1, I) |
| Hết hạn | 60 phút |
| Giới hạn | 3 yêu cầu pending mỗi channel (mặc định) |

### Lệnh quản lý

```bash
# Liệt kê các yêu cầu pairing đang chờ
openclaw pairing list telegram

# Phê duyệt yêu cầu
openclaw pairing approve telegram <CODE>

# Từ chối yêu cầu
openclaw pairing reject telegram <CODE>
```

### Các channel được hỗ trợ

- Telegram
- WhatsApp
- Signal
- iMessage
- Discord
- Slack

### Vị trí lưu trữ

::: warning Bảo mật
`~/.openclaw/credentials/` chứa các yêu cầu pending và danh sách người gửi đã được phê duyệt — **xử lý như tài sản bảo mật nhạy cảm**.
:::

## Node Device Pairing

Các thiết bị node kết nối với Gateway yêu cầu phê duyệt thông qua quy trình pairing.

### Lệnh quản lý thiết bị

```bash
# Liệt kê thiết bị
openclaw devices list

# Phê duyệt thiết bị
openclaw devices approve <requestId>

# Từ chối thiết bị
openclaw devices reject <requestId>

# Xóa thiết bị đã ghép
openclaw devices remove <deviceId>
```

### Vị trí lưu trữ

`~/.openclaw/devices/` duy trì các bản ghi thiết bị pending và đã được ghép.

## Quy trình Pairing

### DM Pairing Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Người gửi   │───▶│   Gateway   │───▶│ Chủ sở hữu  │
│ gửi DM      │    │ tạo mã      │    │ phê duyệt   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                 │                    │
       │                 ▼                    ▼
       │          Nhận mã 8 ký tự      Chạy approve
       │                 │                    │
       └─────────────────┴────────────────────┘
                         │
                         ▼
                 Tin nhắn được xử lý
```

### Device Pairing Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Device    │───▶│   Gateway   │───▶│ Chủ sở hữu  │
│ kết nối     │    │ tạo request │    │ phê duyệt   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                 │                    │
       │                 ▼                    ▼
       │          Gửi thông báo        Chạy approve
       │                 │                    │
       └─────────────────┴────────────────────┘
                         │
                         ▼
                 Device được ghép
```

## Cấu hình

### Tùy chỉnh chính sách pairing

```json5
{
  "channels": {
    "telegram": {
      "pairing": {
        "enabled": true,
        "maxPending": 5,
        "expiryMinutes": 120
      }
    }
  }
}
```

### Auto-approve (Không khuyến nghị)

```json5
{
  "channels": {
    "telegram": {
      "pairing": {
        "autoApprove": true  // Không an toàn!
      }
    }
  }
}
```

## Lưu ý

::: tip Legacy API
Một legacy `node.pair.*` API tồn tại riêng biệt, mặc dù WebSocket nodes vẫn yêu cầu device pairing.
:::

## Xem thêm

- [Bảo mật](/concepts/security)
- [Kênh trò chuyện](/concepts/channels)
- [Nodes](/concepts/nodes)
