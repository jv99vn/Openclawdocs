# Nodes

Nodes là thiết bị companion kết nối với Gateway để cung cấp thêm capabilities.

## Tổng quan

Nodes cho phép:
- Camera capture
- Screen recording
- Location services
- Notifications
- Remote commands

## Node Types

| Type | Platform | Capabilities |
|------|----------|--------------|
| Desktop | macOS | Full |
| Mobile | iOS | Camera, location, notifications |
| Mobile | Android | Camera, location, notifications, SMS |
| Headless | Linux | Commands, webhooks |

## Pairing Flow

### 1. Start Pairing

Trên node device:
```bash
# CLI
openclaw node pair

# Mobile app: Scan QR từ Gateway
```

### 2. Approve Pairing

Trên gateway host:
```bash
# List pending requests
openclaw pairing list

# Approve
openclaw pairing approve <requestId>
```

### 3. Verify Connection

```bash
openclaw nodes list
```

## Node CLI

### List Nodes

```bash
openclaw nodes list
openclaw nodes list --online
```

### Node Info

```bash
openclaw nodes info <nodeId>
```

### Remove Node

```bash
openclaw nodes remove <nodeId>
```

### Send Notification

```bash
openclaw nodes notify <nodeId> "Hello from Gateway"
```

## Node Capabilities

### Camera

```typescript
// Take photo
await tools.nodes({
  action: 'camera.snap',
  nodeId: 'node-123',
})

// Record video
await tools.nodes({
  action: 'camera.clip',
  nodeId: 'node-123',
  duration: 10,  // seconds
})
```

### Screen

```typescript
// Screenshot
await tools.nodes({
  action: 'screen.snapshot',
  nodeId: 'node-123',
})

// Record screen
await tools.nodes({
  action: 'screen.record',
  nodeId: 'node-123',
  duration: 30,
})
```

### Location

```typescript
// Get current location
await tools.nodes({
  action: 'location.get',
  nodeId: 'node-123',
})
```

### Notifications

```typescript
// Send notification
await tools.nodes({
  action: 'notify',
  nodeId: 'node-123',
  title: 'Alert',
  message: 'Task completed',
})
```

### Commands

```typescript
// Execute command on node
await tools.nodes({
  action: 'exec',
  nodeId: 'node-123',
  command: 'ls -la',
})
```

## Consent Requirements

::: danger Quan trọng
Camera và screen capture yêu cầu proper consent verification trước khi invocation.
:::

### Consent Flow

```typescript
// Check consent before camera
const status = await tools.nodes({
  action: 'status',
  nodeId: 'node-123',
})

if (status.cameraConsent) {
  await tools.nodes({
    action: 'camera.snap',
    nodeId: 'node-123',
  })
}
```

## Node Configuration

### Gateway Config

```json5
{
  nodes: {
    enabled: true,
    autoApprove: {
      local: true,      // Auto-approve local nodes
      tailnet: false,   // Require approval for tailnet
    },
    capabilities: {
      camera: true,
      screen: true,
      location: true,
      exec: false,      // Disable exec on nodes
    },
  },
}
```

### Per-Node Config

```json5
{
  nodes: {
    list: {
      "node-123": {
        name: "My MacBook",
        capabilities: {
          camera: true,
          screen: true,
          location: false,
        },
      },
    },
  },
}
```

## Mobile App Setup

### iOS

1. Download OpenClaw từ App Store
2. Launch app
3. Scan QR code từ Gateway dashboard
4. Approve trên gateway host
5. Grant permissions (camera, location)

### Android

1. Download OpenClaw từ Play Store
2. Launch app
3. Scan QR code
4. Approve trên gateway host
5. Grant permissions

## Desktop Node

### macOS

Built into macOS companion app:
- Camera access
- Screen capture
- Notification actions
- Voice commands

### Linux

Headless node for servers:

```bash
# Install
npm install -g openclaw-node

# Start
openclaw-node --gateway ws://gateway:18789
```

## Security

### Network Security

- Nodes communicate over WebSocket
- TLS encryption (WSS) recommended
- Token-based authentication

### Permission Model

| Capability | Requires |
|------------|----------|
| Camera | User consent + app permission |
| Screen | User consent + app permission |
| Location | User consent + app permission |
| Notifications | App permission |
| Exec | Gateway config + user consent |

## Troubleshooting

### Node not connecting

1. Check network:
   ```bash
   openclaw nodes probe <nodeId>
   ```

2. Verify pairing:
   ```bash
   openclaw pairing list
   ```

3. Check gateway logs:
   ```bash
   openclaw logs --follow | grep node
   ```

### Capability not working

1. Check permissions on device
2. Verify consent granted
3. Check node config:
   ```bash
   openclaw nodes info <nodeId>
   ```

## Xem thêm

- [Camera Capture](/nodes-media/camera)
- [Image and Media](/nodes-media/image-media)
- [Voice Wake](/nodes-media/voice-wake)
- [Talk Mode](/nodes-media/talk-mode)
