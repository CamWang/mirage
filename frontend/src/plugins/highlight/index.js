import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import cpp from "highlight.js/lib/languages/cpp";
import 'highlight.js/styles/dracula.css';
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("cpp", cpp);

export default {
  install(Vue, options = {}) {
    Vue.mixin({
      updated: function() {
        if (this.$refs.highlight) {
          let targets = this.$refs.highlight.$el.querySelectorAll("code");
          targets.forEach((target) => {
            hljs.highlightElement(target);
          });
        }
      },
    });
  },
};
