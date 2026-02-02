# Remote Control

macOS Companion app có thể được điều khiển remotely từ các devices khác.

## Tổng quan

- **Cross-device control** - Control từ phone/tablet
- **Secure connection** - Encrypted communication
- **Full access** - Tất cả tính năng available
- **Real-time sync** - Instant updates

## Connection Methods

### Same Network (LAN)

Devices cùng WiFi network:

1. Enable Remote Control trong macOS app
2. Open OpenClaw trên mobile
3. Auto-discover Mac

### Tailscale (Recommended)

Secure connection anywhere:

1. Install Tailscale trên cả hai devices
2. Connect to same tailnet
3. Access via Tailscale IP

### Manual

Direct IP connection:

1. Get Mac IP: `ifconfig | grep inet`
2. Enter IP trong mobile app
3. Connect

## Setup

### Enable Remote Control

**Preferences** → **Remote** → **Enable Remote Control**

### Authentication

| Method | Description |
|--------|-------------|
| **PIN** | One-time PIN displayed on Mac |
| **QR Code** | Scan với mobile app |
| **Token** | Pre-shared token |

### Generate Token

```bash
openclaw remote token generate
```

## Mobile App

### Features

- Chat interface
- Voice input
- Camera access
- File sharing
- Notifications

### Connection

1. Open OpenClaw mobile app
2. Go to **Connect** → **Remote Mac**
3. Select discovered Mac hoặc enter IP
4. Authenticate

## Remote Commands

### From Mobile

```
# Trigger action on Mac
Remote → Run Command → "openclaw status"
```

### From CLI

```bash
# Connect to remote Mac
openclaw remote connect 192.168.1.100

# Execute command
openclaw remote exec "openclaw status"
```

## Configuration

```json5
{
  macos: {
    remote: {
      enabled: true,
      port: 18791,

      // Authentication
      auth: {
        method: "token",  // pin | qr | token
        token: "${REMOTE_TOKEN}",
      },

      // Security
      allowFrom: ["tailnet", "lan"],
      requireEncryption: true,

      // Features
      allowChat: true,
      allowVoice: true,
      allowCamera: true,
      allowFiles: true,
    },
  },
}
```

## Security

### Encryption

All remote connections encrypted với TLS.

### Access Control

```json5
{
  macos: {
    remote: {
      allowFrom: [
        "100.64.0.0/10",  // Tailscale
        "192.168.1.0/24", // LAN
      ],
    },
  },
}
```

### Rate Limiting

```json5
{
  macos: {
    remote: {
      rateLimit: {
        connections: 10,     // per minute
        commands: 100,       // per minute
      },
    },
  },
}
```

## Use Cases

### Control từ Phone

Chat với agent từ phone, execute trên Mac.

### Monitor từ xa

Check status và logs từ anywhere.

### Voice Control

Sử dụng phone microphone để voice control Mac.

### File Transfer

Share files giữa devices.

## Troubleshooting

### Cannot connect

1. Verify both devices on same network
2. Check firewall rules
3. Verify remote control enabled
4. Check port 18791 open

### Connection drops

1. Check network stability
2. Verify Tailscale connected
3. Check timeout settings

### Authentication fails

1. Regenerate token
2. Re-scan QR code
3. Check time sync between devices

### Features không hoạt động

1. Verify feature enabled trong config
2. Check permissions trên Mac
3. Update mobile app

## Xem thêm

- [Tailscale Integration](/gateway-ops/tailscale)
- [Security](/gateway-ops/security)
- [iOS App](/platforms/ios)
- [Android App](/platforms/android)
