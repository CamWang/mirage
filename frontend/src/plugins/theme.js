import colors from 'vuetify/lib/util/colors';

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// System dark sheme detects
let dark = false;
if (prefersDarkScheme.matches) {
  dark = true;
}
// If user have set theme to a certain value before use it
let sessionDark = window.sessionStorage.getItem("dark");
if (sessionDark != null) {
  dark = sessionDark === "true"? true: false;
}

export default {
  dark,
  themes: {
    light: {
      primary: colors.indigo.accent4,
      secondary: colors.indigo.accent3,
      accent: colors.indigo.base,
      error: colors.red.darken1,
      info: colors.teal.base,
      success:colors.green.accent4,
      warning: colors.orange.base,
      ambient: colors.grey.lighten4,
    },
    dark: {
      primary: colors.indigo.accent2,
      secondary: colors.indigo.darken1,
      accent: colors.cyan.base,
      error: colors.red.darken3,
      info: colors.teal.base,
      success:colors.green.darken2,
      warning: colors.orange.accent4,
      ambient: colors.shades.black,
      orange: colors.orange.darken3,
      red: colors.red.darken3,
    }
  }
}