import en from 'vuetify/lib/locale/en'

const message = {
  $vuetify: {
    ...en
  },
  name: "English",
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
      success: "Successed"
    }
  },
  blog: {
    title: "Blogs",
    list: {
      number: "#",
      title: "Title",
      tags: "Tags",
      author: "Author"
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
  }
}

export {
  message,
  time
}