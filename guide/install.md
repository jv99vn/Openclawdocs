# Cài đặt

Hướng dẫn này bao gồm nhiều phương pháp cài đặt OpenClaw, một công cụ CLI yêu cầu Node >=22 trên macOS, Linux hoặc Windows qua WSL2.

## Phương pháp cài đặt

### Cách được khuyến nghị

Script cài đặt xử lý thiết lập CLI và onboarding tự động:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Đối với người dùng Windows PowerShell, có script thay thế:

```powershell
irm https://openclaw.ai/install.ps1 | iex
```

### Cài đặt thủ công qua npm

Nếu bạn đã có Node, bạn có thể cài đặt toàn cục:

```bash
npm install -g openclaw@latest
```

::: tip Lưu ý về libvips
Người dùng có libvips toàn hệ thống có thể cần thêm biến môi trường sau để tránh lỗi build với dependency sharp:

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest
```
:::

### Build từ source

Chủ yếu hữu ích cho các contributor:

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm build
```

### Các tùy chọn triển khai khác

- **Docker** - Xem hướng dẫn Docker
- **Nix** - Xem hướng dẫn Nix
- **Ansible** - Xem hướng dẫn Ansible
- **Bun** - Xem hướng dẫn Bun

## Thiết lập với pnpm

Khi sử dụng pnpm, cần phê duyệt rõ ràng cho các package chứa build scripts:

```bash
pnpm approve-builds -g
```

Chọn các package liên quan, sau đó chạy lại cài đặt.

## Sau khi cài đặt

Sau khi thiết lập, chạy lệnh sau để hoàn tất cấu hình:

```bash
openclaw onboard --install-daemon
```

Sau đó xác minh chức năng:

```bash
openclaw doctor
```

## Tùy chỉnh Script cài đặt

Script cài đặt hỗ trợ nhiều flags và biến môi trường để tự động hóa:

| Flag | Mô tả |
|------|-------|
| `--install-method` | Chọn phương pháp cài đặt |
| `--git-dir` | Chỉ định thư mục git |
| `--no-prompt` | Không hiển thị prompt |
| `--dry-run` | Chạy thử không thực hiện |

## Khắc phục sự cố PATH

Nếu lệnh `openclaw` không khả dụng, hãy xác minh rằng thư mục binary toàn cục của npm xuất hiện trong PATH hệ thống:

```bash
# Kiểm tra thư mục global của npm
npm config get prefix

# Thêm vào ~/.bashrc hoặc ~/.zshrc
export PATH="$(npm config get prefix)/bin:$PATH"
```

Sau đó cập nhật các file cấu hình shell tương ứng.
