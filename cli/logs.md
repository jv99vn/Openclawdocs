# openclaw logs

Lệnh `openclaw logs` hiển thị và theo dõi logs của Gateway.

## Cú pháp

```bash
openclaw logs [options]
```

## Options

| Flag | Mô tả |
|------|-------|
| `--follow`, `-f` | Theo dõi logs real-time |
| `--limit <n>` | Số dòng logs hiển thị (default: 50) |
| `--level <level>` | Filter theo log level |
| `--json` | Output dạng JSON |
| `--since <time>` | Logs từ thời điểm |
| `--until <time>` | Logs đến thời điểm |

## Ví dụ sử dụng

### Xem logs gần nhất

```bash
openclaw logs
```

### Theo dõi logs real-time

```bash
openclaw logs --follow
```

### Xem 200 dòng logs gần nhất

```bash
openclaw logs --limit 200
```

### Filter theo level

```bash
# Chỉ errors
openclaw logs --level error

# Errors và warnings
openclaw logs --level warn
```

### Output JSON

```bash
openclaw logs --json
```

### Logs trong khoảng thời gian

```bash
openclaw logs --since "2024-01-01" --until "2024-01-02"
```

## Log Levels

| Level | Mô tả |
|-------|-------|
| `trace` | Detailed debugging |
| `debug` | Debug information |
| `info` | General information |
| `warn` | Warnings |
| `error` | Errors |
| `fatal` | Fatal errors |

## Vị trí Log Files

### File logs (structured JSONL)

```
/tmp/openclaw/openclaw-YYYY-MM-DD.log
```

Hoặc configured path qua `logging.file`.

### macOS LaunchAgent

```
$OPENCLAW_STATE_DIR/logs/gateway.log
$OPENCLAW_STATE_DIR/logs/gateway.err.log
```

Default: `~/.openclaw/logs/`

### Linux systemd

```bash
journalctl --user -u openclaw-gateway.service -n 200 --no-pager
```

### Windows

```bash
schtasks /Query /TN "OpenClaw Gateway" /V /FO LIST
```

## Cấu hình Logging

### Trong openclaw.json

```json5
{
  logging: {
    // File log level
    level: "info",

    // Console log level (TTY only)
    consoleLevel: "info",

    // Console style
    consoleStyle: "pretty",  // pretty | json

    // File path (optional)
    file: "/custom/path/openclaw.log",

    // Rotation
    maxSize: "10m",
    maxFiles: 5,
  },
}
```

### Enable Debug Logging

```json5
{
  logging: {
    level: "debug",
    consoleLevel: "debug",
  },
}
```

### Enable Trace Logging

```json5
{
  logging: {
    level: "trace",
  },
}
```

## Verbose Mode

`--verbose` flag chỉ affect console output, không affect file logs:

```bash
openclaw gateway --verbose
openclaw channels login --verbose
```

## Filtering Logs

### Với grep

```bash
# Tìm errors
openclaw logs --limit 500 | grep "error"

# Tìm WhatsApp logs
openclaw logs --follow | grep "whatsapp"

# Tìm connection issues
openclaw logs --follow | grep "connection\\|disconnect\\|logout"
```

### Với jq (JSON logs)

```bash
openclaw logs --json | jq 'select(.level == "error")'
```

## Troubleshooting với Logs

### Gateway không khởi động

```bash
# Xem logs gần nhất
openclaw logs --limit 100

# Hoặc file trực tiếp
tail -50 /tmp/openclaw/openclaw-*.log
```

### Channel issues

```bash
openclaw logs --follow | grep "channels\\|whatsapp\\|telegram\\|discord"
```

### Agent issues

```bash
openclaw logs --follow | grep "agent\\|model\\|anthropic\\|openai"
```

### Media issues

```bash
openclaw logs --follow | grep "media\\|fetch\\|download\\|upload"
```

## Log Format

### Pretty format (console)

```
2024-01-15 10:30:45 INFO  Gateway started on port 18789
2024-01-15 10:30:46 INFO  WhatsApp connected
2024-01-15 10:30:47 WARN  Telegram rate limited, retrying...
```

### JSON format (file)

```json
{"timestamp":"2024-01-15T10:30:45.123Z","level":"info","message":"Gateway started on port 18789"}
{"timestamp":"2024-01-15T10:30:46.456Z","level":"info","message":"WhatsApp connected"}
```

## Xem thêm

- [Troubleshooting](/gateway-ops/troubleshooting)
- [Health](/cli/health)
- [Status](/cli/status)
- [Doctor](/cli/doctor)
