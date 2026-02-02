# Web Interfaces

OpenClaw cung cấp các giao diện web để quản lý và tương tác với hệ thống.

## Tổng quan

| Interface | URL | Mô tả |
|-----------|-----|-------|
| Control UI | `http://localhost:18789` | Dashboard quản lý |
| WebChat | `http://localhost:18789/chat` | Chat interface |
| Canvas | `http://localhost:18793` | Agent-editable content |

## Control UI

### Truy cập

```bash
openclaw dashboard
# hoặc mở browser tại http://localhost:18789
```

### Features

- Session management
- Agent configuration
- Channel status
- Logs viewer
- Settings

### Authentication

Khi truy cập từ non-loopback:

```json5
{
  gateway: {
    controlUi: {
      enabled: true,
      // Cho HTTP (không khuyến nghị)
      allowInsecureAuth: true,
    },
    auth: {
      mode: "token",
      token: "${OPENCLAW_GATEWAY_TOKEN}",
    },
  },
}
```

## WebChat

### Features

- Chat với agent
- File uploads
- Image support
- Markdown rendering
- Code highlighting

### URL

```
http://localhost:18789/chat
http://localhost:18789/chat?session=custom-session-id
```

### Embedding

```html
<iframe
  src="http://localhost:18789/chat"
  width="400"
  height="600"
></iframe>
```

## Canvas

Canvas cho phép agents render và edit HTML content.

### Port

Default: `18793`

```json5
{
  canvas: {
    port: 18793,
    enabled: true,
  },
}
```

### Agent Usage

```typescript
await tools.canvas({
  action: 'render',
  html: '<h1>Hello World</h1>',
})

await tools.canvas({
  action: 'present',
  url: 'https://example.com',
})
```

## TUI (Terminal UI)

Text-based UI cho terminal:

```bash
openclaw tui
```

### Features

- Chat interface
- Session switching
- Keyboard shortcuts
- Vi-style navigation

### Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+N` | New session |
| `Ctrl+R` | Reset session |
| `Ctrl+S` | Switch session |
| `Ctrl+Q` | Quit |

## Dashboard CLI

```bash
# Open dashboard in browser
openclaw dashboard

# With custom port
openclaw dashboard --port 19000

# JSON output (for scripting)
openclaw dashboard --json
```

## Security Considerations

### HTTPS

Cho production, sử dụng HTTPS:

```json5
{
  gateway: {
    tls: {
      enabled: true,
      cert: "/path/to/cert.pem",
      key: "/path/to/key.pem",
    },
  },
}
```

### Tailscale Serve

```bash
tailscale serve 18789
```

### Reverse Proxy

Nginx example:

```nginx
server {
  listen 443 ssl;
  server_name openclaw.example.com;

  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;

  location / {
    proxy_pass http://127.0.0.1:18789;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

## Configuration

```json5
{
  gateway: {
    port: 18789,

    controlUi: {
      enabled: true,
      allowInsecureAuth: false,
    },

    auth: {
      mode: "token",
      token: "${OPENCLAW_GATEWAY_TOKEN}",
    },
  },

  canvas: {
    enabled: true,
    port: 18793,
  },
}
```

## Xem thêm

- [Control UI](/web-interfaces/control-ui)
- [Dashboard](/web-interfaces/dashboard)
- [WebChat](/web-interfaces/webchat)
- [TUI](/web-interfaces/tui)
