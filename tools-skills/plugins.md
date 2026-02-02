# Plugins (Tiện ích mở rộng)

Plugins mở rộng chức năng của OpenClaw với thêm tools, channels, và providers.

## Tổng quan

- **Mở rộng được** - Thêm tính năng mới
- **Module hóa** - Cài đặt chỉ những gì cần
- **Cộng đồng** - Plugins từ cộng đồng
- **Chính thức** - Plugins chính thức từ OpenClaw team

## Loại Plugin

| Loại | Mô tả |
|------|-------|
| **Channel** | Nền tảng nhắn tin mới |
| **Provider** | Nhà cung cấp LLM mới |
| **Tool** | Công cụ agent mới |
| **Skill** | Kỹ năng agent mới |
| **Integration** | Tích hợp bên thứ ba |

## Lệnh CLI

### Liệt kê đã cài

```bash
openclaw plugins list
```

### Tìm kiếm có sẵn

```bash
openclaw plugins search voice
```

### Cài đặt

```bash
openclaw plugins install @openclaw/voice-call
```

### Gỡ cài đặt

```bash
openclaw plugins uninstall @openclaw/voice-call
```

### Cập nhật

```bash
# Cập nhật plugin cụ thể
openclaw plugins update @openclaw/voice-call

# Cập nhật tất cả plugins
openclaw plugins update --all
```

## Plugins chính thức

### Kênh

| Plugin | Mô tả |
|--------|-------|
| `@openclaw/zalo` | Tin nhắn Zalo |
| `@openclaw/line` | Tin nhắn LINE |
| `@openclaw/matrix` | Giao thức Matrix |

### Công cụ

| Plugin | Mô tả |
|--------|-------|
| `@openclaw/voice-call` | Gọi thoại |
| `@openclaw/code-interpreter` | Thực thi code |
| `@openclaw/image-gen` | Tạo hình ảnh |

### Tích hợp

| Plugin | Mô tả |
|--------|-------|
| `@openclaw/notion` | Tích hợp Notion |
| `@openclaw/github` | Tích hợp GitHub |
| `@openclaw/calendar` | Tích hợp Lịch |

## Cấu hình

### Bật/Tắt

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

### Cài đặt Plugin

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

## Cài đặt từ nguồn

### npm

```bash
openclaw plugins install @openclaw/plugin-name
```

### GitHub

```bash
openclaw plugins install github:user/repo
```

### Địa phương

```bash
openclaw plugins install ./path/to/plugin
```

## Phát triển Plugin

### Cấu trúc

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

### Ví dụ Tool

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

## API Plugin

### Hooks vòng đời

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

### Truy cập Gateway

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

## Kho Plugin

Kho plugins chính thức:
```
https://plugins.openclaw.ai
```

### Xuất bản

```bash
# Login
openclaw plugins login

# Publish
openclaw plugins publish
```

## Bảo mật

### Quyền hạn

Plugins yêu cầu quyền:

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

### Sandbox

Plugins chạy trong môi trường cô lập:
- Truy cập file giới hạn
- Hạn chế mạng
- Không truy cập hệ thống trực tiếp

### Đánh giá

Plugins chính thức được đánh giá trước khi xuất bản.

## Khắc phục sự cố

### Plugin không tải

1. Kiểm tra tương thích:
   ```bash
   openclaw plugins check @plugin/name
   ```
2. Xác nhận dependencies
3. Kiểm tra logs

### Xung đột

```bash
# Kiểm tra xung đột
openclaw plugins conflicts

# Giải quyết
openclaw plugins resolve
```

### Cập nhật thất bại

```bash
# Cài đặt lại bắt buộc
openclaw plugins install --force @plugin/name
```

## Xem thêm

- [Tools Overview](/tools-skills/tools)
- [Skills](/tools-skills/skills)
- [CLI plugins](/cli/plugins)
