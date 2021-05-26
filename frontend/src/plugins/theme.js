import colors from 'vuetify/lib/util/colors';

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let dark = false

if (prefersDarkScheme.matches) {
  dark = true;
}

console.log("################# " + dark);

export default {
  dark,
  themes: {
    light: {
      primary: colors.indigo.accent4,
      secondary: colors.indigo.accent1,
      accent: colors.indigo.base,
      error: colors.red.darken1,
      info: colors.teal.base,
      success:colors.green.accent4,
      warning: colors.yellow.accent3,
      ambient: colors.grey.lighten4,
    },
    dark: {
      primary: colors.indigo.accent2,
      secondary: colors.indigo.darken1,
      accent: colors.cyan.base,
      error: colors.red.darken4,
      info: colors.teal.base,
      success:colors.green.darken3,
      warning: colors.yellow.accent4,
      ambient: colors.shades.black
    }
  }
}