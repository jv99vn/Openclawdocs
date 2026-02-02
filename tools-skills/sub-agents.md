# Sub-Agents

Sub-Agents cho phép main agent delegate tasks cho specialized agents khác.

## Tổng quan

- **Specialization** - Mỗi sub-agent có expertise riêng
- **Delegation** - Main agent delegate tasks
- **Parallel** - Có thể chạy parallel
- **Isolation** - Mỗi sub-agent có context riêng

## How It Works

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

## Configuration

### Define Sub-Agents

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

### Enable Sub-Agent Routing

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

## Routing Modes

### Auto

Main agent tự động route dựa trên task:

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

### Manual

User explicitly chọn sub-agent:

```
/agent coder
Write a Python script to...
```

### Hybrid

Auto-suggest, user confirm:

```json5
{
  routing: {
    mode: "hybrid",
    confirmRouting: true,
  },
}
```

## Tool: delegate

Main agent sử dụng `delegate` tool:

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

## Parallel Execution

Multiple sub-agents có thể chạy parallel:

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

### Example

```
User: Research quantum computing and write a summary

Main Agent: [Delegates to both researcher and writer in parallel]
  ├─ researcher: [Searches and gathers info]
  └─ writer: [Waits for research, then writes summary]
```

## Context Sharing

### Shared Context

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

### Isolated Context

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

## Response Handling

### Merge

Combine responses từ multiple sub-agents:

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

### Sequential

Chain sub-agent responses:

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

## Use Cases

### Code Review

```
User: Review this code for bugs

Main Agent → coder (sub-agent)
              │
              └─ Analyzes code
              └─ Returns findings

Main Agent compiles response
```

### Research + Write

```
User: Write a report about AI trends

Main Agent:
  ├─ researcher: [Gathers information]
  └─ writer: [Writes report based on research]
```

### Multi-language

```
User: Translate and localize this content

Main Agent:
  ├─ translator: [Translates text]
  └─ localizer: [Adapts for local culture]
```

## Best Practices

### Specialization

Mỗi sub-agent nên có clear specialization:
- Specific system prompt
- Relevant tools only
- Appropriate model

### Token Efficiency

Sub-agents có context riêng → save tokens:
- Không cần full history
- Chỉ relevant context

### Error Handling

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

## Troubleshooting

### Routing incorrect

1. Review routing patterns
2. Use hybrid mode để debug
3. Check task analysis

### Sub-agent không respond

1. Verify agent configured
2. Check model available
3. Review sub-agent logs

### Slow response

1. Reduce parallel agents
2. Use faster models cho sub-agents
3. Simplify tasks

## Xem thêm

- [Multi-Agent Routing](/core-concepts/multi-agent-routing)
- [Agents Configuration](/cli/agents)
- [Tools Overview](/tools-skills/tools)
