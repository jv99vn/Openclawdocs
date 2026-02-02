# openclaw agent

Lệnh `openclaw agent` thực thi agent operation thông qua Gateway.

## Cú pháp

```bash
openclaw agent [options] <message>
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--local` | Chạy locally thay vì qua Gateway |
| `--agent <id>` | Target specific agent |
| `--session <id>` | Sử dụng session ID cụ thể |
| `--thinking <level>` | Thinking level (low, medium, high) |
| `--deliver-to <target>` | Delivery destination |
| `--respond-to <channel>` | Response routing |

## Ví dụ sử dụng

### Phone-based agent interaction

```bash
openclaw agent --deliver-to +1234567890 "What's the weather?"
```

### Named agent operations

```bash
openclaw agent --agent ops "Deploy to production"
```

### Session-based queries

```bash
openclaw agent --session abc123 --thinking medium "Continue our discussion"
```

### Multi-channel responses

```bash
openclaw agent --respond-to slack:general "Summarize today's activity"
```

## Local execution

Sử dụng `--local` để chạy agent locally mà không qua Gateway:

```bash
openclaw agent --local "What time is it?"
```

## Agent targeting

Target specific agent với `--agent`:

```bash
openclaw agent --agent research "Find papers about AI"
```

## Thinking levels

| Level | Mô tả |
|-------|-------|
| `low` | Quick responses |
| `medium` | Balanced |
| `high` | Deep thinking |

```bash
openclaw agent --thinking high "Analyze this complex problem"
```

## Xem thêm

- [Agents](/cli/agents)
- [Sessions](/cli/sessions)
- [Agent Tool](/concepts/tools)
