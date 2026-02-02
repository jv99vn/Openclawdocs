# openclaw skills

Lệnh `openclaw skills` inspect bundled, workspace, và managed override skills, kiểm tra eligibility và requirements.

## Cú pháp

```bash
openclaw skills <command> [options]
```

## Commands

### List skills

```bash
# Tất cả skills
openclaw skills list

# Chỉ eligible skills
openclaw skills list --eligible
```

### Skill info

```bash
openclaw skills info <name>
```

### Check skills

```bash
openclaw skills check
```

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--eligible` | Chỉ hiển thị skills meeting requirements |
| `--json` | JSON output |
| `--verbose` | Detailed output |

## Skill Sources

Skills được load từ ba nguồn (theo thứ tự ưu tiên):

| Source | Location | Mô tả |
|--------|----------|-------|
| Workspace | `<workspace>/skills/` | User-defined skills |
| Managed | `~/.openclaw/skills/` | Managed overrides |
| Bundled | (trong package) | Skills đi kèm OpenClaw |

## Output Example

```
Skills
======

Name           | Source    | Status   | Requirements
---------------|-----------|----------|-------------
web-search     | bundled   | eligible | brave-api
file-manager   | bundled   | eligible | -
custom-skill   | workspace | eligible | -
disabled-skill | managed   | disabled | missing-dep
```

## Skill Structure

Mỗi skill thường có:
- `SKILL.md` - Metadata và documentation
- `handler.ts` - Implementation
- `requirements.json` - Dependencies (optional)

## Kiểm tra requirements

```bash
openclaw skills check
```

Output:
```
Checking skill requirements...

web-search:
  ✓ BRAVE_API_KEY set
  ✓ Network access available

file-manager:
  ✓ No requirements

custom-skill:
  ⚠ CUSTOM_API_KEY not set
```

## Xem thêm

- [Skills System](/concepts/tools)
- [Skills Configuration](/guide/concepts)
- [ClawHub](/concepts/clawhub)
