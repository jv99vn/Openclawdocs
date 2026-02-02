# macOS Dev Setup

Hướng dẫn thiết lập môi trường phát triển cho macOS companion app.

## Prerequisites

| Requirement | Version |
|-------------|---------|
| macOS | 12+ (Monterey) |
| Xcode | 14+ |
| Node.js | 22+ |
| pnpm | 8+ |

## Clone Repository

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

## Install Dependencies

```bash
pnpm install
```

## Build

### Development Build

```bash
pnpm dev:mac
```

### Production Build

```bash
pnpm build:mac
```

### Output

Built app tại: `dist/mac/OpenClaw.app`

## Development Workflow

### Start Dev Server

```bash
pnpm dev:mac
```

Điều này sẽ:
- Build TypeScript
- Start Electron in dev mode
- Enable hot reload

### Watch Mode

```bash
pnpm watch:mac
```

## Project Structure

```
mac/
├── src/
│   ├── main/           # Main process
│   │   ├── index.ts
│   │   ├── gateway.ts
│   │   ├── menu.ts
│   │   └── tray.ts
│   ├── renderer/       # Renderer process
│   │   ├── index.html
│   │   ├── app.tsx
│   │   └── components/
│   └── preload/        # Preload scripts
│       └── index.ts
├── resources/          # Icons, assets
└── electron-builder.yml
```

## Configuration

### electron-builder.yml

```yaml
appId: bot.molt.mac
productName: OpenClaw
directories:
  output: dist/mac
mac:
  category: public.app-category.productivity
  target:
    - dmg
    - zip
  entitlements: build/entitlements.mac.plist
  hardenedRuntime: true
```

### Entitlements

`build/entitlements.mac.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "...">
<plist version="1.0">
<dict>
  <key>com.apple.security.cs.allow-jit</key>
  <true/>
  <key>com.apple.security.device.audio-input</key>
  <true/>
  <key>com.apple.security.device.camera</key>
  <true/>
</dict>
</plist>
```

## Testing

### Unit Tests

```bash
pnpm test:mac
```

### E2E Tests

```bash
pnpm test:mac:e2e
```

## Debugging

### Main Process

1. Add `debugger` statement
2. Run with:
   ```bash
   pnpm dev:mac --inspect
   ```
3. Open `chrome://inspect`

### Renderer Process

DevTools tự động mở trong dev mode.

Hoặc: View → Toggle Developer Tools

## Signing & Notarization

### Requirements

- Apple Developer account
- Developer ID certificate
- Notarization credentials

### Environment Variables

```bash
export APPLE_ID="your@email.com"
export APPLE_ID_PASSWORD="app-specific-password"
export APPLE_TEAM_ID="TEAMID"
```

### Sign & Notarize

```bash
pnpm release:mac
```

## Troubleshooting

### Permission Issues

```bash
# Reset TCC
tccutil reset All bot.molt.mac.debug
```

### Build Fails

```bash
# Clean build
rm -rf dist/
rm -rf node_modules/.cache

# Reinstall
pnpm install --force

# Rebuild
pnpm build:mac
```

### Codesigning Issues

```bash
# List certificates
security find-identity -v -p codesigning

# Verify signature
codesign -dv --verbose=4 dist/mac/OpenClaw.app
```

## CI/CD

### GitHub Actions

```yaml
name: Build macOS

on: [push]

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: pnpm install
      - run: pnpm build:mac
```

## Xem thêm

- [macOS App](/platforms/macos)
- [Menu Bar](/macos-companion/menu-bar)
- [Voice Wake](/macos-companion/voice-wake)
