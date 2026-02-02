# Cài đặt

## Cài đặt nhanh

### Sử dụng Script (Khuyến nghị)

**macOS/Linux:**
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows (PowerShell):**
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

### Sử dụng npm/pnpm

**npm:**
```bash
npm install -g openclaw
```

**pnpm:**
```bash
pnpm add -g openclaw
```

## Yêu cầu hệ thống

| Yêu cầu | Phiên bản |
|---------|-----------|
| Node.js | >= 22 |
| npm/pnpm | Mới nhất |
| OS | macOS, Linux, Windows (WSL2) |

### Kiểm tra Node.js

```bash
node --version
# Cần hiển thị v22.x.x hoặc cao hơn
```

### Cài đặt Node.js

**macOS (Homebrew):**
```bash
brew install node@22
```

**Linux (nvm):**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22
```

**Windows:**
Sử dụng WSL2 với Ubuntu, sau đó cài như Linux.

## Lưu ý theo nền tảng

### macOS

- Cài đặt **Xcode Command Line Tools**:
  ```bash
  xcode-select --install
  ```

### Windows

::: warning WSL2 bắt buộc
Windows native **không được hỗ trợ**. Phải sử dụng WSL2:

```powershell
wsl --install -d Ubuntu
```
:::

### Linux

- Một số distros có thể cần build tools:
  ```bash
  sudo apt install build-essential
  ```

## Sau khi cài đặt

### Chạy Onboarding

```bash
openclaw onboard --install-daemon
```

Wizard sẽ thiết lập:
- Model authentication
- Gateway configuration
- Channel integrations
- Daemon service

### Xác minh cài đặt

```bash
# Kiểm tra version
openclaw --version

# Kiểm tra status
openclaw status

# Kiểm tra health
openclaw health
```

## Cài đặt từ Source

### Clone repository

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

### Cài đặt dependencies

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Chạy

```bash
pnpm openclaw --version
```

## Cấu trúc thư mục

Sau khi cài đặt, OpenClaw tạo các thư mục:

| Thư mục | Mục đích |
|---------|----------|
| `~/.openclaw/` | Thư mục cấu hình chính |
| `~/.openclaw/openclaw.json` | File cấu hình |
| `~/.openclaw/workspace/` | Agent workspace |
| `~/.openclaw/credentials/` | Credentials storage |

## Khắc phục sự cố cài đặt

### Lệnh không tìm thấy

Thêm npm global bin vào PATH:

```bash
export PATH="$(npm config get prefix)/bin:$PATH"
```

Thêm vào `~/.bashrc` hoặc `~/.zshrc` để áp dụng vĩnh viễn.

### Permission errors

**Không dùng sudo với npm global!** Thay vào đó:

```bash
# Tạo thư mục npm global trong home
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH="~/.npm-global/bin:$PATH"
```

### Node version quá cũ

```bash
# Kiểm tra version
node --version

# Nếu < 22, cập nhật
nvm install 22
nvm use 22
```

## Xem thêm

- [Bắt đầu nhanh](/start-here/getting-started)
- [Cập nhật](/install/updating)
- [Gỡ cài đặt](/install/uninstall)
- [Khắc phục sự cố](/help/troubleshooting)
