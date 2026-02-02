# Hooks

## Mục đích cốt lõi

Hooks cung cấp hệ thống automation event-driven trong Gateway của OpenClaw.

> Hooks "chạy bên trong Gateway khi agent events fire, như `/new`, `/reset`, `/stop`, hoặc lifecycle events."

## Hai loại

| Loại | Mô tả |
|------|-------|
| **Hooks** | Internal Gateway events (tài liệu này) |
| **Webhooks** | External HTTP endpoints cho cross-system integration |

## Ứng dụng phổ biến

- Memory snapshots khi session reset
- Audit logging cho compliance
- Automated follow-ups trên lifecycle events
- File operations hoặc API calls triggered bởi events

## Discovery System

Hooks được tự động discovered từ ba locations (theo thứ tự ưu tiên):

| Source | Location |
|--------|----------|
| Workspace | `<workspace>/hooks/` |
| Managed | `~/.openclaw/hooks/` |
| Bundled | (trong package) |

### Yêu cầu mỗi hook

- `HOOK.md` - Metadata + documentation
- `handler.ts` - Implementation file

## Bundled Hooks

Bốn hooks đi kèm OpenClaw:

| Hook | Mô tả |
|------|-------|
| **session-memory** | Saves context snapshots khi `/new` issued |
| **command-logger** | Tạo audit trail trong JSONL format |
| **boot-md** | Executes `BOOT.md` khi gateway startup |
| **soul-evil** | Conditionally swaps `SOUL.md` content trong specified windows |

## Event Types

### Command Events

| Event | Mô tả |
|-------|-------|
| `command:new` | Khi `/new` được gọi |
| `command:reset` | Khi `/reset` được gọi |
| `command:stop` | Khi `/stop` được gọi |

### Lifecycle Events

| Event | Mô tả |
|-------|-------|
| `agent:bootstrap` | Agent khởi tạo |
| `gateway:startup` | Gateway khởi động |

### Planned Events

- Session start/end
- Error handling
- Message events

## Handler Structure

Handlers là TypeScript functions nhận event context:

```typescript
import { HookHandler } from 'openclaw'

export const handler: HookHandler = async (event, context) => {
  const { session, timestamp, channel } = context

  // Hook logic here
  console.log(`Event: ${event.type}`)

  // Optional: send message
  await context.message.send({
    to: session.user,
    content: 'Hook triggered!'
  })
}
```

### Context bao gồm

- Session info
- Timestamps
- Messaging capabilities

::: warning Best Practices
- **Keep handlers lightweight**
- **Handle errors gracefully** để tránh blocking command processing
:::

## Configuration & Management

### CLI

```bash
# List hooks
openclaw hooks list

# Enable hook
openclaw hooks enable session-memory

# Disable hook
openclaw hooks disable session-memory
```

### JSON Config

```json5
{
  "hooks": {
    "enabled": ["session-memory", "command-logger"],
    "disabled": ["soul-evil"],
    "config": {
      "session-memory": {
        "format": "json",
        "path": "~/.openclaw/memories/"
      }
    }
  }
}
```

### Per-hook settings

Bao gồm:
- Environment variables
- Custom parameters

## Tạo Custom Hook

### Bước 1: Tạo thư mục

```bash
mkdir -p ~/.openclaw/hooks/my-hook
```

### Bước 2: Tạo HOOK.md

```markdown
---
name: My Hook
description: Custom hook description
events:
  - command:new
---

# My Hook

This hook does something useful.
```

### Bước 3: Tạo handler.ts

```typescript
import { HookHandler } from 'openclaw'

export const handler: HookHandler = async (event, context) => {
  console.log('My hook triggered!')
}
```

### Bước 4: Enable hook

```bash
openclaw hooks enable my-hook
```

## Xem thêm

- [Tools](/concepts/tools)
- [Plugins CLI](/cli/plugins)
