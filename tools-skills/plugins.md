# Plugins

Plugins mở rộng functionality của OpenClaw với additional tools, channels, và providers.

## Tổng quan

- **Extensible** - Thêm features mới
- **Modular** - Install chỉ những gì cần
- **Community** - Plugins từ community
- **Official** - Official plugins từ OpenClaw team

## Plugin Types

| Type | Description |
|------|-------------|
| **Channel** | New messaging platforms |
| **Provider** | New LLM providers |
| **Tool** | New agent tools |
| **Skill** | New agent skills |
| **Integration** | Third-party integrations |

## CLI Commands

### List Installed

```bash
openclaw plugins list
```

### Search Available

```bash
openclaw plugins search voice
```

### Install

```bash
openclaw plugins install @openclaw/voice-call
```

### Uninstall

```bash
openclaw plugins uninstall @openclaw/voice-call
```

### Update

```bash
# Update specific plugin
openclaw plugins update @openclaw/voice-call

# Update all plugins
openclaw plugins update --all
```

## Official Plugins

### Channels

| Plugin | Description |
|--------|-------------|
| `@openclaw/zalo` | Zalo messaging |
| `@openclaw/line` | LINE messaging |
| `@openclaw/matrix` | Matrix protocol |

### Tools

| Plugin | Description |
|--------|-------------|
| `@openclaw/voice-call` | Voice calling |
| `@openclaw/code-interpreter` | Code execution |
| `@openclaw/image-gen` | Image generation |

### Integrations

| Plugin | Description |
|--------|-------------|
| `@openclaw/notion` | Notion integration |
| `@openclaw/github` | GitHub integration |
| `@openclaw/calendar` | Calendar integration |

## Configuration

### Enable/Disable

```json5
{
  plugins: {
    "@openclaw/voice-call": {
      enabled: true,
    },
    "@openclaw/notion": {
      enabled: false,
    },
  },
}
```

### Plugin Settings

```json5
{
  plugins: {
    "@openclaw/voice-call": {
      enabled: true,
      provider: "twilio",
      credentials: {
        accountSid: "${TWILIO_SID}",
        authToken: "${TWILIO_TOKEN}",
      },
    },
  },
}
```

## Installing from Sources

### npm

```bash
openclaw plugins install @openclaw/plugin-name
```

### GitHub

```bash
openclaw plugins install github:user/repo
```

### Local

```bash
openclaw plugins install ./path/to/plugin
```

## Plugin Development

### Structure

```
my-plugin/
├── package.json
├── index.js
├── tools/
│   └── my-tool.js
├── skills/
│   └── my-skill.js
└── README.md
```

### package.json

```json
{
  "name": "@myplugin/awesome",
  "version": "1.0.0",
  "openclaw": {
    "type": "tool",
    "tools": ["my-tool"]
  }
}
```

### Tool Example

```javascript
// tools/my-tool.js
export default {
  name: "my_tool",
  description: "My awesome tool",
  parameters: {
    type: "object",
    properties: {
      input: { type: "string" }
    }
  },
  async execute({ input }) {
    return `Processed: ${input}`;
  }
};
```

## Plugin API

### Lifecycle Hooks

```javascript
export default {
  // Called when plugin loads
  async onLoad(gateway) {
    console.log("Plugin loaded");
  },

  // Called when plugin unloads
  async onUnload() {
    console.log("Plugin unloaded");
  },

  // Called on message
  async onMessage(message, context) {
    // Process message
  },
};
```

### Access Gateway

```javascript
export default {
  async onLoad(gateway) {
    // Access config
    const config = gateway.config;

    // Access channels
    const channels = gateway.channels;

    // Access tools
    const tools = gateway.tools;
  },
};
```

## Plugin Registry

Official plugins registry:
```
https://plugins.openclaw.ai
```

### Publish

```bash
# Login
openclaw plugins login

# Publish
openclaw plugins publish
```

## Security

### Permissions

Plugins request permissions:

```json
{
  "openclaw": {
    "permissions": [
      "network",
      "filesystem",
      "exec"
    ]
  }
}
```

### Sandboxing

Plugins run trong sandboxed environment:
- Limited file access
- Network restrictions
- No direct system access

### Review

Official plugins được reviewed trước khi publish.

## Troubleshooting

### Plugin không load

1. Check compatibility:
   ```bash
   openclaw plugins check @plugin/name
   ```
2. Verify dependencies
3. Check logs

### Conflicts

```bash
# Check conflicts
openclaw plugins conflicts

# Resolve
openclaw plugins resolve
```

### Update fails

```bash
# Force reinstall
openclaw plugins install --force @plugin/name
```

## Xem thêm

- [Tools Overview](/tools-skills/tools)
- [Skills](/tools-skills/skills)
- [CLI plugins](/cli/plugins)
