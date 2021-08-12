module.exports = {
  title: "Mirage Documents",
  base: "/mirage/",
  themeConfig: {
    sidebar: {
      '/guide': [
        { text: '用户指南', link: '/guide/' },
      ],
      '/develop': [
        { text: '开发指南', link: '/develop/' },
        { text: 'Git常用指令', link: '/develop/git' },
        { text: '数据库', link: '/develop/database' },
      ]
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '用户指南', link: '/guide/' },
      { text: '开发指南', link: '/develop/' },
      { text: 'GitHub', link: 'https://github.com/CamWang/mirage' }
    ]
  }
}