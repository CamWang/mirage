import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '../locale'
import theme from './theme'
import Notify from './notify'

Vue.use(Vuetify);
Vue.use(Notify);

const options = {
  theme,
  icons: {
    iconfont: 'mdiSvg',
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
};

const vuetify = new Vuetify(options);

export default vuetify;