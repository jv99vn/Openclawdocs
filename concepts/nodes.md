# Nodes

## Tổng quan

Một **node** là companion device (macOS/iOS/Android/headless) kết nối với Gateway WebSocket với `role: "node"` và exposes command surfaces qua `node.invoke`.

> Nodes là peripherals, không phải gateways, và không chạy gateway services.

## Key Capabilities

### Device Communication

- Nodes sử dụng **device pairing** để kết nối
- Manage qua CLI commands
- Status tracked riêng biệt với gateway pairing

```bash
# List devices
openclaw devices list

# Approve device
openclaw devices approve <requestId>

# Remove device
openclaw devices remove <deviceId>
```

### Remote Execution

> "Sử dụng node host khi Gateway chạy trên một machine và bạn muốn commands execute trên machine khác"

- Approvals enforced qua `~/.openclaw/exec-approvals.json` trên node machines
- Supports SSH tunneling cho loopback-bound gateways

### Canvas/UI Operations

| Operation | Mô tả |
|-----------|-------|
| `canvas.snapshot` | Screenshot capture |
| Navigation | URL navigation |
| JS evaluation | Execute JavaScript |

A2UI v0.8 JSONL support (v0.9 rejected).

### Media Capabilities

| Capability | Format | Notes |
|------------|--------|-------|
| Camera photos | JPG | |
| Camera video | MP4 | ≤60s |
| Screen recording | MP4 | Configurable FPS |
| Location | JSON | Khi enabled |

### System Integration

- SMS sending trên Android (yêu cầu permission/telephony)
- Notifications
- System command execution
- macOS nodes expose local canvas/camera như node commands

## Configuration

### Set default exec node

```bash
openclaw config set tools.exec.node "node-id-or-name"
```

### Start headless node host

```bash
openclaw node run --host <gateway-host> --port 18789
```

## Permission Requirements

Nodes report permissions map indicating granted status:

| Permission | Mô tả |
|------------|-------|
| `screenRecording` | Screen capture |
| `accessibility` | UI control |
| `camera` | Camera access |
| `microphone` | Audio access |
| `location` | GPS access |

## Node Types

### macOS

Full capabilities:
- Canvas
- Camera
- Screen recording
- System commands

### iOS

Limited capabilities:
- Camera
- Location
- Notifications

### Android

- Camera
- SMS (với permission)
- Location
- Notifications

### Headless

- Command execution
- File operations
- No UI capabilities

## Architecture

```
┌─────────────────┐
│     Gateway     │
│   (Main Host)   │
└────────┬────────┘
         │ WebSocket
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌───▼───┐
│ Node  │ │ Node  │
│(macOS)│ │(Phone)│
└───────┘ └───────┘
```

## Ví dụ sử dụng

### Chụp screenshot từ remote node

```typescript
await tools.nodes({
  action: 'canvas.snapshot',
  nodeId: 'macbook-pro'
})
```

### Gửi notification

```typescript
await tools.nodes({
  action: 'notify',
  nodeId: 'iphone',
  title: 'Alert',
  message: 'Task completed'
})
```

### Chụp ảnh

```typescript
await tools.nodes({
  action: 'camera.snap',
  nodeId: 'android-phone'
})
```

## Xem thêm

- [Tools](/concepts/tools)
- [Ghép nối](/start-here/pairing)
- [Kiến trúc](/concepts/architecture)
