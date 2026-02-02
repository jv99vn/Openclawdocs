# Voice Overlay

Voice Overlay là UI hiển thị khi voice mode active, cung cấp visual feedback cho voice interactions.

## Tổng quan

- **Visual feedback** - Hiển thị waveform và transcript
- **Status indication** - Listening/Processing/Speaking
- **Quick controls** - Cancel, mute, settings
- **Minimal design** - Không gây distraction

## Khi nào hiển thị

Voice Overlay xuất hiện khi:
- Voice Wake activated
- Voice Mode enabled
- Talk Mode active

## UI Elements

### Waveform

Audio visualization hiển thị:
- Input audio levels
- Processing state
- Output audio

### Transcript

Real-time text:
- User speech → Text
- Agent response → Text

### Status

| Status | Indicator |
|--------|-----------|
| Listening | 🎤 Microphone icon |
| Processing | ⏳ Spinner |
| Speaking | 🔊 Speaker icon |
| Muted | 🔇 Muted icon |

### Controls

| Control | Action |
|---------|--------|
| Cancel | Stop current interaction |
| Mute | Toggle microphone |
| Settings | Open voice settings |

## Position

### Options

```json5
{
  macos: {
    voice: {
      overlay: {
        position: "center",  // center | top | bottom | floating
      },
    },
  },
}
```

### Floating

Có thể drag overlay đến vị trí mong muốn.

## Appearance

### Opacity

```json5
{
  macos: {
    voice: {
      overlay: {
        opacity: 0.95,  // 0-1
      },
    },
  },
}
```

### Theme

```json5
{
  macos: {
    voice: {
      overlay: {
        theme: "auto",  // auto | light | dark
      },
    },
  },
}
```

### Size

```json5
{
  macos: {
    voice: {
      overlay: {
        size: "normal",  // compact | normal | large
      },
    },
  },
}
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Escape` | Cancel/Close |
| `Space` | Toggle mute |
| `⌘ + .` | Stop processing |

## Configuration

### Full Config

```json5
{
  macos: {
    voice: {
      overlay: {
        enabled: true,
        position: "center",
        opacity: 0.95,
        theme: "auto",
        size: "normal",

        // Auto-dismiss
        autoDismiss: true,
        dismissDelay: 2000,  // ms after response

        // Waveform
        showWaveform: true,
        waveformColor: "#10b981",

        // Transcript
        showTranscript: true,
        transcriptFontSize: 16,
      },
    },
  },
}
```

## Accessibility

### Screen Reader

Overlay announces:
- Status changes
- Transcript text
- Error messages

### Reduced Motion

Respects System Settings → Accessibility → Display → Reduce motion.

### High Contrast

Auto-adjusts cho accessibility settings.

## Troubleshooting

### Overlay không hiển thị

1. Check voice mode enabled
2. Verify app has focus
3. Check overlay không bị disabled

### Waveform không hoạt động

1. Check microphone permission
2. Verify audio input device
3. Check không bị muted

### Overlay stuck

1. Press Escape để dismiss
2. Restart voice mode
3. Check Gateway connection

### Position wrong

1. Reset position trong settings
2. Check display settings
3. Try different position option

## Xem thêm

- [Voice Wake](/macos-companion/voice-wake)
- [Talk Mode](/nodes-media/talk-mode)
- [Menu Bar](/macos-companion/menu-bar)
