# Nhà cung cấp Model (Providers)

## Tổng quan

OpenClaw hỗ trợ nhiều LLM providers. Users authenticate với provider và configure default model theo format `provider/model`.

## Provider được khuyến nghị

::: tip Venice AI
**Venice AI** được highlight như recommended setup, cung cấp "privacy-first inference với option sử dụng Opus cho hard tasks."

- Default model suggestion: `venice/llama-3.3-70b`
- Superior performance: `venice/claude-opus-45`
:::

## Setup Process

### Bước 1: Authenticate

```bash
openclaw onboard
# hoặc
openclaw models auth login <provider>
```

### Bước 2: Configure default model

```json5
{
  "agents": {
    "defaults": {
      "model": "anthropic/claude-opus-4-5"
    }
  }
}
```

## Các Provider có sẵn

### Tier 1 (Khuyến nghị)

| Provider | Models | Ghi chú |
|----------|--------|---------|
| **Anthropic** | Claude Opus, Sonnet | API key recommended |
| **OpenAI** | GPT-4o, GPT-4o-mini | |
| **Venice AI** | Llama, Claude proxy | Privacy-first |

### Tier 2

| Provider | Models |
|----------|--------|
| OpenRouter | Multi-provider access |
| Qwen | Alibaba models |

### International

| Provider | Region |
|----------|--------|
| Moonshot | China |
| Xiaomi | China |
| GLM | China |
| MiniMax | China |

### Local

| Provider | Mô tả |
|----------|-------|
| **Ollama** | Local model deployment |

### Specialized

| Provider | Mô tả |
|----------|-------|
| **Deepgram** | Audio transcription |

## Cấu hình Provider

### Anthropic

```json5
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-..."
    }
  }
}
```

Hoặc environment variable:
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

### OpenAI

```json5
{
  "providers": {
    "openai": {
      "apiKey": "sk-..."
    }
  }
}
```

### Venice AI

```json5
{
  "providers": {
    "venice": {
      "apiKey": "..."
    }
  }
}
```

### Ollama (Local)

```json5
{
  "providers": {
    "ollama": {
      "baseUrl": "http://localhost:11434"
    }
  }
}
```

## Model Fallbacks

```json5
{
  "agents": {
    "defaults": {
      "model": "anthropic/claude-opus-4-5",
      "fallbacks": [
        "openai/gpt-4o",
        "venice/llama-3.3-70b"
      ]
    }
  }
}
```

## Chuyển Model giữa Sessions

Sử dụng `/model` command:

```
/model openai/gpt-4o
```

Hoặc qua CLI:

```bash
openclaw models set openai/gpt-4o
```

## Kiểm tra Provider Status

```bash
# Status overview
openclaw models status

# With live probes
openclaw models status --probe

# List available models
openclaw models list
```

## Authentication Methods

| Method | Mô tả |
|--------|-------|
| **API Key** | Recommended cho Anthropic |
| **OAuth** | Supported cho một số providers |
| **Environment** | Via environment variables |

### OAuth Flow

```bash
openclaw models auth login anthropic
```

### API Key

```bash
openclaw configure --section models
```

## Xem thêm

- [Models CLI](/cli/models)
- [Bắt đầu nhanh](/start-here/getting-started)
- [FAQ](/help/faq)
