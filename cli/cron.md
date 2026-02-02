# cron

Lệnh `openclaw cron` quản lý cron jobs trong Gateway scheduler system.

## Cú pháp

```bash
openclaw cron <command> [options]
```

## Commands

### list

Liệt kê tất cả cron jobs:

```bash
openclaw cron list
```

### add

Thêm cron job mới:

```bash
openclaw cron add --schedule "0 9 * * *" --message "Good morning!"
```

### update

Cập nhật cron job:

```bash
openclaw cron update <job-id> [options]
```

### remove

Xóa cron job:

```bash
openclaw cron remove <job-id>
```

### enable/disable

```bash
openclaw cron enable <job-id>
openclaw cron disable <job-id>
```

## Options

| Option | Mô tả |
|--------|-------|
| `--schedule <cron>` | Cron expression |
| `--message <text>` | Message content |
| `--deliver` | Enable delivery |
| `--no-deliver` | Disable delivery |
| `--channel <name>` | Delivery channel |
| `--to <recipient>` | Recipient ID |

## Ví dụ

### Thêm Daily Reminder

```bash
# Gửi reminder hàng ngày lúc 9:00 AM
openclaw cron add \
  --schedule "0 9 * * *" \
  --message "Good morning! Here's your daily summary." \
  --deliver \
  --channel telegram \
  --to "123456789"
```

### Cập nhật Delivery Channel

```bash
# Đổi channel sang Telegram
openclaw cron update job123 \
  --channel telegram \
  --to "987654321"
```

### Disable Delivery

```bash
# Tắt delivery nhưng giữ job
openclaw cron update job123 --no-deliver
```

### Weekly Report

```bash
# Gửi weekly report mỗi thứ 2
openclaw cron add \
  --schedule "0 10 * * 1" \
  --message "Generate and send weekly report" \
  --deliver \
  --channel slack \
  --to "#reports"
```

## Cron Expressions

Format: `minute hour day month weekday`

| Field | Values |
|-------|--------|
| Minute | 0-59 |
| Hour | 0-23 |
| Day | 1-31 |
| Month | 1-12 |
| Weekday | 0-7 (0 và 7 = Sunday) |

### Special Characters

| Char | Meaning |
|------|---------|
| `*` | Any value |
| `,` | List separator |
| `-` | Range |
| `/` | Step |

### Ví dụ Expressions

| Expression | Meaning |
|------------|---------|
| `0 9 * * *` | 9:00 AM daily |
| `0 */2 * * *` | Every 2 hours |
| `30 8 * * 1-5` | 8:30 AM weekdays |
| `0 0 1 * *` | First day of month |
| `*/15 * * * *` | Every 15 minutes |

## Configuration

Cron jobs có thể được define trong config file:

```json5
{
  cron: {
    jobs: [
      {
        id: "morning-greeting",
        schedule: "0 9 * * *",
        message: "Good morning!",
        deliver: {
          channel: "telegram",
          to: "123456789",
        },
      },
      {
        id: "weekly-report",
        schedule: "0 10 * * 1",
        message: "Generate weekly report",
        deliver: {
          channel: "slack",
          to: "#reports",
        },
      },
    ],
  },
}
```

## Job Status

```bash
# List với status
openclaw cron list --verbose

# Output:
# ID              Schedule        Status    Next Run
# morning-greet   0 9 * * *       enabled   2024-01-15 09:00
# weekly-report   0 10 * * 1      enabled   2024-01-15 10:00
# old-job         0 0 * * *       disabled  -
```

## Timezone

Jobs sử dụng timezone của Gateway:

```json5
{
  gateway: {
    timezone: "Asia/Ho_Chi_Minh",
  },
}
```

## Troubleshooting

### Job không chạy

1. Verify schedule syntax:
   ```bash
   openclaw cron list --verbose
   ```
2. Check Gateway đang chạy
3. Verify job enabled
4. Check Gateway logs

### Delivery fails

1. Verify channel configured
2. Check recipient ID
3. Test manual delivery:
   ```bash
   openclaw chat --deliver --channel telegram --to "123456789" "Test message"
   ```

### Wrong timezone

1. Check Gateway timezone setting
2. Verify system timezone:
   ```bash
   timedatectl
   ```

## Xem thêm

- [Cron Jobs Guide](/automation/cron-jobs)
- [CLI Overview](/cli/setup)
- [Automation & Hooks](/automation-hooks/hooks)
