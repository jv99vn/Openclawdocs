# openclaw sessions

Lệnh `openclaw sessions` hiển thị stored conversation sessions.

## Cú pháp

```bash
openclaw sessions [options]
```

## Ví dụ sử dụng

### List tất cả sessions

```bash
openclaw sessions
```

### Filter active sessions

```bash
openclaw sessions --active 120
```

Parameter `120` đại diện cho duration (phút) để consider session là active.

### JSON output

```bash
openclaw sessions --json
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--active <minutes>` | Filter sessions active trong N phút |
| `--agent <id>` | Filter theo agent |
| `--json` | JSON output |
| `--limit <n>` | Giới hạn số results |

## Output Example

```
Sessions
========

ID          | Agent | Channel  | Last Active | Messages
------------|-------|----------|-------------|----------
abc123      | main  | telegram | 5m ago      | 45
def456      | main  | discord  | 1h ago      | 12
ghi789      | ops   | slack    | 2h ago      | 8
```

## Session Management

### View session details

```bash
openclaw sessions info <session-id>
```

### Export session

```bash
openclaw sessions export <session-id> --output session.json
```

### Delete session

```bash
openclaw sessions delete <session-id>
```

## Xem thêm

- [Agent](/cli/agent)
- [Status](/cli/status)
