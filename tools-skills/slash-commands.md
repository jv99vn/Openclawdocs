# Lệnh Slash

Lệnh Slash cho phép người dùng điều khiển trực tiếp các tính năng của OpenClaw thông qua commands bắt đầu bằng `/`.

## Tổng quan

- **Điều khiển trực tiếp** - Bỏ qua agent
- **Hành động nhanh** - Nhanh chóng thực hiện tác vụ
- **Tùy chỉnh được** - Tạo commands riêng
- **Phổ biến** - Hoạt động trên tất cả channels

## Các lệnh có sẵn

### Quản lý Session

| Lệnh | Mô tả |
|------|-------|
| `/new` | Bắt đầu session mới |
| `/clear` | Xóa lịch sử session |
| `/session <name>` | Chuyển sang session |
| `/sessions` | Liệt kê sessions |

### Điều khiển Model

| Lệnh | Mô tả |
|------|-------|
| `/model <name>` | Chuyển model |
| `/models` | Liệt kê các models có sẵn |
| `/thinking <level>` | Đặt mức độ suy nghĩ |

### Điều khiển Agent

| Lệnh | Mô tả |
|------|-------|
| `/agent <name>` | Chuyển agent |
| `/agents` | Liệt kê agents |
| `/stop` | Dừng generation hiện tại |

### Công cụ

| Lệnh | Mô tả |
|------|-------|
| `/tool <name>` | Gọi tool trực tiếp |
| `/tools` | Liệt kê các tools có sẵn |
| `/exec <cmd>` | Thực thi lệnh shell |

### Bộ nhớ

| Lệnh | Mô tả |
|---------|-------------|
| `/remember <text>` | Lưu vào bộ nhớ |
| `/forget <text>` | Xóa khỏi bộ nhớ |
| `/recall <query>` | Tìm kiếm bộ nhớ |

### Hệ thống

| Lệnh | Mô tả |
|------|-------|
| `/status` | Hiển thị trạng thái |
| `/help` | Hiển thị trợ giúp |
| `/version` | Hiển thị phiên bản |
| `/config` | Hiển thị cấu hình |

## Sử dụng

### Cơ bản

```
/model anthropic/claude-sonnet-4
```

### Với đối số

```
/session work
/thinking high
/remember Important: meeting at 3pm
```

### Nối tiếp

```
/new /model anthropic/claude-opus-4
```

## Lệnh Session

### /new

Bắt đầu session mới:

```
/new
```

Với tên:

```
/new project-alpha
```

### /clear

Xóa lịch sử session hiện tại:

```
/clear
```

### /session

Chuyển session:

```
/session main
/session work
```

## Lệnh Model

### /model

Chuyển model tạm thời:

```
/model anthropic/claude-sonnet-4
/model openai/gpt-4o
/model venice/llama-3.3-70b
```

### /thinking

Đặt mức độ suy nghĩ:

```
/thinking off
/thinking low
/thinking medium
/thinking high
```

## Lệnh Tool

### /exec

Thực thi lệnh trực tiếp:

```
/exec ls -la
/exec git status
```

### /tool

Gọi tool:

```
/tool web.search "OpenClaw docs"
/tool browser.goto "https://example.com"
```

## Lệnh Bộ nhớ

### /remember

Lưu vào bộ nhớ dài hạn:

```
/remember My API key is stored in .env
/remember Prefer Vietnamese responses
```

### /recall

Tìm kiếm bộ nhớ:

```
/recall API key
/recall preferences
```

### /forget

Xóa khỏi bộ nhớ:

```
/forget API key
```

## Lệnh tùy chỉnh

### Cấu hình

```json5
{
  commands: {
    custom: {
      "/morning": {
        action: "message",
        content: "Good morning! What's on my schedule today?",
      },
      "/standup": {
        action: "prompt",
        content: "Generate standup update based on yesterday's activity",
      },
      "/review": {
        action: "tool",
        tool: "git.diff",
        params: { staged: true },
      },
    },
  },
}
```

### Loại hành động

| Hành động | Mô tả |
|-----------|-------|
| `message` | Gửi như tin nhắn người dùng |
| `prompt` | Gửi như system prompt |
| `tool` | Gọi tool |
| `exec` | Thực thi lệnh |
| `switch` | Chuyển session/model |

## Riêng cho từng kênh

Một số commands có thể khác nhau theo channel:

```json5
{
  channels: {
    whatsapp: {
      commands: {
        "/pic": {
          action: "tool",
          tool: "camera.capture",
        },
      },
    },
  },
}
```

## Quyền hạn

### Giới hạn lệnh

```json5
{
  commands: {
    restricted: ["/exec", "/config"],
    adminOnly: ["/restart", "/shutdown"],
  },
}
```

## Bí danh

```json5
{
  commands: {
    aliases: {
      "/m": "/model",
      "/s": "/session",
      "/t": "/thinking",
      "/r": "/remember",
    },
  },
}
```

## Trợ giúp

### Liệt kê tất cả lệnh

```
/help
```

### Trợ giúp cho lệnh cụ thể

```
/help model
/help session
```

## Khắc phục sự cố

### Lệnh không được nhận

1. Xác nhận bắt đầu bằng `/`
2. Kiểm tra không có khoảng trắng trước `/`
3. Xác nhận lệnh tồn tại

### Bị từ chối quyền

1. Kiểm tra quyền người dùng
2. Xác nhận lệnh không bị giới hạn
3. Liên hệ admin

### Lệnh tùy chỉnh không hoạt động

1. Xác nhận cú pháp trong config
2. Khởi động lại Gateway
3. Kiểm tra logs

## Xem thêm

- [Tools Overview](/tools-skills/tools)
- [CLI Reference](/cli/setup)
- [Configuration](/gateway-ops/configuration)
