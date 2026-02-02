# Ollama

Ollama cho phép chạy các language models mã nguồn mở locally. OpenClaw tích hợp qua Ollama's OpenAI-compatible API với auto-discovery khi credentials được cấu hình.

## Thiết lập nhanh

### 1. Cài đặt Ollama

Tải từ [ollama.ai](https://ollama.ai):

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Tải installer từ ollama.ai
```

### 2. Tải Model

```bash
# Llama 3.3 (khuyến nghị)
ollama pull llama3.3

# Các models khác
ollama pull mistral
ollama pull codellama
ollama pull deepseek-coder
```

### 3. Cấu hình OpenClaw

```bash
export OLLAMA_API_KEY="ollama-local"
```

### 4. Sử dụng

```bash
openclaw chat --model ollama/llama3.3
```

## Auto-Discovery Mode

Khi `OLLAMA_API_KEY` được set mà không có explicit `models.providers.ollama` config, OpenClaw tự động:

1. **Query Ollama instance** tại `http://127.0.0.1:11434`
2. **Filter models** có tool capabilities
3. **Detect reasoning** từ model metadata
4. **Đọc context windows** từ architecture data
5. **Set max tokens** = 10× context window
6. **Assign zero cost** cho tất cả models

## Cấu hình thủ công

Cho non-standard deployments hoặc override auto-discovery:

```json5
{
  models: {
    providers: {
      ollama: {
        baseUrl: "http://192.168.1.100:11434",
        apiKey: "ollama-local",
        models: {
          "llama3.3": {
            contextWindow: 128000,
            maxTokens: 8192,
            capabilities: ["tools", "streaming"],
          },
          "deepseek-coder": {
            contextWindow: 32000,
            maxTokens: 4096,
            capabilities: ["tools", "streaming"],
          },
        },
      },
    },
  },
}
```

## Models phổ biến

| Model | Pull Command | Capabilities |
|-------|--------------|--------------|
| Llama 3.3 70B | `ollama pull llama3.3:70b` | General, Tools |
| Llama 3.3 8B | `ollama pull llama3.3` | General, Tools |
| Mistral | `ollama pull mistral` | General |
| Mixtral | `ollama pull mixtral` | General, MoE |
| CodeLlama | `ollama pull codellama` | Coding |
| DeepSeek Coder | `ollama pull deepseek-coder` | Coding |
| Qwen 2.5 | `ollama pull qwen2.5` | Multilingual |
| Phi-3 | `ollama pull phi3` | Small, Fast |

## Sử dụng trong Agent

```json5
{
  agents: {
    defaults: {
      model: "ollama/llama3.3",
    },
  },
}
```

### Tool-capable Models

Chỉ models với tool support mới được ưu tiên cho agents:

```bash
# List models có tools
openclaw models list --provider ollama --filter tools
```

### Reasoning Models

Models với "thinking" capability được auto-detect:

```json5
{
  agents: {
    defaults: {
      model: "ollama/deepseek-r1",  // Reasoning model
    },
  },
}
```

## Remote Ollama Server

### LAN Access

```json5
{
  models: {
    providers: {
      ollama: {
        baseUrl: "http://192.168.1.100:11434",
        apiKey: "ollama-local",
      },
    },
  },
}
```

### Ollama with Authentication

Nếu Ollama được setup với auth proxy:

```json5
{
  models: {
    providers: {
      ollama: {
        baseUrl: "https://ollama.example.com",
        apiKey: "${OLLAMA_AUTH_TOKEN}",
      },
    },
  },
}
```

## GPU Acceleration

### NVIDIA (CUDA)

```bash
# Ollama tự động detect NVIDIA GPUs
ollama run llama3.3
```

### Apple Silicon

```bash
# Metal acceleration tự động
ollama run llama3.3
```

### AMD (ROCm)

```bash
# Requires ROCm-enabled Ollama build
HSA_OVERRIDE_GFX_VERSION=10.3.0 ollama run llama3.3
```

## Context Window & Memory

### Set Context Size

```bash
# Khi chạy
ollama run llama3.3 --num-ctx 32768

# Trong Modelfile
FROM llama3.3
PARAMETER num_ctx 32768
```

### Memory Requirements

| Model Size | VRAM Required |
|------------|---------------|
| 7B | ~8GB |
| 13B | ~16GB |
| 34B | ~32GB |
| 70B | ~48GB+ |

## Streaming

Ollama hỗ trợ streaming out of the box:

```json5
{
  agents: {
    defaults: {
      model: "ollama/llama3.3",
      streaming: true,  // Default
    },
  },
}
```

## Troubleshooting

### Ollama không chạy

```bash
# Check status
ollama list

# Start service
ollama serve
```

### Cannot connect

```bash
# Verify API
curl http://127.0.0.1:11434/api/tags
```

### Model not found

```bash
# List installed models
ollama list

# Pull nếu chưa có
ollama pull llama3.3
```

### Out of memory

1. Giảm context size
2. Dùng smaller model
3. Enable GPU offloading
4. Tăng swap/pagefile

### Slow inference

1. Ensure GPU được sử dụng
2. Check thermal throttling
3. Reduce batch size
4. Use quantized models (Q4, Q5)

## Quantization

Ollama models thường có nhiều quantization levels:

```bash
# Full precision (slower, better quality)
ollama pull llama3.3:70b-fp16

# 8-bit (good balance)
ollama pull llama3.3:70b-q8_0

# 4-bit (faster, lower quality)
ollama pull llama3.3:70b-q4_0
```

## Custom Models

### Tạo Modelfile

```dockerfile
FROM llama3.3

# Set parameters
PARAMETER temperature 0.7
PARAMETER num_ctx 32768

# System prompt
SYSTEM "You are a helpful coding assistant."
```

### Build và run

```bash
ollama create my-assistant -f Modelfile
ollama run my-assistant
```

## Zero Cost

Tất cả Ollama models có cost = 0 vì chạy locally:

```json5
{
  models: {
    providers: {
      ollama: {
        models: {
          "llama3.3": {
            cost: {
              input: 0,
              output: 0,
            },
          },
        },
      },
    },
  },
}
```

## Xem thêm

- [Providers Overview](/providers/overview)
- [Venice AI](/providers/venice)
- [OpenRouter](/providers/openrouter)
