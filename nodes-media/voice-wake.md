# Voice Wake (Nodes)

Voice Wake trên mobile nodes cho phép activate OpenClaw bằng voice command từ iOS và Android devices.

## Tổng quan

- **Hands-free** - Activate bằng voice
- **Local detection** - Privacy-first
- **Cross-platform** - iOS và Android
- **Configurable** - Custom wake words

## Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| macOS | ✅ | Full support |
| iOS | ⚠️ | Best-effort (background limits) |
| Android | ⚠️ | Best-effort (background limits) |

## iOS

### Limitations

iOS có thể suspend background audio khi app không active:
- Voice wake hoạt động **best-effort**
- Recommend dùng app ở foreground
- Background limitations do iOS restrictions

### Setup

1. Mở app Settings
2. Enable **Voice Wake**
3. Grant **Microphone** permission
4. Choose wake word

### Configuration

```json5
{
  nodes: {
    ios: {
      voice: {
        wake: {
          enabled: true,
          wakeWords: ["Hey OpenClaw"],
          sensitivity: 0.5,
        },
      },
    },
  },
}
```

## Android

### Limitations

Android aggressive về background resource management:
- Foreground service required cho continuous listening
- Battery optimization có thể kill background service
- Best results khi app visible

### Setup

1. Mở app Settings
2. Enable **Voice Wake**
3. Grant **Microphone** permission
4. Disable battery optimization cho OpenClaw

### Battery Optimization

1. Settings → Apps → OpenClaw
2. Battery → Unrestricted

### Configuration

```json5
{
  nodes: {
    android: {
      voice: {
        wake: {
          enabled: true,
          wakeWords: ["Hey OpenClaw"],
          sensitivity: 0.5,
          useForegroundService: true,
        },
      },
    },
  },
}
```

## Wake Words

### Default

- "Hey OpenClaw"
- "OK OpenClaw"

### Custom

```json5
{
  nodes: {
    voice: {
      wake: {
        wakeWords: [
          "Hey assistant",
          "Computer",
          "Jarvis",
        ],
      },
    },
  },
}
```

## Sensitivity

| Value | Description |
|-------|-------------|
| 0.1 | Very strict |
| 0.5 | Balanced (default) |
| 0.9 | Very sensitive |

Higher sensitivity = more false positives.

## How It Works

1. **Background listening** - Continuous audio monitoring
2. **Local detection** - Wake word detected locally
3. **Activation** - App activates và starts recording
4. **Processing** - Speech sent to Gateway
5. **Response** - Agent responds

## Privacy

### Local Processing

Wake word detection happens entirely on device:
- No audio sent until wake word detected
- No cloud processing cho detection
- Only transcription uses cloud (configurable)

### Data Flow

```
Microphone → Local Wake Detection → [Wake detected?]
                                    │
                                    ├─ No: Continue listening
                                    │
                                    └─ Yes: Record → Transcribe → Agent
```

## Troubleshooting

### Wake word không detect

1. Check microphone permission
2. Increase sensitivity
3. Speak clearly
4. Check ambient noise

### App bị killed trong background

**iOS:**
- Keep app in recent apps
- Enable background audio

**Android:**
- Disable battery optimization
- Enable foreground service
- Add to "Don't optimize" list

### High battery drain

1. Reduce sensitivity
2. Use power saving mode
3. Disable when không cần

### False activations

1. Decrease sensitivity
2. Change wake word
3. Check ambient noise patterns

## Best Practices

### For Reliable Detection

1. Use distinctive wake word
2. Moderate sensitivity (0.4-0.6)
3. Keep device charged
4. Minimize background noise

### For Battery Life

1. Lower sensitivity
2. Disable khi không cần
3. Use "Hey OpenClaw" (optimized)

## Comparison với macOS

| Feature | macOS | iOS/Android |
|---------|-------|-------------|
| Background listening | ✅ Always | ⚠️ Best-effort |
| Battery impact | Low | Medium-High |
| Reliability | High | Moderate |
| Custom wake words | ✅ | ✅ |

## Xem thêm

- [Voice Wake (macOS)](/macos-companion/voice-wake)
- [Talk Mode](/nodes-media/talk-mode)
- [Audio & Voice](/nodes-media/audio-voice)
