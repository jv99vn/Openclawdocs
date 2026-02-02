# Talk Mode

Talk Mode cho phép conversation liên tục bằng voice, tạo trải nghiệm như đang nói chuyện với assistant.

## Tổng quan

- **Continuous conversation** - Không cần wake word mỗi lần
- **Natural flow** - Nói chuyện tự nhiên
- **Visual feedback** - Voice overlay hiển thị status
- **Multi-turn** - Nhiều lượt hỏi đáp liên tiếp

## Kích hoạt

### Menu Bar

Click **OpenClaw** → **Talk Mode**

### Keyboard

`⌘ + Shift + T`

### Voice

"Enter talk mode" hoặc "Let's talk"

## How It Works

1. **Activate** - Enter Talk Mode
2. **Listen** - App listens continuously
3. **Transcribe** - Speech → Text
4. **Process** - Agent responds
5. **Speak** - Text → Speech
6. **Repeat** - Continue conversation

## Modes

### Push-to-Talk

Hold button to speak:

```json5
{
  voice: {
    talkMode: {
      type: "push-to-talk",
    },
  },
}
```

### Voice Activity Detection (VAD)

Automatic detection khi bạn nói:

```json5
{
  voice: {
    talkMode: {
      type: "vad",
      silenceThreshold: 500,  // ms of silence to end turn
    },
  },
}
```

### Toggle

Toggle on/off với button:

```json5
{
  voice: {
    talkMode: {
      type: "toggle",
    },
  },
}
```

## Configuration

```json5
{
  voice: {
    talkMode: {
      enabled: true,
      type: "vad",

      // VAD settings
      silenceThreshold: 500,
      minSpeechDuration: 200,

      // Audio
      inputDevice: "default",
      outputDevice: "default",
      volume: 1.0,

      // Speech
      ttsVoice: "alloy",
      ttsSpeed: 1.0,
      sttModel: "whisper-1",

      // Behavior
      interruptible: true,
      autoEnd: true,
      autoEndTimeout: 30000,
    },
  },
}
```

## Text-to-Speech

### Voices

| Voice | Description |
|-------|-------------|
| `alloy` | Neutral |
| `echo` | Male |
| `fable` | British |
| `onyx` | Deep male |
| `nova` | Female |
| `shimmer` | Soft female |

### Configuration

```json5
{
  voice: {
    tts: {
      provider: "openai",
      voice: "alloy",
      speed: 1.0,
    },
  },
}
```

## Speech-to-Text

### Providers

| Provider | Model |
|----------|-------|
| OpenAI | whisper-1 |
| Groq | whisper-large-v3 |
| Deepgram | nova-2 |
| Local | sherpa-onnx |

### Configuration

```json5
{
  voice: {
    stt: {
      provider: "openai",
      model: "whisper-1",
      language: "vi",
    },
  },
}
```

## Interruption

Có thể interrupt agent khi đang nói:

```json5
{
  voice: {
    talkMode: {
      interruptible: true,
    },
  },
}
```

Khi interrupt:
1. Agent stops speaking
2. App starts listening
3. New input processed

## Visual Feedback

### Overlay States

| State | Display |
|-------|---------|
| Listening | 🎤 + waveform |
| Processing | ⏳ + spinner |
| Speaking | 🔊 + waveform |
| Paused | ⏸️ |

### Transcript

Real-time transcript hiển thị:
- Your speech
- Agent response

## Keyboard Controls

| Key | Action |
|-----|--------|
| `Space` | Toggle listening (push-to-talk) |
| `Escape` | Exit Talk Mode |
| `M` | Mute/Unmute |
| `↑/↓` | Volume |

## Use Cases

### Hands-free Computing

```
User: "Open my email"
Agent: "Opening Mail app"
User: "Read the first unread message"
Agent: "Subject: Meeting tomorrow..."
```

### Brainstorming

```
User: "Let's brainstorm ideas for the project"
Agent: "Sure, what's the project about?"
User: "It's a mobile app for fitness tracking"
Agent: "Here are some ideas..."
```

### Quick Questions

```
User: "What's the weather today?"
Agent: "It's 25°C and sunny in Ho Chi Minh City"
User: "Thanks, exit talk mode"
```

## Auto-End

Tự động exit Talk Mode sau timeout:

```json5
{
  voice: {
    talkMode: {
      autoEnd: true,
      autoEndTimeout: 30000,  // 30 seconds of silence
    },
  },
}
```

## Platform Support

| Platform | Support |
|----------|---------|
| macOS | ✅ Full |
| iOS | ✅ Full |
| Android | ✅ Full |
| Web | ⚠️ Limited |

## Troubleshooting

### Voice không được nhận

1. Check microphone permission
2. Verify input device selected
3. Check ambient noise level
4. Increase sensitivity

### Agent không respond

1. Check Gateway connected
2. Verify model configured
3. Check network connection

### Poor audio quality

1. Check microphone quality
2. Reduce background noise
3. Move closer to mic
4. Check audio settings

### High latency

1. Use faster STT model
2. Check network speed
3. Use local STT nếu có thể

## Xem thêm

- [Voice Wake](/macos-companion/voice-wake)
- [Voice Overlay](/macos-companion/voice-overlay)
- [Audio & Voice](/nodes-media/audio-voice)
