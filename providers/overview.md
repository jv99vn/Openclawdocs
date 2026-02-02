# Model Providers

OpenClaw hỗ trợ nhiều LLM providers, cho phép bạn sử dụng model tốt nhất cho từng use case.

## Providers được hỗ trợ

| Provider | Models | Authentication |
|----------|--------|----------------|
| [Anthropic](/providers/anthropic) | Claude Opus, Sonnet, Haiku | API Key, OAuth, Setup Token |
| [OpenAI](/providers/openai) | GPT-4o, GPT-4, o1 | API Key |
| [Amazon Bedrock](/providers/bedrock) | Claude, Titan, Llama | AWS Credentials |
| [Google](/providers/google) | Gemini | API Key, OAuth |
| [MiniMax](/providers/minimax) | abab-series | API Key |
| [OpenRouter](/providers/openrouter) | 100+ models | API Key |
| [Venice AI](/providers/venice) | Privacy-focused | API Key |
| [Ollama](/providers/ollama) | Local models | Local |
| [Groq](/providers/groq) | Fast inference | API Key |
| [Together AI](/providers/together) | Open source models | API Key |

## Quick Start

### 1. Set Provider Credentials

```bash
# Anthropic (khuyến nghị)
openclaw models auth setup-token --provider anthropic

# OpenAI
openclaw config set providers.openai.apiKey "sk-..."

# Hoặc via environment
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
```

### 2. Set Default Model

```bash
openclaw models set anthropic/claude-opus-4-5
```

### 3. Verify

```bash
openclaw models status
```

## Model Reference Format

Models được reference theo format: `provider/model-name`

```
anthropic/claude-opus-4-5
openai/gpt-4o
openrouter/meta/llama-3-70b
```

## Cấu hình

### Default Model

```json5
{
  agents: {
    defaults: {
      model: "anthropic/claude-opus-4-5",
    },
  },
}
```

### Fallbacks

Tự động fallback khi primary model fails:

```json5
{
  agents: {
    defaults: {
      model: "anthropic/claude-opus-4-5",
      fallbacks: [
        "openai/gpt-4o",
        "anthropic/claude-sonnet-4",
      ],
    },
  },
}
```

### Per-Agent Models

```json5
{
  agents: {
    list: {
      "coding-agent": {
        model: "anthropic/claude-opus-4-5",
      },
      "quick-agent": {
        model: "anthropic/claude-haiku-3-5",
      },
    },
  },
}
```

## Model Aliases

Tạo shortcuts cho models:

```json5
{
  models: {
    aliases: {
      "claude": "anthropic/claude-opus-4-5",
      "gpt": "openai/gpt-4o",
      "fast": "anthropic/claude-haiku-3-5",
      "cheap": "openrouter/meta/llama-3-8b",
    },
  },
}
```

Sử dụng:

```
/model claude
/model fast
```

## Model Selection CLI

### List Available Models

```bash
openclaw models list
```

### Scan for Models

```bash
openclaw models scan
```

### Check Status

```bash
openclaw models status
openclaw models status --probe  # Test connections
```

### Switch Model (Runtime)

```
/model anthropic/claude-sonnet-4
/model gpt
```

## Provider Configuration

### Timeout

```json5
{
  providers: {
    anthropic: {
      timeout: 120000,  // 2 minutes
    },
  },
}
```

### Retry Policy

```json5
{
  providers: {
    anthropic: {
      retry: {
        maxAttempts: 3,
        initialMs: 1000,
        maxMs: 30000,
        factor: 2,
        jitter: true,
      },
    },
  },
}
```

### Custom Base URL

```json5
{
  providers: {
    openai: {
      baseUrl: "https://custom-proxy.example.com/v1",
    },
  },
}
```

## Multi-Provider Setup

### Example: Production Setup

```json5
{
  providers: {
    anthropic: {
      apiKey: "${ANTHROPIC_API_KEY}",
    },
    openai: {
      apiKey: "${OPENAI_API_KEY}",
    },
    openrouter: {
      apiKey: "${OPENROUTER_API_KEY}",
    },
  },

  agents: {
    defaults: {
      model: "anthropic/claude-opus-4-5",
      fallbacks: [
        "openai/gpt-4o",
        "openrouter/anthropic/claude-3-opus",
      ],
    },
  },
}
```

## Token Costs

Theo dõi chi phí:

```bash
openclaw usage
openclaw usage --provider anthropic
openclaw usage --since "2024-01-01"
```

### Cost Limits

```json5
{
  agents: {
    defaults: {
      costLimit: {
        daily: 10.00,  // USD
        monthly: 100.00,
      },
    },
  },
}
```

## Privacy-Focused Options

### Venice AI

Không lưu trữ data:

```json5
{
  providers: {
    venice: {
      apiKey: "...",
    },
  },
  agents: {
    defaults: {
      model: "venice/llama-3.3-70b",
    },
  },
}
```

### Local Models (Ollama)

Chạy hoàn toàn local:

```json5
{
  providers: {
    ollama: {
      baseUrl: "http://localhost:11434",
    },
  },
  agents: {
    defaults: {
      model: "ollama/llama3.2",
    },
  },
}
```

## Troubleshooting

### No credentials found

```bash
openclaw models auth login <provider>
# hoặc
openclaw config set providers.<provider>.apiKey "..."
```

### Model not found

```bash
# List available models
openclaw models list --provider anthropic

# Scan for new models
openclaw models scan
```

### Rate limited

- Automatic retry with backoff
- Configure fallback models
- Upgrade provider tier

## Xem thêm

- [Anthropic](/providers/anthropic)
- [OpenAI](/providers/openai)
- [Model Failover](/core-concepts/model-failover)
- [Token Use and Costs](/core-concepts/token-costs)
