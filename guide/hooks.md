# Hooks

Hệ thống hooks của OpenClaw cung cấp **một hệ thống dựa trên sự kiện có thể mở rộng để tự động hóa các hành động theo phản hồi của agent commands và events**. Có hai loại: Gateway hooks (sự kiện nội bộ) và Webhooks (HTTP triggers bên ngoài).

## Khái niệm chính

### Mục đích

Hooks cho phép phản hồi tự động với các sự kiện vòng đời của agent mà không cần sửa đổi core code. Các ứng dụng phổ biến:

- Lưu memory snapshots
- Duy trì audit trails
- Trigger follow-up automation

### Hệ thống Discovery

Hooks được tự động phát hiện từ ba cấp độ thư mục:

| Ưu tiên | Vị trí | Mô tả |
|---------|--------|-------|
| 1 (cao nhất) | `<workspace>/hooks/` | Workspace hooks |
| 2 | `~/.openclaw/hooks/` | Managed hooks (user-installed) |
| 3 (thấp nhất) | Bundled | Shipped với OpenClaw |

## Cấu trúc Hook

Mỗi hook yêu cầu hai files:

### HOOK.md

Metadata trong YAML frontmatter cộng với documentation:

```markdown
---
name: my-custom-hook
description: Mô tả hook của bạn
emoji: 🔔
events:
  - command:/new
  - agent:bootstrap
requirements:
  - node >= 22
---

# My Custom Hook

Documentation cho hook của bạn ở đây...
```

### handler.ts

TypeScript implementation export `HookHandler` function xử lý events bất đồng bộ:

```typescript
import type { HookHandler } from 'openclaw'

export const handler: HookHandler = async (event, context) => {
  // Xử lý event
  console.log('Event received:', event.type)

  // Trả về kết quả (tùy chọn)
  return {
    success: true,
    message: 'Hook executed successfully'
  }
}
```

## Các loại Event

### Command events

- `/new` - Tạo session mới
- `/reset` - Reset session
- `/stop` - Dừng agent

### Agent events

- `agent:bootstrap` - Khởi tạo agent

### Gateway events

- `gateway:startup` - Gateway khởi động

### Tool result hooks

Plugin API để transform results trước khi persist.

## Bundled Hooks

OpenClaw đi kèm với các hooks sau:

### 1. session-memory

Lưu session context vào agent workspace khi bạn phát lệnh `/new`:

```bash
openclaw hooks enable session-memory
```

### 2. command-logger

Logs tất cả commands đến `~/.openclaw/logs/commands.log`:

```bash
openclaw hooks enable command-logger
```

### 3. boot-md

Thực thi startup instructions từ file cấu hình.

### 4. soul-evil

Conditional content swapping trong quá trình bootstrap (dành cho testing/development).

## Quản lý CLI

```bash
# Liệt kê tất cả hooks có sẵn
openclaw hooks list

# Bật hook
openclaw hooks enable <hook-name>

# Tắt hook
openclaw hooks disable <hook-name>

# Xem thông tin hook
openclaw hooks info <hook-name>

# Kiểm tra hooks
openclaw hooks check
```

## Tạo Hook tùy chỉnh

### Bước 1: Tạo thư mục

```bash
mkdir -p ~/.openclaw/hooks/my-hook
```

### Bước 2: Tạo HOOK.md

```bash
cat > ~/.openclaw/hooks/my-hook/HOOK.md << 'EOF'
---
name: my-hook
description: Hook tùy chỉnh của tôi
emoji: 🎯
events:
  - command:/new
---

# My Hook

Hook này được kích hoạt khi tạo session mới.
EOF
```

### Bước 3: Tạo handler.ts

```bash
cat > ~/.openclaw/hooks/my-hook/handler.ts << 'EOF'
import type { HookHandler } from 'openclaw'

export const handler: HookHandler = async (event, context) => {
  console.log('New session created!')
  // Logic của bạn ở đây
}
EOF
```

### Bước 4: Bật hook

```bash
openclaw hooks enable my-hook
```

## Best Practices

::: tip Khuyến nghị
- **Giữ handlers nhẹ và non-blocking** - Tránh operations tốn thời gian
- **Xử lý lỗi gracefully** - Không throw exceptions
- **Filter events không liên quan sớm** - Tránh xử lý không cần thiết
- **Sử dụng event keys cụ thể** - Thay vì general ones
- **Tránh blocking command processing** - Với slow operations
:::

## Webhooks

### Cấu hình

```json
{
  "gateway": {
    "hooks": {
      "webhooks": [
        {
          "url": "https://your-server.com/webhook",
          "events": ["agent:bootstrap", "command:/new"],
          "secret": "your-webhook-secret"
        }
      ]
    }
  }
}
```

### Payload format

```json
{
  "event": "command:/new",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    // Event-specific data
  },
  "signature": "sha256=..."
}
```
