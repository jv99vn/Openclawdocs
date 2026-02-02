# Web Tools

Web Tools cung cấp khả năng tương tác với web: fetch URLs, search, và interact với web pages.

## Tổng quan

- **URL Fetch** - Lấy nội dung từ URLs
- **Web Search** - Tìm kiếm trên web
- **Screenshot** - Chụp web pages
- **Form Fill** - Điền forms tự động

## Available Tools

### web.fetch

Fetch nội dung từ URL:

```json
{
  "tool": "web.fetch",
  "params": {
    "url": "https://example.com",
    "format": "markdown"
  }
}
```

#### Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `url` | string | (required) | URL to fetch |
| `format` | string | "markdown" | Output format |
| `timeout` | number | 30000 | Timeout ms |

#### Formats

- `markdown` - Convert HTML → Markdown
- `text` - Plain text
- `html` - Raw HTML
- `json` - Parse as JSON

### web.search

Tìm kiếm trên web:

```json
{
  "tool": "web.search",
  "params": {
    "query": "OpenClaw documentation",
    "limit": 10
  }
}
```

#### Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `query` | string | (required) | Search query |
| `limit` | number | 10 | Max results |
| `engine` | string | "auto" | Search engine |

### web.screenshot

Chụp screenshot của webpage:

```json
{
  "tool": "web.screenshot",
  "params": {
    "url": "https://example.com",
    "fullPage": true
  }
}
```

#### Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `url` | string | (required) | URL to screenshot |
| `fullPage` | boolean | false | Capture full page |
| `width` | number | 1280 | Viewport width |
| `height` | number | 720 | Viewport height |

## Search Engines

### Auto

Tự động chọn available engine:

```json5
{
  tools: {
    web: {
      search: {
        engine: "auto",
      },
    },
  },
}
```

### Specific Engine

| Engine | Requirements |
|--------|--------------|
| Google | API key |
| DuckDuckGo | None |
| Bing | API key |
| Brave | API key |

```json5
{
  tools: {
    web: {
      search: {
        engine: "google",
        apiKey: "${GOOGLE_API_KEY}",
        cx: "${GOOGLE_CX}",
      },
    },
  },
}
```

## Configuration

```json5
{
  tools: {
    web: {
      enabled: true,

      // Fetch settings
      fetch: {
        timeout: 30000,
        maxSize: 10485760,  // 10MB
        userAgent: "OpenClaw/1.0",
        followRedirects: true,
        maxRedirects: 5,
      },

      // Search settings
      search: {
        engine: "auto",
        safeSearch: "moderate",
        limit: 10,
      },

      // Screenshot settings
      screenshot: {
        format: "png",
        quality: 80,
        timeout: 30000,
      },

      // Security
      allowlist: [],  // Empty = allow all
      denylist: [
        "localhost",
        "127.0.0.1",
        "*.local",
      ],
    },
  },
}
```

## Rate Limiting

```json5
{
  tools: {
    web: {
      rateLimit: {
        requests: 60,      // per minute
        perDomain: 10,     // per domain per minute
      },
    },
  },
}
```

## Caching

```json5
{
  tools: {
    web: {
      cache: {
        enabled: true,
        ttl: 3600,  // seconds
        maxSize: 104857600,  // 100MB
      },
    },
  },
}
```

## Use Cases

### Research

```
User: Find information about quantum computing
Agent: [Uses web.search to find articles]
       [Uses web.fetch to read detailed content]
       Here's what I found about quantum computing...
```

### Content Summary

```
User: Summarize this article: https://example.com/article
Agent: [Uses web.fetch to get content]
       Here's the summary...
```

### Visual Capture

```
User: Show me what example.com looks like
Agent: [Uses web.screenshot]
       Here's a screenshot of the page...
```

## Security

### URL Allowlist/Denylist

```json5
{
  tools: {
    web: {
      allowlist: [
        "docs.openclaw.ai",
        "github.com",
      ],
      denylist: [
        "localhost",
        "*.internal",
      ],
    },
  },
}
```

### SSRF Protection

Built-in protection chống Server-Side Request Forgery:
- Block private IPs
- Block localhost
- DNS rebinding protection

## Error Handling

| Error | Description |
|-------|-------------|
| `TIMEOUT` | Request timed out |
| `BLOCKED` | URL blocked by policy |
| `NOT_FOUND` | 404 response |
| `RATE_LIMITED` | Too many requests |
| `INVALID_URL` | Malformed URL |

## Troubleshooting

### Fetch fails

1. Check URL accessible
2. Verify not blocked
3. Increase timeout
4. Check network connectivity

### Search returns no results

1. Refine search query
2. Check search engine configured
3. Verify API key valid

### Screenshot blank

1. Check URL loads correctly
2. Increase timeout
3. Verify browser available

## Xem thêm

- [Browser](/tools-skills/browser)
- [Tools Overview](/tools-skills/tools)
- [Exec Tool](/tools-skills/exec)
