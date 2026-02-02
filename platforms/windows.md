# Windows (WSL2)

OpenClaw trên Windows hoạt động thông qua **WSL2 (Windows Subsystem for Linux 2)** với Ubuntu được recommend. CLI + Gateway chạy bên trong Linux, giúp runtime consistent và tooling tương thích hơn.

## Tổng quan

- **WSL2** là môi trường chạy chính
- **Ubuntu** được recommend
- **Systemd** required cho gateway installation
- Native Windows companion apps chưa available

## Yêu cầu

- Windows 10 version 2004+ hoặc Windows 11
- WSL2 enabled
- 8GB RAM minimum (16GB recommended)
- SSD recommended

## Cài đặt

### 1. WSL2 + Ubuntu

Mở **PowerShell as Administrator**:

```powershell
# Install WSL2 với Ubuntu
wsl --install

# Hoặc specify Ubuntu version
wsl --install -d Ubuntu-24.04
```

Restart máy nếu được yêu cầu.

### 2. Enable Systemd

Systemd required cho gateway installation. Trong WSL terminal:

```bash
# Edit WSL config
sudo nano /etc/wsl.conf
```

Thêm nội dung:

```ini
[boot]
systemd=true
```

Restart WSL:

```powershell
# Trong PowerShell
wsl --shutdown
wsl
```

### 3. Cài đặt OpenClaw

Trong WSL terminal:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install OpenClaw
npm install -g @anthropic/openclaw

# Run onboard
openclaw onboard
```

## Gateway Service

### Install Daemon

```bash
# Option 1: Via onboard
openclaw onboard --install-daemon

# Option 2: Direct install
openclaw gateway install

# Option 3: Via configure menu
openclaw configure
# Select "Gateway service"
```

### Manage Service

```bash
# Start
openclaw gateway start

# Stop
openclaw gateway stop

# Status
openclaw gateway status

# Logs
openclaw logs --follow
```

## Network Configuration

### LAN Access

Để cho phép devices khác access Gateway từ LAN, cần setup port forwarding.

**PowerShell as Administrator:**

```powershell
# Get WSL IP
$wslIp = (wsl hostname -I).Trim().Split(' ')[0]

# Forward port 18789
netsh interface portproxy add v4tov4 listenport=18789 listenaddress=0.0.0.0 connectport=18789 connectaddress=$wslIp

# Verify
netsh interface portproxy show all
```

### Firewall Rule

```powershell
# Allow inbound connections
New-NetFirewallRule -DisplayName "OpenClaw Gateway" -Direction Inbound -Protocol TCP -LocalPort 18789 -Action Allow
```

::: warning Remote Access
Remote nodes phải point đến **reachable** Gateway URL, không phải `127.0.0.1`.
:::

### Remove Port Forward

```powershell
netsh interface portproxy delete v4tov4 listenport=18789 listenaddress=0.0.0.0
```

## WSL IP Changes

WSL IP có thể thay đổi sau mỗi restart. Để automate:

**Script `update-proxy.ps1`:**

```powershell
# Remove old proxy
netsh interface portproxy delete v4tov4 listenport=18789 listenaddress=0.0.0.0

# Get new WSL IP
$wslIp = (wsl hostname -I).Trim().Split(' ')[0]

# Add new proxy
netsh interface portproxy add v4tov4 listenport=18789 listenaddress=0.0.0.0 connectport=18789 connectaddress=$wslIp

Write-Host "Port forwarding updated to $wslIp"
```

## Tailscale Setup

Cho consistent remote access:

### Install trong WSL

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Start và authenticate
sudo tailscale up
```

### Sử dụng

```bash
# Gateway sẽ accessible qua Tailscale IP
tailscale ip -4
```

Nodes có thể connect qua Tailscale address.

## Troubleshooting

### WSL không start

```powershell
# Check WSL status
wsl --status

# Update WSL
wsl --update

# Restart
wsl --shutdown
wsl
```

### Systemd không hoạt động

1. Verify `/etc/wsl.conf` có `systemd=true`
2. Restart WSL: `wsl --shutdown`
3. Check: `systemctl --version`

### Gateway không start

```bash
# Check logs
journalctl --user -u openclaw-gateway

# Manual start để debug
openclaw gateway --verbose
```

### Port forwarding không hoạt động

1. Verify WSL IP:
   ```bash
   hostname -I
   ```
2. Test từ WSL:
   ```bash
   curl http://localhost:18789
   ```
3. Test từ Windows:
   ```powershell
   curl http://localhost:18789
   ```
4. Check firewall rules

### Network isolation issues

```powershell
# Reset networking
wsl --shutdown
netsh winsock reset
# Restart computer
```

## Performance Tips

### File System

- **Keep files trong WSL** filesystem (`/home/user/`)
- **Avoid** accessing Windows files từ WSL (`/mnt/c/`)
- File operations nhanh hơn nhiều trong native Linux filesystem

### Memory

```powershell
# Limit WSL memory trong .wslconfig
# C:\Users\<user>\.wslconfig
[wsl2]
memory=8GB
processors=4
```

### Disk

```bash
# Periodically compact WSL disk
# Trong PowerShell
wsl --shutdown
Optimize-VHD -Path "C:\Users\<user>\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu*\LocalState\ext4.vhdx" -Mode Full
```

## Development Setup

### VS Code Integration

```bash
# Install VS Code Server
code .
```

VS Code tự động detect WSL và cài đặt remote extension.

### Git Configuration

```bash
# Configure Git trong WSL
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Use Windows credential manager
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

## Limitations

| Feature | Status |
|---------|--------|
| CLI | ✅ Full support |
| Gateway | ✅ Full support |
| Native Windows App | ❌ Not yet available |
| GUI Tools | ⚠️ Via WSLg |

## Xem thêm

- [Getting Started](/start-here/getting-started)
- [Linux](/platforms/linux)
- [Platforms Overview](/platforms/overview)
