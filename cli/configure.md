# openclaw configure

Lệnh `openclaw configure` cung cấp interactive setup wizard để thiết lập credentials, devices, và agent defaults.

## Cú pháp

```bash
openclaw configure [options]
openclaw config [subcommand]
```

## Mô tả

Wizard bao gồm:
- **Model Selection**: Multi-select interface cho `agents.defaults.models` allowlist
- **Gateway Configuration**: Luôn cập nhật `gateway.mode` dựa trên nơi bạn chọn chạy Gateway
- **Channel Services**: Prompts cho allowlists khi cấu hình Slack, Discord, Matrix, Teams

## Ví dụ sử dụng

### Launch wizard

```bash
openclaw configure
# hoặc
openclaw config
```

### Cấu hình theo section

```bash
openclaw configure --section models --section channels
```

### Non-interactive

```bash
# Get value
openclaw config get gateway.port

# Set value
openclaw config set gateway.port 18790

# Unset value
openclaw config unset gateway.verbose
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--section <name>` | Chỉ cấu hình section cụ thể |
| `--non-interactive` | Không có prompts |
| `--json` | Output JSON |

## Sections có sẵn

| Section | Mô tả |
|---------|-------|
| `models` | Model và authentication |
| `channels` | Kênh trò chuyện |
| `gateway` | Gateway settings |
| `agents` | Agent defaults |
| `tools` | Tool configuration |
| `web` | Web search settings |

## Channel Allowlists

Khi cấu hình channel services (Slack, Discord, Matrix, Teams), wizard prompts cho allowlists:

- Có thể nhập **names** hoặc **IDs**
- Hệ thống resolves names thành IDs khi có thể

## Subcommands

### config get

```bash
openclaw config get <key>
```

### config set

```bash
openclaw config set <key> <value>
```

### config unset

```bash
openclaw config unset <key>
```

### config list

```bash
openclaw config list
```

## Ví dụ cấu hình

### Set default model

```bash
openclaw config set agents.defaults.model "anthropic/claude-opus-4-5"
```

### Set gateway port

```bash
openclaw config set gateway.port 18789
```

### Enable verbose logging

```bash
openclaw config set gateway.verbose true
```

## Xem thêm

- [Gateway Configuration](/concepts/gateway)
- [Cấu hình chi tiết](/guide/concepts)
