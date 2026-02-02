# System Prompt

OpenClaw xây dựng một system prompt cá nhân hóa cho mỗi agent execution, được sở hữu bởi OpenClaw thay vì sử dụng default prompts.

## Cấu trúc Prompt

System prompt duy trì thiết kế compact với các sections cố định sau:

| Section | Mô tả |
|---------|-------|
| **Tooling** | Current tools và brief descriptions |
| **Safety** | Guardrail reminders chống power-seeking hoặc oversight bypass |
| **Skills** (optional) | Instructions cho loading skill files on demand |
| **OpenClaw Self-Update** | Guidance về running `config.apply` và `update.run` |
| **Workspace** | Working directory reference từ `agents.defaults.workspace` |
| **Documentation** | Local docs path và usage guidance |
| **Workspace Files** | Bootstrap files included bên dưới |
| **Sandbox** (conditional) | Runtime sandbox info và elevated exec availability |
| **Current Date & Time** | User timezone và format settings |
| **Reply Tags** | Optional syntax cho supported providers |
| **Heartbeats** | Prompt và acknowledgment behavior |
| **Runtime** | Host, OS, Node version, model, repo root, thinking level |
| **Reasoning** | Visibility level và toggle hints |

## Safety Guardrails

Safety guardrails hoạt động như guidance thay vì enforcement. Hard controls sử dụng:
- Tool policy
- Exec approvals
- Sandboxing
- Allowlists

## Prompt Rendering Modes

Ba options `promptMode`:

### Full (default)

Tất cả sections được included.

### Minimal

Cho sub-agents. Excludes:
- Skills
- Memory Recall
- Self-Update
- Model Aliases
- User Identity
- Reply Tags
- Messaging
- Silent Replies
- Heartbeats

### None

Chỉ base identity line.

## Bootstrap File Injection

Trimmed bootstrap files xuất hiện dưới "Project Context":

| File | Mô tả |
|------|-------|
| `AGENTS.md` | Agent definitions |
| `SOUL.md` | Personality và behavior |
| `TOOLS.md` | Custom tool instructions |
| `IDENTITY.md` | Identity information |
| `USER.md` | User preferences |
| `HEARTBEAT.md` | Heartbeat behavior |
| `BOOTSTRAP.md` | Chỉ cho new workspaces |

### Max File Size

Default: 20,000 characters qua `agents.defaults.bootstrapMaxChars`.

Large files được truncated với markers.

## Time Handling

Prompt includes timezone information only (không phải dynamic clock) cho cache stability.

### Cấu hình

```json5
{
  agents: {
    defaults: {
      userTimezone: "Asia/Ho_Chi_Minh",
      timeFormat: "24",  // auto | 12 | 24
    },
  },
}
```

### Current Time

Sử dụng `session_status` tool cho current time queries.

## Skills Integration

Eligible skills xuất hiện trong injected XML list hiển thị:
- Name
- Description
- File location

Điều này cho phép models load `SKILL.md` files khi cần mà không bloating base prompt.

### Ví dụ Skills Section

```xml
<skills>
  <skill name="coding" description="Advanced coding assistance" file="skills/coding/SKILL.md" />
  <skill name="writing" description="Writing and editing help" file="skills/writing/SKILL.md" />
</skills>
```

## Documentation References

Documentation section directs tới:
- Local OpenClaw docs
- Public mirror
- Source repo
- Discord community
- ClawHub cho skill discovery

## Customization

### Custom System Prompt Additions

```json5
{
  agents: {
    defaults: {
      systemPromptAdditions: "Always respond in Vietnamese.",
    },
  },
}
```

### Per-Agent Customization

```json5
{
  agents: {
    list: {
      "my-agent": {
        systemPromptAdditions: "You are a coding expert.",
        promptMode: "full",
      },
    },
  },
}
```

## Prompt Variables

Available variables trong system prompt:

| Variable | Mô tả |
|----------|-------|
| `{workspace}` | Current workspace path |
| `{agent}` | Agent ID |
| `{model}` | Current model |
| `{timezone}` | User timezone |
| `{date}` | Current date |

## Debug Prompt

Xem generated system prompt:

```bash
openclaw agent prompt --agent <id>
```

## Best Practices

### Giữ Bootstrap Files nhỏ

- Tập trung vào essential information
- Sử dụng concise language
- Avoid redundancy

### Sử dụng Skills cho specialized knowledge

Thay vì bloating system prompt, tạo skills cho:
- Domain-specific knowledge
- Workflow instructions
- Tool usage patterns

### Customize per-agent khi cần

Mỗi agent có thể có different:
- Prompt mode
- Bootstrap files
- System prompt additions

## Xem thêm

- [Agent Runtime](/core-concepts/agent-runtime)
- [Skills](/tools-skills/skills)
- [Configuration](/gateway-ops/configuration)
- [SOUL.md](/reference-templates/soul)
