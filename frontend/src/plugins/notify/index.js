import Notification from './components/Notification.vue'
import { events } from './events'

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