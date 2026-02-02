import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OpenClaw Docs",
  description: "Tài liệu OpenClaw bằng Tiếng Việt",
  lang: 'vi-VN',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Trang chủ', link: '/' },
      { text: 'Bắt đầu', link: '/start-here/getting-started' },
      { text: 'Khái niệm', link: '/core-concepts/gateway-architecture' },
      { text: 'Channels', link: '/channels/whatsapp' },
      { text: 'CLI', link: '/cli/setup' },
      { text: 'Trợ giúp', link: '/help/faq' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Bắt đầu',
          collapsed: false,
          items: [
            { text: 'Bắt đầu nhanh', link: '/start-here/getting-started' },
            { text: 'Thiết lập', link: '/start-here/setup' },
            { text: 'Ghép nối', link: '/start-here/pairing' },
            { text: 'Onboarding macOS', link: '/start-here/onboarding' },
            { text: 'Showcase', link: '/start-here/showcase' }
          ]
        },
        {
          text: 'Trợ giúp',
          collapsed: false,
          items: [
            { text: 'FAQ', link: '/help/faq' },
            { text: 'Khắc phục sự cố', link: '/help/troubleshooting' }
          ]
        },
        {
          text: 'Cài đặt & Cập nhật',
          collapsed: false,
          items: [
            { text: 'Cài đặt', link: '/install/install' },
            { text: 'Cập nhật', link: '/install/updating' },
            { text: 'Gỡ cài đặt', link: '/install/uninstall' }
          ]
        },
        {
          text: 'Core Concepts',
          collapsed: false,
          items: [
            { text: 'Gateway Architecture', link: '/core-concepts/gateway-architecture' },
            { text: 'System Prompt', link: '/core-concepts/system-prompt' },
            { text: 'Agent Runtime', link: '/core-concepts/agent-runtime' },
            { text: 'Agent Loop', link: '/core-concepts/agent-loop' },
            { text: 'Context', link: '/core-concepts/context' },
            { text: 'Token Use and Costs', link: '/core-concepts/token-costs' },
            { text: 'OAuth', link: '/core-concepts/oauth' },
            { text: 'Agent Workspace', link: '/core-concepts/agent-workspace' },
            { text: 'Memory', link: '/core-concepts/memory' },
            { text: 'Multi-Agent Routing', link: '/core-concepts/multi-agent-routing' },
            { text: 'Session Management', link: '/core-concepts/session-management' },
            { text: 'Sessions', link: '/core-concepts/sessions' },
            { text: 'Session Tools', link: '/core-concepts/session-tools' },
            { text: 'Channel Routing', link: '/core-concepts/channel-routing' },
            { text: 'Messages', link: '/core-concepts/messages' },
            { text: 'Streaming and Chunking', link: '/core-concepts/streaming' },
            { text: 'Groups', link: '/core-concepts/groups' },
            { text: 'Model Providers', link: '/core-concepts/model-providers' },
            { text: 'Model Failover', link: '/core-concepts/model-failover' },
            { text: 'Timezones', link: '/core-concepts/timezones' }
          ]
        },
        {
          text: 'Gateway & Ops',
          collapsed: true,
          items: [
            { text: 'Gateway Runbook', link: '/gateway-ops/gateway-runbook' },
            { text: 'Gateway Protocol', link: '/gateway-ops/protocol' },
            { text: 'Configuration', link: '/gateway-ops/configuration' },
            { text: 'Environment Variables', link: '/gateway-ops/environment-variables' },
            { text: 'Authentication', link: '/gateway-ops/authentication' },
            { text: 'Health Checks', link: '/gateway-ops/health-checks' },
            { text: 'Logging', link: '/gateway-ops/logging' },
            { text: 'Security', link: '/gateway-ops/security' },
            { text: 'Sandboxing', link: '/gateway-ops/sandboxing' },
            { text: 'Troubleshooting', link: '/gateway-ops/troubleshooting' },
            { text: 'Remote Access', link: '/gateway-ops/remote-access' },
            { text: 'Tailscale', link: '/gateway-ops/tailscale' }
          ]
        },
        {
          text: 'Web & Interfaces',
          collapsed: true,
          items: [
            { text: 'Web', link: '/web-interfaces/web' },
            { text: 'Control UI', link: '/web-interfaces/control-ui' },
            { text: 'Dashboard', link: '/web-interfaces/dashboard' },
            { text: 'WebChat', link: '/web-interfaces/webchat' },
            { text: 'TUI', link: '/web-interfaces/tui' }
          ]
        },
        {
          text: 'Channels',
          collapsed: false,
          items: [
            { text: 'Chat Channels', link: '/channels/overview' },
            { text: 'WhatsApp', link: '/channels/whatsapp' },
            { text: 'Telegram', link: '/channels/telegram' },
            { text: 'Discord', link: '/channels/discord' },
            { text: 'Slack', link: '/channels/slack' },
            { text: 'Google Chat', link: '/channels/google-chat' },
            { text: 'Mattermost', link: '/channels/mattermost' },
            { text: 'Signal', link: '/channels/signal' },
            { text: 'iMessage', link: '/channels/imessage' },
            { text: 'Microsoft Teams', link: '/channels/teams' },
            { text: 'LINE', link: '/channels/line' },
            { text: 'Matrix', link: '/channels/matrix' },
            { text: 'Zalo', link: '/channels/zalo' },
            { text: 'Channel Troubleshooting', link: '/channels/troubleshooting' }
          ]
        },
        {
          text: 'Providers',
          collapsed: true,
          items: [
            { text: 'Model Providers', link: '/providers/overview' },
            { text: 'Anthropic', link: '/providers/anthropic' },
            { text: 'OpenAI', link: '/providers/openai' },
            { text: 'Amazon Bedrock', link: '/providers/bedrock' },
            { text: 'MiniMax', link: '/providers/minimax' },
            { text: 'OpenRouter', link: '/providers/openrouter' },
            { text: 'Venice AI', link: '/providers/venice' },
            { text: 'Ollama', link: '/providers/ollama' },
            { text: 'Z.AI', link: '/providers/zai' }
          ]
        },
        {
          text: 'Automation & Hooks',
          collapsed: true,
          items: [
            { text: 'Hooks', link: '/automation-hooks/hooks' },
            { text: 'Webhooks', link: '/automation-hooks/webhooks' },
            { text: 'Cron Jobs', link: '/automation-hooks/cron-jobs' },
            { text: 'Gmail PubSub', link: '/automation-hooks/gmail-pubsub' },
            { text: 'Polls', link: '/automation-hooks/polls' }
          ]
        },
        {
          text: 'Tools & Skills',
          collapsed: true,
          items: [
            { text: 'Tools', link: '/tools-skills/tools' },
            { text: 'Browser', link: '/tools-skills/browser' },
            { text: 'Exec Tool', link: '/tools-skills/exec' },
            { text: 'Web Tools', link: '/tools-skills/web-tools' },
            { text: 'Plugins', link: '/tools-skills/plugins' },
            { text: 'Skills', link: '/tools-skills/skills' },
            { text: 'Slash Commands', link: '/tools-skills/slash-commands' },
            { text: 'Sub-Agents', link: '/tools-skills/sub-agents' },
            { text: 'Reactions', link: '/tools-skills/reactions' }
          ]
        },
        {
          text: 'Nodes & Media',
          collapsed: true,
          items: [
            { text: 'Nodes', link: '/nodes-media/nodes' },
            { text: 'Camera Capture', link: '/nodes-media/camera' },
            { text: 'Image and Media', link: '/nodes-media/image-media' },
            { text: 'Audio and Voice', link: '/nodes-media/audio-voice' },
            { text: 'Location', link: '/nodes-media/location' },
            { text: 'Voice Wake', link: '/nodes-media/voice-wake' },
            { text: 'Talk Mode', link: '/nodes-media/talk-mode' }
          ]
        },
        {
          text: 'Platforms',
          collapsed: true,
          items: [
            { text: 'Platforms Overview', link: '/platforms/overview' },
            { text: 'macOS App', link: '/platforms/macos' },
            { text: 'iOS App', link: '/platforms/ios' },
            { text: 'Android App', link: '/platforms/android' },
            { text: 'Windows (WSL2)', link: '/platforms/windows' },
            { text: 'Linux App', link: '/platforms/linux' },
            { text: 'Fly.io', link: '/platforms/flyio' },
            { text: 'Hetzner', link: '/platforms/hetzner' },
            { text: 'GCP', link: '/platforms/gcp' }
          ]
        },
        {
          text: 'macOS Companion App',
          collapsed: true,
          items: [
            { text: 'macOS Dev Setup', link: '/macos-companion/dev-setup' },
            { text: 'Menu Bar', link: '/macos-companion/menu-bar' },
            { text: 'Voice Wake', link: '/macos-companion/voice-wake' },
            { text: 'Voice Overlay', link: '/macos-companion/voice-overlay' },
            { text: 'WebChat', link: '/macos-companion/webchat' },
            { text: 'Canvas', link: '/macos-companion/canvas' },
            { text: 'Gateway Lifecycle', link: '/macos-companion/gateway-lifecycle' },
            { text: 'Health Checks', link: '/macos-companion/health-checks' },
            { text: 'macOS Permissions', link: '/macos-companion/permissions' },
            { text: 'Remote Control', link: '/macos-companion/remote-control' }
          ]
        },
        {
          text: 'CLI Reference',
          collapsed: true,
          items: [
            { text: 'setup', link: '/cli/setup' },
            { text: 'onboard', link: '/cli/onboard' },
            { text: 'configure', link: '/cli/configure' },
            { text: 'doctor', link: '/cli/doctor' },
            { text: 'dashboard', link: '/cli/dashboard' },
            { text: 'reset', link: '/cli/reset' },
            { text: 'browser', link: '/cli/browser' },
            { text: 'message', link: '/cli/message' },
            { text: 'agent', link: '/cli/agent' },
            { text: 'agents', link: '/cli/agents' },
            { text: 'status', link: '/cli/status' },
            { text: 'health', link: '/cli/health' },
            { text: 'sessions', link: '/cli/sessions' },
            { text: 'channels', link: '/cli/channels' },
            { text: 'directory', link: '/cli/directory' },
            { text: 'skills', link: '/cli/skills' },
            { text: 'plugins', link: '/cli/plugins' },
            { text: 'memory', link: '/cli/memory' },
            { text: 'models', link: '/cli/models' },
            { text: 'logs', link: '/cli/logs' },
            { text: 'system', link: '/cli/system' },
            { text: 'nodes', link: '/cli/nodes' },
            { text: 'gateway', link: '/cli/gateway' },
            { text: 'hooks', link: '/cli/hooks' },
            { text: 'pairing', link: '/cli/pairing' },
            { text: 'security', link: '/cli/security' },
            { text: 'update', link: '/cli/update' },
            { text: 'tui', link: '/cli/tui' },
            { text: 'cron', link: '/cli/cron' },
            { text: 'voicecall', link: '/cli/voicecall' }
          ]
        },
        {
          text: 'Reference & Templates',
          collapsed: true,
          items: [
            { text: 'Testing', link: '/reference-templates/testing' },
            { text: 'Scripts', link: '/reference-templates/scripts' },
            { text: 'AGENTS.md', link: '/reference-templates/agents' },
            { text: 'SOUL.md', link: '/reference-templates/soul' },
            { text: 'TOOLS.md', link: '/reference-templates/tools' },
            { text: 'IDENTITY.md', link: '/reference-templates/identity' },
            { text: 'USER.md', link: '/reference-templates/user' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/openclaw/openclaw' }
    ],

    footer: {
      message: 'Phát hành theo giấy phép MIT.',
      copyright: 'Bản quyền © 2024 - OpenClaw'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Tìm kiếm',
            buttonAriaLabel: 'Tìm kiếm'
          },
          modal: {
            noResultsText: 'Không tìm thấy kết quả cho',
            resetButtonTitle: 'Xóa tìm kiếm',
            footer: {
              selectText: 'để chọn',
              navigateText: 'để điều hướng'
            }
          }
        }
      }
    },

    outline: {
      label: 'Mục lục'
    },

    docFooter: {
      prev: 'Trang trước',
      next: 'Trang tiếp'
    },

    lastUpdated: {
      text: 'Cập nhật lần cuối'
    },

    returnToTopLabel: 'Về đầu trang',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Giao diện',
    lightModeSwitchTitle: 'Chuyển sang chế độ sáng',
    darkModeSwitchTitle: 'Chuyển sang chế độ tối'
  }
})
