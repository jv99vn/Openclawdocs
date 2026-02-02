# openclaw plugins

Lệnh `openclaw plugins` quản lý Gateway plugins và extensions load in-process.

## Cú pháp

```bash
openclaw plugins <command> [options]
```

## Commands

### List plugins

```bash
openclaw plugins list
```

### View details

```bash
openclaw plugins info <id>
```

### Enable/Disable

```bash
openclaw plugins enable <id>
openclaw plugins disable <id>
```

### Health check

```bash
openclaw plugins doctor
```

### Update

```bash
# Single plugin
openclaw plugins update <id>

# All plugins
openclaw plugins update --all

# Dry run
openclaw plugins update --all --dry-run
```

## Installation

### Basic install

```bash
openclaw plugins install <path-or-spec>
```

### Supported formats

- `.zip`
- `.tgz`
- `.tar.gz`
- `.tar`

### npm packages

```bash
openclaw plugins install openclaw-plugin-example
```

::: warning Cảnh báo
Treat plugin installs như **running code**. Khuyến nghị sử dụng pinned versions.
:::

### Local development

Sử dụng `--link` để test mà không copy directories:

```bash
openclaw plugins install -l ./my-plugin
```

## Plugin Manifest

Tất cả plugins yêu cầu file `openclaw.plugin.json`:

```json
{
  "$schema": "https://openclaw.ai/schemas/plugin.json",
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Plugin description",
  "entry": "dist/index.js"
}
```

::: danger Bắt buộc
Invalid hoặc missing manifests ngăn plugin loading và gây configuration validation failures.
:::

## Update Functionality

Update chỉ áp dụng cho npm-installed plugins được tracked trong `plugins.installs`.

```bash
# Preview changes
openclaw plugins update --all --dry-run

# Apply updates
openclaw plugins update --all
```

## Plugin Configuration

```json5
{
  "plugins": {
    "enabled": ["my-plugin"],
    "disabled": ["other-plugin"],
    "installs": [
      "openclaw-plugin-example@^1.0.0"
    ],
    "config": {
      "my-plugin": {
        "option1": "value1"
      }
    }
  }
}
```

## Xem thêm

- [Tools](/concepts/tools)
- [Hooks](/concepts/hooks)
