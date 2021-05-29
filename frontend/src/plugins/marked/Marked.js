import markdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import footnote from "markdown-it-footnote";
import deflist from "markdown-it-deflist";
import abbreviation from "markdown-it-abbr";
import insert from "markdown-it-ins";
import mark from "markdown-it-mark";
import toc from "markdown-it-toc-done-right";
import anchor from "markdown-it-anchor";
import katex from "@iktakahiro/markdown-it-katex";
import tasklists from "markdown-it-task-lists";

export default {
  data() {
    return {
      md: {},
      html: true,
    };
  },

  render: function(createElement) {
    let renderedHTML = this.md.render(this.$slots.default[0].text);
    this.$emit("rendered", renderedHTML);
    return createElement("div", {
      domProps: {
        innerHTML: renderedHTML,
      },
    });
  },

  beforeMount() {
    this.md = new markdownIt()
      .use(emoji)
      .use(subscript)
      .use(superscript)
      .use(footnote)
      .use(deflist)
      .use(abbreviation)
      .use(insert)
      .use(mark)
      .use(katex, { throwOnError: false, errorColor: " #cc0000" })
      .use(anchor)
      .use(toc, {
        containerClass: this.tocClass,
        level: this.tocFirstLevel,
      })
      .use(tasklists, { enabled: this.taskLists });

    this.md.set({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    });
  },

  watch: {
    "$slots.default.text": () => {
      this.$forceUpdate();
    },
  },
};
