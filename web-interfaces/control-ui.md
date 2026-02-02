# Control UI

Control UI là single-page application (Vite + Lit) được serve bởi Gateway tại `http://<host>:18789/`. Nó communicate trực tiếp với Gateway WebSocket và cung cấp dashboard để quản lý OpenClaw.

## Tổng quan

- **Single-page app** - Vite + Lit
- **Real-time** - WebSocket communication
- **Dashboard** - Quản lý toàn bộ system

## Access

### Local

```
http://127.0.0.1:18789/
```

Local connections auto-approve, không cần authentication.

### Remote

```
https://your-gateway.example.com/
```

Remote connections cần device pairing hoặc token.

### Tailscale Serve (Recommended)

```
https://my-machine.tail12345.ts.net/
```

Integrated HTTPS proxy với automatic authentication.

## Features

### Chat

- **Non-blocking send** - `chat.send` acks immediately với `{ runId, status: 'started' }`
- **Streaming** - Responses stream qua chat events
- **Abort** - Stop button hoặc `/stop` command
- **Inject** - `chat.inject` append assistant notes mà không trigger agent run

### Channel Management

Manage connected channels:
- WhatsApp
- Telegram
- Discord
- Slack
- Signal
- iMessage

### Sessions

- View all sessions
- Create/delete sessions
- Session history

### Cron Jobs

- List scheduled jobs
- Create/edit jobs
- View run history
- Manual trigger

### Skills

- Enable/disable skills
- Configure skill settings
- View skill status

### Nodes

- Connected devices
- Approve/deny requests
- Node capabilities

### Execution Approvals

- Pending approvals
- Approve/deny executions
- Approval history

### Configuration

- View/edit `~/.openclaw/openclaw.json`
- Schema-driven form rendering
- Validation
- Base-hash guards prevent concurrent edit conflicts

### Logs

- Real-time log stream
- Filter by level/subsystem
- Search logs

## Authentication

### Device Pairing

New browser connections cần one-time pairing:

1. Mở Control UI trong browser
2. Nhận pairing request
3. Approve từ CLI:
   ```bash
   openclaw devices approve <requestId>
   ```

### Local Connections

`http://127.0.0.1:18789/` auto-approve, bypass device requirements.

### Token Authentication

```
http://host:18789/?token=your-gateway-token
```

### Tailscale Integration

Tailscale Serve cung cấp:
- HTTPS automatic
- Identity verification
- No manual pairing needed

## Security

### HTTPS Recommendation

Plain HTTP over LANs blocks WebCrypto. Use:
- HTTPS
- Localhost access
- Tailscale Serve

### Access Methods

| Method | Security | Notes |
|--------|----------|-------|
| Localhost | ✅ Auto-approve | Development |
| Tailscale Serve | ✅ HTTPS + Identity | Recommended |
| Tailnet + Token | ✅ Token auth | Production |
| Plain HTTP | ⚠️ Limited | LAN only |

## Development

### Build Production

```bash
pnpm ui:build
```

### Development Server

```bash
pnpm ui:dev
```

### Remote Gateway

Connect dev server đến remote Gateway:

```
http://localhost:5173/?gatewayUrl=ws://host:18789
```

## UI Components

### Dashboard

Overview của system status:
- Gateway health
- Connected channels
- Active sessions
- Recent activity

### Chat Interface

- Message input
- Response streaming
- Tool execution display
- File attachments

### Settings Panel

- Configuration editor
- Provider settings
- Channel configuration
- Security settings

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Command palette |
| `Ctrl+Enter` | Send message |
| `Escape` | Cancel/Close |
| `Ctrl+/` | Toggle sidebar |

## Customization

### Theme

```json5
{
  ui: {
    theme: "dark",  // dark | light | auto
  },
}
```

### Layout

```json5
{
  ui: {
    sidebarCollapsed: false,
    showTimestamps: true,
  },
}
```

## Troubleshooting

### Cannot connect

1. Verify Gateway running:
   ```bash
   openclaw gateway status
   ```
2. Check URL và port
3. Verify firewall rules
4. Check browser console cho errors

### Pairing fails

1. List pending devices:
   ```bash
   openclaw devices pending
   ```
2. Verify device ID match
3. Check network connectivity

### WebCrypto errors

1. Use HTTPS hoặc localhost
2. Enable Tailscale Serve
3. Check browser security settings

### Slow performance

1. Reduce log streaming
2. Check network latency
3. Clear browser cache

## Xem thêm

- [WebChat](/web-interfaces/web)
- [Gateway Configuration](/gateway-ops/configuration)
- [Security](/gateway-ops/security)
