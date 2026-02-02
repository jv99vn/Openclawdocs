# Sub-Agents (Agent phụ)

Sub-Agents cho phép agent chính ủy thác công việc cho các agent chuyên biệt khác.

## Tổng quan

- **Chuyên môn hóa** - Mỗi sub-agent có chuyên môn riêng
- **Ủy thác** - Agent chính ủy thác công việc
- **Song song** - Có thể chạy đồng thời
- **Cô lập** - Mỗi sub-agent có ngữ cảnh riêng

## Cách hoạt động

```
User Message → Main Agent → [Analyze task]
                              │
                              ├─ Simple task → Handle directly
                              │
                              └─ Complex task → Delegate to Sub-Agent
                                                    │
                                                    └─ Sub-Agent responds
                                                          │
                                                          └─ Main Agent compiles response
```

## Cấu hình

### Định nghĩa Sub-Agents

```json5
{
  agents: {
    // Main agent
    main: {
      model: "anthropic/claude-sonnet-4",
      systemPrompt: "You are a helpful assistant...",
    },

    // Sub-agents
    coder: {
      model: "anthropic/claude-sonnet-4",
      systemPrompt: "You are an expert programmer...",
      tools: ["exec", "browser"],
    },

    researcher: {
      model: "openai/gpt-4o",
      systemPrompt: "You are a research specialist...",
      tools: ["web.search", "web.fetch"],
    },

    writer: {
      model: "anthropic/claude-opus-4",
      systemPrompt: "You are a professional writer...",
      thinking: "high",
    },
  },
}
```

### Bật định tuyến Sub-Agent

```json5
{
  agents: {
    main: {
      subAgents: ["coder", "researcher", "writer"],
      routing: {
        enabled: true,
        mode: "auto",  // auto | manual | hybrid
      },
    },
  },
}
```

## Chế độ định tuyến

### Tự động

Agent chính tự động định tuyến dựa trên công việc:

```json5
{
  routing: {
    mode: "auto",
    patterns: {
      coder: ["code", "programming", "debug"],
      researcher: ["research", "find", "search"],
      writer: ["write", "draft", "compose"],
    },
  },
}
```

### Thủ công

Người dùng chọn sub-agent rõ ràng:

```
/agent coder
Write a Python script to...
```

### Kết hợp

Tự động gợi ý, người dùng xác nhận:

```json5
{
  routing: {
    mode: "hybrid",
    confirmRouting: true,
  },
}
```

## Tool: ủy thác

Agent chính sử dụng `delegate` tool:

```json
{
  "tool": "delegate",
  "params": {
    "agent": "coder",
    "task": "Write a Python function to sort a list",
    "context": "Additional context..."
  }
}
```

## Thực thi song song

Nhiều sub-agents có thể chạy đồng thời:

```json5
{
  agents: {
    main: {
      routing: {
        parallel: true,
        maxParallel: 3,
      },
    },
  },
}
```

### Ví dụ

```
User: Research quantum computing and write a summary

Main Agent: [Delegates to both researcher and writer in parallel]
  ├─ researcher: [Searches and gathers info]
  └─ writer: [Waits for research, then writes summary]
```

## Chia sẻ ngữ cảnh

### Ngữ cảnh chung

```json5
{
  agents: {
    main: {
      routing: {
        shareContext: true,  // Sub-agents see main context
      },
    },
  },
}
```

### Ngữ cảnh cô lập

```json5
{
  agents: {
    main: {
      routing: {
        shareContext: false,  // Clean slate for sub-agents
      },
    },
  },
}
```

## Xử lý phản hồi

### Gộp

Kết hợp phản hồi từ nhiều sub-agents:

```json5
{
  agents: {
    main: {
      routing: {
        responseMode: "merge",
      },
    },
  },
}
```

### Tuần tự

Chuỗi phản hồi sub-agent:

```json5
{
  agents: {
    main: {
      routing: {
        responseMode: "sequential",
        chain: ["researcher", "writer"],
      },
    },
  },
}
```

## Trường hợp sử dụng

### Đánh giá code

```
User: Review this code for bugs

Main Agent → coder (sub-agent)
              │
              └─ Analyzes code
              └─ Returns findings

Main Agent compiles response
```

### Nghiên cứu + Viết

```
User: Write a report about AI trends

Main Agent:
  ├─ researcher: [Gathers information]
  └─ writer: [Writes report based on research]
```

### Đa ngôn ngữ

```
User: Translate and localize this content

Main Agent:
  ├─ translator: [Translates text]
  └─ localizer: [Adapts for local culture]
```

## Thực hành tốt nhất

### Chuyên môn hóa

Mỗi sub-agent nên có chuyên môn rõ ràng:
- System prompt cụ thể
- Chỉ các tools liên quan
- Model phù hợp

### Tiết kiệm token

Sub-agents có ngữ cảnh riêng → tiết kiệm tokens:
- Không cần lịch sử đầy đủ
- Chỉ ngữ cảnh liên quan

### Xử lý lỗi

```json5
{
  agents: {
    main: {
      routing: {
        onError: "fallback",  // fallback | retry | fail
        fallbackAgent: "main",
      },
    },
  },
}
```

## Khắc phục sự cố

### Định tuyến sai

1. Xem lại các patterns định tuyến
2. Dùng chế độ kết hợp để debug
3. Kiểm tra phân tích tác vụ

### Sub-agent không phản hồi

1. Xác nhận agent đã cấu hình
2. Kiểm tra model có sẵn
3. Xem logs của sub-agent

### Phản hồi chậm

1. Giảm số lượng agent song song
2. Dùng models nhanh hơn cho sub-agents
3. Đơn giản hóa các tác vụ

## Xem thêm

- [Multi-Agent Routing](/core-concepts/multi-agent-routing)
- [Agents Configuration](/cli/agents)
- [Tools Overview](/tools-skills/tools)
