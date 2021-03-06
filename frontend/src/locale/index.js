import Vue from 'vue';
import VueI18n from 'vue-i18n';

import * as en from './en';
import * as zhHans from './zhHans';

Vue.use(VueI18n);

const messages = {
  en: en.message,
  zhHans: zhHans.message
}

const time = {
  en: en.time,
  zhHans: zhHans.time
}

const lang = window.sessionStorage.getItem("lang") || "en";

const i18n = new VueI18n({
  locale: lang,
  messages: messages,
  dateTimeFormats: time
});

export default i18n;