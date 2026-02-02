# Memory

OpenClaw's memory system cho phép agents nhớ thông tin qua các sessions.

## Tổng quan

Memory system bao gồm:

| Type | Mô tả | Persistence |
|------|-------|-------------|
| **Session Memory** | Conversation history trong session | Per-session |
| **Long-term Memory** | Facts và preferences | Persistent |
| **Workspace Memory** | Project-specific context | Per-workspace |

## Long-term Memory

### Enable Memory

```json5
{
  agents: {
    defaults: {
      memory: {
        enabled: true,
        provider: "local",  // local | external
      },
    },
  },
}
```

### Memory Operations

#### Save Memory

Agents tự động save important facts:

```
User: Tên tôi là Minh
Assistant: [Saves: User's name is Minh]
```

#### Recall Memory

```
User: Tên tôi là gì?
Assistant: [Recalls: User's name is Minh]
Tên bạn là Minh.
```

### Manual Memory Commands

```
/remember My favorite color is blue
/forget favorite color
/memories
```

## Memory Storage

### Local Storage

```
~/.openclaw/agents/<agentId>/memory/
├── facts.json
├── preferences.json
└── context.json
```

### Memory File Format

```json
{
  "facts": [
    {
      "key": "user_name",
      "value": "Minh",
      "created": "2024-01-15T10:00:00Z",
      "source": "user_stated"
    }
  ],
  "preferences": [
    {
      "key": "language",
      "value": "vietnamese",
      "confidence": 0.9
    }
  ]
}
```

## Memory Configuration

### Basic Config

```json5
{
  agents: {
    defaults: {
      memory: {
        enabled: true,
        maxFacts: 1000,
        maxAge: "365d",
      },
    },
  },
}
```

### Auto-save Settings

```json5
{
  agents: {
    defaults: {
      memory: {
        autoSave: {
          enabled: true,
          threshold: 0.8,  // Confidence threshold
          categories: ["facts", "preferences", "relationships"],
        },
      },
    },
  },
}
```

### Privacy Settings

```json5
{
  agents: {
    defaults: {
      memory: {
        privacy: {
          excludePatterns: [
            "password",
            "secret",
            "credit card",
          ],
          encryptAtRest: true,
        },
      },
    },
  },
}
```

## Memory Injection

Memory được inject vào context khi relevant:

```json5
{
  agents: {
    defaults: {
      memory: {
        injection: {
          enabled: true,
          maxItems: 10,
          relevanceThreshold: 0.7,
        },
      },
    },
  },
}
```

## CLI Commands

### List Memories

```bash
openclaw memory list
openclaw memory list --agent main
```

### Add Memory

```bash
openclaw memory add "User prefers dark mode"
```

### Delete Memory

```bash
openclaw memory delete <memory-id>
openclaw memory clear --agent main
```

### Export/Import

```bash
openclaw memory export --output memories.json
openclaw memory import memories.json
```

## Session Memory Hook

Tự động save session summary to memory:

```json5
{
  hooks: {
    sessionMemory: {
      enabled: true,
      onSessionEnd: true,
      summaryPrompt: "Summarize key facts from this conversation",
    },
  },
}
```

## Memory Categories

### Facts

Objective information về user hoặc context:

```json
{
  "category": "fact",
  "key": "user_location",
  "value": "Ho Chi Minh City, Vietnam"
}
```

### Preferences

User preferences và settings:

```json
{
  "category": "preference",
  "key": "response_style",
  "value": "concise and technical"
}
```

### Relationships

Connections và associations:

```json
{
  "category": "relationship",
  "key": "colleague",
  "value": "John works with user on Project X"
}
```

## External Memory Providers

### Pinecone

```json5
{
  agents: {
    defaults: {
      memory: {
        provider: "pinecone",
        pinecone: {
          apiKey: "${PINECONE_API_KEY}",
          environment: "us-west1-gcp",
          indexName: "openclaw-memory",
        },
      },
    },
  },
}
```

### Weaviate

```json5
{
  agents: {
    defaults: {
      memory: {
        provider: "weaviate",
        weaviate: {
          url: "http://localhost:8080",
          className: "OpenClawMemory",
        },
      },
    },
  },
}
```

## Troubleshooting

### Memory not saving

1. Check config:
   ```bash
   openclaw config get agents.defaults.memory
   ```

2. Check permissions:
   ```bash
   ls -la ~/.openclaw/agents/main/memory/
   ```

### Memory not recalled

1. Check relevance threshold
2. Verify memory exists:
   ```bash
   openclaw memory list
   ```

## Xem thêm

- [Sessions](/core-concepts/sessions)
- [Session Management](/core-concepts/session-management)
- [Context](/core-concepts/context)
