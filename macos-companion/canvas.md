# Canvas

Canvas là drawing/rendering surface mà agent có thể điều khiển để hiển thị content, vẽ graphics, và interact với visual elements.

## Tổng quan

- **Agent-controlled** - Agent có thể vẽ và render
- **HTML/CSS/JS** - Web technologies
- **Snapshot** - Capture screenshots
- **Interactive** - User có thể interact

## Mở Canvas

### Menu Bar

Click **OpenClaw** → **Canvas**

### Keyboard

`⌘ + Shift + C`

### Voice

"Open canvas" hoặc "Show canvas"

## Agent Commands

### Navigate

Mở URL trong canvas:

```
node.invoke canvas navigate "https://example.com"
```

### Evaluate JavaScript

Chạy JS code:

```
node.invoke canvas eval "document.body.style.background = 'red'"
```

### Snapshot

Chụp screenshot:

```
node.invoke canvas snapshot --format jpeg --width 1920 --height 1080
```

## Use Cases

### Drawing

```
User: Draw a blue circle
Agent: [Uses canvas.eval to draw SVG circle]
```

### Data Visualization

```
User: Show me a chart of the data
Agent: [Uses canvas to render chart.js visualization]
```

### Preview

```
User: Preview this HTML
Agent: [Uses canvas.navigate to load HTML]
```

### Annotation

```
User: Annotate this image
Agent: [Loads image và draws annotations]
```

## Canvas Window

### Controls

| Control | Action |
|---------|--------|
| Resize | Drag window edges |
| Move | Drag title bar |
| Close | Click X hoặc Escape |
| Refresh | Click refresh button |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘ + R` | Refresh |
| `⌘ + W` | Close |
| `⌘ + +` | Zoom in |
| `⌘ + -` | Zoom out |
| `⌘ + 0` | Reset zoom |

## Configuration

```json5
{
  macos: {
    canvas: {
      // Default size
      width: 800,
      height: 600,

      // Default position
      position: "center",

      // Background
      background: "#ffffff",

      // Allow navigation
      allowNavigation: true,

      // Allow JavaScript
      allowJavaScript: true,
    },
  },
}
```

## Security

### Sandboxed

Canvas runs trong sandboxed WebView:
- Limited network access
- No file system access
- Isolated from main app

### Configuration

```json5
{
  macos: {
    canvas: {
      security: {
        allowExternalUrls: false,  // Chỉ local content
        allowScripts: true,
        contentSecurityPolicy: "default-src 'self'",
      },
    },
  },
}
```

## Canvas Host

Standalone canvas host chạy trên port 18793:

```bash
# Check canvas host
curl http://localhost:18793
```

### Remote Access

Canvas host có thể accessible từ nodes:

```json5
{
  canvas: {
    host: "0.0.0.0",
    port: 18793,
  },
}
```

## Troubleshooting

### Canvas không render

1. Check JavaScript enabled
2. Verify content valid
3. Check console errors (Developer Tools)

### Snapshot fails

1. Check canvas has content
2. Verify dimensions
3. Check memory usage

### Performance issues

1. Reduce canvas size
2. Simplify content
3. Check GPU acceleration

### External URLs blocked

1. Enable `allowExternalUrls` trong config
2. Check CSP settings
3. Verify network access

## Integration với Nodes

iOS và Android nodes cũng có canvas capability:

```bash
# List nodes với canvas
openclaw nodes list --capability canvas

# Invoke canvas trên specific node
node.invoke --target ios canvas navigate "https://example.com"
```

## Xem thêm

- [Menu Bar](/macos-companion/menu-bar)
- [Nodes](/nodes-media/nodes)
- [iOS App](/platforms/ios)
