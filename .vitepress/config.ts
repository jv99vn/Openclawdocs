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
      { text: 'Khái niệm', link: '/concepts/architecture' },
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
          text: 'Khái niệm',
          collapsed: false,
          items: [
            { text: 'Kiến trúc', link: '/concepts/architecture' },
            { text: 'Gateway', link: '/concepts/gateway' },
            { text: 'Web UI', link: '/concepts/web' },
            { text: 'Kênh trò chuyện', link: '/concepts/channels' },
            { text: 'Nhà cung cấp Model', link: '/concepts/providers' },
            { text: 'Hooks', link: '/concepts/hooks' },
            { text: 'Công cụ (Tools)', link: '/concepts/tools' },
            { text: 'Nodes', link: '/concepts/nodes' },
            { text: 'Nền tảng', link: '/concepts/platforms' }
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
            { text: 'models', link: '/cli/models' }
          ]
        },
        {
          text: 'Hướng dẫn cũ',
          collapsed: true,
          items: [
            { text: 'Cài đặt', link: '/guide/install' },
            { text: 'Khái niệm', link: '/guide/concepts' },
            { text: 'Trợ giúp', link: '/guide/help' },
            { text: 'Gateway', link: '/guide/gateway' },
            { text: 'Web', link: '/guide/web' },
            { text: 'Channels', link: '/guide/channels' },
            { text: 'Providers', link: '/guide/providers' },
            { text: 'Hooks', link: '/guide/hooks' },
            { text: 'Nodes', link: '/guide/nodes' },
            { text: 'Platforms', link: '/guide/platforms' },
            { text: 'Testing', link: '/guide/testing' }
          ]
        },
        {
          text: 'Tham khảo',
          collapsed: true,
          items: [
            { text: 'CLI Reference', link: '/reference/cli' },
            { text: 'Tools Reference', link: '/reference/tools' }
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
