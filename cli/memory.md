# openclaw memory

Lệnh `openclaw memory` quản lý semantic memory indexing và search functionality.

## Cú pháp

```bash
openclaw memory <command> [options]
```

## Mô tả

Quản lý qua active memory plugin (mặc định: `memory-core`).

Disable memory:
```json5
{
  "plugins": {
    "slots": {
      "memory": "none"
    }
  }
}
```

## Commands

### Status

```bash
openclaw memory status
```

### Index

```bash
openclaw memory index
```

### Search

```bash
openclaw memory search "query"
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--agent <id>` | Target specific agent |
| `--verbose` | Comprehensive logging |
| `--deep` | Probe vector và embedding availability |
| `--index` | Trigger reindexing (với `--deep`) |

## Ví dụ sử dụng

### Check status

```bash
openclaw memory status --verbose
```

### Deep diagnostics với auto-reindex

```bash
openclaw memory status --deep --index
```

Triggers reindexing khi store cần updating.

### Search memory

```bash
openclaw memory search "previous conversation about deployment"
```

### Index specific agent

```bash
openclaw memory index --agent ops
```

## Memory Architecture

```
┌─────────────────┐
│  Conversations  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Embeddings    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vector Store   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Semantic Search│
└─────────────────┘
```

## Configuration

```json5
{
  "memory": {
    "enabled": true,
    "provider": "memory-core",
    "indexInterval": 3600,  // seconds
    "maxDocuments": 10000
  }
}
```

## Xem thêm

- [Memory Concepts](/guide/concepts)
- [Plugins](/cli/plugins)
