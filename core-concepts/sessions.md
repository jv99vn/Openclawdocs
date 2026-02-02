# Sessions

Sessions là conversation contexts được persist và quản lý bởi OpenClaw.

## Tổng quan

Mỗi conversation tạo một session chứa:
- Message history
- Context state
- Tool results
- Metadata

## Session Keys

Sessions được identify bằng unique keys:

| Source | Key Format |
|--------|------------|
| WhatsApp DM | `whatsapp:+84901234567` |
| WhatsApp Group | `whatsapp:120363xxx@g.us` |
| Telegram DM | `telegram:123456789` |
| Telegram Group | `telegram:-1001234567890` |
| Discord DM | `discord:dm:123456789` |
| Discord Channel | `discord:guild:123:channel:456` |

## Session Lifecycle

### Creation

Session được tạo tự động khi nhận message đầu tiên từ new conversation.

### Persistence

Sessions được lưu tại:

```
~/.openclaw/agents/<agentId>/sessions/<sessionKey>.json
```

### Reset

Sessions có thể reset bằng:

```
/new
/reset
```

Hoặc tự động theo schedule.

## Cấu hình

### Session Reset

```json5
{
  session: {
    reset: {
      mode: "daily",  // manual | daily | weekly | idle
      atHour: 4,      // Reset lúc 4 AM
      timezone: "Asia/Ho_Chi_Minh",
    },
  },
}
```

### Reset Modes

| Mode | Mô tả |
|------|-------|
| `manual` | Chỉ reset khi user request |
| `daily` | Reset hàng ngày tại `atHour` |
| `weekly` | Reset hàng tuần |
| `idle` | Reset sau khoảng thời gian idle |

### Idle Reset

```json5
{
  session: {
    reset: {
      mode: "idle",
      idleMinutes: 1440,  // 24 hours
    },
  },
}
```

## History Management

### History Limit

```json5
{
  session: {
    historyLimit: 100,  // Max messages to keep
  },
}
```

### Compaction

Khi history quá dài, OpenClaw có thể compact:

```json5
{
  agents: {
    defaults: {
      compaction: {
        enabled: true,
        threshold: 50000,  // tokens
        strategy: "summarize",
      },
    },
  },
}
```

## Multi-Session

### Per-Channel Sessions

Mỗi channel có separate sessions:

```
User trên WhatsApp → Session A
User trên Telegram → Session B
User trên Discord → Session C
```

### Shared Sessions (Optional)

```json5
{
  session: {
    shared: {
      enabled: true,
      // Merge sessions across channels cho cùng user
      identityKey: "phone",  // phone | email | custom
    },
  },
}
```

## Session Commands

### Trong Chat

```
/new         - Start new session
/reset       - Reset current session
/history     - View session history
/export      - Export session
```

### CLI

```bash
# List sessions
openclaw sessions list

# View session
openclaw sessions show <key>

# Delete session
openclaw sessions delete <key>

# Export session
openclaw sessions export <key> --output session.json
```

## Session Data Structure

```json
{
  "key": "whatsapp:+84901234567",
  "agentId": "main",
  "created": "2024-01-15T10:00:00Z",
  "updated": "2024-01-15T12:30:00Z",
  "messages": [
    {
      "role": "user",
      "content": "Hello",
      "timestamp": "2024-01-15T10:00:00Z"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help?",
      "timestamp": "2024-01-15T10:00:01Z"
    }
  ],
  "metadata": {
    "channel": "whatsapp",
    "contact": "+84901234567",
    "messageCount": 50
  }
}
```

## Session Hooks

### On Session Start

```json5
{
  hooks: {
    onSessionStart: {
      enabled: true,
      script: "~/.openclaw/hooks/session-start.sh",
    },
  },
}
```

### On Session End

```json5
{
  hooks: {
    onSessionEnd: {
      enabled: true,
      script: "~/.openclaw/hooks/session-end.sh",
    },
  },
}
```

## Backup & Restore

### Backup Sessions

```bash
# Backup all sessions
cp -r ~/.openclaw/agents/main/sessions/ ~/backup/

# Or use CLI
openclaw sessions export --all --output sessions-backup/
```

### Restore Sessions

```bash
# Restore
cp -r ~/backup/sessions/ ~/.openclaw/agents/main/

# Or use CLI
openclaw sessions import sessions-backup/
```

## Troubleshooting

### Session not persisting

1. Check permissions:
   ```bash
   ls -la ~/.openclaw/agents/main/sessions/
   ```

2. Check disk space

3. Verify config:
   ```bash
   openclaw config get session
   ```

### History too large

```json5
{
  session: {
    historyLimit: 50,  // Reduce limit
  },
  agents: {
    defaults: {
      compaction: {
        enabled: true,
        threshold: 30000,
      },
    },
  },
}
```

## Xem thêm

- [Session Management](/core-concepts/session-management)
- [Session Tools](/core-concepts/session-tools)
- [Memory](/core-concepts/memory)
