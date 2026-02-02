# Gateway Lifecycle

macOS Companion app quản lý Gateway lifecycle, bao gồm start, stop, restart, và monitoring.

## Tổng quan

- **Auto-start** - Gateway start khi app launch
- **Auto-restart** - Restart khi crash
- **Graceful shutdown** - Clean shutdown
- **Health monitoring** - Continuous health checks

## Lifecycle States

```
┌─────────┐     ┌──────────┐     ┌─────────┐
│ Stopped │ ──► │ Starting │ ──► │ Running │
└─────────┘     └──────────┘     └─────────┘
     ▲                                │
     │          ┌──────────┐          │
     └───────── │ Stopping │ ◄────────┘
                └──────────┘
```

### States

| State | Description |
|-------|-------------|
| **Stopped** | Gateway không chạy |
| **Starting** | Gateway đang khởi động |
| **Running** | Gateway hoạt động bình thường |
| **Stopping** | Gateway đang shutdown |

## Controls

### Start Gateway

```bash
# CLI
openclaw gateway start

# Menu Bar
Click OpenClaw → Start Gateway
```

### Stop Gateway

```bash
# CLI
openclaw gateway stop

# Menu Bar
Click OpenClaw → Stop Gateway
```

### Restart Gateway

```bash
# CLI
openclaw gateway restart

# Menu Bar
Click OpenClaw → Restart Gateway
```

## Auto-Start

### On App Launch

```json5
{
  macos: {
    gateway: {
      autoStart: true,
    },
  },
}
```

### On System Login

1. **System Settings** → **General** → **Login Items**
2. Add **OpenClaw** to list

## Auto-Restart

### On Crash

```json5
{
  macos: {
    gateway: {
      autoRestart: true,
      restartDelay: 5000,  // ms
      maxRestarts: 3,      // trong 5 phút
    },
  },
}
```

### Backoff Strategy

| Restart | Delay |
|---------|-------|
| 1st | 5s |
| 2nd | 10s |
| 3rd | 30s |
| 4th+ | Manual restart required |

## Health Monitoring

### Checks

App continuously monitors:
- Gateway process alive
- WebSocket responsive
- Memory usage
- CPU usage

### Alerts

```json5
{
  macos: {
    gateway: {
      alerts: {
        onCrash: true,
        onHighMemory: true,
        onHighCPU: true,
        memoryThreshold: 1024,  // MB
        cpuThreshold: 80,       // %
      },
    },
  },
}
```

## Graceful Shutdown

Khi stopping:
1. Send shutdown signal
2. Wait for in-flight requests
3. Close WebSocket connections
4. Save state
5. Terminate process

### Timeout

```json5
{
  macos: {
    gateway: {
      shutdownTimeout: 30000,  // ms
    },
  },
}
```

## Configuration

### Full Config

```json5
{
  macos: {
    gateway: {
      // Lifecycle
      autoStart: true,
      autoRestart: true,
      restartDelay: 5000,
      maxRestarts: 3,
      shutdownTimeout: 30000,

      // Monitoring
      healthCheckInterval: 10000,  // ms
      alerts: {
        onCrash: true,
        onHighMemory: true,
        onHighCPU: true,
      },

      // Resources
      memoryLimit: 2048,  // MB
      cpuLimit: 100,      // %
    },
  },
}
```

## Logs

### View Logs

```bash
# CLI
openclaw logs --follow

# App
Click OpenClaw → View Logs
```

### Log Location

```
~/Library/Logs/OpenClaw/gateway.log
```

## Troubleshooting

### Gateway không start

1. Check port available:
   ```bash
   lsof -i :18789
   ```
2. Check logs cho errors
3. Run doctor:
   ```bash
   openclaw doctor
   ```

### Gateway keeps crashing

1. Check crash logs
2. Verify config valid
3. Check memory usage
4. Reduce concurrent connections

### Auto-restart không hoạt động

1. Verify `autoRestart: true` trong config
2. Check max restarts chưa đạt
3. Check app đang running

### High resource usage

1. Check active connections
2. Reduce model context
3. Clear memory:
   ```bash
   openclaw memory clear
   ```

## Xem thêm

- [Menu Bar](/macos-companion/menu-bar)
- [Health Checks](/macos-companion/health-checks)
- [Gateway Configuration](/gateway-ops/configuration)
