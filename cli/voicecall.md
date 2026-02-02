# voicecall

Lệnh `openclaw voicecall` quản lý voice calls. Đây là tính năng plugin-dependent yêu cầu voice-call plugin được cài đặt và enabled.

## Yêu cầu

```bash
# Install voice-call plugin
openclaw plugins install @openclaw/voice-call
```

## Cú pháp

```bash
openclaw voicecall <command> [options]
```

## Commands

### call

Khởi tạo voice call:

```bash
openclaw voicecall call --to "+84123456789" --message "Hello, this is a test call"
```

**Options:**

| Option | Mô tả |
|--------|-------|
| `--to <number>` | Số điện thoại đích |
| `--message <text>` | Tin nhắn voice |
| `--notify` | Notify mode |

### status

Kiểm tra trạng thái call:

```bash
openclaw voicecall status --call-id <id>
```

### continue

Gửi follow-up message trong active call:

```bash
openclaw voicecall continue --call-id <id> --message "Additional message"
```

### end

Kết thúc call:

```bash
openclaw voicecall end --call-id <id>
```

## Ví dụ

### Basic Call

```bash
# Initiate call
openclaw voicecall call --to "+84123456789" --message "Reminder: Your appointment is in 30 minutes"
```

### With Notify Mode

```bash
# Call với notification
openclaw voicecall call --to "+84123456789" --message "Alert notification" --notify
```

### Check Status

```bash
# Get call status
openclaw voicecall status --call-id abc123

# Output:
# Call ID: abc123
# Status: in_progress
# Duration: 45s
```

### Continue Conversation

```bash
# Send follow-up
openclaw voicecall continue --call-id abc123 --message "Is there anything else you need?"
```

### End Call

```bash
# Terminate call
openclaw voicecall end --call-id abc123
```

## Webhook Exposure

Voice calls yêu cầu expose webhook endpoint cho telephony provider.

### Serve Mode (Recommended)

```bash
# Expose webhook via Tailscale Serve
tailscale serve --https=443 localhost:18789
```

### Funnel Mode

```bash
# Alternative: Funnel mode
tailscale funnel --https=443 localhost:18789
```

::: warning Security
Chỉ expose webhook endpoint đến networks bạn trust. Prefer Tailscale Serve over Funnel khi có thể.
:::

## Configuration

```json5
{
  plugins: {
    "voice-call": {
      enabled: true,
      provider: "twilio",  // hoặc provider khác
      credentials: {
        accountSid: "${TWILIO_ACCOUNT_SID}",
        authToken: "${TWILIO_AUTH_TOKEN}",
      },
      webhookUrl: "https://your-gateway.example.com/voice/webhook",
    },
  },
}
```

## Providers

| Provider | Status |
|----------|--------|
| Twilio | ✅ Supported |
| Vonage | ⚠️ Experimental |
| Plivo | ⚠️ Experimental |

## Troubleshooting

### Call không kết nối

1. Verify phone number format (E.164)
2. Check provider credentials
3. Verify webhook accessible từ internet
4. Check provider logs

### Webhook issues

1. Test webhook URL:
   ```bash
   curl -X POST https://your-gateway/voice/webhook
   ```
2. Verify HTTPS certificate valid
3. Check firewall rules

### Audio quality issues

1. Check network bandwidth
2. Verify codec settings
3. Test với different provider

## Xem thêm

- [Voice-Call Plugin](/plugins/voice-call)
- [CLI Overview](/cli/setup)
- [Webhooks](/automation-hooks/hooks)
