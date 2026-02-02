# OpenRouter

OpenRouter cung cấp unified API để truy cập nhiều models qua single endpoint và API key, với OpenAI compatibility.

## Tổng quan

- **Single API key** để truy cập 200+ models
- **OpenAI-compatible** - most SDKs work by switching base URL
- **Unified billing** - một invoice cho tất cả providers
- **Automatic fallbacks** - chuyển sang alternative models khi cần
- **Usage tracking** - detailed analytics

## Thiết lập

### 1. Lấy API Key

1. Truy cập [openrouter.ai](https://openrouter.ai)
2. Đăng ký/đăng nhập
3. Vào Keys → Create new key
4. Copy API key

### 2. Environment Variable

```bash
export OPENROUTER_API_KEY="sk-or-..."
```

### 3. Onboarding

```bash
openclaw onboard --auth-choice apiKey --token-provider openrouter --token "$OPENROUTER_API_KEY"
```

### 4. Verify

```bash
openclaw chat --model openrouter/anthropic/claude-sonnet-4
```

## Model Naming

Format: `openrouter/<provider>/<model>`

Ví dụ:
- `openrouter/anthropic/claude-sonnet-4`
- `openrouter/openai/gpt-4o`
- `openrouter/google/gemini-pro-1.5`
- `openrouter/meta-llama/llama-3.3-70b-instruct`

## Cấu hình

### Cơ bản

```json5
{
  models: {
    providers: {
      openrouter: {
        apiKey: "${OPENROUTER_API_KEY}",
      },
    },
  },
}
```

### Agent với OpenRouter

```json5
{
  agents: {
    defaults: {
      model: "openrouter/anthropic/claude-sonnet-4",
    },
  },
}
```

### Với Site Info (Recommended)

```json5
{
  models: {
    providers: {
      openrouter: {
        apiKey: "${OPENROUTER_API_KEY}",
        siteUrl: "https://your-app.com",
        siteName: "Your App Name",
      },
    },
  },
}
```

## Models phổ biến

### Anthropic

| Model | ID |
|-------|-----|
| Claude Opus 4 | `openrouter/anthropic/claude-opus-4` |
| Claude Sonnet 4 | `openrouter/anthropic/claude-sonnet-4` |
| Claude Haiku 3.5 | `openrouter/anthropic/claude-3.5-haiku` |

### OpenAI

| Model | ID |
|-------|-----|
| GPT-4o | `openrouter/openai/gpt-4o` |
| GPT-4o mini | `openrouter/openai/gpt-4o-mini` |
| o1 | `openrouter/openai/o1` |
| o1-mini | `openrouter/openai/o1-mini` |

### Google

| Model | ID |
|-------|-----|
| Gemini 1.5 Pro | `openrouter/google/gemini-pro-1.5` |
| Gemini 1.5 Flash | `openrouter/google/gemini-flash-1.5` |

### Meta

| Model | ID |
|-------|-----|
| Llama 3.3 70B | `openrouter/meta-llama/llama-3.3-70b-instruct` |
| Llama 3.1 405B | `openrouter/meta-llama/llama-3.1-405b-instruct` |

### Mistral

| Model | ID |
|-------|-----|
| Mistral Large | `openrouter/mistralai/mistral-large` |
| Mixtral 8x22B | `openrouter/mistralai/mixtral-8x22b-instruct` |

## List Models

```bash
# Tất cả models
openclaw models list --provider openrouter

# Filter by capability
openclaw models list --provider openrouter --filter tools
openclaw models list --provider openrouter --filter vision
```

## Tính năng

| Tính năng | Trạng thái |
|-----------|------------|
| Streaming | ✅ |
| Function Calling | ✅ (model-dependent) |
| Vision | ✅ (model-dependent) |
| JSON Mode | ✅ (model-dependent) |

## Automatic Fallbacks

OpenRouter tự động fallback nếu primary model unavailable:

```json5
{
  agents: {
    defaults: {
      model: "openrouter/anthropic/claude-sonnet-4",
      // OpenRouter sẽ tự động fallback nếu Claude unavailable
    },
  },
}
```

## Provider Preferences

Ưu tiên specific providers:

```json5
{
  models: {
    providers: {
      openrouter: {
        apiKey: "${OPENROUTER_API_KEY}",
        providerPreferences: {
          // Prefer specific data regions
          allowedRegions: ["us", "eu"],
          // Require certain features
          requireTermsAccepted: true,
        },
      },
    },
  },
}
```

## Pricing

OpenRouter charge theo usage + small margin. Pricing varies by model.

```bash
# Check pricing
curl https://openrouter.ai/api/v1/models \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

## Rate Limits

- Varies by model và tier
- Free tier có rate limits
- Paid tiers có higher limits
- Check dashboard cho current limits

## Authentication

Bearer token authentication:

```
Authorization: Bearer sk-or-...
```

Compatible với OpenAI SDK:

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});
```

## Troubleshooting

### Invalid API Key

```bash
# Verify key
curl https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

### Model Not Found

1. Check model ID format: `openrouter/<provider>/<model>`
2. Verify model available: https://openrouter.ai/models
3. Some models require special access

### Rate Limited

1. Check usage in dashboard
2. Upgrade tier nếu cần
3. Implement exponential backoff

### Billing Issues

1. Add payment method
2. Check credit balance
3. Set usage limits trong dashboard

## Resources

- **Models Index**: https://docs.openclaw.ai/llms.txt
- **OpenRouter Docs**: https://openrouter.ai/docs
- **Model List**: https://openrouter.ai/models

## Xem thêm

- [Providers Overview](/providers/overview)
- [Anthropic](/providers/anthropic)
- [OpenAI](/providers/openai)
- [Ollama](/providers/ollama)
