# Browser (OpenClaw-managed)

OpenClaw cung cấp cho agents "một browser riêng biệt, chỉ dành cho agent" thông qua các Chrome/Brave/Edge/Chromium profiles riêng biệt, được isolate khỏi browser cá nhân và được quản lý qua local control service.

## Tính năng chính

- Deterministic tab control
- Agent actions (click/type/drag/select)
- Snapshots
- Screenshots

### Hai loại profile chính

| Profile | Mô tả |
|---------|-------|
| `openclaw` | Managed, isolated browser instance |
| `chrome` | Extension relay tới system browser (yêu cầu OpenClaw extension) |

## Quick Start Commands

### Kiểm tra status

```bash
openclaw browser --browser-profile openclaw status
```

### Khởi động browser

```bash
openclaw browser --browser-profile openclaw start
```

### Mở URL

```bash
openclaw browser --browser-profile openclaw open https://example.com
```

### Chụp screenshot

```bash
openclaw browser --browser-profile openclaw screenshot
```

## Cấu hình

Settings nằm trong `~/.openclaw/openclaw.json`:

```json5
{
  browser: {
    enabled: true,
    defaultProfile: "openclaw",
    cdpPorts: {
      start: 18800,
      end: 18899,
    },
    executablePath: null,  // Auto-detect
    headless: false,
  },
}
```

### Executable Path theo OS

| OS | Default Path |
|----|--------------|
| macOS | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` |
| Windows | `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe` |
| Linux | `/usr/bin/google-chrome-stable` |

## Browser Selection & Execution

**Auto-detect order:**
1. System default browser (nếu Chromium-based)
2. Chrome
3. Brave
4. Edge
5. Chromium hoặc Chrome Canary

Override qua `browser.executablePath`.

## Remote Control Options

| Mode | Mô tả |
|------|-------|
| Local (default) | Control local browser |
| Node host proxying | Proxy qua node |
| Remote CDP | Attach tới remote CDP |

### Remote CDP Configuration

```json5
{
  browser: {
    remote: {
      url: "ws://remote-host:9222",
      token: "secret-token",
    },
  },
}
```

## Control API

Gateway expose HTTP endpoints cho:

| Endpoint | Mô tả |
|----------|-------|
| `/tabs` | Tab management |
| `/snapshot` | AI snapshot |
| `/screenshot` | Screenshot capture |
| `/navigate` | URL navigation |
| `/action` | Execute actions |
| `/cookies` | Cookie management |
| `/storage` | LocalStorage/SessionStorage |
| `/emulation` | Device emulation |

## Snapshot & Ref System

### Hai loại snapshot

| Style | Refs | Mô tả |
|-------|------|-------|
| AI snapshots | Numeric | `1`, `2`, `3`... |
| Role snapshots | Element-based | `e12`, `e13`... |

::: warning Quan trọng
Refs không stable across navigations. Nếu action fails, re-run snapshot và sử dụng fresh ref.
:::

## Action Execution

Actions yêu cầu refs từ snapshots.

### Click

```typescript
await tools.browser({
  action: 'click',
  ref: '12',
})
```

### Type

```typescript
await tools.browser({
  action: 'type',
  ref: '15',
  text: 'Hello World',
})
```

### Hover

```typescript
await tools.browser({
  action: 'hover',
  ref: '12',
})
```

### Scroll

```typescript
await tools.browser({
  action: 'scroll',
  direction: 'down',
  amount: 500,
})
```

### Select Dropdown

```typescript
await tools.browser({
  action: 'select',
  ref: '20',
  value: 'option1',
})
```

### File Upload

```typescript
await tools.browser({
  action: 'upload',
  ref: '25',
  files: ['/path/to/file.pdf'],
})
```

### JavaScript Evaluation

```typescript
await tools.browser({
  action: 'evaluate',
  script: 'document.title',
})
```

## State Management

### Cookies

```typescript
// Get cookies
await tools.browser({ action: 'cookies.get' })

// Set cookie
await tools.browser({
  action: 'cookies.set',
  cookie: {
    name: 'session',
    value: 'abc123',
    domain: 'example.com',
  },
})

// Clear cookies
await tools.browser({ action: 'cookies.clear' })
```

### Storage

```typescript
// Get localStorage
await tools.browser({
  action: 'storage.get',
  type: 'local',
  key: 'myKey',
})

// Set localStorage
await tools.browser({
  action: 'storage.set',
  type: 'local',
  key: 'myKey',
  value: 'myValue',
})
```

### Geolocation

```typescript
await tools.browser({
  action: 'emulation.geolocation',
  latitude: 37.7749,
  longitude: -122.4194,
})
```

### Timezone & Locale

```typescript
await tools.browser({
  action: 'emulation.timezone',
  timezone: 'America/New_York',
})

await tools.browser({
  action: 'emulation.locale',
  locale: 'en-US',
})
```

## Security Considerations

::: danger Quan trọng
- Giữ Gateway và bất kỳ node hosts nào trên private network (Tailscale)
- Tránh public exposure
- Remote CDP URLs/tokens nên được treat như secrets
- Profile `openclaw` có thể chứa sensitive logged-in sessions
:::

## Troubleshooting

### Browser không khởi động (Linux)

Nếu bạn thấy `"Failed to start Chrome CDP on port 18800"`:

**Most likely cause:** Snap-packaged Chromium trên Ubuntu.

**Quick fix:** Install Google Chrome thay thế:

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

Sau đó set trong config:

```json
{
  "browser": {
    "executablePath": "/usr/bin/google-chrome-stable"
  }
}
```

### Actions fail

1. Re-run snapshot để get fresh refs
2. Verify element visible và interactable
3. Check browser logs

### CDP connection issues

```bash
# Check if browser is running
openclaw browser status

# Check port availability
lsof -nP -iTCP:18800 -sTCP:LISTEN
```

## Config Reference đầy đủ

```json5
{
  browser: {
    enabled: true,
    defaultProfile: "openclaw",

    // CDP settings
    cdpPorts: {
      start: 18800,
      end: 18899,
    },

    // Browser executable
    executablePath: null,

    // Display options
    headless: false,
    windowSize: {
      width: 1280,
      height: 720,
    },

    // Remote CDP
    remote: {
      url: null,
      token: null,
    },

    // Timeouts
    navigationTimeout: 30000,
    actionTimeout: 5000,

    // Screenshots
    screenshots: {
      format: "png",
      quality: 80,
    },
  },
}
```

## Xem thêm

- [Browser Login](/tools-skills/browser-login)
- [Chrome Extension](/tools-skills/chrome-extension)
- [Browser Troubleshooting](/tools-skills/browser-troubleshooting)
- [Tools Overview](/tools-skills/tools)
