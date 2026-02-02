# Công cụ (Tools)

OpenClaw cung cấp các agent tools first-class cho browser automation, canvas rendering, node management và scheduled tasks. Các typed tools này thay thế các approaches dựa trên skill cũ hơn và hoạt động không cần shell dependencies.

## Kiểm soát truy cập Tool

### Tắt tools

Thông qua cấu hình `openclaw.json` sử dụng directives `tools.allow` và `tools.deny`:

```json
{
  "tools": {
    "allow": ["read", "write", "exec"],
    "deny": ["browser"]
  }
}
```

::: warning Lưu ý
**deny wins** khi cả hai được chỉ định. Matching là case-insensitive và hỗ trợ wildcard patterns.
:::

### Tool Profiles

Thiết lập base allowlists:

| Profile | Mô tả |
|---------|-------|
| `minimal` | Chỉ session status |
| `coding` | Filesystem, runtime, sessions, memory tools |
| `messaging` | Communication-focused toolset |
| `full` | Không hạn chế (mặc định) |

```json
{
  "tools": {
    "profile": "coding"
  }
}
```

### Provider-specific Policies

Thu hẹp tool availability theo từng LLM provider mà không sửa đổi global defaults, được áp dụng sau profile selection nhưng trước allow/deny lists:

```json
{
  "tools": {
    "providers": {
      "anthropic": {
        "allow": ["read", "write"],
        "deny": ["exec"]
      }
    }
  }
}
```

## Tool Groups (Shorthands)

Policies hỗ trợ `group:*` entries để quản lý hiệu quả:

| Group | Tools |
|-------|-------|
| `group:fs` | read, write, edit, apply_patch |
| `group:runtime` | exec, bash, process |
| `group:web` | web_search, web_fetch |
| `group:ui` | browser, canvas |

Ví dụ:

```json
{
  "tools": {
    "allow": ["group:fs", "group:web"],
    "deny": ["group:ui"]
  }
}
```

## Core Tools

### exec

Chạy shell commands với parameters cho backgrounding, timeouts, elevation và TTY support.

**Parameters**:

| Parameter | Mô tả |
|-----------|-------|
| `command` | Lệnh cần chạy |
| `background` | Chạy ở background |
| `timeout` | Timeout (ms) |
| `elevated` | Yêu cầu sudo |
| `tty` | Allocate TTY |

**Ví dụ**:

```typescript
// Basic execution
await tools.exec({ command: 'ls -la' })

// Background execution
const { sessionId } = await tools.exec({
  command: 'npm run build',
  background: true
})

// With timeout
await tools.exec({
  command: 'npm test',
  timeout: 60000
})
```

Returns background session IDs khi backgrounded.

### browser

Controls dedicated browser instances với snapshot, screenshot, UI actions (click/type/press), và profile management trên multiple instances từ ports 18800-18899.

**Actions**:

| Action | Mô tả |
|--------|-------|
| `launch` | Khởi động browser |
| `navigate` | Điều hướng đến URL |
| `snapshot` | Capture accessibility tree |
| `screenshot` | Chụp screenshot |
| `click` | Click element |
| `type` | Nhập text |
| `press` | Press key |
| `close` | Đóng browser |

**Ví dụ**:

```typescript
// Launch browser
await tools.browser({ action: 'launch' })

// Navigate
await tools.browser({
  action: 'navigate',
  url: 'https://example.com'
})

// Take screenshot
const screenshot = await tools.browser({
  action: 'screenshot',
  format: 'png'
})

// Click element
await tools.browser({
  action: 'click',
  selector: '#submit-button'
})

// Type text
await tools.browser({
  action: 'type',
  selector: '#input-field',
  text: 'Hello world'
})
```

### web_search

Query information qua Brave Search API:

```typescript
const results = await tools.web_search({
  query: 'OpenClaw documentation',
  count: 10
})
```

Có response caching (mặc định 15 phút).

### web_fetch

Extract readable content từ URLs:

```typescript
const content = await tools.web_fetch({
  url: 'https://docs.openclaw.ai',
  format: 'markdown'
})
```

Có response caching (mặc định 15 phút).

### nodes

Discovers paired devices; sends notifications; captures camera/screen data với proper consent requirements.

**Commands**:

| Command | Mô tả |
|---------|-------|
| `list` | Liệt kê nodes |
| `notify` | Gửi notification |
| `camera.snap` | Chụp ảnh |
| `camera.clip` | Quay video |
| `screen.record` | Ghi màn hình |
| `canvas.snapshot` | Screenshot |

**Ví dụ**:

```typescript
// List nodes
const nodes = await tools.nodes({ action: 'list' })

// Send notification
await tools.nodes({
  action: 'notify',
  nodeId: 'node-123',
  title: 'Alert',
  message: 'Task completed'
})

// Take photo
await tools.nodes({
  action: 'camera.snap',
  nodeId: 'node-123'
})
```

### canvas

Drives Node Canvas cho presentations và A2UI interactions (v0.8 only).

```typescript
// Render HTML
await tools.canvas({
  action: 'render',
  html: '<h1>Hello World</h1>'
})

// Present URL
await tools.canvas({
  action: 'present',
  url: 'https://example.com'
})
```

### message

Cross-platform messaging trên Discord, Slack, Teams, WhatsApp, iMessage, và nhiều hơn với threading và reactions.

```typescript
// Send message
await tools.message({
  channel: 'telegram',
  to: '@username',
  content: 'Hello!'
})

// Reply in thread
await tools.message({
  channel: 'slack',
  threadId: 'thread-123',
  content: 'Reply here'
})

// Add reaction
await tools.message({
  channel: 'discord',
  messageId: 'msg-123',
  reaction: '👍'
})
```

## Nguyên tắc an toàn

::: danger Quan trọng
- **Direct system execution** yêu cầu explicit user authorization
- **Camera và screen capture** yêu cầu proper consent verification trước khi invocation
- **Luôn sử dụng status checks** trước media commands
:::

### Ví dụ consent flow

```typescript
// Check consent before camera
const status = await tools.nodes({
  action: 'status',
  nodeId: 'node-123'
})

if (status.cameraConsent) {
  await tools.nodes({
    action: 'camera.snap',
    nodeId: 'node-123'
  })
}
```

## Cấu hình mẫu đầy đủ

```json
{
  "tools": {
    "profile": "coding",
    "allow": [
      "group:fs",
      "group:web",
      "exec",
      "message"
    ],
    "deny": [
      "browser",
      "canvas"
    ],
    "providers": {
      "anthropic": {
        "allow": ["group:fs", "web_search"],
        "deny": ["exec"]
      },
      "openai": {
        "allow": ["*"]
      }
    },
    "exec": {
      "allowedCommands": ["npm", "git", "node"],
      "deniedCommands": ["rm -rf", "sudo"],
      "timeout": 30000
    },
    "browser": {
      "headless": true,
      "ports": {
        "start": 18800,
        "end": 18810
      }
    },
    "webSearch": {
      "provider": "brave",
      "cacheMinutes": 15
    }
  }
}
```

## Tool Development

### Tạo custom tool

```typescript
import { defineTool } from 'openclaw'

export const myTool = defineTool({
  name: 'my_tool',
  description: 'Mô tả tool của bạn',
  parameters: {
    type: 'object',
    properties: {
      input: { type: 'string' }
    },
    required: ['input']
  },
  handler: async (params, context) => {
    // Logic của tool
    return { result: 'success' }
  }
})
```

### Đăng ký tool

```json
{
  "tools": {
    "custom": [
      "./tools/my-tool.ts"
    ]
  }
}
```
