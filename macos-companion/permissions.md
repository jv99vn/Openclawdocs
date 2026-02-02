# macOS Permissions

macOS Companion app yêu cầu một số permissions để hoạt động đầy đủ.

## Tổng quan

OpenClaw yêu cầu permissions cho:
- Microphone (Voice features)
- Camera (Photo/video capture)
- Accessibility (Optional, for automation)
- Full Disk Access (Optional, for file access)

## Required Permissions

### Microphone

**Purpose:** Voice wake, voice input, audio transcription

**Grant:**
1. System Settings → Privacy & Security → Microphone
2. Enable **OpenClaw**

**Verify:**
```bash
# Check permission
tccutil reset Microphone com.openclaw.app
```

### Camera

**Purpose:** Photo capture, video recording

**Grant:**
1. System Settings → Privacy & Security → Camera
2. Enable **OpenClaw**

## Optional Permissions

### Accessibility

**Purpose:**
- Global keyboard shortcuts
- Window manipulation
- Screen reading

**Grant:**
1. System Settings → Privacy & Security → Accessibility
2. Click **+** → Add **OpenClaw**

### Full Disk Access

**Purpose:**
- Read files outside sandbox
- Access Downloads, Documents

**Grant:**
1. System Settings → Privacy & Security → Full Disk Access
2. Click **+** → Add **OpenClaw**

### Screen Recording

**Purpose:** Screen capture, screen sharing

**Grant:**
1. System Settings → Privacy & Security → Screen Recording
2. Enable **OpenClaw**

### Automation

**Purpose:** Control other apps

**Grant:**
1. System Settings → Privacy & Security → Automation
2. Enable permissions cho specific apps

## Permission Prompts

Khi app yêu cầu permission lần đầu:

1. Dialog xuất hiện
2. Click **OK** hoặc **Allow**
3. Permission được granted

### Reset Permission Prompt

```bash
# Reset microphone permission
tccutil reset Microphone com.openclaw.app

# Reset camera permission
tccutil reset Camera com.openclaw.app

# Reset all permissions
tccutil reset All com.openclaw.app
```

## Checking Permissions

### In App

**Preferences** → **Permissions** hiển thị status của mỗi permission.

### Via CLI

```bash
# Check all permissions
openclaw permissions list

# Check specific permission
openclaw permissions check microphone
```

## Troubleshooting

### Permission denied

1. Mở System Settings → Privacy & Security
2. Find relevant category
3. Enable OpenClaw
4. Restart app

### Permission prompt không xuất hiện

1. Reset permission (see above)
2. Restart app
3. Try action again

### Grayed out toggle

1. Close System Settings
2. Quit OpenClaw completely
3. Reopen System Settings
4. Try again

### "Allow in System Settings" button không hoạt động

1. Open System Settings manually
2. Navigate to correct section
3. Enable permission
4. Return to app

## Best Practices

### Minimum Permissions

Chỉ grant permissions bạn cần:

| Feature | Required Permissions |
|---------|---------------------|
| Basic chat | None |
| Voice wake | Microphone |
| Camera capture | Camera |
| File access | Full Disk Access |
| Global shortcuts | Accessibility |

### Security Considerations

- Review permissions định kỳ
- Revoke permissions không dùng
- Keep app updated

## Enterprise Deployment

### MDM Configuration

```xml
<dict>
  <key>PayloadType</key>
  <string>com.apple.TCC.configuration-profile-policy</string>
  <key>Services</key>
  <dict>
    <key>Microphone</key>
    <array>
      <dict>
        <key>Identifier</key>
        <string>com.openclaw.app</string>
        <key>Allowed</key>
        <true/>
      </dict>
    </array>
  </dict>
</dict>
```

### Silent Permission Grant

Via MDM, permissions có thể được pre-granted mà không cần user interaction.

## Xem thêm

- [Voice Wake](/macos-companion/voice-wake)
- [Camera Capture](/nodes-media/camera)
- [macOS Overview](/platforms/macos)
