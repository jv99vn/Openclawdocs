# Cập nhật

OpenClaw đang trong giai đoạn phát triển pre-1.0, yêu cầu cập nhật được xử lý như thay đổi infrastructure: **cập nhật → xác minh → khởi động lại**.

## Phương pháp cập nhật chính

### Website Installer (Khuyến nghị)

Chạy lại installer - tự động phát hiện cài đặt hiện có và thực hiện in-place upgrades:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Flags tùy chọn:**
- `--no-onboard`: Bỏ qua wizard
- `--install-method git`: Cài đặt từ source

### Global Package Installations

**npm:**
```bash
npm i -g openclaw@latest
```

**pnpm:**
```bash
pnpm add -g openclaw@latest
```

### Source Installs

Lệnh `openclaw update` cung cấp flow streamlined cho git-based installations:

```bash
openclaw update
```

Thực hiện:
- Safe updates
- Cài đặt dependencies
- Health checks

## Checklist trước khi cập nhật

Trước khi cập nhật, ghi lại:

| Mục | Kiểm tra |
|----|----------|
| Loại cài đặt | Global vs. source |
| Cách chạy Gateway | Foreground vs. service |
| Backup config | `~/.openclaw/` |

### Backup cấu hình

```bash
# Tạo backup
cp -r ~/.openclaw ~/.openclaw.backup.$(date +%Y%m%d)
```

## Update Channels

Chuyển đổi giữa các release channels:

```bash
# Stable (mặc định)
openclaw update --channel stable

# Beta
openclaw update --channel beta

# Dev
openclaw update --channel dev
```

## Các bước sau khi cập nhật

Sau bất kỳ cập nhật nào, chạy:

```bash
# Kiểm tra health
openclaw doctor

# Khởi động lại Gateway
openclaw gateway restart

# Xác minh
openclaw health
```

## Rollback Procedures

### Global installs

Cài đặt lại phiên bản trước:

```bash
npm i -g openclaw@<version>
```

Ví dụ:
```bash
npm i -g openclaw@0.9.5
```

### Source installs

Checkout một commit date cụ thể và rebuild:

```bash
# Checkout version cũ
git checkout <commit-hash>

# Rebuild dependencies
pnpm install

# Rebuild
pnpm build
```

## Quản lý Gateway

```bash
# Kiểm tra trạng thái
openclaw gateway status

# Dừng
openclaw gateway stop

# Khởi động lại
openclaw gateway restart
```

## Cập nhật tự động

::: warning Không khuyến nghị cho production
Cập nhật tự động không được khuyến nghị cho production deployments.
:::

Nếu muốn tự động cập nhật:

```bash
# Cron job ví dụ (hàng ngày lúc 3 AM)
0 3 * * * cd ~/openclaw && git pull && pnpm install && pnpm build && openclaw gateway restart
```

## Xem xét sau cập nhật

### Breaking changes

Kiểm tra [Release Notes](https://github.com/openclaw/openclaw/releases) cho breaking changes.

### Migration scripts

Một số versions có thể yêu cầu migration:

```bash
openclaw migrate
```

### Config validation

Sau cập nhật, validate config:

```bash
openclaw doctor --fix
```

## Xem thêm

- [Cài đặt](/install/install)
- [Gateway](/concepts/gateway)
- [Khắc phục sự cố](/help/troubleshooting)
