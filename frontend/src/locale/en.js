import en from 'vuetify/lib/locale/en'

const message = {
  $vuetify: {
    ...en
  },
  name: "English",
  axios: {
    request: {
      error: "Request Error",
    },
    response: {
      error: "Service Error",
    },
  },
  auth: {
    login: "Login Required",
    denied: "Permission Denied",
    toolow: {
      teacher: "You must have a minimum role of Teacher",
      admin: "You must have a minimum role of Admin",
    },
    teacher: "Teacher",
    admin: "Admin",
  },
  refresh: {
    success: "Refreshed"
  },
  notify: {
    theme: {
      dark: "Dark♂ Mode On",
      light: "Bright Mode On"
    },
    lang: {
      change: "Language Changed"
    }
  },
  head: {
    title: "Mirage OJ",
    tab: {
      home: "Home",
      problem: "Problem",
      contest: "Contest",
      blog: "Blog"
    }
  },
  home: {
    news: "News"
  },
  problem: {
    title: "Problems",
    list: {
      number: "#",
      title: "Title",
      tags: "Tags",
      submit: "Submitted",
      passrate: "Passrate"
    },
    author: "Author",
    timelimit: "Time Limit",
    memorylimit: "Memory Limit",
    spj: "Special Judge",
  },
  blog: {
    title: "Blogs",
    list: {
      date: "Date",
      title: "Title",
      tags: "Tags",
      author: "Author"
    }
  },
  contest: {
    title: "Contests",
    list: {
      title: "Title",
      tags: "Tags",
      start: "Start",
      end: "End",
      last: "Last",
      mode: {
        name: "Mode",
        public: "Public",
        private: "Private"
      }
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
    minute: 'numeric'
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