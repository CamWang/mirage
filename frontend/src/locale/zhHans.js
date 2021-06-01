import zhHans from 'vuetify/lib/locale/zh-Hans';

const message = {
  $vuetify: {
    ...zhHans
  },
  name: "简体中文",

  route: {
    back: "返回",
  },

  // 通知内容
  axios: {
    request: {
      error: "请求失败",
    },
    response: {
      error: "服务错误",
    },
  },

  auth: {
    login: "登录后可执行此操作",
    denied: "权限不足",
    toolow: {
      teacher: "需要最低老师权限来访问",
      admin: "需要最低管理员权限来访问",
    },
    auth: "权限",
    teacher: "教师",
    admin: "管理员",
  },

  refresh: {
    success: "刷新成功"
  },

  dialog: {
    yes: "确定",
    cancel: "取消",
  },

  notify: {
    theme: {
      dark: "暗黑模式已开启",
      light: "白天模式已开启"
    },
    lang: {
      change: "语言切换成功"
    },
    verify: "请按正确格式填写表单内容",
    login: {
      success: "成功登录",
      fail: "登录失败，请检查用户名和密码",
      logined: "已登录请先退出登录",
    },
    register: {
      success: "成功注册",
      fail: "注册失败，请联系管理员",
      repeat: "该用户名已被占用"
    },
    logout: {
      logouted: "已经登出了",
      success: "成功登出",
    }
  },

  // 页面内容
  head: {
    title: "Mirage OJ",
    tab: {
      home: "主页",
      problem: "问题",
      contest: "比赛",
      blog: "博客"
    },
    profile: "个人信息",
    submit: "解题记录",
    contest: "比赛作业",
    random: "随机一题"
  },

  home: {
    news: "新闻"
  },

  // status: {
  //   DEF: "默认",
  //   SCE: "安全错误",
  //   CE: "编译错误",
  //   RE: "运行错误",
  //   TLE: "运行超时",
  //   MLE: "内存超限",
  //   OLE: "输出超限",
  //   PE: "格式错误",
  //   WA: "解答错误",
  //   AC: "解答正确"
  // },
  status: {
    abbr: [
      "DEF",
      "SCE",
      "CE",
      "RE",
      "TLE",
      "MLE",
      "OLE",
      "PE",
      "WA",
      "AC"
    ],
    full: [
      "默认",
      "安全错误",
      "编译错误",
      "运行错误",
      "运行超时",
      "内存超限",
      "输出超限",
      "格式错误",
      "解答错误",
      "解答正确"
    ]
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
    detail: {
      lang: "编程语言",
      editor: "编辑器",
      submit: "提交题解",
    },
    reload: {
      title: "重载代码编辑器？",
      message: "您确定要重载代码编辑器么？所有代码将重置。请做好备份准备后确定。"
    }
  },

  blog: {
    title: "博客列表",
    list: {
      date: "日期",
      title: "标题",
      tags: "标签",
      author: "作者"
    },
    detail: {
      name: "博客"
    },
    comment: {
      name: "评论"
    }
  },

  contest: {
    title: "比赛列表",
    list: {
      title: "名称",
      tags: "标签",
      start: "开始",
      end: "结束",
      last: "持续",
      mode: {
        name: "参加模式",
        public: "公开比赛",
        private: "私有比赛"
      }
    },
    detail: {
      title: "比赛",
      type: "类型",
      status: {
        name: "状态",
        waiting: "等待中",
        inProgress: "进行中",
        finished: "已结束",
        code: "序号",
      }
    }
  },

  login: {
    title: "登录",
    subtitle: "别来无恙。",
    button: "登录",
  },
  register: {
    title: "注册",
    subtitle: "喜欢您来。",
    button: "注册",
  },

  logout: {
    button: "登出",
  },

  form: {
    username: "用户名",
    password: "密码",
    school: "学校",
    class: "班级",
    avatar: "头像",
    id: "学号",
    email: "电子邮箱",
    verify: "验证码",
    term: "请阅读并同意用户协议",
  },

  verify: {
    required: " 不能为空",
    stringMin: " 至少 {min} 字符",
    numberMin: " 必须大于 {min}",
    stringMax: " 至多 {max} 字符",
    numberMax: " 必须小于 {max}",
    email: "请输入格式正确的邮箱地址",
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