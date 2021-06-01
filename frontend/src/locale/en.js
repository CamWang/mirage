import en from 'vuetify/lib/locale/en'

const message = {
  $vuetify: {
    ...en
  },
  name: "English",

  // Notification
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
    auth: "Authorization",
    teacher: "Teacher",
    admin: "Admin",
    user: "User",
  },

  refresh: {
    success: "Refreshed"
  },

  dialog: {
    yes: "Yes",
    cancel: "Cancel",
  },

  notify: {
    theme: {
      dark: "Dark♂ Mode On",
      light: "Bright Mode On"
    },
    lang: {
      change: "Language Changed"
    },
    verify: "Please fill in the form correctly.",
    login: {
      success: "Log in successfully",
      fail: "Please check username or password",
      logined: "Please logout first",
    },
    register: {
      success: "Sign up successfully",
      fail: "Register fail",
      repeat: "Username already been taken"
    },
    logout: {
      logouted: "Already logout",
      success: "Logout successfully",
    }
  },

  // Page Content
  head: {
    title: "Mirage OJ",
    tab: {
      home: "Home",
      problem: "Problem",
      contest: "Contest",
      blog: "Blog"
    },
    profile: "Profile",
    submit: "Submissions",
    contest: "Contests",
    random: "I Feel Lucky"
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
    detail: {
      lang: "Language",
      submit: "Submit",
      editor: "Editor",
    },
    reload: {
      title: "Reload the code editor?",
      message: "Are you sure to reload code editor? This will clear all codes. Please copy them before click \"yes\"."
    }
  },

  // status: {
  //   DEF: "Default",
  //   SCE: "Secutiry Check Error",
  //   CE: "Compile Error",
  //   RE: "Runtime Error",
  //   TLE: "Time Limit Exceeds",
  //   MLE: "Memory Limit Exceeds",
  //   OLE: "Output Limit Exceeds",
  //   PE: "Presentation Error",
  //   WA: "Wrong Answer",
  //   AC: "Accepted"
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
      "Default",
      "Security Check Error",
      "Compile Error",
      "Runtime Error",
      "Time Limit Exceeds",
      "Memory Limit Exceeds",
      "Output Limit Exceeds",
      "Presentation Error",
      "Wrong Answer",
      "Accepted"
    ]
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
      status: "Status",
      mode: {
        name: "Mode",
        public: "Public",
        private: "Private"
      }
    },
    detail: {
      title: "Contest",
      status: {
        name: "Stauts",
        waiting: "Waiting",
        inProgress: "In Progress",
        finished: "Finished"
      }
    }
  },

  login: {
    title: "Login",
    subtitle: "We've been expecting you.",
    button: "Login",
  },
  register: {
    title: "Register",
    subtitle: "Hello and welcome.",
    button: "Register",
  },

  logout: {
    button: "Logout"
  },

  form: {
    username: "Username",
    password: "Password",
    school: "School",
    class: "Class",
    avatar: "Avatar",
    email: "E-mail",
    id: "School ID",
    verify: "Verification Code",
    term: "Please read and agree terms of use.",
  },

  verify: {
    required: " is required",
    stringMin: " must be more than {min} characters",
    numberMin: " must greater than {min}",
    stringMax: " must be less than {max} characters",
    numberMax: " must less than {max}",
    email: "Please enter valid email address",
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