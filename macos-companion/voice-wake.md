# Voice Wake

Voice Wake cho phép activate OpenClaw bằng voice command mà không cần touch keyboard hoặc mouse.

## Tổng quan

- **Hands-free activation** - Nói để activate
- **Custom wake word** - Tùy chỉnh wake word
- **Always listening** - Background monitoring
- **Privacy-first** - Local processing

## Setup

### Enable Voice Wake

1. Mở **Preferences** → **Voice**
2. Enable **Voice Wake**
3. Grant **Microphone** permission
4. Choose **Wake Word**

### Permissions Required

| Permission | Purpose |
|------------|---------|
| Microphone | Listen for wake word |
| Accessibility | Optional for global activation |

## Wake Words

### Default

- "Hey OpenClaw"
- "OK OpenClaw"

### Custom

```json5
{
  macos: {
    voice: {
      wakeWords: [
        "Hey assistant",
        "Computer",
      ],
    },
  },
}
```

## How It Works

1. **Listening** - App continuously monitors audio
2. **Detection** - Local wake word detection
3. **Activation** - Voice overlay appears
4. **Response** - Speak your request

## Voice Overlay

Khi activated, Voice Overlay xuất hiện:

- **Waveform** - Visual feedback
- **Transcript** - Real-time text
- **Cancel** - Click hoặc nói "Cancel"

## Configuration

### Full Config

```json5
{
  macos: {
    voice: {
      wake: {
        enabled: true,
        wakeWords: ["Hey OpenClaw"],
        sensitivity: 0.5,  // 0-1
        timeout: 30,       // seconds
      },
      overlay: {
        position: "center",  // center | top | bottom
        opacity: 0.95,
      },
    },
  },
}
```

### Sensitivity

| Value | Meaning |
|-------|---------|
| 0.1 | Very strict, fewer false positives |
| 0.5 | Balanced (default) |
| 0.9 | Very sensitive, more false positives |

## Privacy

### Local Processing

Wake word detection xảy ra **hoàn toàn local**:
- Không gửi audio đến cloud
- Không lưu recordings
- Chỉ send text khi activated

### Audio Handling

```json5
{
  macos: {
    voice: {
      privacy: {
        deleteAudioAfterProcessing: true,
        noCloudWakeDetection: true,
      },
    },
  },
}
```

## Power Considerations

### Battery Impact

- Continuous listening uses ~2-5% battery/hour
- Disable khi không cần để save battery

### Optimization

```json5
{
  macos: {
    voice: {
      wake: {
        powerSaving: true,  // Reduce sensitivity khi on battery
      },
    },
  },
}
```

## Troubleshooting

### Wake word không detect

1. Check microphone permission
2. Increase sensitivity
3. Speak clearly và louder
4. Check audio input device

### False activations

1. Decrease sensitivity
2. Change wake word
3. Check ambient noise level

### Delay khi responding

1. Check network connection
2. Check Gateway status
3. Try smaller model

### Microphone không hoạt động

1. System Settings → Privacy → Microphone
2. Enable OpenClaw access
3. Check input device trong Sound settings

## Xem thêm

- [Voice Overlay](/macos-companion/voice-overlay)
- [Talk Mode](/nodes-media/talk-mode)
- [Audio & Voice](/nodes-media/audio-voice)
