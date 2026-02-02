# openclaw health

Lệnh `openclaw health` lấy health status từ active Gateway instance.

## Cú pháp

```bash
openclaw health [options]
```

## Ví dụ sử dụng

### Health check cơ bản

```bash
openclaw health
```

### JSON output

```bash
openclaw health --json
```

### Verbose với timing

```bash
openclaw health --verbose
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--json` | Format output là JSON |
| `--verbose` | Live diagnostic probes với timing metrics |

## Output Information

Health check response bao gồm:
- Per-agent session store details (khi có nhiều agents)
- Account-specific timing data (với `--verbose`)
- Gateway connectivity status
- Channel health

## Output Example

### Basic

```
Gateway Health: OK
Uptime: 2d 5h 30m

Channels:
  telegram: healthy
  discord: healthy
  whatsapp: healthy

Memory: 256MB
CPU: 2%
```

### Verbose

```
Gateway Health: OK
Uptime: 2d 5h 30m

Timing Metrics:
  telegram:
    latency: 45ms
    last_ping: 2s ago
  discord:
    latency: 32ms
    last_ping: 1s ago

Session Stores:
  main: 1024 sessions, 45MB
  ops: 256 sessions, 12MB
```

### JSON

```json
{
  "status": "ok",
  "uptime": 185400,
  "channels": {
    "telegram": { "healthy": true, "latency": 45 },
    "discord": { "healthy": true, "latency": 32 }
  },
  "memory": 268435456,
  "cpu": 2.1
}
```

## Xem thêm

- [Status](/cli/status)
- [Doctor](/cli/doctor)
- [Gateway](/concepts/gateway)
