# Venice AI

Venice AI cung cấp inference ưu tiên quyền riêng tư với hai chế độ riêng biệt. Nền tảng cho phép truy cập cả models mã nguồn mở với quyền riêng tư đầy đủ và models độc quyền qua anonymized proxies.

## Privacy Modes

### Private Mode

Prompts và responses **không bao giờ được lưu trữ hoặc log**. Hoàn toàn ephemeral.

**Models khả dụng:**
- Llama 3.3 70B
- Qwen variants (đến 262k context)
- DeepSeek V3.2
- Venice Uncensored

### Anonymized Mode

Requests được proxy qua Venice với metadata bị strip, cho phép truy cập:
- Claude (Opus, Sonnet)
- GPT-5.2 variants
- Gemini 3 Pro/Flash
- Grok 4.1
- Kimi, MiniMax

## Thiết lập

### 1. Lấy API Key

1. Truy cập [venice.ai](https://venice.ai)
2. Đăng ký/đăng nhập
3. Vào Settings → API
4. Tạo API key mới

### 2. Cấu hình

**Environment Variable:**

```bash
export VENICE_API_KEY="your-api-key"
```

**Interactive Onboarding:**

```bash
openclaw onboard
# Chọn Venice AI khi được hỏi provider
```

**Non-interactive:**

```bash
openclaw configure --provider venice --api-key "$VENICE_API_KEY"
```

### 3. Verify

```bash
openclaw chat --model venice/llama-3.3-70b
```

## Models khả dụng

### Private Models (15 models)

| Model | Context | Tính năng |
|-------|---------|-----------|
| `venice/llama-3.3-70b` | 128k | General purpose |
| `venice/qwen2.5-72b` | 128k | Multilingual |
| `venice/qwen2.5-coder-32b` | 128k | Coding |
| `venice/qwen-qwq-32b` | 262k | Extended context |
| `venice/deepseek-v3.2` | 128k | Reasoning |
| `venice/venice-uncensored-70b` | 128k | Uncensored |

### Anonymized Models (10 models)

| Model | Context | Ghi chú |
|-------|---------|---------|
| `venice/claude-opus` | 200k | Qua proxy |
| `venice/claude-sonnet` | 200k | Qua proxy |
| `venice/gpt-5.2` | 128k | Qua proxy |
| `venice/gpt-5.2-mini` | 128k | Qua proxy |
| `venice/gemini-3-pro` | 262k | Qua proxy |
| `venice/gemini-3-flash` | 262k | Qua proxy |
| `venice/grok-4.1` | 128k | Qua proxy |

## Tính năng hỗ trợ

| Tính năng | Trạng thái | Ghi chú |
|-----------|------------|---------|
| Streaming | ✅ | Tất cả models |
| Function Calling | ⚠️ | Select models |
| Vision | ⚠️ | Select models |
| JSON Mode | ✅ | Via response_format |
| Rate Limits | ❌ | Fair-use throttling |

## Cấu hình

### Cơ bản

```json5
{
  models: {
    providers: {
      venice: {
        apiKey: "${VENICE_API_KEY}",
      },
    },
  },
}
```

### Custom Base URL

```json5
{
  models: {
    providers: {
      venice: {
        apiKey: "${VENICE_API_KEY}",
        baseUrl: "https://api.venice.ai/api/v1",
      },
    },
  },
}
```

### Agent với Venice model

```json5
{
  agents: {
    defaults: {
      model: "venice/llama-3.3-70b",
    },
  },
}
```

## Model Discovery

Models được discover tự động qua Venice API. Nếu API không khả dụng, static fallback catalog được sử dụng.

```bash
# List available models
openclaw models list --provider venice
```

## Ví dụ sử dụng

### Chat với Private Model

```bash
openclaw chat --model venice/llama-3.3-70b "Explain quantum computing"
```

### Chat với Anonymized Model

```bash
openclaw chat --model venice/claude-sonnet "Write a poem about privacy"
```

### Trong Agent Config

```json5
{
  agents: {
    defaults: {
      model: "venice/deepseek-v3.2",
      temperature: 0.7,
    },
  },
}
```

## Privacy Considerations

### Private Mode

- Zero data retention
- Không có logging
- Ephemeral processing
- Tốt cho sensitive data

### Anonymized Mode

- Requests được anonymize
- Metadata bị strip
- Vẫn có thể bị underlying provider log
- Không nên dùng cho highly sensitive data

## Pricing

Venice AI sử dụng credit-based pricing. Xem [venice.ai/pricing](https://venice.ai/pricing) để biết chi tiết.

::: info No Hard Rate Limits
Venice không áp dụng hard rate limits, nhưng fair-use throttling có thể được áp dụng.
:::

## Troubleshooting

### API Key Invalid

```bash
# Verify key
curl -H "Authorization: Bearer $VENICE_API_KEY" \
  "https://api.venice.ai/api/v1/models"
```

### Model Not Found

1. Check model name chính xác
2. Verify model khả dụng trong region của bạn
3. Run `openclaw models list --provider venice`

### Rate Limiting

- Venice sử dụng fair-use throttling
- Nếu bị throttle, giảm request frequency
- Consider upgrading plan

## Xem thêm

- [Providers Overview](/providers/overview)
- [OpenAI](/providers/openai)
- [Anthropic](/providers/anthropic)
- [Ollama](/providers/ollama)
