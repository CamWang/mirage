import Notification from './components/Notification.vue'
import { events } from './events'

/**
 * Notification Center
 * @author CamWang
 * 
 * A Notification Center based on vuetify and vue-notification
 * 
 * Usage:
 *  In vue instance:
 *    this.$notify()
 *  Outside of vue instance:
 *    import Vue from 'vue'
 *    Vue.notify()
 *  Params of notyfy():
 *    One string as param will be the notifacation text.
 *    OR an config object
 *      {
 *        title:'',
 *        text:'',
 *        type:'' // theme color, eg. primary,error,success
 *      }
 */

export default {
  install(Vue, options = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    
    Vue.component("notification", Notification);

    this.params = options;

    const notify = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params }
      }

      if (typeof params === 'object') {
        events.$emit('add', params)
      }
    }

    notify.close = function(id) {
      events.$emit('close', id);
    }

    Vue.prototype.$notify = notify;
    Vue.notify = notify;
  }
};