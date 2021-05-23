import zhHans from 'vuetify/lib/locale/zh-Hans';

const message = {
  ...zhHans,
  name: "简体中文",
  notify: {
    theme: {
      dark: "暗黑模式已开启",
      light: "白天模式已开启"
    },
    lang: {
      change: "语言切换成功"
    }
  },
  head: {
    title: "Mirage OJ",
    tab: {
      home: "主页",
      problem: "问题",
      contest: "比赛",
      blog: "博客"
    }
  }
}

const time = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  },
  long: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }
}

export {
  message,
  time
}