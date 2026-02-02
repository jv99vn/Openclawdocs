# Exec Tool

Exec Tool cho phép chạy shell commands trong workspace environment, hỗ trợ cả foreground và background execution modes.

## Tổng quan

- **Shell execution** - Chạy commands trong workspace
- **Foreground/Background** - Hai execution modes
- **Security controls** - Sandbox, approvals, allowlist
- **Multi-host** - Sandbox, Gateway, hoặc Node execution

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `command` | (required) | Shell command to run |
| `workdir` | workspace | Working directory |
| `env` | {} | Environment variables |
| `yieldMs` | 10000 | Auto-background threshold |
| `background` | false | Background mode |
| `timeout` | 1800s | Execution timeout |
| `pty` | false | Pseudo-terminal support |

## Execution Hosts

### Sandbox (Default)

```json5
{
  exec: {
    host: "sandbox",
  },
}
```

Khi sandboxing **disabled**, runs directly trên gateway host:
- Không require approvals
- Không container isolation

::: warning Important
Sandboxing is **off by default**. Nếu sandboxing off, `host=sandbox` chạy directly trên gateway host (no container) và **không require approvals**.
:::

### Gateway

```json5
{
  exec: {
    host: "gateway",
  },
}
```

- Requires explicit approvals (unless configured otherwise)
- Rejects `env.PATH` overrides
- Rejects loader overrides

### Node

```json5
{
  exec: {
    host: "node",
  },
}
```

- Execute trên connected node
- Requires approvals
- Node capabilities determine available commands

## Security Modes

### Deny

Không cho phép exec:

```json5
{
  tools: {
    exec: {
      securityMode: "deny",
    },
  },
}
```

### Allowlist

Chỉ cho phép specific commands:

```json5
{
  tools: {
    exec: {
      securityMode: "allowlist",
      allowlist: [
        "ls",
        "cat",
        "grep",
        "find",
      ],
    },
  },
}
```

### Full

Allow all commands (với approvals nếu configured):

```json5
{
  tools: {
    exec: {
      securityMode: "full",
    },
  },
}
```

## Approval Modes

### Off

Không require approvals:

```json5
{
  tools: {
    exec: {
      approvals: "off",
    },
  },
}
```

### On-Miss

Require approval nếu command không trong allowlist:

```json5
{
  tools: {
    exec: {
      approvals: "on-miss",
      allowlist: ["ls", "cat"],
    },
  },
}
```

### Always

Always require approval:

```json5
{
  tools: {
    exec: {
      approvals: "always",
    },
  },
}
```

## Approvals

Approvals stored trong `~/.openclaw/exec-approvals.json`.

### Approve Command

```bash
# Via CLI
openclaw exec approve <requestId>

# Via Control UI
# Click Approve trong Approvals panel
```

### View Pending

```bash
openclaw exec pending
```

## Background Execution

### Auto-Background

Commands auto-background sau `yieldMs` (default 10s):

```json5
{
  tools: {
    exec: {
      yieldMs: 10000,  // 10 seconds
    },
  },
}
```

### Explicit Background

```json5
{
  command: "npm run build",
  background: true,
}
```

### Session Management

Background sessions tracked via `sessionId`:
- Poll for output
- Send keystrokes
- Paste text

```bash
# Check background session
node.invoke exec.poll --sessionId abc123

# Send key
node.invoke exec.key --sessionId abc123 --key "enter"
```

## Session Overrides

Use `/exec` commands để set per-session defaults:

```
/exec allowlist add npm
/exec timeout 3600
/exec host gateway
```

## apply_patch (Experimental)

Subtool cho structured multi-file edits:

```json5
{
  tools: {
    exec: {
      applyPatch: {
        enabled: true,  // OpenAI models only
      },
    },
  },
}
```

## Configuration

### Full Configuration

```json5
{
  tools: {
    exec: {
      // Host
      host: "sandbox",  // sandbox | gateway | node

      // Security
      securityMode: "allowlist",  // deny | allowlist | full
      allowlist: ["ls", "cat", "grep"],

      // Approvals
      approvals: "on-miss",  // off | on-miss | always
      approvalTimeout: 300,  // seconds

      // Execution
      timeout: 1800,  // seconds
      yieldMs: 10000,  // auto-background threshold

      // Notification
      notifyOnExit: true,

      // PATH
      prependPath: ["/usr/local/bin"],

      // Safe binaries (no approval needed)
      safeBinaries: ["ls", "cat", "echo"],
    },
  },
}
```

## Security Notes

### PATH Rejection

Gateway/Node execution deliberately rejects:
- `env.PATH` overrides
- Environment variable tampering
- Loader overrides (`LD_PRELOAD`, etc.)

Để prevent binary hijacking.

### Sandboxing

Khi sandboxing enabled:
- Commands run trong isolated container
- Limited filesystem access
- Network restrictions possible

## Use Cases

### Build Projects

```
User: Build the project
Agent: [Uses exec: npm run build]
```

### Run Tests

```
User: Run the tests
Agent: [Uses exec: npm test]
```

### System Commands

```
User: Check disk space
Agent: [Uses exec: df -h]
```

## Troubleshooting

### Command denied

1. Check `securityMode` setting
2. Verify command trong allowlist
3. Check approval pending
4. Review exec-approvals.json

### Timeout

1. Increase timeout setting
2. Use background mode
3. Check command hanging

### PATH issues

1. Use full path: `/usr/bin/node`
2. Add to `prependPath` config
3. Verify binary exists

### Approval not received

1. Check Control UI notifications
2. Verify Gateway connected
3. Review approval timeout

## Xem thêm

- [Tools Overview](/tools-skills/tools)
- [Security](/gateway-ops/security)
- [Sandboxing](/gateway-ops/sandboxing)
