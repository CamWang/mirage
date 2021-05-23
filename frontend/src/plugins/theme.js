import colors from 'vuetify/lib/util/colors';

export default {
  themes: {
    light: {
      primary: colors.indigo.accent4,
      secondary: colors.indigo.accent1,
      accent: colors.indigo.base,
      error: colors.red.darken2,
      info: colors.teal.base,
      success:colors.green.accent3,
      warning: colors.yellow.accent3,
      ambient: colors.grey.lighten4,
    },
    dark: {
      primary: colors.cyan.lighten3,
      secondary: colors.cyan.accent1,
      accent: colors.cyan.base,
      error: colors.red.darken3,
      info: colors.teal.base,
      success:colors.green.accent4,
      warning: colors.yellow.accent4,
      ambient: colors.shades.black
    }
  }
}