# Tools

OpenClaw cung cấp agent tools first-class cho browser automation, canvas rendering, node management và scheduled tasks.

## Tổng quan

Các typed tools này thay thế các approaches dựa trên skill cũ hơn và hoạt động không cần shell dependencies.

## Danh sách Tools

| Tool | Mô tả |
|------|-------|
| `exec` | Shell command execution |
| `browser` | Browser automation |
| `web_search` | Web search |
| `web_fetch` | Fetch web content |
| `read` | Read files |
| `write` | Write files |
| `edit` | Edit files |
| `message` | Cross-platform messaging |
| `nodes` | Node management |
| `canvas` | Canvas rendering |
| `session_status` | Session info |

## Tool Access Control

### Allow/Deny Lists

```json5
{
  tools: {
    allow: ["read", "write", "exec"],
    deny: ["browser"],
  },
}
```

::: warning Lưu ý
**deny wins** khi cả hai được chỉ định. Matching là case-insensitive và hỗ trợ wildcard patterns.
:::

### Tool Profiles

| Profile | Tools |
|---------|-------|
| `minimal` | Chỉ session status |
| `coding` | Filesystem, runtime, sessions, memory |
| `messaging` | Communication-focused |
| `full` | Không hạn chế (mặc định) |

```json5
{
  tools: {
    profile: "coding",
  },
}
```

### Provider-specific Policies

```json5
{
  tools: {
    providers: {
      anthropic: {
        allow: ["read", "write"],
        deny: ["exec"],
      },
    },
  },
}
```

## Tool Groups (Shorthands)

| Group | Tools |
|-------|-------|
| `group:fs` | read, write, edit, apply_patch |
| `group:runtime` | exec, bash, process |
| `group:web` | web_search, web_fetch |
| `group:ui` | browser, canvas |

Ví dụ:

```json5
{
  tools: {
    allow: ["group:fs", "group:web"],
    deny: ["group:ui"],
  },
}
```

## Core Tools

### exec

Chạy shell commands:

```typescript
await tools.exec({
  command: 'ls -la',
  timeout: 30000,
  background: false,
})
```

**Parameters:**

| Param | Mô tả |
|-------|-------|
| `command` | Lệnh cần chạy |
| `background` | Chạy ở background |
| `timeout` | Timeout (ms) |
| `elevated` | Yêu cầu sudo |
| `tty` | Allocate TTY |

### read

Đọc files:

```typescript
await tools.read({
  path: '/path/to/file.txt',
  encoding: 'utf8',
})
```

### write

Ghi files:

```typescript
await tools.write({
  path: '/path/to/file.txt',
  content: 'Hello World',
})
```

### edit

Sửa files:

```typescript
await tools.edit({
  path: '/path/to/file.txt',
  oldText: 'Hello',
  newText: 'Hi',
})
```

### web_search

Tìm kiếm web:

```typescript
await tools.web_search({
  query: 'OpenClaw documentation',
  count: 10,
})
```

### web_fetch

Fetch web content:

```typescript
await tools.web_fetch({
  url: 'https://example.com',
  format: 'markdown',
})
```

### message

Cross-platform messaging:

```typescript
await tools.message({
  channel: 'telegram',
  to: '@username',
  content: 'Hello!',
})
```

### nodes

Node management:

```typescript
// List nodes
await tools.nodes({ action: 'list' })

// Send notification
await tools.nodes({
  action: 'notify',
  nodeId: 'node-123',
  title: 'Alert',
  message: 'Task completed',
})
```

### canvas

Canvas rendering (v0.8 only):

```typescript
await tools.canvas({
  action: 'render',
  html: '<h1>Hello World</h1>',
})
```

## Tool Caching

Web tools có response caching:

```json5
{
  tools: {
    webSearch: {
      cacheMinutes: 15,
    },
    webFetch: {
      cacheMinutes: 15,
    },
  },
}
```

## Security

::: danger Quan trọng
- **Direct system execution** yêu cầu explicit user authorization
- **Camera và screen capture** yêu cầu consent verification
- **Luôn sử dụng status checks** trước media commands
:::

### Sandbox Mode

```json5
{
  agents: {
    defaults: {
      sandbox: {
        mode: "docker",
        tools: {
          exec: {
            allowedCommands: ["npm", "git", "node"],
            deniedCommands: ["rm -rf", "sudo"],
          },
        },
      },
    },
  },
}
```

## Custom Tools

### Tạo Custom Tool

```typescript
import { defineTool } from 'openclaw'

export const myTool = defineTool({
  name: 'my_tool',
  description: 'Mô tả tool',
  parameters: {
    type: 'object',
    properties: {
      input: { type: 'string' },
    },
    required: ['input'],
  },
  handler: async (params, context) => {
    return { result: 'success' }
  },
})
```

### Đăng ký Tool

```json5
{
  tools: {
    custom: [
      "./tools/my-tool.ts",
    ],
  },
}
```

## Config Reference

```json5
{
  tools: {
    profile: "coding",
    allow: ["group:fs", "group:web", "exec", "message"],
    deny: ["browser", "canvas"],

    providers: {
      anthropic: {
        allow: ["group:fs", "web_search"],
        deny: ["exec"],
      },
    },

    exec: {
      allowedCommands: ["npm", "git", "node"],
      deniedCommands: ["rm -rf", "sudo"],
      timeout: 30000,
    },

    webSearch: {
      provider: "brave",
      cacheMinutes: 15,
    },

    webFetch: {
      cacheMinutes: 15,
      maxSize: "10mb",
    },

    custom: [],
  },
}
```

## Xem thêm

- [Browser](/tools-skills/browser)
- [Exec Tool](/tools-skills/exec)
- [Skills](/tools-skills/skills)
- [Plugins](/tools-skills/plugins)
