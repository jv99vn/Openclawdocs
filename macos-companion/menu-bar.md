# Menu Bar

macOS Companion app hiển thị menu bar icon để quick access các tính năng chính.

## Tổng quan

- **Status indicator** - Hiển thị trạng thái Gateway
- **Quick actions** - Access nhanh các tính năng
- **Notifications** - Hiển thị alerts và messages

## Menu Bar Icon

### Status Colors

| Color | Meaning |
|-------|---------|
| 🟢 Green | Gateway running, connected |
| 🟡 Yellow | Connecting/Reconnecting |
| 🔴 Red | Gateway stopped/Error |
| ⚪ Gray | App inactive |

## Menu Items

### Gateway

- **Start Gateway** - Khởi động Gateway
- **Stop Gateway** - Dừng Gateway
- **Restart Gateway** - Restart Gateway
- **Open Dashboard** - Mở Control UI trong browser

### Quick Actions

- **New Chat** - Mở WebChat
- **Voice Mode** - Toggle voice mode
- **Canvas** - Mở Canvas window

### Settings

- **Preferences** - Mở settings window
- **Check for Updates** - Kiểm tra updates
- **About** - Thông tin app

### Advanced

- **View Logs** - Mở log viewer
- **Open Config** - Edit config file
- **Terminal** - Open terminal với OpenClaw

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘ + Shift + O` | Open OpenClaw |
| `⌘ + Shift + V` | Toggle Voice Mode |
| `⌘ + Shift + C` | Open Canvas |

## Notifications

### Types

- **Message received** - New message từ channels
- **Approval required** - Execution approval needed
- **Error** - Gateway hoặc channel errors

### Configuration

```json5
{
  macos: {
    notifications: {
      enabled: true,
      sound: true,
      badge: true,
    },
  },
}
```

## Login Items

App có thể tự start khi login:

1. **System Settings** → **General** → **Login Items**
2. Add **OpenClaw** to list

Hoặc trong app:
- **Preferences** → **General** → **Start at login**

## Troubleshooting

### Icon không hiển thị

1. Check app đang running
2. Check System Settings → Control Center → Menu Bar
3. Restart app

### Menu không responsive

1. Check Gateway status
2. Restart app
3. Check Console.app cho errors

### Notifications không hoạt động

1. System Settings → Notifications → OpenClaw
2. Enable alerts
3. Check Do Not Disturb mode

## Xem thêm

- [macOS Overview](/platforms/macos)
- [Voice Wake](/macos-companion/voice-wake)
- [Canvas](/macos-companion/canvas)
