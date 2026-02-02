# Công cụ (Tools)

## Tổng quan

OpenClaw cung cấp first-class agent tools cho browser control, canvas rendering, node management, và scheduled tasks. Các typed tools này thay thế approaches dựa trên skill cũ.

## Tool Management

### Disabling Tools

Cấu hình qua `tools.allow` và `tools.deny`:

```json5
{
  "tools": {
    "allow": ["read", "write", "exec"],
    "deny": ["browser"]
  }
}
```

::: warning Quy tắc
**deny wins** khi cả hai được chỉ định. Matching là case-insensitive và hỗ trợ wildcards.
:::

### Tool Profiles

| Profile | Mô tả |
|---------|-------|
| `minimal` | Chỉ session status |
| `coding` | Filesystem, runtime, sessions, memory, image tools |
| `messaging` | Messaging channels + session management |
| `full` | Không hạn chế (mặc định) |

```json5
{
  "tools": {
    "profile": "coding"
  }
}
```

### Provider-Specific Policies

```json5
{
  "tools": {
    "byProvider": {
      "anthropic": {
        "allow": ["group:fs", "web_search"],
        "deny": ["exec"]
      }
    }
  }
}
```

## Tool Groups (Shorthands)

| Group | Tools |
|-------|-------|
| `group:runtime` | exec, process |
| `group:fs` | read, write, edit, apply_patch |
| `group:sessions` | sessions.* |
| `group:web` | web_search, web_fetch |
| `group:ui` | browser, canvas |
| `group:messaging` | message |
| `group:automation` | cron, gateway |

## Core Tools

### exec

Chạy shell commands:

```typescript
await tools.exec({
  command: 'ls -la',
  background: false,
  timeout: 30000
})
```

Options: `background`, `timeout`, `elevated`, `tty`

### process

Quản lý background sessions:

- `list` - Liệt kê processes
- `poll` - Check status
- `log` - Xem logs
- `write` - Send input
- `kill` - Terminate
- `clear` - Clean up

### web_search

Query qua Brave Search API:

```typescript
const results = await tools.web_search({
  query: 'OpenClaw documentation',
  count: 10
})
```

Có response caching (mặc định 15 phút).

### web_fetch

Extract content từ URLs:

```typescript
const content = await tools.web_fetch({
  url: 'https://example.com',
  format: 'markdown'
})
```

### browser

Control browser instances:

| Action | Mô tả |
|--------|-------|
| `launch` | Khởi động |
| `navigate` | Đi tới URL |
| `snapshot` | Accessibility tree |
| `screenshot` | Chụp màn hình |
| `click` | Click element |
| `type` | Nhập text |
| `press` | Press key |
| `close` | Đóng |

Multi-profile support, ports 18800-18899.

### canvas

Render và interact với node Canvas surfaces:

```typescript
await tools.canvas({
  action: 'render',
  html: '<h1>Hello</h1>'
})
```

### nodes

Discover paired nodes, capture media:

| Command | Mô tả |
|---------|-------|
| `list` | Liệt kê nodes |
| `notify` | Gửi notification |
| `camera.snap` | Chụp ảnh |
| `camera.clip` | Quay video |
| `screen.record` | Ghi màn hình |

### message

Cross-platform messaging:

```typescript
await tools.message({
  channel: 'telegram',
  to: '@username',
  content: 'Hello!'
})
```

### File Operations

- `read` - Đọc file
- `write` - Ghi file
- `edit` - Chỉnh sửa
- `apply_patch` - Multi-file patches

### Sessions

- List sessions
- Retrieve history
- Send messages
- Spawn sub-agents

### Automation

- `cron` - Schedule jobs
- `gateway` - Restart, apply config

## Safety Considerations

::: danger Quan trọng
- Direct system execution yêu cầu **explicit user authorization**
- Camera/screen capture yêu cầu **proper consent verification**
- Luôn check status trước media commands
:::

## Configuration Example

```json5
{
  "tools": {
    "profile": "coding",
    "allow": ["group:fs", "group:web", "exec"],
    "deny": ["browser"],
    "byProvider": {
      "anthropic": {
        "deny": ["exec"]
      }
    },
    "exec": {
      "timeout": 30000
    },
    "webSearch": {
      "cacheMinutes": 15
    }
  }
}
```

## Xem thêm

- [Tools CLI Reference](/reference/tools)
- [Skills CLI](/cli/skills)
- [Hooks](/concepts/hooks)
