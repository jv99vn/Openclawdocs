# Health Checks (macOS)

macOS Companion app thực hiện continuous health checks để đảm bảo system hoạt động ổn định.

## Tổng quan

- **Continuous monitoring** - Kiểm tra định kỳ
- **Automatic recovery** - Tự động fix issues
- **Alerts** - Thông báo khi có vấn đề
- **Diagnostics** - Chi tiết status

## Health Checks

### Gateway

| Check | Description |
|-------|-------------|
| Process | Gateway process alive |
| WebSocket | WebSocket responsive |
| API | REST API responding |
| Memory | Memory usage normal |
| CPU | CPU usage normal |

### Channels

| Check | Description |
|-------|-------------|
| Connection | Channel connected |
| Authentication | Auth valid |
| Queue | Message queue healthy |

### Providers

| Check | Description |
|-------|-------------|
| API Key | Key valid |
| Rate Limit | Not rate limited |
| Quota | Quota available |

## CLI Commands

```bash
# Quick health check
openclaw health

# Detailed health check
openclaw health --verbose

# JSON output
openclaw health --json
```

## Health Status

### Indicators

| Status | Icon | Meaning |
|--------|------|---------|
| Healthy | ✅ | All checks passing |
| Warning | ⚠️ | Some issues detected |
| Error | ❌ | Critical issues |
| Unknown | ❓ | Cannot determine |

### Example Output

```bash
$ openclaw health

Gateway Health Check
====================

Gateway:
  ✅ Process running (PID: 12345)
  ✅ WebSocket responsive (latency: 12ms)
  ✅ Memory: 245MB (limit: 2048MB)
  ✅ CPU: 5% (limit: 80%)

Channels:
  ✅ WhatsApp: Connected
  ✅ Telegram: Connected
  ⚠️ Discord: Reconnecting
  ❌ Slack: Token expired

Providers:
  ✅ Anthropic: Valid
  ✅ OpenAI: Valid

Overall: ⚠️ Warning (2 issues)
```

## Automatic Recovery

### Enabled by Default

```json5
{
  macos: {
    health: {
      autoRecover: true,
    },
  },
}
```

### Recovery Actions

| Issue | Action |
|-------|--------|
| Gateway down | Auto-restart |
| Channel disconnected | Auto-reconnect |
| High memory | Memory cleanup |
| Token expired | Prompt for reauth |

## Configuration

### Check Intervals

```json5
{
  macos: {
    health: {
      checkInterval: 30000,     // 30 seconds
      gatewayCheck: 10000,      // 10 seconds
      channelCheck: 60000,      // 60 seconds
      providerCheck: 300000,    // 5 minutes
    },
  },
}
```

### Thresholds

```json5
{
  macos: {
    health: {
      thresholds: {
        memoryWarning: 1024,    // MB
        memoryCritical: 1800,   // MB
        cpuWarning: 60,         // %
        cpuCritical: 80,        // %
        latencyWarning: 500,    // ms
        latencyCritical: 2000,  // ms
      },
    },
  },
}
```

### Alerts

```json5
{
  macos: {
    health: {
      alerts: {
        notification: true,
        sound: true,
        badge: true,
        email: false,  // Future feature
      },
    },
  },
}
```

## Menu Bar Integration

### Status Icon

Menu bar icon reflects health status:
- 🟢 Healthy
- 🟡 Warning
- 🔴 Error

### Quick Status

Click menu bar icon để xem quick status.

## Troubleshooting

### All checks failing

1. Verify Gateway running
2. Check network connection
3. Restart app

### Frequent warnings

1. Review thresholds
2. Check resource usage
3. Reduce load

### False positives

1. Increase check intervals
2. Adjust thresholds
3. Check network stability

### Health check slow

1. Increase timeouts
2. Reduce check frequency
3. Check network latency

## Diagnostics

### Export Health Report

```bash
openclaw health --export ~/health-report.json
```

### Continuous Monitoring

```bash
# Watch health status
openclaw health --watch

# Log to file
openclaw health --watch >> ~/health.log
```

## Xem thêm

- [Gateway Lifecycle](/macos-companion/gateway-lifecycle)
- [Troubleshooting](/gateway-ops/troubleshooting)
- [CLI doctor](/cli/doctor)
