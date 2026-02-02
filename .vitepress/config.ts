import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OpenClaw Docs",
  description: "Tài liệu OpenClaw bằng Tiếng Việt",
  lang: 'vi-VN',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Trang chủ', link: '/' },
      { text: 'Hướng dẫn', link: '/guide/install' },
      { text: 'Tham khảo', link: '/reference/cli' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Bắt đầu',
          items: [
            { text: 'Cài đặt', link: '/guide/install' },
            { text: 'Khái niệm', link: '/guide/concepts' },
            { text: 'Trợ giúp', link: '/guide/help' }
          ]
        },
        {
          text: 'Cấu hình',
          items: [
            { text: 'Gateway', link: '/guide/gateway' },
            { text: 'Giao diện Web', link: '/guide/web' },
            { text: 'Kênh trò chuyện', link: '/guide/channels' },
            { text: 'Nhà cung cấp Model', link: '/guide/providers' }
          ]
        },
        {
          text: 'Nâng cao',
          items: [
            { text: 'Hooks', link: '/guide/hooks' },
            { text: 'Nodes', link: '/guide/nodes' },
            { text: 'Nền tảng', link: '/guide/platforms' },
            { text: 'Kiểm thử', link: '/guide/testing' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Tham khảo',
          items: [
            { text: 'CLI Reference', link: '/reference/cli' },
            { text: 'Công cụ (Tools)', link: '/reference/tools' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/openclaw' }
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
