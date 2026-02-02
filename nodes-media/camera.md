# Camera Capture

OpenClaw cho phép chức năng camera qua iOS, Android, và macOS nodes thông qua agent workflows, cho phép chụp ảnh và quay video với permissions do user kiểm soát.

## Tổng quan

- **Photo capture** - JPG format
- **Video clips** - MP4 format với optional audio
- **User-controlled** - Permissions gated by settings
- **Cross-platform** - iOS, Android, macOS

## Capabilities

| Feature | iOS | Android | macOS |
|---------|-----|---------|-------|
| Photo (JPG) | ✅ | ✅ | ✅ |
| Video (MP4) | ✅ | ✅ | ✅ |
| Audio in video | ✅ | ✅ | ✅ |
| Default enabled | ✅ | ✅ | ❌ |

## Commands

### camera.list

Liệt kê cameras available:

```bash
node.invoke camera.list
```

### camera.snap

Chụp ảnh:

```bash
node.invoke camera.snap

# Với options
node.invoke camera.snap --camera front --quality 0.8
```

### camera.clip

Quay video ngắn:

```bash
node.invoke camera.clip --duration 10

# Với audio
node.invoke camera.clip --duration 10 --audio
```

## iOS Node

### Settings

Camera setting mặc định **enabled** trong Settings tab.

### Features

- Commands: `camera.list`, `camera.snap`, `camera.clip`
- Photos recompressed để giữ base64 payloads < 5MB
- **Foreground only** - App phải ở foreground

### Permissions

```
NSCameraUsageDescription - Camera access
NSMicrophoneUsageDescription - Audio trong video
```

## Android Node

### Settings

Camera setting mặc định **enabled** trong Settings sheet.

### Permissions Required

| Permission | Purpose |
|------------|---------|
| `CAMERA` | Photos và videos |
| `RECORD_AUDIO` | Audio capture |

### Features

- Giống iOS commands
- Runtime permission prompts
- **Foreground only**
- Payload size protection (< 5MB)

## macOS App

### Settings

Camera setting mặc định **disabled** (khác với mobile).

Enable via: **Settings → General → Allow Camera**

### Features

- Optional delay parameter cho exposure settling
- Default delay: 2000ms
- Screen recording support (separate permission)

### Configuration

```json5
{
  nodes: {
    macos: {
      camera: {
        enabled: true,
        captureDelay: 2000,  // ms
      },
    },
  },
}
```

## Safety Constraints

### Video Duration

Video clips capped tại **60 seconds** để prevent oversized payloads.

### Payload Size

- Photos recompressed nếu > 5MB
- Base64 encoding trong payload

### Permissions

Camera và microphone access trigger OS permission prompts:

**iOS:**
- Camera usage string required trong Info.plist
- Microphone usage string cho video with audio

**Android:**
- Runtime permission requests
- User can deny và revoke later

**macOS:**
- System Preferences → Security & Privacy
- App-specific camera access

## Configuration

### Global Settings

```json5
{
  nodes: {
    camera: {
      enabled: true,
      maxVideoSeconds: 60,
      photoQuality: 0.8,
    },
  },
}
```

### Per-Platform

```json5
{
  nodes: {
    ios: {
      camera: { enabled: true },
    },
    android: {
      camera: { enabled: true },
    },
    macos: {
      camera: {
        enabled: false,  // Explicit enable required
        captureDelay: 2000,
      },
    },
  },
}
```

## Use Cases

### Security Camera

```
User: Check the front door camera
Agent: [Uses camera.snap to capture and analyze]
```

### Document Scanning

```
User: Scan this document
Agent: [Uses camera.snap with high quality]
```

### Video Recording

```
User: Record a 30-second video
Agent: [Uses camera.clip --duration 30]
```

## Troubleshooting

### Camera không available

1. Check permissions granted trong OS settings
2. Verify camera enabled trong OpenClaw settings
3. Ensure app ở foreground (mobile)
4. Check other apps không đang dùng camera

### Quality issues

1. Increase `photoQuality` setting
2. Check lighting conditions
3. Clean camera lens
4. Increase `captureDelay` (macOS)

### Video recording fails

1. Check disk space
2. Verify audio permissions nếu recording with audio
3. Reduce duration nếu file too large

### Permission denied

1. **iOS:** Settings → Privacy → Camera
2. **Android:** Settings → Apps → OpenClaw → Permissions
3. **macOS:** System Preferences → Security & Privacy → Camera

## Xem thêm

- [Nodes Overview](/nodes-media/nodes)
- [Audio & Voice](/nodes-media/audio-voice)
- [iOS App](/platforms/ios)
- [Android App](/platforms/android)
