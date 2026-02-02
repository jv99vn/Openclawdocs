# openclaw setup

Lệnh `openclaw setup` khởi tạo file cấu hình OpenClaw và chuẩn bị agent workspace cho việc sử dụng.

## Cú pháp

```bash
openclaw setup [options]
```

## Mô tả

Tạo `~/.openclaw/openclaw.json` và thiết lập infrastructure workspace agent cần thiết để bắt đầu làm việc với OpenClaw.

## Ví dụ sử dụng

### Setup cơ bản

```bash
openclaw setup
```

### Với workspace tùy chỉnh

```bash
openclaw setup --workspace ~/.openclaw/workspace
```

### Khởi chạy interactive wizard

```bash
openclaw setup --wizard
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--workspace <path>` | Đường dẫn workspace tùy chỉnh |
| `--wizard` | Khởi chạy interactive setup wizard |
| `--force` | Ghi đè cấu hình hiện có |
| `--non-interactive` | Chạy không có prompts |

## Output

Lệnh tạo:
- `~/.openclaw/openclaw.json` - File cấu hình chính
- `~/.openclaw/workspace/` - Thư mục workspace
- `~/.openclaw/credentials/` - Thư mục credentials

## Xem thêm

- [Bắt đầu nhanh](/start-here/getting-started)
- [Onboard](/cli/onboard)
- [Configure](/cli/configure)
