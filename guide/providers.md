# Nhà cung cấp Model

OpenClaw hỗ trợ nhiều nhà cung cấp LLM. Người dùng xác thực với nhà cung cấp đã chọn và cấu hình model mặc định sử dụng định dạng `provider/model`.

## Nhà cung cấp được đề xuất

### Venice AI

**Venice AI** được highlight là tùy chọn khuyến nghị cho "privacy-first inference với tùy chọn sử dụng Opus cho các tác vụ khó".

- **Model mặc định**: `venice/llama-3.3-70b`
- **Hiệu suất tốt nhất**: `venice/claude-opus-45`

## Các bước thiết lập

### 1. Xác thực qua provider

```bash
openclaw onboard
```

Wizard sẽ hướng dẫn bạn qua quá trình xác thực.

### 2. Cấu hình model mặc định

Trong `~/.openclaw/openclaw.json`:

```json
{
  "model": {
    "default": "anthropic/claude-opus-4-5"
  }
}
```

Hoặc qua CLI:

```bash
openclaw config set model.default anthropic/claude-opus-4-5
```

## Danh sách nhà cung cấp được hỗ trợ

| Nhà cung cấp | Model tiêu biểu | Ghi chú |
|--------------|-----------------|---------|
| **Anthropic** | claude-opus-4-5, claude-sonnet-4 | API chính thức |
| **OpenAI** | gpt-5.2, gpt-4o | API chính thức |
| **Venice AI** | llama-3.3-70b | Privacy-first |
| **OpenRouter** | Nhiều models | Aggregator |
| **Vercel AI Gateway** | Nhiều models | Edge hosting |
| **Google** | gemini-3-flash | Vertex AI |
| **Amazon Bedrock** | claude, llama | AWS hosting |
| **Qwen** | qwen-2.5 | Alibaba Cloud |
| **Moonshot AI** | moonshot-v1 | Chinese provider |
| **Ollama** | Local models | Self-hosted |

### Danh sách đầy đủ (19+ providers)

- Anthropic
- OpenAI
- Venice AI
- Qwen
- OpenRouter
- Vercel AI Gateway
- Moonshot AI
- Amazon Bedrock
- Google Vertex AI
- Azure OpenAI
- Groq
- Together AI
- Fireworks AI
- Replicate
- Ollama (local)
- LM Studio
- Mistral AI
- Cohere
- AI21 Labs

## Dịch vụ bổ sung

### Transcription với Deepgram

Deepgram cung cấp khả năng transcription âm thanh:

```json
{
  "transcription": {
    "provider": "deepgram",
    "apiKey": "your-deepgram-key"
  }
}
```

### Claude Max API Proxy

Công cụ cộng đồng cho phép sử dụng subscription Claude như endpoint tương thích OpenAI:

```bash
# Cài đặt
npm install -g claude-max-proxy

# Chạy
claude-max-proxy --port 8080
```

## Cấu hình nâng cao

### Fallback Models

Cấu hình models fallback khi model chính không khả dụng:

```json
{
  "model": {
    "default": "anthropic/claude-opus-4-5",
    "fallback": [
      "openai/gpt-4o",
      "venice/llama-3.3-70b"
    ]
  }
}
```

### Capability Scanning

Quét khả năng của các models đã cấu hình:

```bash
openclaw models scan
```

### Profile Authentication

Quản lý nhiều authentication profiles:

```bash
# Liệt kê profiles
openclaw models profiles

# Thêm profile mới
openclaw models auth add anthropic

# Chuyển profile
openclaw models auth use openai
```

## Cấu hình Provider cụ thể

### Anthropic

```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-xxx",
      "baseUrl": "https://api.anthropic.com"
    }
  }
}
```

### OpenAI

```json
{
  "providers": {
    "openai": {
      "apiKey": "sk-xxx",
      "organization": "org-xxx"
    }
  }
}
```

### Ollama (Local)

```json
{
  "providers": {
    "ollama": {
      "baseUrl": "http://localhost:11434"
    }
  }
}
```
