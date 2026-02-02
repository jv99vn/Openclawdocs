# openclaw onboard

Lệnh `openclaw onboard` cung cấp interactive setup wizard để thiết lập cấu hình Gateway local hoặc remote.

## Cú pháp

```bash
openclaw onboard [options]
```

## Ví dụ sử dụng

### Onboarding cơ bản

```bash
openclaw onboard
```

### Quickstart flow

Chế độ này giảm thiểu user prompts và tự động generate gateway token:

```bash
openclaw onboard --flow quickstart
```

### Manual flow

Chế độ "advanced" với comprehensive configuration prompts:

```bash
openclaw onboard --flow manual
```

### Remote mode

```bash
openclaw onboard --mode remote --remote-url ws://gateway-host:18789
```

### Với daemon installation

```bash
openclaw onboard --install-daemon
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--flow <type>` | `quickstart` hoặc `manual` |
| `--mode <type>` | `local` hoặc `remote` |
| `--remote-url <url>` | URL của remote gateway |
| `--install-daemon` | Cài đặt gateway như daemon service |
| `--force` | Chạy lại ngay cả khi đã onboard |

## Flow Options

### Quickstart

- Giảm thiểu user prompts
- Tự động generate gateway token
- Ideal cho rapid setup

### Manual (Advanced)

Comprehensive prompts cho:
- Port selection
- Bind settings
- Authentication details
- Channel configuration

## Quick Start Alternative

Để có trải nghiệm chat nhanh nhất mà không cần channel configuration:

```bash
openclaw dashboard
```

Điều này mở Control UI nơi bạn có thể chat trực tiếp.

## Những gì Onboard thiết lập

1. **Gateway deployment mode** - Local hoặc remote
2. **Authentication** - OAuth hoặc API keys
3. **Channel provider credentials** - WhatsApp, Telegram, etc.
4. **Background service** - Node runtime (khuyến nghị)

## Xem thêm

- [Bắt đầu nhanh](/start-here/getting-started)
- [Onboarding Guide](/start-here/onboarding)
- [Configure](/cli/configure)
