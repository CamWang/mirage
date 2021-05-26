import zhHans from 'vuetify/lib/locale/zh-Hans';

const message = {
  $vuetify: {
    ...zhHans
  },
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
  },
  home: {
    news: "新闻"
  },
  problem: {
    title: "问题列表",
    list: {
      number: "#",
      title: "标题",
      tags: "标签",
      submit: "提交",
      passrate: "通过率"
    },
    author: "作者",
    timelimit: "时间限制",
    memorylimit: "内存限制",
    spj: "特判",
  },
  blog: {
    title: "博客列表",
    list: {
      date: "日期",
      title: "标题",
      tags: "标签",
      author: "作者"
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
  },
  blog: {
    month: 'short',
    day: 'numeric'
  }
}

export {
  message,
  time
}