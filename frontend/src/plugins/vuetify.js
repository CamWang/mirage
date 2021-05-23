import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n';
import * as locale from '../locale';
import theme from './theme';
import Notify from './notify';

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(Notify);

const i18n = new VueI18n({
  locale: 'en',
  messages: locale.messages,
  dateTimeFormats: locale.time
});

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

export {
  vuetify,
  i18n,
};