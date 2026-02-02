# Location

OpenClaw có thể access location data từ mobile nodes để cung cấp location-aware responses.

## Tổng quan

- **GPS location** - Precise coordinates
- **Privacy-first** - User-controlled
- **Multi-platform** - iOS, Android
- **Contextual** - Location-aware responses

## Capabilities

| Feature | iOS | Android |
|---------|-----|---------|
| Current location | ✅ | ✅ |
| Location updates | ✅ | ✅ |
| Geofencing | ✅ | ✅ |
| Background | ⚠️ | ⚠️ |

## Commands

### Get Current Location

```bash
node.invoke location current
```

Response:
```json
{
  "latitude": 10.762622,
  "longitude": 106.660172,
  "accuracy": 10,
  "altitude": 15,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Watch Location

```bash
node.invoke location watch --interval 60
```

Subscribe đến location updates.

### Stop Watching

```bash
node.invoke location stop
```

## Permissions

### iOS

1. First request triggers prompt
2. Choose: "While Using" hoặc "Always"
3. Settings → Privacy → Location Services → OpenClaw

### Android

1. Runtime permission request
2. Choose: "While Using" hoặc "Allow All the Time"
3. Settings → Apps → OpenClaw → Permissions → Location

## Accuracy Levels

| Level | Accuracy | Battery |
|-------|----------|---------|
| High | ~10m | High |
| Medium | ~100m | Medium |
| Low | ~1km | Low |

### Configuration

```json5
{
  nodes: {
    location: {
      accuracy: "medium",  // high | medium | low
    },
  },
}
```

## Privacy

### User Control

Location access hoàn toàn do user control:
- Grant/revoke anytime
- Choose accuracy level
- Enable/disable trong app

### Data Handling

```json5
{
  nodes: {
    location: {
      // Không lưu history
      saveHistory: false,

      // Chỉ dùng cho current request
      ephemeral: true,
    },
  },
}
```

## Use Cases

### Weather

```
User: What's the weather like here?
Agent: [Gets location, fetches weather]
       It's 28°C and sunny in Ho Chi Minh City
```

### Directions

```
User: How do I get to the nearest coffee shop?
Agent: [Gets location, searches nearby]
       The nearest coffee shop is Starbucks, 500m away
```

### Check-in

```
User: I'm at the office
Agent: [Records location for context]
       Noted. Do you want me to remind you of your tasks?
```

### Geofencing

```
User: Remind me to buy groceries when I leave the office
Agent: [Sets up geofence]
       I'll remind you when you leave the office area
```

## Configuration

```json5
{
  nodes: {
    location: {
      enabled: true,

      // Accuracy
      accuracy: "medium",

      // Update settings
      minInterval: 60000,     // ms
      minDistance: 100,       // meters

      // Background
      allowBackground: false,

      // Privacy
      saveHistory: false,
      shareWithAgent: true,
    },
  },
}
```

## Background Location

::: warning Battery Impact
Background location significantly impacts battery life.
:::

### iOS

Requires "Always" permission và Background Modes capability.

### Android

Requires "Allow All the Time" permission và foreground service.

### Configuration

```json5
{
  nodes: {
    location: {
      allowBackground: true,
      backgroundAccuracy: "low",  // Save battery
    },
  },
}
```

## Troubleshooting

### Location không available

1. Check permission granted
2. Verify GPS enabled
3. Check location services on
4. Move to area có GPS signal

### Inaccurate location

1. Enable high accuracy
2. Move outdoors
3. Wait for GPS fix
4. Check device GPS hardware

### Updates không received

1. Verify watch mode active
2. Check app không bị suspended
3. Increase update interval

### Permission denied

1. **iOS:** Settings → Privacy → Location Services → OpenClaw
2. **Android:** Settings → Apps → OpenClaw → Permissions → Location

## Xem thêm

- [Nodes Overview](/nodes-media/nodes)
- [iOS App](/platforms/ios)
- [Android App](/platforms/android)
