# Cron Jobs

Cron là scheduler tích hợp của Gateway. Nó persist jobs, wake agent đúng thời điểm, và có thể deliver output về chat.

## Tổng quan

- **Runs inside Gateway** - không trong model
- **Persistent** - survive restarts
- **Optional delivery** - gửi output về channels
- **Multiple schedules** - one-shot, interval, cron expression

## Storage

### Job Definitions

```
~/.openclaw/cron/jobs.json
```

Jobs persist qua Gateway restarts.

### Run History

```
~/.openclaw/cron/runs/<jobId>.jsonl
```

JSONL format cho mỗi job.

## Schedule Types

### One-shot (at)

Chạy một lần tại timestamp cụ thể:

```json5
{
  cron: {
    jobs: [
      {
        id: "reminder",
        at: "2024-01-15T10:00:00Z",
        message: "Meeting in 30 minutes",
      },
    ],
  },
}
```

### Fixed Interval (every)

Chạy định kỳ:

```json5
{
  cron: {
    jobs: [
      {
        id: "hourly-check",
        every: "1h",  // 1h, 30m, 1d, etc.
        message: "Hourly status check",
      },
    ],
  },
}
```

### Cron Expression

Standard cron syntax với timezone:

```json5
{
  cron: {
    jobs: [
      {
        id: "daily-report",
        cron: "0 9 * * *",  // 9:00 AM daily
        timezone: "Asia/Ho_Chi_Minh",
        message: "Generate daily report",
      },
    ],
  },
}
```

## Execution Models

### Main Session

Enqueue system events trong heartbeat cycle:

```json5
{
  id: "daily-update",
  cron: "0 9 * * *",
  session: "main",
  message: "Good morning! What's the plan for today?",
}
```

- Uses existing conversation context
- Shares history với chat

### Isolated Session

Dedicated agent turns trong `cron:<jobId>` session:

```json5
{
  id: "backup-check",
  cron: "0 2 * * *",
  isolated: true,
  message: "Check backup status and report",
}
```

- No prior conversation context
- Clean slate mỗi run

## Delivery

### Channel Delivery

Gửi output về chat channels:

```json5
{
  id: "team-standup",
  cron: "0 9 * * 1-5",
  message: "Generate standup summary",
  deliver: {
    channel: "slack",
    to: "#engineering",
  },
}
```

### Supported Channels

- Slack
- Discord
- WhatsApp
- Telegram
- Signal
- iMessage
- Matrix

### Telegram Forum Topics

```json5
{
  deliver: {
    channel: "telegram",
    to: "-100123456789:topic:42",  // Forum topic format
  },
}
```

## Model & Thinking Overrides

Isolated jobs accept model overrides:

```json5
{
  id: "complex-analysis",
  cron: "0 3 * * 0",
  isolated: true,
  model: "claude-opus-4",      // Override model
  thinking: "high",             // Thinking level
  message: "Deep analysis task",
}
```

## Wakeup Modes

### Immediate

```json5
{
  id: "urgent-task",
  at: "2024-01-15T10:00:00Z",
  wakeMode: "now",  // Execute immediately at time
}
```

### Next Heartbeat

```json5
{
  id: "routine-task",
  every: "1h",
  wakeMode: "next-heartbeat",  // Defer to next heartbeat
}
```

## CLI Commands

### Add Job

```bash
openclaw cron add \
  --id "morning-greeting" \
  --cron "0 9 * * *" \
  --message "Good morning!" \
  --deliver slack:#general
```

### Edit Job

```bash
openclaw cron edit morning-greeting \
  --cron "0 8 * * *"  # Change to 8 AM
```

### Run Job Manually

```bash
openclaw cron run morning-greeting
```

### List Jobs

```bash
openclaw cron list
```

### View Run History

```bash
openclaw cron runs morning-greeting
```

### Delete Job

```bash
openclaw cron delete morning-greeting
```

## Configuration

### Disable Cron

```json5
{
  cron: {
    enabled: false,
  },
}
```

Hoặc via environment:

```bash
export OPENCLAW_CRON_ENABLED=false
```

### Timezone

Default timezone cho tất cả jobs:

```json5
{
  cron: {
    timezone: "Asia/Ho_Chi_Minh",
  },
}
```

## Full Configuration Example

```json5
{
  cron: {
    enabled: true,
    timezone: "Asia/Ho_Chi_Minh",
    jobs: [
      // Daily standup
      {
        id: "standup",
        cron: "0 9 * * 1-5",
        message: "Generate team standup",
        deliver: {
          channel: "slack",
          to: "#engineering",
        },
      },

      // Weekly report
      {
        id: "weekly-report",
        cron: "0 17 * * 5",
        isolated: true,
        model: "claude-sonnet-4",
        message: "Generate weekly summary report",
        deliver: {
          channel: "telegram",
          to: "-100123456789",
        },
      },

      // Hourly health check
      {
        id: "health-check",
        every: "1h",
        isolated: true,
        message: "Check system health",
      },

      // One-time reminder
      {
        id: "meeting-reminder",
        at: "2024-01-15T09:30:00Z",
        message: "Team meeting in 30 minutes",
        deliver: {
          channel: "whatsapp",
          to: "84123456789@s.whatsapp.net",
        },
      },
    ],
  },
}
```

## Troubleshooting

### Job không chạy

1. Verify cron enabled:
   ```bash
   openclaw cron list
   ```
2. Check Gateway running:
   ```bash
   openclaw gateway status
   ```
3. Verify schedule syntax
4. Check timezone settings

### Delivery fails

1. Verify channel connected
2. Check recipient ID format
3. Test manual delivery:
   ```bash
   openclaw chat --deliver --channel slack --to "#test" "Test message"
   ```

### Wrong timezone

1. Check job timezone setting
2. Verify system timezone
3. Use explicit timezone trong job config

## Xem thêm

- [CLI cron](/cli/cron)
- [Hooks](/automation-hooks/hooks)
- [Channels](/channels/overview)
