import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

const options = {
  theme: {
    themes: {
      light: {
        primary: colors.blue.accent4,
        secondary: colors.blueGrey.darken1,
        accent: colors.shades.black,
        error: colors.red.darken3,
      },
      dark: {

      }
    }
  },
  icons: {
    iconfont: 'mdiSvg',
  },
};

export default new Vuetify(options);