# Khắc phục sự cố 🔧

Khi OpenClaw gặp sự cố, đây là cách khắc phục.

Bắt đầu với [60 giây đầu tiên](/help/faq#first-60-seconds-if-somethings-broken) trong FAQ nếu bạn chỉ cần công thức triage nhanh. Trang này đi sâu hơn về runtime failures và diagnostics.

Shortcuts theo provider: [/channels/troubleshooting](/channels/troubleshooting)

---

## Status & Diagnostics

Các lệnh triage nhanh (theo thứ tự):

| Lệnh | Cho biết gì | Khi nào dùng |
|------|-------------|--------------|
| `openclaw status` | Local summary: OS + update, gateway reachability/mode, service, agents/sessions, provider config state | Kiểm tra đầu tiên, overview nhanh |
| `openclaw status --all` | Full local diagnosis (read-only, pasteable, safe-ish) bao gồm log tail | Khi cần share debug report |
| `openclaw status --deep` | Chạy gateway health checks (bao gồm provider probes; yêu cầu gateway reachable) | Khi "configured" không có nghĩa là "working" |
| `openclaw gateway probe` | Gateway discovery + reachability (local + remote targets) | Khi nghi ngờ đang probe sai gateway |
| `openclaw channels status --probe` | Hỏi running gateway về channel status (và optionally probes) | Khi gateway reachable nhưng channels misbehave |
| `openclaw gateway status` | Supervisor state (launchd/systemd/schtasks), runtime PID/exit, last gateway error | Khi service "looks loaded" nhưng không chạy gì |
| `openclaw logs --follow` | Live logs (best signal cho runtime issues) | Khi cần actual failure reason |

**Sharing output:** ưu tiên `openclaw status --all` (nó redacts tokens). Nếu bạn paste `openclaw status`, cân nhắc set `OPENCLAW_SHOW_SECRETS=0` trước (token previews).

Xem thêm: [Health checks](/gateway-ops/health) và [Logging](/gateway-ops/logging).

---

## Các vấn đề phổ biến

### No API key found for provider "anthropic"

Điều này có nghĩa auth store của agent trống hoặc thiếu Anthropic credentials. Auth là per agent, nên agent mới sẽ không inherit keys của main agent.

**Các cách fix:**

* Re-run onboarding và chọn **Anthropic** cho agent đó.
* Hoặc paste setup-token trên gateway host:
  ```bash
  openclaw models auth setup-token --provider anthropic
  ```
* Hoặc copy `auth-profiles.json` từ main agent dir sang new agent dir.

**Verify:**

```bash
openclaw models status
```

### OAuth token refresh failed (Anthropic Claude subscription)

Điều này có nghĩa stored Anthropic OAuth token đã expired và refresh failed. Nếu bạn đang dùng Claude subscription (không có API key), fix đáng tin cậy nhất là chuyển sang **Claude Code setup-token** và paste trên gateway host.

**Khuyến nghị (setup-token):**

```bash
# Chạy trên gateway host (paste setup-token)
openclaw models auth setup-token --provider anthropic
openclaw models status
```

Nếu bạn generated token ở nơi khác:

```bash
openclaw models auth paste-token --provider anthropic
openclaw models status
```

Chi tiết: [Anthropic](/providers/anthropic) và [OAuth](/core-concepts/oauth).

### Control UI fails on HTTP ("device identity required" / "connect failed")

Nếu bạn mở dashboard qua plain HTTP (ví dụ `http://<lan-ip>:18789/` hoặc `http://<tailscale-ip>:18789/`), browser chạy trong non-secure context và blocks WebCrypto, nên device identity không thể được generated.

**Fix:**

* Ưu tiên HTTPS qua [Tailscale Serve](/gateway-ops/tailscale).
* Hoặc mở locally trên gateway host: `http://127.0.0.1:18789/`.
* Nếu phải stay trên HTTP, enable `gateway.controlUi.allowInsecureAuth: true` và sử dụng gateway token (token-only; không có device identity/pairing). Xem [Control UI](/web-interfaces/control-ui#insecure-http).

### CI Secrets Scan Failed

Điều này có nghĩa `detect-secrets` tìm thấy new candidates chưa có trong baseline. Follow [Secret scanning](/gateway-ops/security#secret-scanning-detect-secrets).

### Service Installed but Nothing is Running

Nếu gateway service đã installed nhưng process exits immediately, service có thể appear "loaded" trong khi không có gì running.

**Check:**

```bash
openclaw gateway status
openclaw doctor
```

Doctor/service sẽ show runtime state (PID/last exit) và log hints.

**Logs:**

* Preferred: `openclaw logs --follow`
* File logs (always): `/tmp/openclaw/openclaw-YYYY-MM-DD.log` (hoặc configured `logging.file`)
* macOS LaunchAgent (nếu installed): `$OPENCLAW_STATE_DIR/logs/gateway.log` và `gateway.err.log`
* Linux systemd (nếu installed): `journalctl --user -u openclaw-gateway[-<profile>].service -n 200 --no-pager`
* Windows: `schtasks /Query /TN "OpenClaw Gateway (<profile>)" /V /FO LIST`

**Enable more logging:**

* Bump file log detail (persisted JSONL):
  ```json
  { "logging": { "level": "debug" } }
  ```
* Bump console verbosity (TTY output only):
  ```json
  { "logging": { "consoleLevel": "debug", "consoleStyle": "pretty" } }
  ```
* Quick tip: `--verbose` affects console output only. File logs vẫn controlled bởi `logging.level`.

Xem [/logging](/gateway-ops/logging) cho full overview về formats, config, và access.

### "Gateway start blocked: set gateway.mode=local"

Điều này có nghĩa config exists nhưng `gateway.mode` chưa set (hoặc không phải `local`), nên Gateway refuses to start.

**Fix (khuyến nghị):**

* Chạy wizard và set Gateway run mode thành **Local**:
  ```bash
  openclaw configure
  ```
* Hoặc set trực tiếp:
  ```bash
  openclaw config set gateway.mode local
  ```

**Nếu bạn meant to run remote Gateway instead:**

* Set remote URL và keep `gateway.mode=remote`:
  ```bash
  openclaw config set gateway.mode remote
  openclaw config set gateway.remote.url "wss://gateway.example.com"
  ```

**Ad-hoc/dev only:** pass `--allow-unconfigured` để start gateway without `gateway.mode=local`.

**Chưa có config file?** Chạy `openclaw setup` để create starter config, sau đó rerun gateway.

### Service Environment (PATH + runtime)

Gateway service chạy với minimal PATH để avoid shell/manager cruft:

* macOS: `/opt/homebrew/bin`, `/usr/local/bin`, `/usr/bin`, `/bin`
* Linux: `/usr/local/bin`, `/usr/bin`, `/bin`

Điều này intentionally excludes version managers (nvm/fnm/volta/asdf) và package managers (pnpm/npm) vì service không load shell init của bạn. Runtime variables như `DISPLAY` nên live trong `~/.openclaw/.env` (loaded sớm bởi gateway).

Exec runs trên `host=gateway` merge login-shell `PATH` của bạn vào exec environment, nên missing tools thường có nghĩa shell init của bạn không exporting chúng (hoặc set `tools.exec.pathPrepend`). Xem [/tools/exec](/tools-skills/exec).

WhatsApp + Telegram channels yêu cầu **Node**; Bun không được hỗ trợ. Nếu service của bạn được installed với Bun hoặc version-managed Node path, chạy `openclaw doctor` để migrate sang system Node install.

### Skill missing API key in sandbox

**Triệu chứng:** Skill works trên host nhưng fails trong sandbox với missing API key.

**Tại sao:** sandboxed exec chạy inside Docker và không inherit host `process.env`.

**Fix:**

* set `agents.defaults.sandbox.docker.env` (hoặc per-agent `agents.list[].sandbox.docker.env`)
* hoặc bake key vào custom sandbox image của bạn
* sau đó chạy `openclaw sandbox recreate --agent <id>` (hoặc `--all`)

### Service Running but Port Not Listening

Nếu service reports running nhưng không có gì listening trên gateway port, Gateway có thể đã refused to bind.

**"running" có nghĩa gì ở đây**

* `Runtime: running` có nghĩa supervisor của bạn (launchd/systemd/schtasks) thinks process is alive.
* `RPC probe` có nghĩa CLI có thể actually connect tới gateway WebSocket và call `status`.
* Luôn trust `Probe target:` + `Config (service):` như các dòng "what did we actually try?".

**Check:**

* `gateway.mode` phải là `local` cho `openclaw gateway` và service.
* Nếu bạn set `gateway.mode=remote`, CLI defaults tới remote URL. Service vẫn có thể running locally, nhưng CLI của bạn có thể đang probing sai chỗ. Sử dụng `openclaw gateway status` để xem resolved port + probe target của service (hoặc pass `--url`).
* `openclaw gateway status` và `openclaw doctor` surface last gateway error từ logs khi service looks running nhưng port đóng.
* Non-loopback binds (`lan`/`tailnet`/`custom`, hoặc `auto` khi loopback không available) yêu cầu auth: `gateway.auth.token` (hoặc `OPENCLAW_GATEWAY_TOKEN`).
* `gateway.remote.token` chỉ cho remote CLI calls; nó không enable local auth.
* `gateway.token` bị ignored; sử dụng `gateway.auth.token`.

### Address Already in Use (Port 18789)

Điều này có nghĩa something đang listening trên gateway port.

**Check:**

```bash
openclaw gateway status
```

Nó sẽ show listener(s) và likely causes (gateway already running, SSH tunnel). Nếu cần, stop service hoặc pick port khác.

### Extra Workspace Folders Detected

Nếu bạn upgraded từ older installs, bạn có thể vẫn có `~/openclaw` trên disk. Multiple workspace directories có thể gây confusing auth hoặc state drift vì chỉ một workspace active.

**Fix:** giữ single active workspace và archive/remove phần còn lại. Xem [Agent workspace](/core-concepts/agent-workspace#extra-workspace-folders).

### "Agent was aborted"

Agent bị interrupted mid-response.

**Nguyên nhân:**

* User sent `stop`, `abort`, `esc`, `wait`, hoặc `exit`
* Timeout exceeded
* Process crashed

**Fix:** Chỉ cần gửi message khác. Session continues.

### "Agent failed before reply: Unknown model: anthropic/claude-haiku-3-5"

OpenClaw intentionally rejects older/insecure models (đặc biệt những model dễ bị prompt injection). Nếu bạn thấy error này, model name không còn được supported.

**Fix:**

* Pick latest model cho provider và update config hoặc model alias của bạn.
* Nếu không chắc models nào available, chạy `openclaw models list` hoặc `openclaw models scan` và chọn supported one.
* Check gateway logs cho detailed failure reason.

Xem thêm: [Models CLI](/cli/models) và [Model providers](/core-concepts/model-providers).

### Messages Not Triggering

**Check 1:** Sender có được allowlisted không?

```bash
openclaw status
```

Tìm `AllowFrom: ...` trong output.

**Check 2:** Cho group chats, mention có required không?

```bash
grep -n "agents\\|groupChat\\|mentionPatterns\\|channels\\.whatsapp\\.groups\\|channels\\.telegram\\.groups\\|channels\\.imessage\\.groups\\|channels\\.discord\\.guilds" \
  "${OPENCLAW_CONFIG_PATH:-$HOME/.openclaw/openclaw.json}"
```

**Check 3:** Check logs

```bash
openclaw logs --follow
# hoặc nếu muốn quick filters:
tail -f "$(ls -t /tmp/openclaw/openclaw-*.log | head -1)" | grep "blocked\\|skip\\|unauthorized"
```

### Image + Mention Not Working

Known issue: Khi bạn gửi image với CHỈ mention (không có text khác), WhatsApp đôi khi không include mention metadata.

**Workaround:** Thêm text với mention:

* ❌ `@openclaw` + image
* ✅ `@openclaw check this` + image

### Session Not Resuming

**Check 1:** Session file có ở đó không?

```bash
ls -la ~/.openclaw/agents/<agentId>/sessions/
```

**Check 2:** Reset window có quá ngắn không?

```json
{
  "session": {
    "reset": {
      "mode": "daily",
      "atHour": 4,
      "idleMinutes": 10080
    }
  }
}
```

**Check 3:** Có ai sent `/new`, `/reset`, hoặc reset trigger không?

### Agent Timing Out

Default timeout là 30 phút. Cho long tasks:

```json
{
  "reply": {
    "timeoutSeconds": 3600
  }
}
```

Hoặc sử dụng `process` tool để background long commands.

### WhatsApp Disconnected

```bash
# Check local status (creds, sessions, queued events)
openclaw status
# Probe running gateway + channels (WA connect + Telegram + Discord APIs)
openclaw status --deep

# View recent connection events
openclaw logs --limit 200 | grep "connection\\|disconnect\\|logout"
```

**Fix:** Thường reconnects automatically khi Gateway running. Nếu stuck, restart Gateway process, hoặc chạy manually với verbose output:

```bash
openclaw gateway --verbose
```

Nếu bạn logged out / unlinked:

```bash
openclaw channels logout
trash "${OPENCLAW_STATE_DIR:-$HOME/.openclaw}/credentials"
openclaw channels login --verbose
```

### Media Send Failing

**Check 1:** File path có valid không?

```bash
ls -la /path/to/your/image.jpg
```

**Check 2:** Có quá lớn không?

* Images: max 6MB
* Audio/Video: max 16MB
* Documents: max 100MB

**Check 3:** Check media logs

```bash
grep "media\\|fetch\\|download" "$(ls -t /tmp/openclaw/openclaw-*.log | head -1)" | tail -20
```

### High Memory Usage

OpenClaw giữ conversation history trong memory.

**Fix:** Restart định kỳ hoặc set session limits:

```json
{
  "session": {
    "historyLimit": 100
  }
}
```

---

## macOS Specific Issues

### App Crashes when Granting Permissions (Speech/Mic)

Nếu app disappears hoặc shows "Abort trap 6" khi bạn click "Allow" trên privacy prompt:

**Fix 1: Reset TCC Cache**

```bash
tccutil reset All bot.molt.mac.debug
```

**Fix 2: Force New Bundle ID**

Nếu resetting không work, change `BUNDLE_ID` trong `scripts/package-mac-app.sh` (ví dụ thêm `.test` suffix) và rebuild. Điều này forces macOS treat nó như new app.

### Gateway stuck on "Starting..."

App connects tới local gateway trên port 18789. Nếu stuck:

**Fix 1: Stop supervisor (preferred)**

```bash
openclaw gateway status
openclaw gateway stop
```

**Fix 2: Port busy (find listener)**

```bash
lsof -nP -iTCP:18789 -sTCP:LISTEN
```

---

## Debug Mode

Get verbose logging:

```bash
# Turn on trace logging in config:
# { logging: { level: "trace" } }

# Then run verbose commands:
openclaw gateway --verbose
openclaw channels login --verbose
```

---

## Log Locations

| Log | Vị trí |
|-----|--------|
| Gateway file logs (structured) | `/tmp/openclaw/openclaw-YYYY-MM-DD.log` (hoặc `logging.file`) |
| Gateway service logs (supervisor) | macOS: `$OPENCLAW_STATE_DIR/logs/gateway.log`<br />Linux: `journalctl --user -u openclaw-gateway.service` |
| Session files | `$OPENCLAW_STATE_DIR/agents/<agentId>/sessions/` |
| Media cache | `$OPENCLAW_STATE_DIR/media/` |
| Credentials | `$OPENCLAW_STATE_DIR/credentials/` |

---

## Health Check

```bash
# Supervisor + probe target + config paths
openclaw gateway status
# Include system-level scans
openclaw gateway status --deep

# Is gateway reachable?
openclaw health --json

# Is something listening on default port?
lsof -nP -iTCP:18789 -sTCP:LISTEN

# Recent activity
openclaw logs --follow
```

---

## Reset Everything

Nuclear option:

```bash
openclaw gateway stop
trash "${OPENCLAW_STATE_DIR:-$HOME/.openclaw}"
openclaw channels login
openclaw gateway restart
```

⚠️ Điều này loses tất cả sessions và yêu cầu re-pairing WhatsApp.

---

## Getting Help

1. Check logs trước: `/tmp/openclaw/`
2. Search existing issues trên GitHub
3. Open new issue với:
   * OpenClaw version
   * Relevant log snippets
   * Steps to reproduce
   * Config của bạn (redact secrets!)

---

*"Have you tried turning it off and on again?"* — Every IT person ever

🦞🔧
