# Anthropic

Tích hợp Anthropic Claude models - provider mặc định và được khuyến nghị cho OpenClaw.

## Tổng quan

Anthropic cung cấp Claude family of models, bao gồm:

| Model | Mô tả |
|-------|-------|
| `claude-opus-4-5` | Most capable, best for complex tasks |
| `claude-sonnet-4` | Balanced performance and speed |
| `claude-haiku-3-5` | Fast, efficient for simple tasks |

## Authentication

### Option 1: API Key

```json5
{
  providers: {
    anthropic: {
      apiKey: "sk-ant-...",
    },
  },
}
```

Hoặc via environment:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Option 2: Claude Code Setup Token (Khuyến nghị)

Cho Claude subscription users:

```bash
openclaw models auth setup-token --provider anthropic
```

Paste setup token khi prompted.

### Option 3: OAuth

```bash
openclaw models auth login anthropic
```

Follow browser flow để authorize.

## Cấu hình Model

### Set Default Model

```bash
openclaw models set anthropic/claude-opus-4-5
```

### Trong Config

```json5
{
  agents: {
    defaults: {
      model: "anthropic/claude-opus-4-5",
      fallbacks: [
        "anthropic/claude-sonnet-4",
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
      "claude": "anthropic/claude-opus-4-5",
      "sonnet": "anthropic/claude-sonnet-4",
      "haiku": "anthropic/claude-haiku-3-5",
    },
  },
}
```

Sử dụng:

```
/model claude
```

## Features

### Supported

- ✅ Streaming responses
- ✅ Tool use (function calling)
- ✅ Vision (image analysis)
- ✅ Extended context (200k tokens)
- ✅ System prompts
- ✅ Multi-turn conversations

### Thinking/Reasoning

Claude models hỗ trợ extended thinking:

```json5
{
  agents: {
    defaults: {
      thinkingLevel: "high",  // off | low | medium | high
    },
  },
}
```

## Token Limits

| Model | Context | Output |
|-------|---------|--------|
| claude-opus-4-5 | 200k | 8k |
| claude-sonnet-4 | 200k | 8k |
| claude-haiku-3-5 | 200k | 4k |

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

Anthropic có rate limits theo tier:

| Tier | Requests/min | Tokens/min |
|------|--------------|------------|
| Free | 5 | 20k |
| Build | 50 | 100k |
| Scale | 1000 | 400k |

### Retry Configuration

```json5
{
  providers: {
    anthropic: {
      retry: {
        maxAttempts: 3,
        initialMs: 1000,
        maxMs: 30000,
        factor: 2,
      },
    },
  },
}
```

## Troubleshooting

### "No API key found for provider anthropic"

```bash
# Check auth status
openclaw models status

# Re-authenticate
openclaw models auth setup-token --provider anthropic
```

### "OAuth token refresh failed"

```bash
# Use setup-token instead
openclaw models auth setup-token --provider anthropic
```

### Rate limited

1. Wait và retry automatically
2. Upgrade API tier
3. Use fallback models

## Config Reference

```json5
{
  providers: {
    anthropic: {
      // Authentication (một trong các options)
      apiKey: "sk-ant-...",

      // API settings
      baseUrl: "https://api.anthropic.com",
      version: "2024-01-01",

      // Retry
      retry: {
        maxAttempts: 3,
        initialMs: 1000,
        maxMs: 30000,
      },

      // Rate limit handling
      rateLimitRetry: true,

      // Timeout
      timeout: 120000,
    },
  },

  agents: {
    defaults: {
      model: "anthropic/claude-opus-4-5",
      maxTokens: 4096,
      thinkingLevel: "medium",
    },
  },
}
```

## Xem thêm

- [Model Providers Overview](/providers/overview)
- [OpenAI](/providers/openai)
- [Model Failover](/core-concepts/model-failover)
- [Token Use and Costs](/core-concepts/token-costs)
