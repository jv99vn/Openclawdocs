# Tailscale Integration

OpenClaw có thể tự động cấu hình Tailscale **Serve** (private tailnet) hoặc **Funnel** (public internet) cho Gateway dashboard và WebSocket port, giữ Gateway bound đến loopback trong khi Tailscale xử lý HTTPS, routing, và identity verification.

## Tổng quan

| Mode | Access | Security |
|------|--------|----------|
| **Serve** | Tailnet-only | Identity headers |
| **Funnel** | Public internet | Password required |
| **Off** | Manual config | Token/Password |

## Modes

### Serve (Tailnet-only)

Gateway chỉ accessible trong tailnet của bạn:

```json5
{
  gateway: {
    host: "127.0.0.1",
    port: 18789,
    tailscale: {
      mode: "serve",
    },
  },
}
```

Access qua: `https://<magicdns>/`

### Funnel (Public Internet)

Gateway accessible từ internet:

```json5
{
  gateway: {
    host: "127.0.0.1",
    port: 18789,
    tailscale: {
      mode: "funnel",
    },
    password: "${OPENCLAW_GATEWAY_PASSWORD}",
  },
}
```

::: warning Password Required
Funnel mode yêu cầu password authentication để bảo vệ public endpoint.
:::

### Off (Default)

Không có Tailscale automation:

```json5
{
  gateway: {
    tailscale: {
      mode: "off",  // Default
    },
  },
}
```

## Authentication

### Token Authentication

Mặc định khi `OPENCLAW_GATEWAY_TOKEN` được set:

```bash
export OPENCLAW_GATEWAY_TOKEN="your-secure-token"
```

### Password Authentication

Shared secret cho Funnel access:

```bash
export OPENCLAW_GATEWAY_PASSWORD="your-password"
```

### Tailscale Identity (Serve Mode)

Với Serve và `allowTailscale` enabled, requests có thể authenticate qua Tailscale identity headers:

```json5
{
  gateway: {
    tailscale: {
      mode: "serve",
      allowTailscale: true,  // Trust tailscale-user-login header
    },
  },
}
```

Không cần token/password cho tailnet users.

## Configuration Examples

### Tailnet-Only Access

```json5
{
  gateway: {
    host: "127.0.0.1",
    port: 18789,
    tailscale: {
      mode: "serve",
      allowTailscale: true,
    },
  },
}
```

### Direct Tailnet Binding

Gateway listen trực tiếp trên Tailscale IP:

```json5
{
  gateway: {
    host: "100.x.x.x",  // Tailscale IP
    port: 18789,
    tailscale: {
      mode: "off",
    },
  },
}
```

Access: `http://<tailscale-ip>:18789/`

### Public Internet via Funnel

```json5
{
  gateway: {
    host: "127.0.0.1",
    port: 18789,
    tailscale: {
      mode: "funnel",
    },
    password: "${OPENCLAW_GATEWAY_PASSWORD}",
  },
}
```

## Prerequisites

### Serve Mode

- HTTPS enabled cho tailnet
- Tailscale CLI installed và logged in
- MagicDNS enabled

```bash
# Enable HTTPS (nếu chưa có)
tailscale cert
```

### Funnel Mode

- Tailscale v1.38.3+
- MagicDNS enabled
- HTTPS enabled
- Chỉ hỗ trợ ports: 443, 8443, 10000 (TLS only)

```bash
# Verify Funnel eligibility
tailscale funnel status
```

## Setup

### 1. Install Tailscale

```bash
# macOS
brew install tailscale

# Linux
curl -fsSL https://tailscale.com/install.sh | sh

# Start
sudo tailscale up
```

### 2. Configure Gateway

```json5
{
  gateway: {
    tailscale: {
      mode: "serve",  // hoặc "funnel"
    },
  },
}
```

### 3. Restart Gateway

```bash
openclaw gateway restart
```

### 4. Verify

```bash
# Check Tailscale status
tailscale status

# Check serve/funnel
tailscale serve status
tailscale funnel status
```

## Nodes & Devices

Serve/Funnel chỉ expose Gateway control UI và WebSocket endpoint. Nodes connect thông qua cùng Gateway endpoint bất kể exposure mode.

```
Mobile Node ──┐
              │
Desktop ──────┼──► Gateway (Tailscale Serve/Funnel) ──► LLM Provider
              │
CLI ──────────┘
```

## MagicDNS

Tailscale MagicDNS cung cấp human-readable URLs:

```
https://my-machine.tail12345.ts.net/
```

Thay vì:

```
http://100.64.0.1:18789/
```

## Troubleshooting

### Serve không hoạt động

1. Verify HTTPS enabled:
   ```bash
   tailscale cert
   ```
2. Check tailnet admin console
3. Restart Tailscale:
   ```bash
   sudo tailscale down && sudo tailscale up
   ```

### Funnel access denied

1. Verify Funnel enabled trong tailnet policy
2. Check Tailscale version:
   ```bash
   tailscale version  # Cần v1.38.3+
   ```
3. Verify port supported (443, 8443, 10000)

### Authentication fails

1. Verify token/password set
2. Check environment variables
3. Test manual connection:
   ```bash
   curl -H "Authorization: Bearer $TOKEN" https://your-machine.ts.net/
   ```

### Identity headers không được trust

1. Verify `allowTailscale: true` trong config
2. Check request đến qua Tailscale (không direct)
3. Verify `tailscale-user-login` header present

## Security Considerations

### Serve Mode

- Chỉ tailnet members access
- Identity verified by Tailscale
- No password needed (với allowTailscale)

### Funnel Mode

- Public internet access
- **Always require password**
- Consider rate limiting
- Monitor access logs

### Best Practices

1. Prefer Serve over Funnel khi có thể
2. Use strong passwords cho Funnel
3. Enable MFA trên Tailscale account
4. Review tailnet ACLs
5. Monitor connection logs

## Xem thêm

- [Security](/gateway-ops/security)
- [Configuration](/gateway-ops/configuration)
- [Remote Access](/gateway-ops/remote-access)
