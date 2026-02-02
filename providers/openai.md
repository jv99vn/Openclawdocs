# OpenAI

Tích hợp OpenAI GPT models.

## Tổng quan

OpenAI cung cấp GPT family of models:

| Model | Mô tả |
|-------|-------|
| `gpt-4o` | Most capable multimodal |
| `gpt-4o-mini` | Fast, cost-effective |
| `gpt-4-turbo` | Previous generation |
| `o1` | Reasoning model |
| `o1-mini` | Fast reasoning |

## Authentication

### API Key

```json5
{
  providers: {
    openai: {
      apiKey: "sk-...",
    },
  },
}
```

Hoặc via environment:

```bash
export OPENAI_API_KEY="sk-..."
```

### Organization ID (Optional)

```json5
{
  providers: {
    openai: {
      apiKey: "sk-...",
      organizationId: "org-...",
    },
  },
}
```

## Cấu hình Model

### Set Default Model

```bash
openclaw models set openai/gpt-4o
```

### Trong Config

```json5
{
  agents: {
    defaults: {
      model: "openai/gpt-4o",
      fallbacks: [
        "openai/gpt-4o-mini",
      ],
    },
  },
}
```

## Model Aliases

```json5
{
  models: {
    aliases: {
      "gpt": "openai/gpt-4o",
      "gpt-mini": "openai/gpt-4o-mini",
      "o1": "openai/o1",
    },
  },
}
```

## Features

### Supported

- ✅ Streaming responses
- ✅ Tool use (function calling)
- ✅ Vision (gpt-4o, gpt-4-turbo)
- ✅ JSON mode
- ✅ System prompts
- ✅ Multi-turn conversations

### Reasoning Models (o1)

o1 models có behavior khác:

```json5
{
  agents: {
    defaults: {
      // o1 không support system prompts theo cách thông thường
      model: "openai/o1",
    },
  },
}
```

## Token Limits

| Model | Context | Output |
|-------|---------|--------|
| gpt-4o | 128k | 16k |
| gpt-4o-mini | 128k | 16k |
| gpt-4-turbo | 128k | 4k |
| o1 | 200k | 100k |

### Cấu hình limits

```json5
{
  agents: {
    defaults: {
      maxTokens: 4096,
    },
  },
}
```

## Rate Limits

OpenAI có rate limits theo tier:

| Tier | RPM | TPM |
|------|-----|-----|
| Free | 3 | 40k |
| Tier 1 | 500 | 200k |
| Tier 2 | 5000 | 2M |

### Retry Configuration

```json5
{
  providers: {
    openai: {
      retry: {
        maxAttempts: 3,
        initialMs: 1000,
        maxMs: 30000,
      },
    },
  },
}
```

## Azure OpenAI

Sử dụng Azure-hosted OpenAI:

```json5
{
  providers: {
    openai: {
      apiKey: "...",
      baseUrl: "https://your-resource.openai.azure.com",
      apiVersion: "2024-02-01",
      deployment: "your-deployment-name",
    },
  },
}
```

## Troubleshooting

### "Invalid API key"

```bash
# Verify key
openclaw models status --probe

# Re-set key
openclaw config set providers.openai.apiKey "sk-..."
```

### Rate limited

1. Automatic retry với backoff
2. Upgrade tier
3. Use fallback models

### Context length exceeded

```json5
{
  agents: {
    defaults: {
      // Enable compaction
      compaction: {
        enabled: true,
        threshold: 100000,
      },
    },
  },
}
```

## Config Reference

```json5
{
  providers: {
    openai: {
      // Authentication
      apiKey: "sk-...",
      organizationId: "org-...",  // optional

      // API settings
      baseUrl: "https://api.openai.com/v1",

      // Azure settings (nếu dùng Azure)
      apiVersion: "2024-02-01",
      deployment: "...",

      // Retry
      retry: {
        maxAttempts: 3,
        initialMs: 1000,
        maxMs: 30000,
      },

      // Timeout
      timeout: 120000,
    },
  },

  agents: {
    defaults: {
      model: "openai/gpt-4o",
      maxTokens: 4096,
    },
  },
}
```

## Xem thêm

- [Model Providers Overview](/providers/overview)
- [Anthropic](/providers/anthropic)
- [OpenRouter](/providers/openrouter)
