# Logging

OpenClaw duy trì logs qua hai surfaces chính: console output và file logs.

## Log Locations

### Console Output

Hiển thị trong terminal và Debug UI.

### File Logs

JSON-formatted data được viết bởi gateway logger:

- **Location**: `/tmp/openclaw/`
- **Pattern**: `openclaw-YYYY-MM-DD.log`
- **Rotation**: Daily

## Configuration

Cấu hình trong `~/.openclaw/openclaw.json`:

```json5
{
  logging: {
    // File log path
    file: "/tmp/openclaw/openclaw.log",

    // File log level
    level: "info",

    // Console log level (independent)
    consoleLevel: "info",

    // Console output format
    consoleStyle: "pretty",  // pretty | compact | json

    // Redact sensitive data
    redactSensitive: "tools",  // none | tools | all
  },
}
```

## Log Levels

| Level | Description |
|-------|-------------|
| `error` | Chỉ errors |
| `warn` | Warnings và errors |
| `info` | General info (default) |
| `debug` | Debug information |
| `trace` | Detailed trace logs |

### File vs Console

```json5
{
  logging: {
    level: "debug",        // File logs: debug và higher
    consoleLevel: "info",  // Console: info và higher
  },
}
```

::: info Important
`--verbose` flag chỉ affect console verbosity, không raise file log level.
:::

## Console Styles

### Pretty (Default)

Human-readable format với colors:

```
[2024-01-15 10:30:45] INFO  gateway: Server started on port 18789
[2024-01-15 10:30:46] DEBUG channel/whatsapp: Connection established
```

### Compact

Condensed output:

```
10:30:45 I gateway: Server started
10:30:46 D whatsapp: Connected
```

### JSON

Machine-readable JSON:

```json
{"time":"2024-01-15T10:30:45Z","level":"info","subsystem":"gateway","msg":"Server started"}
```

## Sensitive Data Redaction

### Options

| Value | Behavior |
|-------|----------|
| `none` | No redaction |
| `tools` | Redact tool summaries (default) |
| `all` | Redact all sensitive fields |

### Built-in Patterns

Tự động redact:
- API keys
- Authorization headers
- Passwords
- Tokens
- Credentials

### Custom Patterns

Override built-in patterns:

```json5
{
  logging: {
    redactSensitive: "tools",
    redactPatterns: [
      "apiKey",
      "password",
      "token",
      "secret",
      "authorization",
      "x-api-key",
    ],
  },
}
```

## WebSocket Logging

### Normal Mode

Chỉ hiển thị:
- Errors
- Slow calls (≥50ms)
- Parse errors

### Verbose Mode

```bash
openclaw gateway --verbose
```

Hiển thị all traffic với configurable styles:
- `auto` - Tự động chọn
- `compact` - Condensed
- `full` - Complete payloads

```json5
{
  logging: {
    wsStyle: "auto",  // auto | compact | full
  },
}
```

## Console Formatting

### TTY-aware

- Subsystem prefixes
- Stable color coding per subsystem
- Automatic width adjustment

### NO_COLOR Support

Respects `NO_COLOR` environment variable:

```bash
export NO_COLOR=1
openclaw gateway
```

## CLI Commands

### View Logs

```bash
# Follow logs
openclaw logs --follow

# Last 100 lines
openclaw logs --lines 100

# Filter by level
openclaw logs --level error

# Filter by subsystem
openclaw logs --filter whatsapp
```

### Verbose Mode

```bash
# Start gateway với verbose
openclaw gateway --verbose

# Chat với verbose
openclaw chat --verbose "Hello"
```

## Log Rotation

### Default Rotation

Daily rotation với pattern `openclaw-YYYY-MM-DD.log`.

### Custom Rotation

```json5
{
  logging: {
    file: "/var/log/openclaw/gateway.log",
    maxSize: "100m",      // Max file size
    maxFiles: 7,          // Keep 7 days
    compress: true,       // Compress old logs
  },
}
```

### Logrotate Integration

```
# /etc/logrotate.d/openclaw
/tmp/openclaw/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
}
```

## Systemd Journal

Khi chạy như systemd service:

```bash
# View service logs
journalctl --user -u openclaw-gateway

# Follow
journalctl --user -u openclaw-gateway -f

# Since today
journalctl --user -u openclaw-gateway --since today
```

## Debug UI

Gateway Debug UI hiển thị real-time logs:

1. Mở WebChat UI
2. Click "Debug" tab
3. View live log stream

## Troubleshooting

### Logs không được ghi

1. Check permissions:
   ```bash
   ls -la /tmp/openclaw/
   ```
2. Verify config:
   ```bash
   cat ~/.openclaw/openclaw.json | grep logging
   ```

### Quá nhiều logs

1. Raise log level:
   ```json5
   { logging: { level: "warn" } }
   ```
2. Enable rotation
3. Add log filtering

### Missing sensitive data

1. Check redaction settings
2. Lower redaction level temporarily:
   ```json5
   { logging: { redactSensitive: "none" } }
   ```

### Performance impact

1. Use `info` level cho production
2. Disable verbose mode
3. Use file logs thay vì console

## Xem thêm

- [Troubleshooting](/gateway-ops/troubleshooting)
- [Configuration](/gateway-ops/configuration)
- [CLI logs](/cli/logs)
