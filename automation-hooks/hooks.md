# Hooks

Hooks là event-driven automations được trigger bởi các commands và gateway events.

## Tổng quan

Hooks cho phép:
- Tự động hóa workflows
- React to events
- Extend functionality
- Custom integrations

## Hook Types

| Type | Trigger |
|------|---------|
| `command` | Slash commands (`/new`, `/reset`) |
| `gateway` | Gateway lifecycle events |
| `session` | Session events |
| `message` | Message events |
| `cron` | Scheduled execution |

## Bundled Hooks

OpenClaw đi kèm 4 hooks built-in:

| Hook | Mô tả |
|------|-------|
| `session-memory` | Saves session context to memory khi `/new` |
| `command-logger` | Logs all command events |
| `soul-evil` | Swaps injected content |
| `boot-md` | Runs `BOOT.md` khi gateway starts |

## Hook CLI

### List Hooks

```bash
openclaw hooks list
openclaw hooks list --eligible
```

### Enable/Disable

```bash
openclaw hooks enable session-memory
openclaw hooks disable command-logger
```

### Status

```bash
openclaw hooks status
```

### Install

```bash
# From local
openclaw hooks install ./my-hook

# From npm
openclaw hooks install @openclaw/hook-example

# Link (dev)
openclaw hooks install -l ./my-hook
```

## Cấu hình

### Enable Hooks

```json5
{
  hooks: {
    enabled: true,
    list: {
      "session-memory": {
        enabled: true,
      },
      "command-logger": {
        enabled: false,
      },
    },
  },
}
```

### Hook Directories

```json5
{
  hooks: {
    paths: [
      "~/.openclaw/hooks",
      "./project-hooks",
    ],
  },
}
```

## Tạo Custom Hook

### Cấu trúc Hook

```
my-hook/
├── openclaw.hook.json
├── index.ts
└── README.md
```

### openclaw.hook.json

```json
{
  "name": "my-hook",
  "version": "1.0.0",
  "description": "My custom hook",
  "main": "index.ts",
  "events": ["command:new", "session:end"]
}
```

### index.ts

```typescript
import { defineHook } from 'openclaw'

export default defineHook({
  name: 'my-hook',

  // Command hook
  onCommand: async (command, context) => {
    if (command.name === 'new') {
      console.log('New session started')
    }
  },

  // Session hook
  onSessionEnd: async (session, context) => {
    console.log('Session ended:', session.key)
  },
})
```

## Event Types

### Command Events

```typescript
onCommand: async (command, context) => {
  // command.name: 'new' | 'reset' | 'model' | ...
  // command.args: string[]
  // context.session: Session
  // context.agent: Agent
}
```

### Session Events

```typescript
onSessionStart: async (session, context) => {
  // New session created
}

onSessionEnd: async (session, context) => {
  // Session ended or reset
}
```

### Message Events

```typescript
onMessageReceive: async (message, context) => {
  // Inbound message
}

onMessageSend: async (message, context) => {
  // Outbound message
}
```

### Gateway Events

```typescript
onGatewayStart: async (context) => {
  // Gateway started
}

onGatewayStop: async (context) => {
  // Gateway stopping
}
```

## Hook Configuration

### Per-Hook Config

```json5
{
  hooks: {
    list: {
      "my-hook": {
        enabled: true,
        config: {
          // Hook-specific config
          logLevel: "debug",
          outputPath: "/tmp/logs",
        },
      },
    },
  },
}
```

### Accessing Config

```typescript
export default defineHook({
  name: 'my-hook',

  onCommand: async (command, context) => {
    const config = context.hookConfig
    console.log(config.logLevel)
  },
})
```

## Hook Priority

Hooks run in order by priority:

```json5
{
  hooks: {
    list: {
      "hook-a": {
        enabled: true,
        priority: 100,  // Runs first
      },
      "hook-b": {
        enabled: true,
        priority: 50,   // Runs second
      },
    },
  },
}
```

## Async Hooks

Hooks có thể async và await:

```typescript
onSessionEnd: async (session, context) => {
  // Save to external service
  await saveToDatabase(session)

  // Notify
  await sendNotification('Session ended')
}
```

## Error Handling

```typescript
onCommand: async (command, context) => {
  try {
    await riskyOperation()
  } catch (error) {
    context.logger.error('Hook failed:', error)
    // Hook errors don't stop the main flow
  }
}
```

## Troubleshooting

### Hook not running

1. Check enabled:
   ```bash
   openclaw hooks list
   ```

2. Check events:
   ```bash
   openclaw hooks info my-hook
   ```

3. Check logs:
   ```bash
   openclaw logs --follow | grep hook
   ```

### Hook errors

```bash
# Enable debug logging
openclaw config set logging.level debug

# Check logs
openclaw logs --follow
```

## Xem thêm

- [Webhooks](/automation-hooks/webhooks)
- [Cron Jobs](/automation-hooks/cron-jobs)
- [Session Memory Hook](/automation-hooks/session-memory)
