# Kiểm thử

OpenClaw sử dụng ba bộ Vitest riêng biệt cộng với Docker runners để validate functionality với các mức độ realism tăng dần:

| Cấp độ | Mô tả |
|--------|-------|
| **Unit/Integration** | Local, deterministic tests không yêu cầu credentials |
| **E2E** | Gateway smoke tests với multi-instance behavior |
| **Live** | Real provider và model validation sử dụng API keys thực |

## Quick Start Commands

### Phát triển thông thường

```bash
pnpm build && pnpm check && pnpm test
```

### Khi cần độ tin cậy cao

```bash
pnpm test:coverage
pnpm test:e2e
```

### Debug provider

```bash
pnpm test:live
```

::: warning Yêu cầu credentials hợp lệ
Live tests yêu cầu credentials hợp lệ và sẽ tiêu tốn API quota.
:::

## Chi tiết Test Suite

### Unit/Integration

Chạy pure logic tests và in-process gateway behavior.

- **Files match**: `src/**/*.test.ts`
- **Đặc điểm**: Chạy nhanh trong CI không cần external dependencies

```bash
pnpm test
```

### E2E Tests

Exercise multi-instance gateway operations, WebSocket surfaces, và node pairing.

- **Files match**: `src/**/*.e2e.test.ts`

```bash
pnpm test:e2e
```

### Live Tests

Validate actual provider integration.

- **Files match**: `src/**/*.live.test.ts`
- **Đặc điểm**: Non-deterministic, tiêu tốn API quotas, phát sinh chi phí

```bash
pnpm test:live
```

## Live Testing Layers

### Direct Model Completion

Nằm trong `src/agents/models.profiles.live.test.ts`, layer này xác nhận liệu provider/model có phản hồi với credentials hợp lệ hay không, độc lập với gateway infrastructure.

Enable:

```bash
OPENCLAW_LIVE_MODELS=modern pnpm test:live
```

### Gateway + Agent Pipeline

Nằm trong `src/gateway/gateway-models.profiles.live.test.ts`, validate complete session, history, tooling, và sandbox integration.

Enable:

```bash
pnpm test:live  # default behavior
```

## Tool Probing Strategy

Gateway smoke tests bao gồm ba loại probe:

| Probe | Mô tả |
|-------|-------|
| **Read probe** | Agent writes một nonce file, reads lại, echoes giá trị |
| **Exec+Read probe** | Agent executes command để write nonce, sau đó reads |
| **Image probe** | Generated PNG với text gửi như attachment; model phải extract content |

## Credential Discovery

Live tests tìm credentials giống như CLI:

1. `~/.openclaw/credentials/` cho profile store
2. Environment fallbacks
3. `~/.profile` sourcing

Set `OPENCLAW_LIVE_REQUIRE_PROFILE_KEYS=1` để enforce profile-only authentication.

## Ví dụ Model Selection

### Single model, direct

```bash
OPENCLAW_LIVE_MODELS="openai/gpt-5.2" pnpm test:live
```

### Multi-provider gateway

```bash
OPENCLAW_LIVE_GATEWAY_MODELS="openai/gpt-5.2,anthropic/claude-opus-4-5,google/gemini-3-flash-preview" pnpm test:live
```

## Specialized Live Tests

### Setup Token (Anthropic)

```bash
OPENCLAW_LIVE_SETUP_TOKEN=1 pnpm test:live
```

Validates Claude Code CLI tokens.

### CLI Backend

```bash
OPENCLAW_LIVE_CLI_BACKEND=1 pnpm test:live
```

Tests local CLI như model backend mà không chạm default configuration.

### Deepgram Audio

```bash
DEEPGRAM_API_KEY=... DEEPGRAM_LIVE_TEST=1 pnpm test:live
```

Validates transcription.

## Docker Test Runners

Optional containerized test execution:

| Command | Mô tả |
|---------|-------|
| `pnpm test:docker:live-models` | Direct model validation |
| `pnpm test:docker:live-gateway` | Gateway + agent smoke |
| `pnpm test:docker:onboard` | Interactive onboarding wizard |
| `pnpm test:docker:plugins` | Custom extension loading |

Mount configuration:

```bash
# Config directory
-v /path/to/config:$OPENCLAW_CONFIG_DIR

# Workspace directory
-v /path/to/workspace:$OPENCLAW_WORKSPACE_DIR

# Profile file
-v /path/to/profile:$OPENCLAW_PROFILE_FILE
```

## Regression Testing Approach

### Best Practices

Khi fixing provider issues được phát hiện trong live testing:

1. **Ưu tiên CI-safe regressions** sử dụng mocked providers
2. Nếu inherently live-only (auth policies, rate limits), tạo narrow, environment-gated tests

### Target Test Layer

Target smallest test layer bắt được bug:

| Bug Type | Target Layer |
|----------|--------------|
| Provider conversion bugs | Direct model tests |
| Gateway pipeline bugs | CI-safe mock tests hoặc live gateway smoke |

## Cấu trúc Test Files

```
src/
├── agents/
│   ├── agent.test.ts           # Unit tests
│   └── models.profiles.live.test.ts  # Live model tests
├── gateway/
│   ├── gateway.test.ts         # Unit tests
│   ├── gateway.e2e.test.ts     # E2E tests
│   └── gateway-models.profiles.live.test.ts  # Live gateway tests
└── ...
```

## Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['src/**/*.e2e.test.ts', 'src/**/*.live.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
})
```
