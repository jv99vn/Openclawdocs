# openclaw models

Lệnh `openclaw models` discovering, scanning, và configuring LLM models và authentication profiles.

## Cú pháp

```bash
openclaw models <command> [options]
```

## Commands

### Status

```bash
openclaw models status
```

Hiển thị:
- Resolved default model
- Fallbacks
- Authentication overview

### List

```bash
openclaw models list
```

### Set default

```bash
openclaw models set <model-or-alias>
```

### Scan

```bash
openclaw models scan
```

### Auth

```bash
openclaw models auth login <provider>
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--json` | JSON output |
| `--plain` | Plain text output |
| `--check` | Validation (exit codes indicate expiration) |
| `--agent <id>` | Inspect specific agent |
| `--probe` | Live auth probes |
| `--probe-timeout <ms>` | Probe timeout |
| `--probe-concurrency <n>` | Concurrent probes |
| `--probe-max-tokens <n>` | Max tokens for probe |

## Model References

Hệ thống parses model identifiers bằng cách split trên forward slash đầu tiên.

Với models chứa slashes (OpenRouter-style), **phải** include provider prefix:

```bash
# Đúng
openclaw models set openrouter/meta/llama-3-70b

# Sai - thiếu provider
openclaw models set meta/llama-3-70b
```

## Authentication

```bash
# Login với provider
openclaw models auth login anthropic

# Check auth status
openclaw models auth status

# Logout
openclaw models auth logout anthropic
```

Hỗ trợ cả OAuth và API key methods.

## Status Probes

```bash
openclaw models status --probe
```

Live auth probes trên mỗi configured provider profile để verify validity.

## Ví dụ sử dụng

### Set Anthropic Claude

```bash
openclaw models set anthropic/claude-opus-4-5
```

### Set với fallbacks

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

### Check expiration

```bash
openclaw models status --check
# Exit code 0: OK
# Exit code 1: Expiring soon
# Exit code 2: Expired
```

## Output Example

```
Models Status
=============

Default: anthropic/claude-opus-4-5
Fallbacks:
  1. openai/gpt-4o
  2. venice/llama-3.3-70b

Authentication:
  anthropic: ✓ API key (valid)
  openai: ✓ API key (valid)
  venice: ✓ API key (valid)

Available Models:
  anthropic/claude-opus-4-5
  anthropic/claude-sonnet-4
  openai/gpt-4o
  openai/gpt-4o-mini
  ...
```

## Xem thêm

- [Providers](/concepts/providers)
- [Bắt đầu nhanh](/start-here/getting-started)
