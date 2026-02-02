# Gateway Protocol

Gateway WebSocket protocol là unified control và transport layer của OpenClaw. Tất cả clients—bao gồm CLI tools, web UI, desktop applications, và mobile nodes—connect qua WebSocket và declare role/scope lúc handshake.

## Tổng quan

- **Protocol**: WebSocket với JSON text frames
- **Requirement**: Initial frame phải là `connect` request
- **Frame Types**: Requests, responses, và events

## Transport

### Connection URL

```
ws://localhost:18789/
wss://your-gateway.example.com/
```

### Frame Format

```json
{
  "type": "request" | "response" | "event",
  "id": "unique-id",
  "method": "method-name",
  "params": {},
  "result": {},
  "error": {}
}
```

## Connection Handshake

### 1. Server Challenge

Gateway gửi challenge khi client connect:

```json
{
  "type": "challenge",
  "nonce": "random-nonce",
  "timestamp": 1705312345000
}
```

### 2. Client Authentication

Client respond với credentials:

```json
{
  "type": "connect",
  "protocol": {
    "min": 1,
    "max": 2
  },
  "client": {
    "name": "OpenClaw CLI",
    "version": "1.2.3"
  },
  "role": "operator",
  "scopes": ["read", "write", "admin"],
  "device": {
    "id": "device-fingerprint",
    "name": "My MacBook"
  },
  "auth": {
    "token": "bearer-token"
  }
}
```

### 3. Server Confirmation

Gateway validates và returns:

```json
{
  "type": "connected",
  "protocol": 2,
  "policy": {
    "maxMessageSize": 1048576,
    "rateLimit": 100
  },
  "device": {
    "token": "device-token-for-future-auth"
  }
}
```

## Client Roles

### Operator Role

Control plane clients quản lý system.

**Scopes:**
- `read` - Đọc data và status
- `write` - Gửi messages
- `admin` - Configuration changes
- `approvals` - Approve/deny requests
- `pairing` - Manage device pairing

**Typical clients:**
- CLI (`openclaw`)
- Web UI
- Automation tools

```json
{
  "role": "operator",
  "scopes": ["read", "write", "admin"]
}
```

### Node Role

Capability hosts cung cấp functionality.

**Capabilities:**
- `camera` - Photo capture
- `canvas` - Drawing/rendering
- `screen` - Screen capture
- `location` - GPS location
- `voice` - Voice input/output

```json
{
  "role": "node",
  "capabilities": ["camera", "canvas", "screen"],
  "commands": [
    {
      "name": "camera.capture",
      "permissions": ["camera"]
    }
  ]
}
```

## Security

### Token Authentication

```json
{
  "auth": {
    "token": "your-gateway-token"
  }
}
```

### Device Fingerprinting

Keypair-derived identities:

```json
{
  "device": {
    "id": "sha256-of-public-key",
    "publicKey": "base64-encoded-key"
  }
}
```

### Challenge-Response Signing

Cho non-local connections:

```json
{
  "auth": {
    "signature": "signed-challenge-with-private-key"
  }
}
```

### TLS

- Required cho non-local connections
- Optional certificate pinning
- Verify server identity

### Allowlist Enforcement

Server-side validation của capability claims:

```json5
{
  gateway: {
    allowlist: {
      devices: ["device-id-1", "device-id-2"],
      capabilities: {
        "device-id-1": ["camera", "canvas"],
      },
    },
  },
}
```

## Methods

### System

| Method | Description |
|--------|-------------|
| `ping` | Heartbeat |
| `status` | Get gateway status |
| `shutdown` | Shutdown gateway |

### Sessions

| Method | Description |
|--------|-------------|
| `session.list` | List sessions |
| `session.create` | Create session |
| `session.delete` | Delete session |

### Messages

| Method | Description |
|--------|-------------|
| `message.send` | Send message |
| `message.list` | List messages |

### Nodes

| Method | Description |
|--------|-------------|
| `node.list` | List nodes |
| `node.invoke` | Invoke node command |
| `node.approve` | Approve node |

## Events

### Subscriptions

```json
{
  "type": "request",
  "method": "subscribe",
  "params": {
    "events": ["message", "node.connected"]
  }
}
```

### Event Types

| Event | Description |
|-------|-------------|
| `message` | New message |
| `message.updated` | Message updated |
| `node.connected` | Node connected |
| `node.disconnected` | Node disconnected |
| `approval.requested` | Approval needed |

### Event Format

```json
{
  "type": "event",
  "event": "message",
  "data": {
    "id": "msg-123",
    "content": "Hello!",
    "timestamp": 1705312345000
  }
}
```

## Presence Management

Track connected devices:

```json
{
  "type": "request",
  "method": "presence.list"
}
```

Response:

```json
{
  "type": "response",
  "result": {
    "devices": [
      {
        "id": "device-1",
        "name": "My MacBook",
        "role": "operator",
        "scopes": ["read", "write"],
        "connected": true,
        "lastSeen": 1705312345000
      }
    ]
  }
}
```

## Approval Workflow

Broadcasts exec requests requiring authorization:

```json
{
  "type": "event",
  "event": "approval.requested",
  "data": {
    "id": "approval-123",
    "device": "mobile-node",
    "command": "camera.capture",
    "params": {}
  }
}
```

Approve:

```json
{
  "type": "request",
  "method": "approval.approve",
  "params": {
    "id": "approval-123"
  }
}
```

## Idempotency

Side-effecting methods use idempotency keys:

```json
{
  "type": "request",
  "method": "message.send",
  "idempotencyKey": "unique-key-123",
  "params": {
    "content": "Hello!"
  }
}
```

## Protocol Versioning

Client/server negotiate version:

```json
{
  "protocol": {
    "min": 1,  // Minimum supported
    "max": 2   // Maximum supported
  }
}
```

Server responds với negotiated version:

```json
{
  "protocol": 2
}
```

## Error Handling

```json
{
  "type": "response",
  "id": "req-123",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid token"
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Authentication failed |
| `FORBIDDEN` | Permission denied |
| `NOT_FOUND` | Resource not found |
| `RATE_LIMITED` | Too many requests |
| `INTERNAL_ERROR` | Server error |

## Implementation

Protocol defined qua TypeBox schemas trong source code.

## Xem thêm

- [Configuration](/gateway-ops/configuration)
- [Security](/gateway-ops/security)
- [Nodes](/nodes-media/nodes)
