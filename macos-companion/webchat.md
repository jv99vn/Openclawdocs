# WebChat (macOS)

macOS Companion app bao gồm built-in WebChat interface để chat trực tiếp với agent.

## Tổng quan

- **Native integration** - Integrated trong macOS app
- **Full-featured** - Tất cả tính năng của WebChat
- **Keyboard shortcuts** - macOS native shortcuts
- **Notifications** - System notifications

## Mở WebChat

### Menu Bar

Click **OpenClaw** → **New Chat**

### Keyboard

`⌘ + Shift + O`

### Dock

Double-click OpenClaw trong Dock

## Features

### Chat Interface

- Message input
- Response streaming
- Tool execution display
- File attachments

### Sessions

- Multiple sessions
- Session switching
- Session history

### Attachments

- Drag & drop files
- Paste images
- Upload documents

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘ + Enter` | Send message |
| `⌘ + K` | Command palette |
| `⌘ + N` | New session |
| `⌘ + W` | Close window |
| `⌘ + ,` | Preferences |
| `⌘ + [` | Previous session |
| `⌘ + ]` | Next session |
| `Escape` | Cancel/Stop |

## Window Management

### Multiple Windows

```
⌘ + N → New window
```

### Split View

Drag window to screen edge cho Split View.

### Full Screen

```
⌃ + ⌘ + F → Toggle full screen
```

## Configuration

```json5
{
  macos: {
    webchat: {
      // Window
      defaultWidth: 800,
      defaultHeight: 600,
      rememberPosition: true,

      // Behavior
      showInDock: true,
      activateOnMessage: true,

      // Appearance
      theme: "auto",
      fontSize: 14,
    },
  },
}
```

## Notifications

### Message Notifications

```json5
{
  macos: {
    webchat: {
      notifications: {
        enabled: true,
        sound: true,
        badge: true,
      },
    },
  },
}
```

### Do Not Disturb

Respects macOS Focus/Do Not Disturb settings.

## Integration

### Services Menu

WebChat integrates với macOS Services:
- **Text** → Send to OpenClaw
- **Selected text** → Ask OpenClaw

### Share Menu

Share content đến OpenClaw từ other apps.

## Comparison với Browser WebChat

| Feature | macOS App | Browser |
|---------|-----------|---------|
| Native notifications | ✅ | Limited |
| Keyboard shortcuts | Full | Limited |
| System integration | ✅ | ❌ |
| Offline indicator | ✅ | ✅ |
| Memory usage | Lower | Higher |

## Troubleshooting

### Window không mở

1. Check app đang running
2. Check Gateway connected
3. Restart app

### Messages không gửi được

1. Check Gateway status
2. Verify network connection
3. Check logs

### Slow performance

1. Clear chat history
2. Reduce context window
3. Check memory usage

### Notifications không hoạt động

1. System Settings → Notifications → OpenClaw
2. Enable alerts
3. Check Focus mode

## Xem thêm

- [Web Interfaces](/web-interfaces/web)
- [Control UI](/web-interfaces/control-ui)
- [Menu Bar](/macos-companion/menu-bar)
