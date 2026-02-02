# Testing

OpenClaw sử dụng ba bộ Vitest riêng biệt cộng với Docker runners để validate functionality.

## Test Suites

| Suite | Mô tả | Files |
|-------|-------|-------|
| **Unit/Integration** | Local, deterministic tests | `src/**/*.test.ts` |
| **E2E** | Gateway smoke tests | `src/**/*.e2e.test.ts` |
| **Live** | Real provider validation | `src/**/*.live.test.ts` |

## Quick Start

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

::: warning Yêu cầu credentials
Live tests yêu cầu credentials hợp lệ và tiêu tốn API quota.
:::

## Unit/Integration Tests

Chạy pure logic tests và in-process gateway behavior.

```bash
pnpm test
```

### Characteristics

- Không cần external dependencies
- Chạy nhanh trong CI
- Deterministic results

### Coverage

```bash
pnpm test:coverage
```

## E2E Tests

Exercise multi-instance gateway operations.

```bash
pnpm test:e2e
```

### Features Tested

- WebSocket surfaces
- Node pairing
- Multi-instance behavior

## Live Tests

Validate actual provider integration.

```bash
pnpm test:live
```

### Features

- Non-deterministic
- Tiêu tốn API quotas
- Phát sinh chi phí

### Live Testing Layers

#### Direct Model Completion

```bash
OPENCLAW_LIVE_MODELS=modern pnpm test:live
```

File: `src/agents/models.profiles.live.test.ts`

#### Gateway + Agent Pipeline

```bash
pnpm test:live  # default
```

File: `src/gateway/gateway-models.profiles.live.test.ts`

## Tool Probing

Gateway smoke tests bao gồm ba probe types:

| Probe | Mô tả |
|-------|-------|
| **Read probe** | Write nonce file, read back, echo value |
| **Exec+Read probe** | Execute command to write nonce, then read |
| **Image probe** | Generated PNG, model must extract content |

## Credential Discovery

Live tests tìm credentials giống CLI:

1. `~/.openclaw/credentials/` cho profile store
2. Environment fallbacks
3. `~/.profile` sourcing

### Enforce Profile Keys

```bash
OPENCLAW_LIVE_REQUIRE_PROFILE_KEYS=1 pnpm test:live
```

## Model Selection

### Single Model

```bash
OPENCLAW_LIVE_MODELS="openai/gpt-4o" pnpm test:live
```

### Multi-provider

```bash
OPENCLAW_LIVE_GATEWAY_MODELS="openai/gpt-4o,anthropic/claude-opus-4-5" pnpm test:live
```

## Specialized Tests

### Anthropic Setup Token

```bash
OPENCLAW_LIVE_SETUP_TOKEN=1 pnpm test:live
```

### CLI Backend

```bash
OPENCLAW_LIVE_CLI_BACKEND=1 pnpm test:live
```

### Deepgram Audio

```bash
DEEPGRAM_API_KEY=... DEEPGRAM_LIVE_TEST=1 pnpm test:live
```

## Docker Runners

| Command | Mô tả |
|---------|-------|
| `pnpm test:docker:live-models` | Direct model validation |
| `pnpm test:docker:live-gateway` | Gateway + agent smoke |
| `pnpm test:docker:onboard` | Interactive onboarding |
| `pnpm test:docker:plugins` | Custom extensions |

### Mount Configuration

```bash
-v /path/to/config:$OPENCLAW_CONFIG_DIR
-v /path/to/workspace:$OPENCLAW_WORKSPACE_DIR
-v /path/to/profile:$OPENCLAW_PROFILE_FILE
```

## Regression Testing

### Best Practices

1. **Ưu tiên CI-safe regressions** với mocked providers
2. Nếu inherently live-only, tạo narrow, environment-gated tests

### Target Layer

| Bug Type | Target Layer |
|----------|--------------|
| Provider conversion | Direct model tests |
| Gateway pipeline | CI-safe mock tests |

## Test Structure

```
src/
├── agents/
│   ├── agent.test.ts
│   └── models.profiles.live.test.ts
├── gateway/
│   ├── gateway.test.ts
│   ├── gateway.e2e.test.ts
│   └── gateway-models.profiles.live.test.ts
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
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest'

describe('myFunction', () => {
  it('should return expected value', () => {
    expect(myFunction('input')).toBe('output')
  })
})
```

### E2E Test Example

```typescript
import { describe, it, expect } from 'vitest'

describe('Gateway E2E', () => {
  it('should handle multiple connections', async () => {
    // Setup
    const gateway = await startGateway()

    // Test
    const client1 = await connectClient()
    const client2 = await connectClient()

    // Assert
    expect(gateway.connections).toBe(2)

    // Cleanup
    await gateway.stop()
  })
})
```

## Xem thêm

- [Scripts](/reference-templates/scripts)
- [CI/CD Configuration](/reference-templates/ci-cd)
