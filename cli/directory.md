# openclaw directory

Lệnh `openclaw directory` thực hiện lookups trên các channels hỗ trợ directory functionality.

## Cú pháp

```bash
openclaw directory <command> [options]
```

## Common Parameters

| Flag | Mô tả |
|------|-------|
| `--channel <name>` | Channel identifier (bắt buộc khi có nhiều config) |
| `--account <id>` | Account cần query |
| `--json` | Structured data cho automation |

## Mục đích chính

Tool này giúp tìm IDs có thể paste vào các commands khác, đặc biệt khi dùng `message send`.

::: info Lưu ý
Kết quả thường từ configured allowlists thay vì live provider directories.
:::

## Commands

### Self profile

```bash
openclaw directory self --channel telegram
```

### Peer listings

```bash
openclaw directory peers --channel slack
openclaw directory peers --channel slack --filter "john"
```

### Group operations

```bash
# List groups
openclaw directory groups --channel discord

# Group members
openclaw directory members --channel discord --group <group-id>
```

## Output Formats

### Default

Identifiers và names tab-separated:

```
C123456789    general
C987654321    random
U111111111    john.doe
```

### JSON (khuyến nghị cho scripting)

```bash
openclaw directory peers --channel slack --json
```

```json
[
  { "id": "U111111111", "name": "john.doe", "type": "user" },
  { "id": "C123456789", "name": "general", "type": "channel" }
]
```

## Channel-Specific ID Patterns

| Platform | Pattern |
|----------|---------|
| WhatsApp | Phone numbers (DM), group codes |
| Telegram | Usernames hoặc numeric IDs |
| Slack | Prefixed codes (user:, channel:) |
| Discord | Numeric IDs |
| Teams | Proprietary format |
| Matrix | @user:server.com |
| Zalo | Plugin-specific |

## Ví dụ workflows

### Tìm user ID để gửi message

```bash
# Tìm user
openclaw directory peers --channel slack --filter "john"

# Gửi message
openclaw message send --channel slack --to user:U111111111 --message "Hello"
```

### List và message tất cả groups

```bash
# Lấy groups
GROUPS=$(openclaw directory groups --channel discord --json)

# Process với jq
echo $GROUPS | jq -r '.[].id' | while read id; do
  openclaw message send --channel discord --to channel:$id --message "Announcement"
done
```

## Xem thêm

- [Channels](/cli/channels)
- [Message](/cli/message)
