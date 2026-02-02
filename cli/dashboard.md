# openclaw dashboard

Lệnh `openclaw dashboard` khởi chạy Control UI interface sử dụng authentication credentials hiện tại.

## Cú pháp

```bash
openclaw dashboard [options]
```

## Ví dụ sử dụng

### Mở dashboard

```bash
openclaw dashboard
```

Khởi động Control UI trong browser mặc định.

### Không tự động mở browser

```bash
openclaw dashboard --no-open
```

Khởi động interface mà không tự động launch.

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--no-open` | Không tự động mở browser |
| `--port <number>` | Sử dụng port cụ thể |

## Control UI

Control UI là browser-based interface cho phép:
- Chat trực tiếp với AI
- Xem session history
- Quản lý cấu hình
- Monitor health status

### URL mặc định

```
http://127.0.0.1:18789/
```

### Features

| Feature | Mô tả |
|---------|-------|
| Chat | Giao diện chat trực tiếp |
| Sessions | Xem và quản lý sessions |
| Settings | Cấu hình cơ bản |
| Health | Monitor trạng thái |

## Yêu cầu

- Gateway phải đang chạy
- Credentials đã được cấu hình

## Quick Start

Đây là cách nhanh nhất để bắt đầu chat mà không cần cấu hình channel:

```bash
# Khởi động Gateway nếu chưa chạy
openclaw gateway start

# Mở dashboard
openclaw dashboard
```

## Xem thêm

- [Web Interface](/concepts/web)
- [Gateway](/concepts/gateway)
