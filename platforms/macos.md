# macOS App

OpenClaw companion app cho macOS với menu bar integration và voice features.

## Features

- Menu bar app
- Voice wake ("Hey OpenClaw")
- Voice overlay
- WebChat window
- Canvas rendering
- Gateway lifecycle management
- Notification actions

## Installation

### Download

Tải từ [OpenClaw website](https://openclaw.ai/download/macos).

### Homebrew

```bash
brew install --cask openclaw
```

### From Source

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm build:mac
```

## Setup

### First Launch

1. Move app to Applications
2. Launch OpenClaw
3. Grant permissions khi prompted
4. Complete onboarding wizard

### Permissions Required

| Permission | Purpose |
|------------|---------|
| Microphone | Voice input |
| Speech Recognition | Voice commands |
| Notifications | Alerts |
| Full Disk Access | File operations |
| Accessibility | Voice overlay |

### Grant Permissions

System Preferences → Security & Privacy → Privacy:

1. **Microphone** → Add OpenClaw
2. **Speech Recognition** → Add OpenClaw
3. **Accessibility** → Add OpenClaw
4. **Full Disk Access** → Add OpenClaw (optional)

## Menu Bar

### Icon Status

| Icon | Status |
|------|--------|
| 🟢 | Gateway running |
| 🔴 | Gateway stopped |
| 🟡 | Gateway starting |

### Menu Options

- Start/Stop Gateway
- Open Dashboard
- Open WebChat
- Preferences
- Quit

## Voice Wake

### Enable

```json5
{
  mac: {
    voiceWake: {
      enabled: true,
      phrase: "Hey OpenClaw",
      sensitivity: "medium",
    },
  },
}
```

### Usage

1. Say "Hey OpenClaw"
2. Wait for acknowledgment sound
3. Speak your request
4. Agent responds via voice (optional)

### Customization

```json5
{
  mac: {
    voiceWake: {
      enabled: true,
      phrase: "Hey Assistant",  // Custom wake phrase
      sensitivity: "high",       // low | medium | high
      timeout: 10000,            // ms to listen
      responseVoice: true,       // Speak responses
    },
  },
}
```

## Voice Overlay

Floating overlay khi voice active:

```json5
{
  mac: {
    voiceOverlay: {
      enabled: true,
      position: "top-right",
      size: "compact",
    },
  },
}
```

## WebChat Window

Built-in chat window:

- Keyboard shortcut: `Cmd+Shift+O`
- Always-on-top option
- Resizable
- Dark mode support

## Gateway Management

### Auto-start

```json5
{
  mac: {
    gateway: {
      autoStart: true,
      startOnLogin: true,
    },
  },
}
```

### Service

App manages LaunchAgent automatically:

```bash
# Check status
openclaw gateway status

# Manual control
launchctl list | grep openclaw
```

## Canvas

Canvas window cho agent-generated content:

- HTML rendering
- Interactive elements
- Presentations
- Charts

## Preferences

### General

- Start at login
- Show in menu bar
- Auto-update

### Voice

- Enable voice wake
- Wake phrase
- Sensitivity
- Response voice

### Gateway

- Auto-start gateway
- Port
- Bind address

### Appearance

- Theme (light/dark/system)
- Menu bar icon style
- Overlay position

## Troubleshooting

### App Crashes on Permission

```bash
tccutil reset All bot.molt.mac.debug
```

Sau đó grant lại permissions.

### Gateway Stuck

```bash
# Stop existing
openclaw gateway stop

# Clear port
lsof -nP -iTCP:18789 -sTCP:LISTEN

# Restart
openclaw gateway
```

### Voice Not Working

1. Check microphone permission
2. Check Speech Recognition permission
3. Test microphone in System Preferences
4. Reset permissions:
   ```bash
   tccutil reset Microphone bot.molt.mac.debug
   ```

### Logs

```bash
# App logs
cat ~/Library/Logs/OpenClaw/app.log

# Gateway logs
cat ~/.openclaw/logs/gateway.log
```

## Development

### Dev Setup

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm dev:mac
```

### Build

```bash
pnpm build:mac
```

### Sign & Notarize

```bash
pnpm release:mac
```

## Configuration

```json5
{
  mac: {
    // Voice
    voiceWake: {
      enabled: true,
      phrase: "Hey OpenClaw",
      sensitivity: "medium",
      timeout: 10000,
      responseVoice: true,
    },

    // Overlay
    voiceOverlay: {
      enabled: true,
      position: "top-right",
    },

    // Gateway
    gateway: {
      autoStart: true,
      startOnLogin: true,
    },

    // Appearance
    appearance: {
      theme: "system",
      menuBarIcon: "default",
    },

    // WebChat
    webChat: {
      alwaysOnTop: false,
      rememberPosition: true,
    },
  },
}
```

## Xem thêm

- [macOS Companion Overview](/macos-companion/dev-setup)
- [Voice Wake](/macos-companion/voice-wake)
- [Voice Overlay](/macos-companion/voice-overlay)
- [Gateway on macOS](/macos-companion/gateway-lifecycle)
