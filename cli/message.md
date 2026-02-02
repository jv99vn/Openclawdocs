# openclaw message

Lệnh `openclaw message` gửi messages và channel actions trên nhiều platforms.

## Cú pháp

```bash
openclaw message <action> [options]
```

## Platforms được hỗ trợ

- Discord
- Slack
- Telegram
- WhatsApp
- Signal
- Google Chat
- Mattermost
- iMessage
- MS Teams

## Channel Selection

```bash
openclaw message send --channel telegram --to @username --message "Hello"
```

Flag `--channel` là **bắt buộc** khi có nhiều channels được cấu hình.

## Target Formats

| Platform | Format |
|----------|--------|
| Discord | `channel:<id>` hoặc `user:<id>` |
| Slack | `channel:<id>` hoặc `user:<id>` |
| Telegram | Chat ID hoặc username |
| WhatsApp | E.164 phone number hoặc group JID |

## Message Operations

### Send

```bash
# Text message
openclaw message send --channel telegram --to @user --message "Hello"

# With media
openclaw message send --channel telegram --to @user --message "Check this" --media /path/to/image.jpg

# Reply
openclaw message send --channel slack --to channel:C123 --message "Reply" --reply-to msg123
```

### Edit (Discord, Slack only)

```bash
openclaw message edit --channel discord --message-id 123 --message "Updated text"
```

### Delete (Discord, Slack only)

```bash
openclaw message delete --channel discord --message-id 123
```

## Engagement Features

### Polls

```bash
# Discord
openclaw message poll --channel discord --to channel:123 --question "Vote?" --options "Yes" --options "No"

# WhatsApp
openclaw message poll --channel whatsapp --to +1234567890 --question "Vote?" --options "A,B,C"
```

### Reactions

```bash
openclaw message react --channel discord --message-id 123 --emoji "👍"
```

### Pin/Unpin

```bash
openclaw message pin --channel slack --message-id 123
openclaw message unpin --channel slack --message-id 123
```

## Content Management

### Read messages

```bash
openclaw message read --channel discord --from channel:123 --limit 10 --before 2024-01-01
```

### Threads (Discord)

```bash
openclaw message thread create --channel discord --message-id 123 --name "Discussion"
```

## Moderation Tools (Discord)

### Timeout

```bash
openclaw message timeout --channel discord --user 456 --duration 60 --reason "Rule violation"
```

### Kick

```bash
openclaw message kick --channel discord --user 456 --reason "Spam"
```

### Ban

```bash
openclaw message ban --channel discord --user 456 --reason "Violation"
```

## Broadcast

```bash
openclaw message broadcast --channel telegram --targets @user1 --targets @user2 --message "Announcement"
```

## Xem thêm

- [Kênh trò chuyện](/concepts/channels)
- [Message Tool](/concepts/tools)
