import en from 'vuetify/lib/locale/en'

const message = {
  ...en,
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