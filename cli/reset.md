# openclaw reset

Lệnh `openclaw reset` reset local config/state (giữ CLI installed).

## Cú pháp

```bash
openclaw reset [options]
```

## Ví dụ sử dụng

### Reset cơ bản

```bash
openclaw reset
```

### Dry-run mode

Preview changes mà không apply:

```bash
openclaw reset --dry-run
```

### Reset cụ thể với scope

```bash
openclaw reset --scope config+creds+sessions --yes --non-interactive
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--scope <items>` | Chỉ định components cần reset |
| `--yes` | Tự động xác nhận |
| `--non-interactive` | Không có prompts |
| `--dry-run` | Preview mà không apply |

## Scopes có sẵn

| Scope | Mô tả |
|-------|-------|
| `config` | File cấu hình |
| `creds` | Credentials |
| `sessions` | Session data |
| `workspace` | Workspace files |
| `all` | Tất cả |

### Kết hợp scopes

Sử dụng `+` để kết hợp:

```bash
openclaw reset --scope config+creds
```

## Lưu ý quan trọng

::: warning Không thể hoàn tác
Reset operations không thể hoàn tác. Hãy backup trước khi reset:
```bash
cp -r ~/.openclaw ~/.openclaw.backup
```
:::

## Ví dụ workflows

### Reset onboarding

```bash
openclaw reset --scope onboarding
```

### Reset hoàn toàn và bắt đầu lại

```bash
openclaw reset --scope all --yes
openclaw onboard
```

### Reset chỉ sessions

```bash
openclaw reset --scope sessions
```

## Xem thêm

- [Gỡ cài đặt](/install/uninstall)
- [Configure](/cli/configure)
