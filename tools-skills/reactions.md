# Reactions

Reactions cho phép agent respond với emoji reactions thay vì hoặc bổ sung cho text responses.

## Tổng quan

- **Non-verbal feedback** - React mà không cần text
- **Quick acknowledgment** - Nhanh chóng confirm
- **Channel support** - Hỗ trợ nhiều platforms
- **Configurable** - Customize reaction behavior

## Supported Channels

| Channel | Reactions |
|---------|-----------|
| Discord | ✅ Full emoji set |
| Slack | ✅ Full emoji set |
| Telegram | ✅ Limited set |
| WhatsApp | ✅ Limited set |
| iMessage | ✅ Tapbacks |
| Signal | ✅ Limited set |

## How It Works

### Auto-Reactions

Agent tự động react dựa trên context:

```json5
{
  reactions: {
    auto: {
      enabled: true,
      rules: [
        { trigger: "thanks", reaction: "👍" },
        { trigger: "good job", reaction: "🎉" },
        { trigger: "?", reaction: "🤔" },
      ],
    },
  },
}
```

### Tool-Based

Agent uses tool để react:

```json
{
  "tool": "react",
  "params": {
    "messageId": "msg123",
    "emoji": "👍"
  }
}
```

## Configuration

### Basic

```json5
{
  reactions: {
    enabled: true,
    defaultReaction: "👍",
  },
}
```

### Full Configuration

```json5
{
  reactions: {
    enabled: true,

    // Auto reactions
    auto: {
      enabled: true,
      onAcknowledge: "👍",
      onThinking: "🤔",
      onComplete: "✅",
      onError: "❌",
    },

    // Channel-specific
    channels: {
      discord: {
        useCustomEmoji: true,
        customEmojis: {
          acknowledge: "<:ok:123456>",
        },
      },
      whatsapp: {
        enabled: true,
        // WhatsApp has limited reactions
      },
    },

    // Rules
    rules: [
      {
        trigger: "thanks",
        reaction: "❤️",
        probability: 0.8,
      },
    ],
  },
}
```

## Use Cases

### Acknowledgment

User: Please remind me about the meeting
Agent: [Reacts with 👍]
Agent: I'll remind you about the meeting at 3pm

### Processing Indicator

User: Analyze this data...
Agent: [Reacts with 🤔] (thinking)
Agent: [Removes 🤔, adds ✅] (done)
Agent: Here's my analysis...

### Feedback

User: Great work!
Agent: [Reacts with 🎉]

### Error Indication

User: Run impossible task
Agent: [Reacts with ❌]
Agent: Sorry, I cannot do that because...

## Platform Specifics

### Discord

Full custom emoji support:

```json5
{
  channels: {
    discord: {
      reactions: {
        useCustomEmoji: true,
        guildEmojis: {
          thinking: "<:thinking:123>",
          done: "<:done:456>",
        },
      },
    },
  },
}
```

### Slack

Workspace emoji support:

```json5
{
  channels: {
    slack: {
      reactions: {
        workspaceEmoji: true,
      },
    },
  },
}
```

### iMessage

Tapback reactions:

| Tapback | Meaning |
|---------|---------|
| ❤️ | Love |
| 👍 | Like |
| 👎 | Dislike |
| 😂 | Laugh |
| ‼️ | Emphasize |
| ❓ | Question |

### WhatsApp

Limited to standard reactions:
- 👍 👎 ❤️ 😂 😮 😢 🙏

## Tool: react

### Add Reaction

```json
{
  "tool": "react",
  "params": {
    "messageId": "msg123",
    "emoji": "👍"
  }
}
```

### Remove Reaction

```json
{
  "tool": "react",
  "params": {
    "messageId": "msg123",
    "emoji": "👍",
    "remove": true
  }
}
```

## Reaction Rules

### Pattern Matching

```json5
{
  reactions: {
    rules: [
      {
        pattern: "thank",
        reaction: "❤️",
      },
      {
        pattern: "\\?$",  // Ends with ?
        reaction: "🤔",
      },
    ],
  },
}
```

### Probability

```json5
{
  reactions: {
    rules: [
      {
        trigger: "thanks",
        reaction: "❤️",
        probability: 0.5,  // 50% chance
      },
    ],
  },
}
```

### Conditions

```json5
{
  reactions: {
    rules: [
      {
        trigger: "thanks",
        reaction: "❤️",
        conditions: {
          channel: ["discord", "slack"],
          time: "9:00-17:00",
        },
      },
    ],
  },
}
```

## Best Practices

### Appropriate Usage

- Use reactions cho quick acknowledgment
- Không overuse - có thể annoying
- Match channel culture

### Processing Indicators

- React với 🤔 khi thinking
- Remove và add ✅ khi done
- Provides visual feedback

## Troubleshooting

### Reactions không xuất hiện

1. Check channel support
2. Verify emoji valid
3. Check bot permissions

### Wrong emoji

1. Verify emoji format
2. Check channel-specific format
3. Use Unicode emoji

### Rate limited

1. Reduce reaction frequency
2. Check platform limits
3. Add delays between reactions

## Xem thêm

- [Channels Overview](/channels/overview)
- [Tools Overview](/tools-skills/tools)
- [Discord](/channels/discord)
- [Slack](/channels/slack)
