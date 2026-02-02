# Audio & Voice

OpenClaw xử lý audio transcription với fallback logic và integration với nhiều providers.

## Tổng quan

- **Audio processing** - Download và transcribe audio attachments
- **Fallback logic** - Thử multiple models nếu fail
- **Command integration** - Transcript available cho slash commands
- **Auto-detection** - Tự động detect available transcription tools

## Core Features

### Audio Processing

System:
1. Locate first audio attachment (local path hoặc URL)
2. Download nếu cần
3. Enforce size limits trước model submission
4. Transcribe với configured model

### Fallback Logic

Nếu transcription fail hoặc timeout với một model, system thử next entry trong configuration.

### Command Integration

Sau transcription thành công:
- `CommandBody/RawBody` được set thành transcript
- Slash commands vẫn hoạt động
- Transcript available as `{{Transcript}}` trong templates

## Auto-Detection

Khi không có models explicitly configured, OpenClaw detect theo priority:

1. **Local CLI tools:**
   - `sherpa-onnx-offline`
   - `whisper-cli`
   - `whisper`
2. **Gemini CLI**
3. **Provider APIs:**
   - OpenAI
   - Groq
   - Deepgram
   - Google

### Disable Auto-Detection

```json5
{
  tools: {
    media: {
      audio: {
        enabled: false,
      },
    },
  },
}
```

## Configuration

### Provider + CLI Fallback

```json5
{
  tools: {
    media: {
      audio: {
        models: [
          {
            provider: "openai",
            model: "gpt-4o-mini-transcribe",
          },
          {
            type: "cli",
            command: "whisper --model small",
          },
        ],
      },
    },
  },
}
```

### Provider-Only with Scope Gating

```json5
{
  tools: {
    media: {
      audio: {
        models: [
          {
            provider: "openai",
            model: "gpt-4o-mini-transcribe",
            scopes: ["dm"],  // Chỉ trong DMs, không groups
          },
        ],
      },
    },
  },
}
```

### Deepgram Provider

```json5
{
  tools: {
    media: {
      audio: {
        models: [
          {
            provider: "deepgram",
            model: "nova-2",
          },
        ],
      },
    },
  },
}
```

## Constraints

| Setting | Default | Description |
|---------|---------|-------------|
| Size limit | 20MB | Max audio file size |
| CLI output | 5MB | Max CLI output |
| Timeout | 60s | Transcription timeout |

### Configuration

```json5
{
  tools: {
    media: {
      audio: {
        maxSizeMb: 20,
        timeoutMs: 60000,
      },
    },
  },
}
```

## Providers

### OpenAI

```json5
{
  provider: "openai",
  model: "gpt-4o-mini-transcribe",  // Default
}
```

### Groq

```json5
{
  provider: "groq",
  model: "whisper-large-v3",
}
```

### Deepgram

```json5
{
  provider: "deepgram",
  model: "nova-2",
}
```

### Google

```json5
{
  provider: "google",
  model: "gemini-1.5-flash",
}
```

## CLI Tools

### Whisper

```json5
{
  type: "cli",
  command: "whisper --model small --output_format txt",
}
```

### Sherpa ONNX

```json5
{
  type: "cli",
  command: "sherpa-onnx-offline --model=/path/to/model",
}
```

### Requirements

- CLI command phải exit với code 0
- Output plain text transcript
- Stderr ignored

## Templates

### Using Transcript

```json5
{
  agents: {
    defaults: {
      systemPrompt: "Transcript: {{Transcript}}",
    },
  },
}
```

## Scope Rules

Scope rules use **first-match logic**:

```json5
{
  models: [
    {
      provider: "openai",
      scopes: ["dm"],  // Only DMs
    },
    {
      provider: "groq",
      scopes: ["group"],  // Only groups
    },
  ],
}
```

## Gotchas

### Timeout Balance

Timeouts cần balanced - quá ngắn sẽ fail legitimate transcriptions, quá dài sẽ block reply queues.

### CLI Exit Codes

CLI commands phải exit với code 0. Non-zero exit = failure.

### Scope First-Match

First matching scope rule wins. Order matters!

## Use Cases

### Voice Messages

```
User: [Sends voice message]
Agent: [Transcribes và responds to content]
```

### Audio Notes

```
User: [Sends audio file]
Agent: [Transcribes và summarizes]
```

### Podcast Summary

```
User: Summarize this podcast
Agent: [Downloads, transcribes, summarizes]
```

## Troubleshooting

### Transcription fails

1. Check file size < 20MB
2. Verify provider API key
3. Check network connectivity
4. Try different provider/model

### Wrong language

1. Specify language trong config:
   ```json5
   { model: "whisper-large-v3", language: "vi" }
   ```
2. Use language-specific model

### Slow transcription

1. Use faster model (small vs large)
2. Increase timeout
3. Use local CLI tool
4. Check network latency

### CLI not found

1. Verify tool installed: `which whisper`
2. Check PATH trong Gateway environment
3. Use full path trong command

## Xem thêm

- [Nodes Overview](/nodes-media/nodes)
- [Camera Capture](/nodes-media/camera)
- [Voice Wake](/nodes-media/voice-wake)
