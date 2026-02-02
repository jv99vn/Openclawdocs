# Security

Hướng dẫn bảo mật cho OpenClaw deployments.

## Tổng quan

OpenClaw được thiết kế với security in mind:
- Local-first architecture
- Token-based authentication
- Sandboxing support
- Access control lists

## Authentication

### Gateway Token

Khi bind không phải loopback, yêu cầu token:

```json5
{
  gateway: {
    bind: "lan",
    auth: {
      mode: "token",
      token: "${OPENCLAW_GATEWAY_TOKEN}",
    },
  },
}
```

Generate token:

```bash
# Random token
openssl rand -hex 32

# Or use env
export OPENCLAW_GATEWAY_TOKEN=$(openssl rand -hex 32)
```

### Device Pairing

Non-local connections yêu cầu device pairing:

1. Device requests connection
2. Gateway generates pairing code
3. User approves pairing
4. Device receives approval

```bash
# List pending requests
openclaw pairing list

# Approve
openclaw pairing approve <requestId>

# Deny
openclaw pairing deny <requestId>
```

## Access Control

### Channel Access

```json5
{
  channels: {
    whatsapp: {
      dm: {
        policy: "allowlist",
        allowFrom: ["+84901234567"],
      },
      groupPolicy: "allowlist",
      groups: {
        "group-id": {
          enabled: true,
        },
      },
    },
  },
}
```

### DM Policies

| Policy | Risk Level | Use Case |
|--------|------------|----------|
| `disabled` | Lowest | No DMs |
| `allowlist` | Low | Known contacts only |
| `pairing` | Medium | Require approval |
| `open` | Highest | Public bots |

## Tool Security

### Tool Restrictions

```json5
{
  tools: {
    profile: "coding",
    deny: ["browser", "canvas"],
    providers: {
      anthropic: {
        deny: ["exec"],
      },
    },
  },
}
```

### Exec Restrictions

```json5
{
  tools: {
    exec: {
      allowedCommands: ["npm", "git", "node"],
      deniedCommands: ["rm -rf", "sudo", "curl | bash"],
      timeout: 30000,
    },
  },
}
```

## Sandboxing

### Docker Sandbox

```json5
{
  agents: {
    defaults: {
      sandbox: {
        mode: "docker",
        docker: {
          image: "openclaw/sandbox:latest",
          networkMode: "none",
          readOnlyRoot: true,
        },
      },
    },
  },
}
```

### Sandbox Modes

| Mode | Mô tả |
|------|-------|
| `off` | No sandbox (host execution) |
| `docker` | Docker container isolation |
| `non-main` | Sandbox cho non-main sessions |

## Network Security

### Loopback Only (Default)

```json5
{
  gateway: {
    bind: "loopback",  // 127.0.0.1 only
  },
}
```

### Tailscale (Recommended for remote)

```json5
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "...",
    },
  },
}
```

### LAN (Careful)

```json5
{
  gateway: {
    bind: "lan",
    auth: {
      mode: "token",
      token: "...",
    },
  },
}
```

::: danger Cảnh báo
Không expose gateway ra public internet mà không có proper authentication.
:::

## Credential Management

### Secure Storage

Credentials được lưu tại:

```
~/.openclaw/credentials/
├── anthropic/
│   └── auth-profiles.json
├── openai/
│   └── api-key
└── whatsapp/
    └── creds.json
```

### Environment Variables

Ưu tiên env vars cho secrets:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENCLAW_GATEWAY_TOKEN="..."
```

### .env File

```bash
# ~/.openclaw/.env
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
```

::: warning
Không commit `.env` files vào git!
:::

## Secret Scanning

### detect-secrets

```bash
# Install
pip install detect-secrets

# Scan
detect-secrets scan > .secrets.baseline

# Audit
detect-secrets audit .secrets.baseline
```

### CI Integration

```yaml
# .github/workflows/secrets.yml
- name: Scan for secrets
  run: detect-secrets scan --baseline .secrets.baseline
```

## Model Security

### Prompt Injection

::: danger Cảnh báo
Smaller/quantized models dễ bị prompt injection hơn. Giữ chúng tránh xa tool access.
:::

### Recommended Practices

1. Sử dụng latest models (more robust)
2. Limit tool access cho untrusted sources
3. Sandbox execution
4. Monitor logs

## Audit Logging

### Enable Audit Logs

```json5
{
  logging: {
    level: "info",
    auditLog: {
      enabled: true,
      path: "~/.openclaw/logs/audit.log",
      events: ["auth", "command", "tool"],
    },
  },
}
```

### Log Contents

```json
{
  "timestamp": "2024-01-15T10:00:00Z",
  "event": "tool_execution",
  "tool": "exec",
  "command": "npm install",
  "user": "whatsapp:+84901234567",
  "result": "success"
}
```

## Security Checklist

### Deployment

- [ ] Gateway token set
- [ ] Loopback or Tailscale binding
- [ ] Channel allowlists configured
- [ ] Tool restrictions in place
- [ ] Audit logging enabled

### Credentials

- [ ] API keys in env vars
- [ ] .env not in git
- [ ] detect-secrets baseline
- [ ] Credentials rotated regularly

### Monitoring

- [ ] Logs reviewed regularly
- [ ] Failed auth attempts monitored
- [ ] Unusual activity alerts

## Incident Response

### Suspected Compromise

1. Stop gateway immediately:
   ```bash
   openclaw gateway stop
   ```

2. Rotate all credentials

3. Review audit logs:
   ```bash
   openclaw logs --limit 1000 | grep -E "auth|error|denied"
   ```

4. Update allowlists

5. Restart with fresh credentials

## Xem thêm

- [Authentication](/gateway-ops/authentication)
- [Sandboxing](/gateway-ops/sandboxing)
- [Configuration](/gateway-ops/configuration)
- [Troubleshooting](/gateway-ops/troubleshooting)
